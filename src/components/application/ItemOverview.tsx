import React, { useContext, useEffect, useState } from 'react'
import './ItemOverview.css'
import ApplicationItemCard from './ApplicationItemCard'
import { useHistory } from 'react-router'
import { CometChat } from '@cometchat-pro/chat'
import useGlobalState from '../../util/useGlobalState'
import Button from '../Button/Button'
import { SNACKBAR_BUTTON_TYPES } from '../../assets/Data/LBSEnum'
import Instance, { CometChatInstance } from '../../util/axios'
import useErrorState from '../../util/reducers/errorContext'
import AgreementModal from '../modals/AgreementModal/AgreementModal'
import { BookingContext } from '../../pages/application/Application'
import { Item } from '../../types/Item'
import BorrowApplicationCosts from './BorrowApplicationCosts'
import ExtendApplicationCosts from './ExtendApplicationCosts'
import BookingService from '../../services/booking'
import BorrowOverviewFooter from './BorrowOverviewFooter'
import ExtendOverviewFooter from './ExtendOverviewFooter'
import calculateExtensionPrice from '../../util/tradeUtils/calculateExtensionPrice'
import axios from 'axios'
import { CreateBooking } from '../../types/Booking'
import getDeliveryOption from '../../util/getDeliveryOption'

export default function ItemOverview() {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { state, dispatch } = useContext(BookingContext)
  const { errorDispatch } = useErrorState()
  const globalState = useGlobalState()
  const user = globalState.state.user
  const {
    item,
    startDate,
    endDate,
    isDeliverySelected,
    isPickupSelected,
    borrowerAddress,
    bookingCalculator,
    mode,
    appliedEndDate,
    bookingDuration,
  } = state

  const history = useHistory()

  const extensionPrice = calculateExtensionPrice({
    bookingCalculator,
    bookingDuration,
  })

  // Set borrower address if address has not been set
  const setBorrowerAddressFallback = () =>
    dispatch({
      type: 'setBorrowerAddress',
      data: item.address,
    })

  useEffect(() => {
    if (!borrowerAddress) {
      setBorrowerAddressFallback()
    }
    return
  }, [])

  const saveBooking = async () => {
    const bookingInfo = getBookingInfo()
    console.log('BOOKING INFO', JSON.stringify(bookingInfo, null, 2))
    try {
      setIsLoading(true)
      await makeBooking(bookingInfo, item)
    } catch (error) {
      console.log(error)
      errorDispatch({
        type: 'openSnackBar',
        data: {
          message:
            'Failed to book this item. Please check details and try again.',
          btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
          btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getBookingInfo = () => {
    return {
      borrowerAddress: borrowerAddress,
      borrowerId: user.id,
      itemId: item.id,
      status: 'APPLIED',
      error: false,
      deliveryOption: getDeliveryOption(isDeliverySelected, isPickupSelected),
      startDate: startDate,
      endDate: endDate,
      totalPrice: bookingCalculator?.calculateTotalPrice(),
      itemPrice: item.price,
      deliveryPrice: isDeliverySelected ? item.deliveryPrice : 0,
      pickupPrice: isPickupSelected ? item.pickupPrice : 0,
    }
  }

  const unblockUser = async () => {
    try {
      let blockedUsersRequest = new CometChat.BlockedUsersRequestBuilder()
        .setLimit(10)
        .build()
      const blockedUsers = await blockedUsersRequest.fetchNext()
      let userId, blockedId
      // Applicant has blocked the item owner
      if (blockedUsers.find(user => user.getUid() === item.userId)) {
        userId = user.id
        blockedId = item.userId
      } else {
        // Item owner has blocked the applicant
        userId = item.userId
        blockedId = user.id
      }
      await CometChatInstance.delete(`/users/${userId}/blockedusers`, {
        headers: { apiKey: process.env.REACT_APP_CHAT_API_KEY },
        data: { blockedUids: [blockedId] },
      })
    } catch (e) {
      console.log(e)
    }
  }

  const sendEnquiry = async (item: Item, type: 'BORROW' | 'EXTENSION') => {
    await unblockUser()
    const textMessage = new CometChat.TextMessage(
      item.userId,
      type === 'BORROW'
        ? `${user.firstName} ${user.lastName} has enquired about your ${item.title}`
        : `${user.firstName} ${user.lastName} has requested an extension about your ${item.title}`,
      CometChat.RECEIVER_TYPE.USER
    )
    textMessage.setMetadata({ enquiry: true, itemName: item.title })
    try {
      await CometChat.sendMessage(textMessage)
    } catch (error) {
      console.log(error)
    }
  }

  const makeBooking = async (bookingInfo: CreateBooking, item: Item) => {
    const { data } = await Instance.post('/bookings', bookingInfo)
    await sendEnquiry(item, 'BORROW')
    if (!data) return
    history.push({
      pathname: `/item/${item.id}`,
      state: { bookingCreated: true, price: bookingInfo.totalPrice },
    })
  }

  const requestExtension = async () => {
    if (!bookingDuration || !endDate || !appliedEndDate || !bookingCalculator)
      return
    try {
      setIsLoading(true)
      await BookingService.requestExtension(bookingDuration.bookingId, {
        endDate: endDate.toISOString(),
        startDate: appliedEndDate.toISOString(),
        itemPrice: item.price,
        totalPrice: parseInt(bookingCalculator.calculateTotalPrice()),
      })
      await sendEnquiry(item, 'EXTENSION')
      history.push({
        pathname: `/user/trades`,
        state: { extensionCreated: true },
      })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
      }
      errorDispatch({
        type: 'openSnackBar',
        data: {
          message:
            'Failed to apply an extension to this item. Please check details and try again.',
          btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
          btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='ApplicationOverviewContainer'>
      <div className='ItemOverviewCardContainer'>
        <span className='ApplicationOverviewHeader'>Application Overview</span>
        <ApplicationItemCard item={item} />
      </div>
      <div>
        <span className='ApplicationOverviewSubHeader'>Itemised Costs</span>
        {mode === 'APPLY' && bookingCalculator ? (
          <BorrowApplicationCosts
            item={item}
            isDeliverySelected={isDeliverySelected}
            isPickupSelected={isPickupSelected}
            bookingCalculator={bookingCalculator}
          />
        ) : (
          bookingCalculator && (
            <ExtendApplicationCosts extensionPrice={extensionPrice} />
          )
        )}
        <div className='ItemOverviewItemContainer'>
          <span className='ApplicationOverviewSubHeader'>Dates</span>
          <span
            onClick={() =>
              dispatch({ type: 'setPage', data: 'ItemAvailability' })
            }
            className='ItemOverviewEditButton'
          >
            Edit Dates
          </span>
        </div>
        {mode === 'APPLY'
          ? startDate &&
            endDate && (
              <BorrowOverviewFooter startDate={startDate} endDate={endDate} />
            )
          : endDate &&
            appliedEndDate && (
              <ExtendOverviewFooter
                endDate={endDate}
                originalEndDate={appliedEndDate}
              />
            )}
      </div>
      <Button
        onClick={() => setIsModalVisible(true)}
        text='Next'
        style={{ width: '75%', alignSelf: 'center', marginTop: '1rem' }}
      />
      <AgreementModal
        title={'Borrowers Agreement'}
        content={
          "Be sure to read over your borrower's rights (Found on our website) and that you have the right licencing and permissions to operate this item. By tapping the Yes button you agree that you understand these terms."
        }
        isLoading={isLoading}
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onClick={() => (mode === 'APPLY' ? saveBooking() : requestExtension())}
      />
    </div>
  )
}

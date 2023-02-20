import React, { useContext, useEffect, useState } from 'react'
import './ItemOverview.css'
import checkIfLeapYear from '../../util/dateUtils/checkIfLeapYear'
import getDateIndex from '../../util/dateUtils/getDateIndex'
import Arrow from '../../assets/Icons/Arrow'
import ApplicationItemCard from './ApplicationItemCard'
import { useHistory } from 'react-router'
import { CometChat } from '@cometchat-pro/chat'
import useGlobalState from '../../util/useGlobalState'
import Button from '../Button/Button'
import getDateSuffix from '../../util/dateUtils/getDateSuffix'
import { fullNameDayArray, monthArray } from '../../assets/Data/LBSArray'
import {
  BOOKING_STATUSES,
  SNACKBAR_BUTTON_TYPES,
} from '../../assets/Data/LBSEnum'
import Instance, { CometChatInstance } from '../../util/axios'
import useErrorState from '../../util/reducers/errorContext'
import AgreementModal from '../modals/AgreementModal/AgreementModal'
import { BookingContext } from '../../pages/application/Application'
import moment from 'moment'
import ItemApplicationCosts from './ItemApplicationCosts'

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
    currentYear,
    bookingCalculator,
    currentMonth,
  } = state

  const history = useHistory()

  // Set borrower address if address has not been set
  const setBorrowerAddressFallback = () =>
    dispatch({
      type: 'setBorrowerAddress',
      data: {
        streetNumber: user?.address.streetNumber,
        streetName: user?.address.streetName,
        city: user?.address.suburb,
        suburb: user?.address.suburb,
        state: user?.address.state,
        postCode: user?.address.postCode,
        country: user?.address.country,
        fullAddress: user?.address.fullAddress,
        lat: user?.address.lat,
        lng: user?.address.lng,
      },
    })

  useEffect(() => {
    if (!borrowerAddress) {
      setBorrowerAddressFallback()
    }
    return
  }, [])

  const saveBooking = async () => {
    const bookingInfo = getBookingInfo()
    try {
      setIsLoading(true)
      await makeBooking(bookingInfo, item)
    } catch (e) {
      console.log(e.response)
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
      deliveryOption:
        isDeliverySelected && isPickupSelected
          ? 'BOTH'
          : isDeliverySelected
          ? 'DELIVERY'
          : isPickupSelected
          ? 'PICKUP'
          : 'NONE',
      startDate: startDate,
      endDate: endDate,
      total_price: bookingCalculator.getUpdatedTotalPrice(),
      item_price: item.price,
      delivery_price: isDeliverySelected ? item.deliveryPrice : 0,
      pickup_price: isPickupSelected ? item.pickupPrice : 0,
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
      if (blockedUsers.find(user => user.uid === item.userId)) {
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

  const sendEnquiry = async item => {
    await unblockUser()
    const textMessage = new CometChat.TextMessage(
      item.userId,
      `${user.firstName} ${user.lastName} has enquired about your ${item.title}`,
      CometChat.RECEIVER_TYPE.USER
    )
    textMessage.setMetadata({ enquiry: true, itemName: item.title })
    try {
      await CometChat.sendMessage(textMessage)
    } catch (e) {
      console.log(e.response)
    }
  }

  const makeBooking = async (bookingInfo, item) => {
    const { data } = await Instance.post('/bookings', bookingInfo)
    await sendEnquiry(item)
    if (!data) return
    history.push({
      pathname: `/item/${item.id}`,
      state: { bookingCreated: true, price: bookingInfo.price },
    })
  }

  return (
    <div className='ApplicationOverviewContainer'>
      <div className='ItemOverviewCardContainer'>
        <span className='ApplicationOverviewHeader'>Application Overview</span>
        <ApplicationItemCard item={item} />
      </div>
      <div>
        <span className='ApplicationOverviewSubHeader'>Itemised Costs</span>
        <ItemApplicationCosts
          item={item}
          isDeliverySelected={isDeliverySelected}
          isPickupSelected={isPickupSelected}
          bookingCalculator={bookingCalculator}
        />
        <div className='ItemOverviewBorrowContainer'>
          <div className='ItemOverviewItemContainer'>
            <p>Borrow options total</p>
            {bookingCalculator?.getUpdatedTotalPrice() && item && (
              <span className='ItemOverviewPrice'>
                $
                {isDeliverySelected && isPickupSelected
                  ? item.pickupPrice + item.deliveryPrice
                  : isDeliverySelected
                  ? item.deliveryPrice
                  : isPickupSelected
                  ? item.pickupPrice
                  : 0}
              </span>
            )}
          </div>
          {isDeliverySelected && (
            <div className='ItemOverviewItemContainer'>
              <span className='ItemOverviewSmallText'>Item Delivery</span>
              <span className='ItemOverviewSmallText'>
                ${item.deliveryPrice}
              </span>
            </div>
          )}
          {isPickupSelected && (
            <div className='ItemOverviewItemContainer'>
              <span className='ItemOverviewSmallText'>Item Pickup</span>
              <span className='ItemOverviewSmallText'>${item.pickupPrice}</span>
            </div>
          )}
        </div>
        <div className='ItemOverviewItemContainer'>
          <span className='ItemOverviewSmallText'>Off Peak Discount </span>
          <span className='ItemOverviewSmallText'>
            -${bookingCalculator.calculateOffPeakDiscount()}
          </span>
        </div>
        <div className='ItemOverviewItemContainer'>
          <p>Total Price</p>
          <span className='ItemOverviewPrice'>
            ${bookingCalculator.getUpdatedTotalPrice()}
          </span>
        </div>
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
        <div className='ApplicationFooterDetailsContainer'>
          <div className='ApplicationFooterDetails'>
            <p>Collect</p>
            <div>
              <span className='ApplicationFooterTime'>
                {moment(startDate).hours() === 8 ? `8:00am ` : `1:00pm `}{' '}
              </span>
              <span>{fullNameDayArray[startDate.getDay()]}</span>
            </div>
            <div>
              <span>{getDateSuffix(startDate)} </span>
              <span>{monthArray[startDate.getMonth()]}</span>
            </div>
          </div>
          <div className='ApplicationFooterArrowContainer'>
            <Arrow />
          </div>
          <div className='ApplicationFooterDetails'>
            <p>Return</p>
            <div>
              <span className='ApplicationFooterTime'>
                {moment(endDate).hours() === 12 ? `12:00pm ` : `5:00pm `}{' '}
              </span>
              <span>{fullNameDayArray[endDate.getDay()]}</span>
            </div>
            <div>
              <span>{getDateSuffix(endDate)} </span>
              <span>{monthArray[endDate.getMonth()]} </span>
            </div>
          </div>
        </div>
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
        onClick={saveBooking}
      />
    </div>
  )
}

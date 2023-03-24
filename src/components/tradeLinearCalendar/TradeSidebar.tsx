import React, { SetStateAction, useEffect, useState } from 'react'
import './TradeSidebar.css'
import Instance from '../../util/axios'
import ApplicationItemCard from '../application/ApplicationItemCard'
import { Avatar, CircularProgress } from '@material-ui/core'
import getImage from '../../util/getImage'
import useGlobalState from '../../util/useGlobalState'
import BookingDatesPanel from '../BookingDatesPanel/BookingDatesPanel'
import { DELIVERY_OPTIONS } from '../../assets/Data/LBSEnum'
import BookingCalculator from '../../util/calculator/BookingCalculator'
import { Item } from '../../types/Item'
import { Booking } from '../../types/Booking'
import TradeSidebarPaymentPanel from './TradeSidebarPaymentPanel'
import TradeCalendarStatusPanel from './TradeCalendarStatusPanel'
import ApplicantOverview from './ApplicantOverview'
import { UserTradeData } from '../../types/User'
import getBookingDuration from '../../util/tradeUtils/getBookingDuration'

type Props = {
  booking: Booking
  getBookings: () => void
  toggleReportModal: () => void
  toggleReviewModal: () => void
}

export default function TradeSidebar({
  booking,
  getBookings,
  toggleReportModal,
  toggleReviewModal,
}: Props) {
  const { state } = useGlobalState()
  const { user } = state
  const [item, setItem] = useState<Item | null>(null)
  const [userDetails, setUserDetails] = useState<UserTradeData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const firstBookingDuration = getBookingDuration(booking.bookingDurations)
  const [bookingPriceCalculator, setBookingPriceCalculator] =
    useState<BookingCalculator>()

  useEffect(() => {
    if (!booking.item) return
    setItem(booking.item)
    getUserDetails(
      booking.borrowerId === user.id ? booking.item.userId : booking.borrowerId
    )
  }, [booking])

  const isDeliverySelected =
    booking.deliveryOption === 'BOTH' || booking.deliveryOption === 'DELIVERY'
      ? true
      : false
  const isPickupSelected =
    booking.deliveryOption === 'BOTH' || booking.deliveryOption === 'PICKUP'
      ? true
      : false

  const isApplicantOverview =
    userDetails && userDetails.id !== user.id && booking.item.userId === user.id

  useEffect(() => {
    if (!item) return
    const bookingPriceCalculator = new BookingCalculator(
      new Date(firstBookingDuration?.startDate ?? new Date()),
      new Date(firstBookingDuration?.endDate ?? new Date()),
      booking.deliveryPrice,
      booking.pickupPrice,
      item.price,
      item.discount,
      isDeliverySelected,
      isPickupSelected
    )
    setBookingPriceCalculator(bookingPriceCalculator)
  }, [item])

  const getUserDetails = async (userId: string) => {
    try {
      setIsLoading(true)
      const { data, status } = await Instance.get(`users/${userId}`)
      if (status !== 200) return
      setUserDetails(data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const renderBookingDeliveryOption = () => {
    let bookingDeliveryText = ''

    switch (booking.deliveryOption) {
      case DELIVERY_OPTIONS.BOTH:
        bookingDeliveryText = 'Delivery / Pickup Location'
        break
      case DELIVERY_OPTIONS.DELIVERY:
        bookingDeliveryText = 'Delivery'
        break
      case DELIVERY_OPTIONS.PICKUP:
        bookingDeliveryText = 'Pickup'
        break
    }

    return (
      <>
        <span className='TradeSidebarHeading BorrowerAddressLocation'>
          {bookingDeliveryText}
        </span>
        <span style={{ textAlign: 'center' }}>
          {booking.borrowerAddress?.fullAddress}
        </span>
      </>
    )
  }

  return (
    <div className='TradeSidebarContainer'>
      {isLoading ? (
        <CircularProgress
          style={{ justifySelf: 'center', alignSelf: 'center' }}
          color='inherit'
        />
      ) : (
        <>
          <div className='TradeSidebarSection'>
            <span className='TradeSidebarHeading'>Trade Details</span>
          </div>
          <div className='TradeSidebarSection'>
            <span className='TradeSidebarSubHeading'>Item</span>
            {item && (
              <ApplicationItemCard
                onClick={() => null}
                extra={false}
                price={item.price}
                item={item}
              />
            )}
          </div>
          {firstBookingDuration && (
            <div className='TradeSidebarSection'>
              <TradeCalendarStatusPanel
                getBookings={getBookings}
                selectedBooking={booking}
                userDetails={userDetails}
                toggleReportModal={toggleReportModal}
                toggleReviewModal={toggleReviewModal}
                startDate={firstBookingDuration.startDate}
                endDate={firstBookingDuration.endDate}
              />
            </div>
          )}
          {bookingPriceCalculator && item && (
            <TradeSidebarPaymentPanel
              bookingPriceCalculator={bookingPriceCalculator}
              isDeliverySelected={isDeliverySelected}
              isPickupSelected={isPickupSelected}
              item={item}
            />
          )}
          <div className='TradeSidebarSection'>
            <span className='TradeSidebarHeading'>Dates</span>
            {booking && firstBookingDuration && (
              <BookingDatesPanel
                startDate={new Date(firstBookingDuration.startDate)}
                endDate={new Date(firstBookingDuration.endDate)}
              />
            )}
          </div>
          {booking.deliveryOption !== DELIVERY_OPTIONS.NONE && (
            <div className='TradeSidebarSection'>
              <div className='TradeSidebarLocationContainer'>
                {renderBookingDeliveryOption()}
              </div>
            </div>
          )}
          {isApplicantOverview && (
            <ApplicantOverview userDetails={userDetails} />
          )}
        </>
      )}
    </div>
  )
}

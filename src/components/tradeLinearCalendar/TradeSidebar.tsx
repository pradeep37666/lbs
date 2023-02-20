import React, { SetStateAction, useEffect, useState } from 'react'
import './TradeSidebar.css'
import Instance from '../../util/axios'
import ApplicationItemCard from '../application/ApplicationItemCard'
import { Avatar, CircularProgress } from '@material-ui/core'
import getImage from '../../util/getImage'
import useGlobalState from '../../util/useGlobalState'
import RatingFiller from '../ratingFiller/ratingFiller'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'
import BookingDatesPanel from '../BookingDatesPanel/BookingDatesPanel'
import { DELIVERY_OPTIONS } from '../../assets/Data/LBSEnum'
import BookingCalculator from '../../util/calculator/BookingCalculator'
import { Item } from '../../types/Item'
import { Booking } from '../../types/Booking'
import TradeSidebarPaymentPanel from './TradeSidebarPaymentPanel'
import TradeCalendarStatusPanel from './TradeCalendarStatusPanel'

type Props = {
  booking: Booking
  getBookings: () => void
  setReportModalVisible: React.Dispatch<SetStateAction<boolean>>
  setReviewModalVisible: React.Dispatch<SetStateAction<boolean>>
}

export default function TradeSidebar({
  booking,
  getBookings,
  setReportModalVisible,
  setReviewModalVisible,
}: Props) {
  const { state } = useGlobalState()
  const { user } = state
  const [item, setItem] = useState<Item | null>(null)
  const [userDetails, setUserDetails] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [bookingPriceCalculator, setBookingPriceCalculator] =
    useState<BookingCalculator>()

  useEffect(() => {
    console.log('BOOKING', { booking })
    if (!booking.item) return
    setItem(booking.item)
    getUserDetails()
  }, [booking])

  const isDeliverySelected =
    booking.deliveryOption === 'BOTH' || booking.deliveryOption === 'DELIVERY'
      ? true
      : false
  const isPickupSelected =
    booking.deliveryOption === 'BOTH' || booking.deliveryOption === 'PICKUP'
      ? true
      : false

  useEffect(() => {
    if (!item) return
    const bookingPriceCalculator = new BookingCalculator(
      new Date(booking.startDate),
      new Date(booking.endDate),
      item.deliveryPrice,
      item.pickupPrice,
      item.price,
      item.discount,
      isDeliverySelected,
      isPickupSelected
    )
    setBookingPriceCalculator(bookingPriceCalculator)
  }, [item])

  const getUserDetails = async () => {
    const userId =
      user.id === booking.lenderId ? booking.borrowerId : booking.lenderId
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
          <div className='TradeSidebarSection'>
            <TradeCalendarStatusPanel
              getBookings={getBookings}
              booking={booking}
              userDetails={userDetails}
              setReportModalVisible={setReportModalVisible}
              setReviewModalVisible={setReviewModalVisible}
              startDate={booking.startDate}
              endDate={booking.endDate}
            />
          </div>
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
            {booking && (
              <BookingDatesPanel
                startDate={new Date(booking.startDate)}
                endDate={new Date(booking.endDate)}
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
          {userDetails && (
            <div className='TradeSidebarSection'>
              <div className='TradeSidebarHeading'>
                <span>Applicant Overview</span>
              </div>
              <div className='TradeSidebarUserContainer'>
                <div className='TradeSidebarUserAvatar'>
                  <Avatar
                    sizes=''
                    src={
                      userDetails.avatar
                        ? getImage(userDetails.avatar)
                        : MissingProfile
                    }
                  />
                </div>
                <div>
                  <span className='TradeSidebarUserName'>
                    {userDetails.fullName}
                  </span>
                  <div className='TradeSidebarUserRatingContainer'>
                    <span>Lender:</span>
                    <span> {userDetails.lender_rating}/5</span>
                    <RatingFiller rating={userDetails.lender_rating} />
                  </div>
                  <div className='TradeSidebarUserRatingContainer'>
                    <span>Borrower: </span>
                    <span>{userDetails.borrower_rating}/5</span>
                    <RatingFiller rating={userDetails.borrower_rating} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

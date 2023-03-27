import React from 'react'
import { Link } from 'react-router-dom'
import { Booking, BookingDuration } from '../../../types/Booking'
import { UserTradeData } from '../../../types/User'
import EndDateCard from '../EndDateCard'
import StatusButton from '../tradeCalendarStatusPanel/StatusButton'

type Props = {
  isLender: boolean
  userDetails: UserTradeData
  endDate: string
  selectedBooking: Booking
  bookingDuration: BookingDuration
}

const StatusExtensionApproved = ({
  isLender,
  userDetails,
  endDate,
  selectedBooking,
  bookingDuration,
}: Props) => {
  console.log('BOOKING DURATION', bookingDuration)
  return (
    <div className='flex flex-col items-center p-2 text-center'>
      {isLender ? (
        <div>
          <span>
            You have approved{' '}
            {`${userDetails.firstName} ${userDetails.lastName}`}'s booking
            extension.
          </span>
          <div className='mb-2' />
          <EndDateCard endDate={endDate} isLender={isLender} />
        </div>
      ) : (
        <div>
          <span className='mb-3'>
            {`${userDetails.firstName} ${userDetails.lastName}`} has approved
            your extension.
          </span>
          <div className='mb-2' />
          <EndDateCard endDate={endDate} isLender={isLender} />
          <div className='mt-3' />
          <Link
            className='w-full'
            to={{
              pathname: `/item/${selectedBooking.itemId}/application`,
              state: {
                bookingDuration: bookingDuration,
                deliveryCosts: {
                  deliveryPrice: selectedBooking.deliveryPrice,
                  pickupPrice: selectedBooking.pickupPrice,
                },
              },
            }}
            replace
          >
            <StatusButton
              type='blue'
              text={
                <p
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  Extend Borrow
                </p>
              }
              width='100%'
            />
          </Link>
        </div>
      )}
    </div>
  )
}

export default StatusExtensionApproved

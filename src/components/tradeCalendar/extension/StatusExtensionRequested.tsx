import React from 'react'
import {
  Booking,
  BookingAction,
  BookingEventStatus,
} from '../../../types/Booking'
import { UserTradeData } from '../../../types/User'
import BookingDatesPanel from '../../BookingDatesPanel/BookingDatesPanel'
import StatusButton from '../tradeCalendarStatusPanel/StatusButton'

type Props = {
  isLender: boolean
  userDetails: UserTradeData
  selectedBooking: Booking
  existingEndDate: string
  handleBookingAction: (
    action: BookingAction,
    event?: BookingEventStatus
  ) => Promise<void>
  isLoading: boolean
}

const StatusExtensionRequested = ({
  isLender,
  userDetails,
  selectedBooking,
  existingEndDate,
  handleBookingAction,
  isLoading,
}: Props) => {
  const proposedEndDate = selectedBooking.bookingDurations[0]?.endDate
  return (
    <div className='flex flex-col items-center p-2 text-center'>
      {isLender ? (
        <div>
          <span>
            {`${userDetails.firstName} ${userDetails.lastName}`} has requested
            an extension for your item.
          </span>
          {proposedEndDate && (
            <BookingDatesPanel
              collectText='Old Return'
              returnText='New Return'
              endDate={new Date(proposedEndDate)}
              startDate={new Date(existingEndDate)}
              isExtension
            />
          )}
          <div className='mt-2 flex justify-center gap-2'>
            <StatusButton
              text='Reject'
              type='white'
              onClick={() =>
                handleBookingAction(
                  'REJECT',
                  BookingEventStatus.EXTENSION_REJECTED
                )
              }
              isLoading={isLoading}
            />
            <StatusButton
              text='Approve'
              type='red'
              onClick={() =>
                handleBookingAction(
                  'APPROVE',
                  BookingEventStatus.EXTENSION_APPROVED
                )
              }
              isLoading={isLoading}
            />
          </div>
        </div>
      ) : (
        <div>
          <span className='mb-3'>
            Your booking extension request has been sent, the item owner has 24
            hours to respond.
          </span>
          <div className='mt-2'>
            <StatusButton
              text='Cancel Extension'
              type='white'
              onClick={() =>
                handleBookingAction(
                  'CANCEL',
                  BookingEventStatus.EXTENSION_CANCELLED
                )
              }
              isLoading={isLoading}
              width='100%'
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default StatusExtensionRequested

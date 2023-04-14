import React from 'react'
import {
  Booking,
  BookingAction,
  BookingDuration,
  BookingEventStatus,
} from '../../../types/Booking'
import { UserTradeData } from '../../../types/User'
import StatusExtensionApproved from './StatusExtensionApproved'
import StatusExtensionCancelled from './StatusExtensionCancelled'
import StatusExtensionRejected from './StatusExtensionRejected'
import StatusExtensionRequested from './StatusExtensionRequested'

type Props = {
  extensionStatus:
    | BookingEventStatus.EXTENSION_REQUESTED
    | BookingEventStatus.EXTENSION_REJECTED
    | BookingEventStatus.EXTENSION_APPROVED
    | BookingEventStatus.EXTENSION_CANCELLED
  isLender: boolean
  handleBookingAction: (
    action: BookingAction,
    event?: BookingEventStatus
  ) => Promise<void>
  userDetails: UserTradeData
  endDate: string
  selectedBooking: Booking
  bookingDuration: BookingDuration
  isLoading: boolean
}

const StatusExtension = ({
  extensionStatus,
  isLender,
  handleBookingAction,
  userDetails,
  endDate,
  selectedBooking,
  bookingDuration,
  isLoading,
}: Props) => {
  switch (extensionStatus) {
    case BookingEventStatus.EXTENSION_REQUESTED:
      return (
        <StatusExtensionRequested
          isLender={isLender}
          userDetails={userDetails}
          selectedBooking={selectedBooking}
          handleBookingAction={handleBookingAction}
          existingEndDate={endDate}
          isLoading={isLoading}
        />
      )
    case BookingEventStatus.EXTENSION_APPROVED:
      return (
        <StatusExtensionApproved
          isLender={isLender}
          userDetails={userDetails}
          endDate={endDate}
          bookingDuration={bookingDuration}
        />
      )
    case BookingEventStatus.EXTENSION_REJECTED:
      return (
        <StatusExtensionRejected
          isLender={isLender}
          userDetails={userDetails}
          endDate={endDate}
        />
      )
    case BookingEventStatus.EXTENSION_CANCELLED:
      return (
        <StatusExtensionCancelled
          isLender={isLender}
          userDetails={userDetails}
          endDate={endDate}
        />
      )
    default: {
      throw Error('Unhandled error')
    }
  }
}

export default StatusExtension

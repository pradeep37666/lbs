import React from 'react'
import {
  Booking,
  BookingAction,
  BookingDuration,
  BookingEventStatus,
} from '../../../types/Booking'
import { UserTradeData } from '../../../types/User'
import StatusExtensionApproved from './StatusExtensionApproved'
import StatusExtensionRejected from './StatusExtensionRejected'
import StatusExtensionRequested from './StatusExtensionRequested'

type Props = {
  extensionStatus:
    | BookingEventStatus.EXTENSION_REQUESTED
    | BookingEventStatus.EXTENSION_REJECTED
    | BookingEventStatus.EXTENSION_APPROVED
  isLender: boolean
  handleBookingAction: (action: BookingAction) => Promise<void>
  userDetails: UserTradeData
  endDate: string
  selectedBooking: Booking
  bookingDuration: BookingDuration
}

const StatusExtension = ({
  extensionStatus,
  isLender,
  handleBookingAction,
  userDetails,
  endDate,
  selectedBooking,
  bookingDuration,
}: Props) => {
  // TODO - pass handleBookingAction into components when backend endpoints have been created
  switch (extensionStatus) {
    case BookingEventStatus.EXTENSION_REQUESTED:
      return (
        <StatusExtensionRequested
          isLender={isLender}
          userDetails={userDetails}
          selectedBooking={selectedBooking}
          handleBookingAction={handleBookingAction}
          existingEndDate={endDate}
        />
      )
    case BookingEventStatus.EXTENSION_APPROVED:
      return (
        <StatusExtensionApproved
          isLender={isLender}
          userDetails={userDetails}
          endDate={endDate}
          selectedBooking={selectedBooking}
          bookingDuration={bookingDuration}
        />
      )
    case BookingEventStatus.EXTENSION_REJECTED:
      return (
        <StatusExtensionRejected
          isLender={isLender}
          userDetails={userDetails}
        />
      )
  }
}

export default StatusExtension

import { BookingEvent, BookingEventStatus } from '../../types/Booking'

const getIsBothConfirmed = (bookingEvents: BookingEvent[]) => {
  const hasBorrowerConfirmed = bookingEvents.some(
    bookingEvent => bookingEvent.event === BookingEventStatus.BORROWER_CONFIRMED
  )

  const hasLenderConfirmed = bookingEvents.some(
    bookingEvent => bookingEvent.event === BookingEventStatus.LENDER_CONFIRMED
  )

  const hasBothConfirmed = hasBorrowerConfirmed && hasLenderConfirmed

  return hasBothConfirmed
}

export default getIsBothConfirmed

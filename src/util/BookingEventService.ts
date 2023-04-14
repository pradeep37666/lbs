import { BookingEvent, BookingEventStatus } from '../types/Booking'

namespace BookingEventService {
  export const isBorrowerReviewed = (bookingEvents: BookingEvent[]) => {
    return bookingEvents.some(
      bookingEvent =>
        bookingEvent.event === BookingEventStatus.BORROWER_REVIEWED
    )
  }

  export const isLenderReviewed = (bookingEvents: BookingEvent[]) => {
    return bookingEvents.some(
      bookingEvent => bookingEvent.event === BookingEventStatus.LENDER_REVIEWED
    )
  }

  export const isBorrowerConfirmed = (bookingEvents: BookingEvent[]) => {
    return bookingEvents.some(
      bookingEvent =>
        bookingEvent.event === BookingEventStatus.BORROWER_CONFIRMED
    )
  }

  export const isLenderConfirmed = (bookingEvents: BookingEvent[]) => {
    return bookingEvents.some(
      bookingEvent => bookingEvent.event === BookingEventStatus.LENDER_CONFIRMED
    )
  }
}

export default BookingEventService

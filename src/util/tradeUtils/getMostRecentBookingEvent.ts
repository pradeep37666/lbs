import { BookingEvent } from '../../types/Booking'

const getMostRecentBookingEvent = (bookingEvents: BookingEvent[]) => {
  if (bookingEvents.length === 0) return
  const bookingEventsInDescendingOrder = bookingEvents.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  if (
    bookingEventsInDescendingOrder.length >= 1 &&
    bookingEventsInDescendingOrder[0]
  ) {
    return bookingEventsInDescendingOrder[0]
  } else {
    return
  }
}

export default getMostRecentBookingEvent

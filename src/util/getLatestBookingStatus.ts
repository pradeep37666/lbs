import { BookingEvent } from '../types/Booking'

const getLastestBookingStatus = (bookingEvents: BookingEvent[]) => {
  if (bookingEvents.length === 0) {
  } else if (bookingEvents.length === 1 && bookingEvents[0]) {
    return bookingEvents[0].event
  }
  return bookingEvents[0]
}

export default getLastestBookingStatus

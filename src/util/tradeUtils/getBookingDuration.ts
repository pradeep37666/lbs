import { BookingDuration } from '../../types/Booking'

const getBookingDuration = (bookingDurations: BookingDuration[]) => {
  if (bookingDurations.length === 0) return
  if (bookingDurations.length === 1) {
    return bookingDurations[0]
  } else {
    const approvedBooking = bookingDurations.find(
      bookingDuration => bookingDuration.status === 'APPROVED'
    )
    return approvedBooking ? approvedBooking : bookingDurations[0]
  }
}

export default getBookingDuration

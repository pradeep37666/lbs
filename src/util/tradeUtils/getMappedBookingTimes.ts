import { BookingDate, BookingDetail } from '../../types/Booking'

const getMappedBookingTimes = (bookingDetails: BookingDetail[]) => {
  const mappedBookingTimes = bookingDetails
    .filter(bookingDetail => {
      const approvedBookingDuration = bookingDetail.bookingDurations?.find(
        bookingDuration => bookingDuration.status === 'APPROVED'
      )
      return approvedBookingDuration != null
    })
    .map(bookingDetail => {
      const approvedBookingDuration = bookingDetail.bookingDurations?.find(
        bookingDuration => bookingDuration.status === 'APPROVED'
      )
      return {
        startDate: approvedBookingDuration?.startDate ?? '',
        endDate: approvedBookingDuration?.endDate ?? '',
      }
    })
    .filter(
      bookingTime =>
        typeof bookingTime.startDate === 'string' &&
        typeof bookingTime.endDate === 'string'
    )
  return mappedBookingTimes
}

export default getMappedBookingTimes

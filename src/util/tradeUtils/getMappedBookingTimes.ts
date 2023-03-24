import { BookingDate, BookingDetail } from '../../types/Booking'

const getMappedBookingTimes = (bookingDetails: BookingDetail[]) => {
  const mappedBookingTimes = bookingDetails
    .filter(
      bookingDetail =>
        bookingDetail.bookingDurations &&
        bookingDetail.bookingDurations.length > 0 &&
        bookingDetail.bookingDurations[0] &&
        bookingDetail.bookingDurations[0].status === 'APPROVED'
    )
    .map(bookingDetail => {
      return {
        startDate: bookingDetail.bookingDurations[0]?.startDate ?? '',
        endDate: bookingDetail.bookingDurations[0]?.endDate ?? '',
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

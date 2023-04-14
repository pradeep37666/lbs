import { BookingDuration } from '../../types/Booking'

const getExtensionApprovedDuration = (bookingDurations: BookingDuration[]) => {
  if (bookingDurations.length < 2) return
  if (!bookingDurations[0] || !bookingDurations[1]) return
  const extensionDuration: BookingDuration = {
    bookingId: bookingDurations[0].bookingId,
    createdAt: bookingDurations[0].createdAt,
    endDate: bookingDurations[0].endDate,
    startDate: bookingDurations[1].startDate,
    id: bookingDurations[0].id,
    itemPrice: bookingDurations[0].itemPrice,
    status: bookingDurations[0].status,
    stripeChargeId: bookingDurations[0].stripeChargeId,
    totalPrice: bookingDurations[0].totalPrice,
    updatedAt: bookingDurations[0].updatedAt,
  }

  return extensionDuration
}

export default getExtensionApprovedDuration

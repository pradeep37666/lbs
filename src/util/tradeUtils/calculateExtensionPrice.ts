import { BookingDuration } from '../../types/Booking'
import BookingCalculator from '../calculator/BookingCalculator'

type Args = {
  bookingCalculator: BookingCalculator | undefined
  bookingDuration: BookingDuration | undefined
}

const calculateExtensionPrice = ({
  bookingCalculator,
  bookingDuration,
}: Args) => {
  if (!bookingCalculator || !bookingDuration) return
  const extensionPrice =
    parseInt(bookingCalculator.calculateTotalPrice()) -
    bookingDuration.totalPrice
  return extensionPrice
}

export default calculateExtensionPrice

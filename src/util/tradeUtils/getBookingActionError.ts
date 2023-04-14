import { BookingAction } from '../../types/Booking'

const getBookingActionError = (bookingAction: BookingAction) => {
  switch (bookingAction) {
    case 'APPROVE':
      return 'Something went wrong... Booking could not be approved.'
    case 'BORROWER_CONFIRM':
      return 'Something went wrong... Booking could not be confirmed.'
    case 'CANCEL':
      return 'Something went wrong trying to cancel the booking. Please try again.'
    case 'COMPLETE':
      return 'Something went wrong trying to complete the booking. Please try again.'
    case 'DISPUTE':
      return 'Something went trying to dispute the booking. Please try again.'
    case 'EXTEND':
      return 'Something went trying attempting to apply your extension. Please try again.'
    case 'LENDER_CONFIRM':
      return 'Something went wrong... Booking could not be confirmed.'
    case 'REJECT':
      return 'Something went wrong trying to reject the booking. Please try again.'
    case 'RESCHEDULE':
      return 'Something went wrong trying to request that the borrower reschedule the booking. Please try again.'
    default:
      return 'Something went wrong... Please try again.'
  }
}

export default getBookingActionError

import { UserTradeData } from '../../types/User'

const getCancelledText = (
  status: string,
  isLender: boolean,
  userDetails: UserTradeData
) => {
  let cancelledText = ''
  if (status === 'CANCELLED') {
    cancelledText = isLender
      ? `${userDetails.firstName} ${userDetails.lastName} completely cancelled this booking.`
      : `You completely cancelled this booking`
  } else if (status === 'REJECTED') {
    cancelledText = isLender
      ? 'You completely cancelled this booking'
      : `${userDetails.firstName} ${userDetails.lastName} completely cancelled this booking.`
  }
  return cancelledText
}

export default getCancelledText

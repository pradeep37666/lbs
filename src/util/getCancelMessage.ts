import { UserTradeData } from '../types/User'

function getCancelMessage(
  status: string,
  isOwner: boolean,
  userDetails: UserTradeData
) {
  const canceler = isOwner
    ? 'You'
    : `${userDetails?.firstName} ${userDetails?.lastName}`
  return status === 'CANCELLED'
    ? `${canceler} completely cancelled this booking.`
    : ''
}

export default getCancelMessage

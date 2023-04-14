import { Dispute } from '../../types/Booking'

const getIsDisputed = (disputes: Dispute[] | undefined) => {
  if (!disputes) return false
  const isDisputed = disputes.some(dispute => !dispute.isResolved)
  return isDisputed
}

export default getIsDisputed

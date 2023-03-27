import moment from 'moment'

const isPickupTime = (startDate: string) => {
  const startDateMoment = moment(startDate)
  const now = moment()
  if (startDateMoment.isSameOrBefore(now.subtract(1, 'hour'))) return true
  return false
}

export default isPickupTime

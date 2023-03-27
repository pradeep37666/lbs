import moment from 'moment'

const isDropoffTime = (startDate: string) => {
  const endDateMoment = moment(startDate)
  const now = moment()
  if (endDateMoment.isSameOrBefore(now.subtract(1, 'hour'))) return true
  return false
}

export default isDropoffTime

import { BlockedAvailabilityWeekday } from '../types/User'

export const shortToLongDay = (
  dayShortForm: string
): BlockedAvailabilityWeekday => {
  switch (dayShortForm) {
    case 'SUN':
      return 'SUNDAY'
    case 'MON':
      return 'MONDAY'
    case 'TUE':
      return 'TUESDAY'
    case 'WED':
      return 'WEDNESDAY'
    case 'THU':
      return 'THURSDAY'
    case 'FRI':
      return 'FRIDAY'
    case 'SAT':
      return 'SATURDAY'
    default:
      return 'SUNDAY'
  }
}

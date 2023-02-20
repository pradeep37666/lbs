import { BlockedAvailabilityWeekday } from '../types/User'

export const blockedAvailabilityToNumber = (
  blockedAvailabilityWeekDay: BlockedAvailabilityWeekday
) => {
  switch (blockedAvailabilityWeekDay) {
    case 'SUNDAY':
      return 1
    case 'MONDAY':
      return 2
    case 'TUESDAY':
      return 3
    case 'WEDNESDAY':
      return 4
    case 'THURSDAY':
      return 5
    case 'FRIDAY':
      return 6
    case 'SATURDAY':
      return 7
  }
}

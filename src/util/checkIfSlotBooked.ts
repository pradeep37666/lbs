import moment from 'moment'

export default function checkIfSlotBooked(
  bookingDates: { startDate: string; endDate: string }[],
  currentDate: Date
): { isMorningBooked: boolean; isAfternoonBooked: boolean } {
  let isMorningBooked = false
  let isAfternoonBooked = false
  const curr = moment(currentDate)
  bookingDates.forEach(bookingDate => {
    const start = moment(bookingDate.startDate)
    const end = moment(bookingDate.endDate)
    const isStartSame = curr.isSame(start, 'day')
    const isEndSame = curr.isSame(end, 'day')
    const isBothSame = isStartSame && isEndSame
    if (
      (isStartSame && start.hours() === 8) ||
      (isEndSame && end.hours() === 12)
    ) {
      isMorningBooked = true
    }
    if (
      (isStartSame && start.hours() === 13) ||
      (isEndSame && end.hours() === 17) ||
      (isStartSame && start.hours() >= 8 && curr.isBefore(end, 'day'))
    ) {
      isAfternoonBooked = true
    }
    if (curr.isBetween(start, end, null, '[]')) {
      if (isEndSame && end.hours() === 12) {
        isMorningBooked = true
      } else {
        isMorningBooked = true
        isAfternoonBooked = true
      }
    }
    if (isBothSame) {
      if (start.hours() === 8 && end.hours() === 12) {
        isMorningBooked = true
      } else if (start.hours() === 13 && end.hours() === 17) {
        isAfternoonBooked = true
      } else if (start.hours() === 8 && end.hours() === 17) {
        isMorningBooked = true
        isAfternoonBooked = true
      }
    }
  })
  return { isMorningBooked, isAfternoonBooked }
}

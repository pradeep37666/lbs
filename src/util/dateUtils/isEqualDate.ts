const isEqualDate = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString()
}

export default isEqualDate

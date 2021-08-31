/**
 * Check whether leap year
 * @param year
 */
const isLeapYear = (year) => {
return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
  
/**
 * Get the index of the date in the year
 * @param year
 * @param month
 * @param day
 */
const getDateIndex = (year, month, day) => {
    let days = day;

    //Month days
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 0; i < month - 1; i++) {
        //the month index need minus 1
        days += monthDays[i];
    }

    //if leap year, need plus one
    if (isLeapYear(year) && month > 2) {
        days++;
    }
    return days;
}


const getAvailability = (dateObj, itemAvailabilityString, yearAvailabilityString) => {
    const month = dateObj.getMonth()
    const year = dateObj.getYear()
    const date = dateObj.getDate()
    const day = dateObj.getDay()

    const yearIndex = getDateIndex(year, month, date)
    
    let dayIndex
    if(day === 0){
        dayIndex = 7
    } else {
        dayIndex = day
    }
    //
    const am = yearAvailabilityString[yearIndex * 2 - 2] === itemAvailabilityString[dayIndex * 2 - 2]
    const pm = yearAvailabilityString[(yearIndex * 2) - 1] === itemAvailabilityString[(dayIndex * 2) - 1]
    return { am, pm }
}
export default getAvailability
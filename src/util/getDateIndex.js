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
const getDateIndex = (dateObj) => {
    const year = dateObj.getYear()
    const month = dateObj.getMonth()
    const date = dateObj.getDate()

    let days = date;

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

export default getDateIndex
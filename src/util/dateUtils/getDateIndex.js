import checkIfLeapYear from "./checkIfLeapYear"


const getDateIndex = (bookingTime) => {
    const { dateObj } = bookingTime
    const year = dateObj.getYear()
    const month = dateObj.getMonth()
    const date = dateObj.getDate()

    let days = date;
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let i = 0; i < month ; i++) {
        //the month index need minus 1
        days += monthDays[i];
    }
    // double the days to account for time slots
    days = days * 2
    // make the slots start from 0
    days -= bookingTime.timeslot === 'morning' ? 2 : 1


    if (checkIfLeapYear(year) && month > 2) {
        days++;
    }
    return days;
}

export default getDateIndex
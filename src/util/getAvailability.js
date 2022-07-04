import getDateIndex from "./dateUtils/getDateIndex"

const getAvailability = (dateObj, itemAvailabilityString, yearAvailabilityString) => {
    const day = dateObj.getDay()
    const morningSlot = {
        dateObj,
        timeslot: 'morning'
    }
    const afternoonSlot = {
        dateObj,
        timeslot: 'afternoon'
    }
    const morningYearIndex = getDateIndex(morningSlot)
    const afternoonYearIndex = getDateIndex(afternoonSlot)
    let dayIndex
    if(day === 0){
        dayIndex = 7
    } else {
        dayIndex = day
    }
    const amBooked = yearAvailabilityString[morningYearIndex] === '0'
    const pmBooked = yearAvailabilityString[(afternoonYearIndex)] === '0'

    const amAvailable = itemAvailabilityString[(dayIndex * 2) - 2]
    const pmAvailable = itemAvailabilityString[(dayIndex * 2) - 1]

    return { 
        availability: {
            am: Boolean(parseInt(amAvailable)), 
            pm: Boolean(parseInt(pmAvailable))
        }, 
        booked : {
            am: amBooked,
            pm: pmBooked
        } }
}
export default getAvailability
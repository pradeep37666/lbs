import getDateIndex from "./getDateIndex"


const getAvailability = (dateObj, itemAvailabilityString, yearAvailabilityString) => {

    const day = dateObj.getDay()

    const yearIndex = getDateIndex(dateObj)
    
    let dayIndex
    if(day === 0){
        dayIndex = 7
    } else {
        dayIndex = day
    }
    console.log(dateObj, (yearIndex * 2))
    console.log(yearAvailabilityString[561])
    const amBooked = yearAvailabilityString[(yearIndex * 2) + 1] === '0'
    const pmBooked = yearAvailabilityString[(yearIndex * 2) + 2] === '0'
    const amAvailable = itemAvailabilityString[dayIndex * 2 - 1]
    const pmAvailable = itemAvailabilityString[(dayIndex * 2)]

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
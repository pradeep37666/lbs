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
    console.log(dayIndex)
    console.log(dateObj)
    const amBooked = yearAvailabilityString[(yearIndex * 2) + 1] === '0'
    const pmBooked = yearAvailabilityString[(yearIndex * 2) + 2] === '0'
    console.log(itemAvailabilityString)
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

// 1 1 1 1 1 1 1 1 1 0 0 0 0 0 
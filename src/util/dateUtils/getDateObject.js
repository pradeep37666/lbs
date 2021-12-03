const getDateObject = (dateIndex) => {
    // dateIndex -= 1
    const monthSlots = [62, 56, 62, 60, 62, 60, 62, 62, 60, 62, 60, 62];
    let monthCounter = 0
    while(dateIndex > monthSlots[monthCounter]){
        dateIndex -= monthSlots[monthCounter]
        monthCounter++
    }
    const date = new Date()
    date.setHours(12, 0, 0, 0)
    date.setMonth(monthCounter)


    let day = ( dateIndex ) / 2

    if(dateIndex % 2 === 0) day++
    date.setDate(Math.round(day))

    if(dateIndex % 2 === 0){
        return { dateObj: date, morning: true, timeslot: 'morning' }
    } else {
        return { dateObj: date, afternoon: true, timeslot: 'afternoon'}
        
    }
}

export default getDateObject
const getDateObject = (dateIndex) => {
    dateIndex -= 1
    const monthSlots = [62, 56, 62, 60, 62, 60, 62, 62, 60, 62, 60, 62];
    let i = 0
    while(dateIndex > monthSlots[i]){
        dateIndex -= monthSlots[i]
        i++
    }
    const date = new Date()
    date.setMonth(i)
    const day = ( dateIndex ) / 2
    // console.log('day', day)
    date.setDate(day)

    if(day % 1 === 0){
        return { dateObj: date, morning: true, timeslot: 'morning' }
    } else {
        return { dateObj: date, afternoon: true, timeslot: 'afternoon'}
    }
}

export default getDateObject
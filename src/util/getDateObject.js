const getDateObject = (dateIndex) => {

    const monthSlots = [62, 56, 62, 60, 62, 60, 62, 62, 60, 62, 60, 62];
    let i = 0
    while(dateIndex > monthSlots[i]){
        dateIndex -= monthSlots[i]
        i++
    }
    const date = new Date()
    date.setMonth(i + 1)
    const day = ( dateIndex ) / 2
    // console.log('day', day)
    date.setDate(day)

    if(day % 1 === 0){
        return { date, morning: true }
    } else {
        return { date, afternoon: true}
    }
}

export default getDateObject
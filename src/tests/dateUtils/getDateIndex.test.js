import getDateIndex from "../../util/dateUtils/getDateIndex";

test('Gets the first of January morning as 0', () => {
    const date = { 
        dateObj: new Date(2021, 0, 1), 
        timeslot: 'morning' 
    }
    const index = getDateIndex(date)
    expect(index).toBe(0)
})

test('Gets the first of January afternoon as 1', () => {
    const date = {
        dateObj: new Date(2021, 0, 1),
        timeslot: 'afternoon'
    }
    const index = getDateIndex(date)
    expect(index).toBe(1)
})


test('Gets the second of January morning as 2', () => {
    const date = {
        dateObj: new Date(2021, 0, 2),
        timeslot: 'morning'
    }
    const index = getDateIndex(date)
    expect(index).toBe(2)
})

test('Gets the first of February morning as 62', () => {
    const date = {
        dateObj: new Date(2021, 1, 1),
        timeslot: 'morning'
    }
    const index = getDateIndex(date)
    expect(index).toBe(62)
})

test('Gets the 31st of December morning as ', () => {
   const date = {
       dateObj: new Date(2021, 11, 31),
       timeslot: 'morning'
   } 
   const index = getDateIndex(date)
   expect(index).toBe(728)
})

test('Gets the 31st of December afternoon as 729', () => {
    const date = {
        dateObj: new Date(2021, 11, 31),
        timeslot: 'afternoon'
    }
    const index = getDateIndex(date)
    expect(index).toBe(729)
})
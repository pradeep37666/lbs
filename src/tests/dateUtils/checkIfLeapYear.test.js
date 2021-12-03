import checkIfLeapYear from "../../util/dateUtils/checkIfLeapYear"


test('2024 should be a leap year', () => {
    const isLeapYear = checkIfLeapYear(2024)
    expect(isLeapYear).toEqual(true)
})

test('2021 should not be a leap year', () => {
    const isLeapYear = checkIfLeapYear(2021)
    expect(isLeapYear).toEqual(false)
})

test('2000 should be a leap year', () => {
    const isLeapYear = checkIfLeapYear(2000)
    expect(isLeapYear).toEqual(true)
} )
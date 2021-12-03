import getDateSuffix from "../../util/dateUtils/getDateSuffix";

test("should return '1st' when given the first day", () => {
    const suffix = getDateSuffix(new Date(2021, 0, 1))
    expect(suffix).toBe('1st')
})

test("Should return '2nd' when given the second day", () => {
    const suffix = getDateSuffix(new Date(2021, 0, 2))
    expect(suffix).toBe('2nd')
})

test("Should return '3rd' when given the third day", () => {
    const suffix = getDateSuffix(new Date(2021, 0, 3))
    expect(suffix).toBe('3rd')
})

test("Should return '11th' when given the eleventh day", () => {
    const suffix = getDateSuffix(new Date(2021, 0, 11))
    expect(suffix).toBe('11th')
})

test("Should return '21st' when given the twenty first day", () => {
    const suffix = getDateSuffix(new Date(2021, 0, 21))
    expect(suffix).toBe('21st')
})

test("Should return 'th' for everything else", () => {
    const date1 = getDateSuffix(new Date(2021, 0, 18))
    const date2 = getDateSuffix(new Date(2021, 0, 27))
    const date3 = getDateSuffix(new Date(2021, 0, 15))
    expect([date1, date2, date3]).toEqual(['18th', '27th', '15th'])
})
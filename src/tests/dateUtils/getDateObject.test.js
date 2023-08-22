import { text } from 'dom-helpers'
import getDateObject from '../../util/dateUtils/getDateObject'

test('Returns the first of Jan morning when given 0', () => {
  const dateObj = getDateObject(0)

  expect(dateObj).toMatchObject({
    dateObj: new Date('2021-01-01T02:00:00.000Z'),
    morning: true,
    timeslot: 'morning',
  })
})

test('Returns the first of Jan afternoon when given 1', () => {
  const dateObj = getDateObject(1)

  expect(dateObj).toMatchObject({
    dateObj: new Date('2021-01-01T02:00:00.000Z'),
    afternoon: true,
    timeslot: 'afternoon',
  })
})

test('Returns the second of Jan morning when given 2', () => {
  const dateObj = getDateObject(2)

  expect(dateObj).toMatchObject({
    dateObj: new Date('2021-01-02T02:00:00.000Z'),
    morning: true,
    timeslot: 'morning',
  })
})

test('Returns the first of Feb morning when given 62', () => {
  const dateObj = getDateObject(62)

  expect(dateObj).toMatchObject({
    dateObj: new Date('2021-02-01T02:00:00.000Z'),
    morning: true,
    timeslot: 'morning',
  })
})

test('Returns the 31st of December afternoon when given 729', () => {
  const dateObj = getDateObject(729)

  expect(dateObj).toMatchObject({
    dateObj: new Date('2021-12-31T02:00:00.000Z'),
    afternoon: true,
    timeslot: 'afternoon',
  })
})

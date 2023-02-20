import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { BookingContext } from '../../pages/application/Application'
import { Item } from '../../types/Item'
import { BlockedAvailabilityCreate } from '../../types/User'
import checkIfSlotBooked from '../../util/checkIfSlotBooked'
import compareDates from '../../util/compareDates'
import isEqualDate from '../../util/dateUtils/isEqualDate'
import { shortToLongDay } from '../../util/shortToLongDay'
import './CalendarItem.css'

type Props = {
  day: Date
  onClick: (day: Date) => void
  isEditable: boolean
  item: Item
  index: number
  isViewing: boolean
  itemBlockedAvailabilities?: BlockedAvailabilityCreate[]
  bookingDates?: { startDate: string; endDate: string }[]
}

const CalendarDay = ({
  day,
  index,
  onClick,
  isEditable,
  item,
  isViewing,
  itemBlockedAvailabilities,
  bookingDates,
}: Props) => {
  const { state, dispatch } = useContext(BookingContext)

  const {
    selectedDay,
    currentDate,
    currentMonth,
    startDate,
    endDate,
    blockedAvailabilities,
    bookedDates,
  } = state

  const [isSelected, setIsSelected] = useState(false)
  const [isMorningBooked, setIsMorningBooked] = useState(false)
  const [isAfternoonBooked, setIsAfternoonBooked] = useState(false)
  const weekDay = shortToLongDay(moment(day).format('ddd').toUpperCase())

  const inThePast = day <= new Date()

  useEffect(() => {
    if (!selectedDay) return
    setIsSelected(isEqualDate(day, selectedDay))
  }, [selectedDay])
  useEffect(() => {
    const { isMorningBooked, isAfternoonBooked } = checkIfSlotBooked(
      bookingDates ? bookingDates : bookedDates,
      day
    )
    setIsMorningBooked(isMorningBooked)
    setIsAfternoonBooked(isAfternoonBooked)
  }, [])

  const isMorningBlocked = itemBlockedAvailabilities
    ? itemBlockedAvailabilities.some(availability => {
        return (
          weekDay === availability.weekDay &&
          availability.startTime === '08:00:00' &&
          availability.endTime === '12:00:00'
        )
      })
    : blockedAvailabilities.some(availability => {
        return (
          weekDay === availability.weekDay &&
          availability.startTime === '08:00:00' &&
          availability.endTime === '12:00:00'
        )
      })

  const isAfternoonBlocked = itemBlockedAvailabilities
    ? itemBlockedAvailabilities.some(availability => {
        return (
          weekDay === availability.weekDay &&
          availability.startTime === '13:00:00' &&
          availability.endTime === '17:00:00'
        )
      })
    : blockedAvailabilities.some(availability => {
        return (
          weekDay === availability.weekDay &&
          availability.startTime === '13:00:00' &&
          availability.endTime === '17:00:00'
        )
      })

  const getBookingPeriodStyles = () => {
    if (!startDate || !endDate) return
    // Check if calendar day is before end date and after start day
    if (
      moment(day).isSameOrBefore(moment(endDate, 'day')) &&
      moment(day).isSameOrAfter(moment(startDate, 'day'))
    ) {
      if (isEqualDate(endDate, day)) {
        return 'ItemApplicationPeriodEnd'
      } else if (startDate.setHours(0, 0, 0, 0) === day.setHours(0, 0, 0, 0)) {
        return 'ItemApplicationPeriodStart'
      } else {
        return 'ItemApplicationPeriod'
      }
    }
    return ''
  }

  const handleUnavailableLogic = () => {
    if (
      day.getDate() <= new Date().getDate() &&
      day.getMonth() <= new Date().getMonth() &&
      day.getFullYear() <= new Date().getFullYear()
    )
      return true
    return false
  }

  const handleClick = () => {
    if (!isEditable) return
    // Prohibits clicks on past days
    if (moment(day) <= moment(new Date())) return
    onClick(day)
  }

  const getBookingBaseStyles = () => {
    let baseStyle = 'ItemCircle'
    if (endDate && isEqualDate(endDate, day)) {
      baseStyle = baseStyle + ' ' + 'ItemCircleConfirmed'
    }
    if (selectedDay && isEqualDate(selectedDay, day)) {
      baseStyle = baseStyle + ' ' + 'ItemCircleSelected'
    }
    if (startDate && isEqualDate(startDate, day)) {
      baseStyle = baseStyle + ' ' + 'ItemCircleConfirmed'
    }
    if (currentDate === day.getDate() && currentMonth === day.getMonth()) {
      baseStyle = baseStyle + ' ' + 'ItemCurrentDay'
    }
    return baseStyle
  }

  return (
    <div
      className={`CalendarItem ${getBookingPeriodStyles()}`}
      style={{ gridColumnStart: index === 0 ? day.getDay() + 1 : 0 }}
    >
      <div
        onClick={handleClick}
        className={`${getBookingBaseStyles()} ${
          handleUnavailableLogic() ? 'ItemUnavailable' : 'Pointer'
        }`}
      >
        <span className='CalendarItemText' style={{ height: 'auto' }}>
          {day.getDate()}
        </span>
        <div className='ItemAvailabilityContainer'>
          <div
            className={`${
              inThePast || isMorningBooked || isMorningBlocked
                ? 'ItemBooked'
                : ''
            } ${
              isMorningBooked || isMorningBlocked
                ? 'ItemAMUnavailable'
                : 'ItemAMAvailable'
            }`}
          />
          <div
            className={`${
              inThePast || isAfternoonBooked || isAfternoonBlocked
                ? 'ItemBooked'
                : ''
            } ${
              moment(day) <= moment(new Date()) ||
              isAfternoonBooked ||
              isAfternoonBlocked
                ? 'ItemPMUnavailable'
                : 'ItemPMAvailable'
            }`}
          />
        </div>
      </div>
    </div>
  )
}

export default CalendarDay

import React, { useEffect, useRef, useState } from 'react'
import './TradeCalendar.css'
import TradeCalendarItemContainer from './tradeCalendarItemContainer/TradeCalendarItemContainer'
import { isMobile } from 'react-device-detect'
import { dayArray, monthArray } from '../../assets/Data/LBSArray'
import { Booking } from '../../types/Booking'

type Props = {
  borrowerBookingItems: Booking[]
  lenderBookingItems: Booking[]
  setSelectedBooking: React.Dispatch<React.SetStateAction<null | Booking>>
}

export default function TradeCalendar({
  borrowerBookingItems,
  lenderBookingItems,
  setSelectedBooking,
}: Props) {
  const tradeCalendarRef = useRef<HTMLDivElement>(null)
  const [currentDate, setCurrentDate] = useState<number | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number | null>(null)
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  const [totalDates, setTotalDates] = useState<number>(0)

  useEffect(() => {
    const today = new Date()
    const currentDate = today.getDate()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    setCurrentDate(currentDate)
    setCurrentMonth(currentMonth)
    setCurrentYear(currentYear)
  }, [])

  useEffect(() => {
    if (!tradeCalendarRef.current || !currentDate) return
    if (currentDate < 7) return
    tradeCalendarRef.current.scrollTo(
      (currentDate * 2 - 8) * (isMobile ? 25 : 50),
      0
    )
  }, [currentYear])

  function getDaysInMonth(month: number, year: number) {
    var date = new Date(year, month, 1)
    var days = []
    while (date.getMonth() === month) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  const renderBookingItemContainers = (bookingItems: Booking[]) => {
    return bookingItems.map((bookingItem: Booking, index: number) => {
      return (
        <TradeCalendarItemContainer
          header={index === 0}
          setSelectedBooking={setSelectedBooking}
          bookingItem={bookingItem}
          key={index}
          totalDates={totalDates}
        />
      )
    })
  }

  const getAllDays = () => {
    if (!currentYear || !currentMonth) return
    const dates = []
    const date = new Date(currentYear, currentMonth, 1)
    for (let i = 0; i < 3; i++) {
      const month = date.getMonth()
      const monthDays = getDaysInMonth(month, currentYear)
      dates.push(monthDays)
      date.setMonth(currentMonth + (i + 1))
    }
    return dates.flat()
  }

  const renderDates = () => {
    if (currentMonth === undefined || !currentYear || !currentDate) return
    const dates = getAllDays()
    if (!dates || dates.length === 0) return
    if (!totalDates) setTotalDates(dates.length)
    const arr = []
    for (let i = 0; i < totalDates; i++) {
      const date = dates[i]
      if (!date) continue
      const isCurrentDay =
        date.getMonth() === currentMonth && date.getDate() === currentDate
      arr.push(
        <div
          className='TradeCalendarDayItemContainer'
          style={{
            gridColumnStart: i * 2 + 1,
            gridColumnEnd: i * 2 + 3,
            position: 'relative',
          }}
          key={i}
        >
          {date.getDate() === 1 && (
            <span className='TradeCalendarMonthLabel'>
              {monthArray[date.getMonth()]}
            </span>
          )}
          <div className='TradeCalendarDayItem'>
            <span className='TradeCalendarDayItemName'>
              {dayArray[date.getDay()]}
            </span>
            <div
              className={
                isCurrentDay
                  ? 'TradeCalendarCurrentDay'
                  : 'TradeCalendarDayItemDate'
              }
            >
              <span>{date.getDate()}</span>
            </div>
          </div>
        </div>
      )
    }
    return arr
  }

  return (
    <>
      {currentYear && (
        <div className='TradeCalendarContainer' ref={tradeCalendarRef}>
          <div style={{ width: `${totalDates * 2 * (isMobile ? 25 : 50)}px` }}>
            <div
              className='TradeCalendarDaysContainer'
              style={{
                gridTemplateColumns: `repeat(${totalDates * 2}, ${
                  isMobile ? 25 : 50
                }px)`,
                paddingTop: 35,
              }}
            >
              {renderDates()}
            </div>
            {lenderBookingItems.length > 0 &&
              renderBookingItemContainers(lenderBookingItems)}
            {borrowerBookingItems.length > 0 &&
              renderBookingItemContainers(borrowerBookingItems)}
          </div>
        </div>
      )}
    </>
  )
}

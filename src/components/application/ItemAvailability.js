import React, { useContext } from 'react'
import './ItemAvailability.css'
import { CircularProgress } from '@material-ui/core'
import MonthCalendar from '../calendar/MonthCalendar'
import { BookingContext } from '../../pages/application/Application'

export default function ItemAvailability() {
  const { state } = useContext(BookingContext)
  const { item, bookedDates } = state
  console.log(bookedDates)
  const renderMonths = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const months = Array(3).fill(null)
    return months.map((_, i) => {
      let calendarMonth = currentMonth + i
      let calendarYear = currentYear
      if (calendarMonth > 11) {
        calendarMonth -= 12
        calendarYear += 1
      }
      return (
        <MonthCalendar
          key={i}
          isEditable
          isViewing
          item={item}
          bookingDates={[state.bookedDates]}
          month={calendarMonth}
          year={calendarYear}
        />
      )
    })
  }
  return (
    <div>
      <div className='AvailabilityContainer'>
        {item ? renderMonths() : <CircularProgress size={30} color='primary' />}
      </div>
    </div>
  )
}

import React from 'react'
import { Item } from '../../types/Item'
import { DATE_VALUES } from '../../assets/Data/LBSEnum'
import CalendarRow from './CalendarRow'

type MonthCalendarProps = {
  month: number
  year: number
  isEditable: boolean
  item: Item
  isViewing: boolean
  bookingDates?: { startDate: string; endDate: string }[]
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({
  month,
  year,
  isEditable,
  item,
  isViewing,
  bookingDates,
}) => {
  const getDaysInMonth = (): Date[] => {
    let date = new Date(year, month, 1)
    let days = []
    while (date.getMonth() === month) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  const renderRows = () => {
    const days = getDaysInMonth()
    const rows = []
    let rowDays: Date[] = []
    for (let i = 0; i < days.length; i++) {
      rowDays.push(days[i])
      if (days[i].getDay() === 6) {
        rows.push(
          <CalendarRow
            isEditable={isEditable}
            key={i}
            days={rowDays}
            isViewing={isViewing}
            itemData={item}
            bookingDates={bookingDates}
          />
        )
        rowDays = []
        continue
      }
      if (i + 1 === days.length) {
        rows.push(
          <CalendarRow
            isEditable={isEditable}
            key={i}
            days={rowDays}
            isViewing={isViewing}
            itemData={item}
            bookingDates={bookingDates}
          />
        )
        break
      }
    }
    return rows
  }

  const renderDayLabels = () => {
    const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    return dayLabels.map((dayLabel, index) => {
      return (
        <div className='CalendarItemDayName' key={index}>
          {dayLabel}
        </div>
      )
    })
  }

  return (
    <div className='CalendarContainer'>
      <div className='CalendarInfoContainer'>
        <span className='CalendarMonth'>{DATE_VALUES.MONTHS[month]}</span>
        <span className='CalendarYear'>{` ${year}`}</span>
      </div>
      <div>
        <div className='CalendarRow'>{renderDayLabels()}</div>
        {renderRows()}
      </div>
    </div>
  )
}

export default MonthCalendar

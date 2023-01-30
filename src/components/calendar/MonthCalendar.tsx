import React from 'react'
import { Item } from '../../types/Item'

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
  isViewing
}) => {
  return (
    <div>MonthCalendar</div>
  )
}

export default MonthCalendar
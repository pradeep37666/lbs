import React from 'react'
import './AvailabilityModal.css'
import CloseIcon from '@material-ui/icons/Close'
import MonthCalendar from '../../calendar/MonthCalendar'
import { Item } from '../../../types/Item'
import getMappedBookingTimes from '../../../util/tradeUtils/getMappedBookingTimes'
import { BookingDetail } from '../../../types/Booking'

type Props = {
  toggleVisibility: () => void
  item: Item
  bookedDates: BookingDetail[]
}

export const ApplicationContext = React.createContext(null)

export default function AvailabilityModal({
  toggleVisibility,
  item,
  bookedDates,
}: Props) {
  const renderMonthCalendars = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const bookedDatesToStartAndEnd = getMappedBookingTimes(bookedDates)

    return Array(1)
      .fill(null)
      .map((_, index) => {
        let calendarMonth = currentMonth + index
        let calendarYear = currentYear
        if (calendarMonth > 11) {
          calendarMonth -= 12
          calendarYear += 1
        }
        return (
          <MonthCalendar
            key={index}
            year={calendarYear}
            month={calendarMonth}
            isEditable={false}
            item={item}
            isViewing={true}
            bookingDates={bookedDatesToStartAndEnd}
          />
        )
      })
  }

  return (
    <div className='ModalWrapperMain'>
      <div className='AvailabilityModalMain' onClick={e => e.stopPropagation()}>
        <div className='AvailabilityTitleContainer'>
          <p className='AvailabilityTitle'>Availability</p>
          <button className='AvailabilityCloseBtn'>
            <CloseIcon onClick={toggleVisibility} />
          </button>
        </div>
        {renderMonthCalendars()}
      </div>
    </div>
  )
}

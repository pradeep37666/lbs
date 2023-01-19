import React from 'react'
import './AvailabilityModal.css'
import CloseIcon from '@material-ui/icons/Close'
import DisabledAvailabilityCalendar from '../../DisabledAvailabilityCalendar/DisabledAvailabilityCalendar'
import MonthCalendar from '../../calendar/MonthCalendar'

export const ApplicationContext = React.createContext()

export default function AvailabilityModal({ item, isVisible, setIsVisible }) {
  const renderMonthCalendars = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
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
            <CloseIcon onClick={() => setIsVisible(false)} />
          </button>
        </div>
        {renderMonthCalendars()}
      </div>
    </div>
  )
}

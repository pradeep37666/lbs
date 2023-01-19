import React from 'react'
import './AvailabilityModal.css'
import CloseIcon from '@material-ui/icons/Close'
import DisabledAvailabilityCalendar from '../../DisabledAvailabilityCalendar/DisabledAvailabilityCalendar'

export const ApplicationContext = React.createContext()

export default function AvailabilityModal({ item, isVisible, setIsVisible }) {
  const renderMonthCalendars = () => {
    const today = new Date()
  }

  const today = new Date()
  const currentDate = today.getDate()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const thisYearAvailability = yearlyAvailabilities.find(
    availability => availability.year === currentYear
  )
  const yearlyAvailability = thisYearAvailability?.yearly_availability

  const state = {
    item,
    itemAvailability: availability,
    yearAvailability: yearlyAvailability,
    currentDate,
    currentYear,
    currentMonth,
  }

  const renderCalendars = () => {
    const calendarArray = new Array(4).fill(null)
    let year = currentYear
    return calendarArray.map((_, index) => {
      let month
      if (currentMonth + index > 11) {
        month = currentMonth + index - 12
      } else {
        month = currentMonth + index
      }
      if (currentMonth + index === 12) year += 1
      return (
        <DisabledAvailabilityCalendar month={month} year={year} key={index} />
      )
    })
  }

  return (
    <ApplicationContext.Provider value={{ state }}>
      <div className='ModalWrapperMain' onClick={onClick}>
        <div
          className='AvailabilityModalMain'
          onClick={e => e.stopPropagation()}
        >
          <div className='AvailabilityTitleContainer'>
            <p className='AvailabilityTitle'>Availability</p>
            <button className='AvailabilityCloseBtn' onClick={onClick}>
              <CloseIcon />
            </button>
          </div>
          {renderCalendars()}
        </div>
      </div>
    </ApplicationContext.Provider>
  )
}

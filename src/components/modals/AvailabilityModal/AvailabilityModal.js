import React, { useEffect } from 'react'
import './AvailabilityModal.css'
import DisabledAvailabilityCalendar from '../../DisabledAvailabilityCalendar/DisabledAvailabilityCalendar'

export const ApplicationContext = React.createContext()

export default function AvailabilityModal({ item, onClick, availability, yearlyAvailabilities }) {
    const today = new Date()
    const currentDate = today.getDate()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const thisYearAvailability = yearlyAvailabilities.find(availability => availability.year === currentYear)
    const yearlyAvailability = thisYearAvailability?.yearly_availability

    const state = {
        item,
        itemAvailability: availability,
        yearAvailability: yearlyAvailability,
        currentDate, 
        currentYear,
        currentMonth
    }

    const renderCalendars = () => {
        const calendarArray = new Array(4).fill(null)
        let year = currentYear
        return calendarArray.map(( item, index ) => {
            let month
            if(currentMonth + index > 11){
                month = (currentMonth + index ) - 12
            } else{
                month = currentMonth + index
            }
            if(currentMonth + index === 12) year += 1
            return (
            <DisabledAvailabilityCalendar month={month} year={year}/>
            )
        })
    }

    return (
        <ApplicationContext.Provider value={{ state }}>
            <div className="ModalWrapperMain" onClick={onClick}>
                <div 
                    className="AvailabilityModalMain"  
                    onClick={(e) => e.stopPropagation()}
                >
                    { renderCalendars() }
                </div>
            </div>
        </ApplicationContext.Provider>
    )
}

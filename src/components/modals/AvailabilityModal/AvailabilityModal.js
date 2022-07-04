import React from 'react'
import './AvailabilityModal.css'
import DisabledAvailabilityCalendar from '../../DisabledAvailabilityCalendar/DisabledAvailabilityCalendar'

export const ApplicationContext = React.createContext()

export default function AvailabilityModal({ item, onClick, availability }) {
    const today = new Date()
    const currentDate = today.getDate()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    const state = {
        item,
        itemAvailability: availability,
        yearAvailability: item?.availabilities,
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
            <div className="Wrapper" onClick={onClick}>
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

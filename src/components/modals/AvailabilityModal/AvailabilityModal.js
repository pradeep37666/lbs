import React from 'react'
import './AvailabilityModal.css'
import DisabledAvailabilityCalendar from '../../DisabledAvailabilityCalendar/DisabledAvailabilityCalendar'
import checkIfLeapYear from '../../../util/dateUtils/checkIfLeapYear'

export const ApplicationContext = React.createContext()

export default function AvailabilityModal({ item, onClick, availability }) {
    const today = new Date()
    const currentDate = today.getDate()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const totalDays = checkIfLeapYear(currentYear) ? 730 : 732
    const yearlyAvailability = Array(totalDays).fill(1)

    const state = {
        item,
        itemAvailability: availability,
        // yearlyAvailability needs to be dinamic
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

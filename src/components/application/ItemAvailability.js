import React, { useContext } from 'react'
import './ItemAvailability.css'
import AvailabilityCalendar from '../availabilityCalendar/AvailabilityCalendar'
import { ApplicationContext } from '../../pages/application/Application'
import { CircularProgress } from '@material-ui/core'

export default function ItemAvailability() {
    const { state } = useContext(ApplicationContext)
    const { item, currentMonth, currentYear } = state

    const renderMonths = () => {
        const months = Array(3).fill(null)
        return months.map((_,i) => {
            let calendarMonth = currentMonth + i
            let calendarYear = currentYear
            if(calendarMonth > 11) {
                calendarMonth -= 12
                calendarYear += 1
            }
            return (
            <AvailabilityCalendar 
            key={i}
            month={calendarMonth} 
            year={calendarYear}
            />
        )})
    }
    return (
        <div>            
            <div className="AvailabilityContainer">
                {item 
                ? renderMonths() 
                : <CircularProgress size={30} color="#000" />
                }
            </div>
        </div>
    )
}

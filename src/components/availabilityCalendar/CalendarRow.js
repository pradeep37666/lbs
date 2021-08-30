import React, { useState, useContext } from 'react'
import CalendarItem from './CalendarItem'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import { ApplicationContext } from '../../pages/application/Application'

export default function CalendarRow({ days, isCurrentMonth }) {
    const [expanded, setExpanded] = useState(false)
    
    const expandRow = () => {
        setExpanded(!expanded)
    }
    
    const handleMorningClick = () => {
        
    }

    const handleAfternoonClick = () => {

    }
    return (
        <div className={`CalendarRow ${expanded && 'CalendarRowExpanded'}`}>
            { days.map((day, index) => {
                return (
                <CalendarItem 
                expandRow={expandRow}
                day={day} 
                index={index} 
                key={index}
                isCurrentMonth={isCurrentMonth}
                unavailable={isCurrentMonth}
                />)
            })}
            { expanded && 
            <div className="CalendarPadding">
                <TimeSlotPicker 
                
                />
            </div>}
        </div>
    )
}

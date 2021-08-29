import React, { useState, useContext } from 'react'
import CalendarItem from './CalendarItem'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import { ApplicationContext } from '../../pages/application/Application'

export default function CalendarRow({ days  }) {
    const [expanded, setExpanded] = useState(false)
    
    const expandRow = () => {

    }
    
    return (
        <div className={`CalendarRow ${expanded && 'CalendarRowExpanded'}`}>
            { days.map((day, index) => {
                return (
                <CalendarItem 
                expandRow={expandRow}
                day={day} 
                index={index} 

                />)
            })}
            { expanded && 
            <div className="CalendarPadding">
                <TimeSlotPicker />
            </div>}
        </div>
    )
}

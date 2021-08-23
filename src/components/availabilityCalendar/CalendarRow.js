import React, {useState} from 'react'
import CalendarItem from './CalendarItem'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'

export default function CalendarRow({ days  }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <div className={`CalendarRow ${expanded && 'CalendarRowExpanded'}`}>
            { days.map((day, index) => {
                return (
                <CalendarItem 
                onClick={() => setExpanded(!expanded)}
                day={day} 
                index={index} />)
            })}
            { expanded && 
            <div className="CalendarPadding">
                <TimeSlotPicker />
            </div>}
        </div>
    )
}

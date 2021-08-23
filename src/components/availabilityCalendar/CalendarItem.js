import React, { useState } from 'react'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'

export default function CalendarItem({day, index}) {
    const [popupVisible, setPopupVisible] = useState(false)

    return (
        <div 
        key={index} 
        className="CalendarItem"
        style={{ gridColumnStart: index === 0 ? day.getDay() + 1 : null}}
        onClick={() => setPopupVisible(!popupVisible)}
        >
            <p>{day.getDate()}</p>
            {popupVisible && <TimeSlotPicker />}
        </div>
    )
}

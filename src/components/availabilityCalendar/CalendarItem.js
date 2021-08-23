import React, { useState } from 'react'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'

export default function CalendarItem({day, index, onClick}) {


    return (
        <div 
        key={index} 
        className="CalendarItem"
        style={{ gridColumnStart: index === 0 ? day.getDay() + 1 : null}}
        onClick={onClick}
        >
            <p>{day.getDate()}</p>
        </div>
    )
}

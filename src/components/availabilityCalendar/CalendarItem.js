import React, { useState } from 'react'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import './CalendarItem.css'
export default function CalendarItem({day, index, onClick}) {


    return (
        <div 
        key={index} 
        className="CalendarItem"
        style={{ gridColumnStart: index === 0 ? day.getDay() + 1 : null}}
        >
            <div 
            onClick={onClick}
            className="ItemCircle"
            >
                <span style={{ height: 'auto'}}>{day.getDate()}</span>
                <div className="ItemAvailabilityContainer">
                    <div className="ItemAMAvailability"></div>
                    <div className="ItemPMAvailability"></div>
                </div>
            </div>
        </div>
    )
}

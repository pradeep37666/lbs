import React, { useState, useContext } from 'react'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import './CalendarItem.css'
import { ApplicationContext } from '../../pages/application/Application'

export default function CalendarItem({day, index, expandRow, selected}) {
    const {selectedStart, setSelectedStart, focused, setFocused} = useContext(ApplicationContext)


    const handleClick = () => {
        setFocused(day.getDate())
        expandRow()
    }

    return (
        <div 
        key={index} 
        className={'CalendarItem'}
        style={{ gridColumnStart: index === 0 ? day.getDay() + 1 : null}}
        >
            <div 
            onClick={handleClick}
            className={`ItemCircle ${selectedStart === day.getDate() && 'ItemCircleSelected'} 
            ${focused === day.getDate() && 'ItemCircleFocused'}`}
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

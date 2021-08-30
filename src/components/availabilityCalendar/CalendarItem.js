import React, { useState, useContext } from 'react'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import './CalendarItem.css'
import { ApplicationContext } from '../../pages/application/Application'

export default function CalendarItem({day, index, expandRow, isCurrentMonth, unavailable }) {
    const {selectedStart, setSelectedStart, currentDate } = useContext(ApplicationContext)

    const handleClick = () => {
        if(unavailable) return
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
            className={`
            ItemCircle 
            ${selectedStart === day.getDate() && 'ItemCircleSelected'} 
            ${currentDate === day.getDate() && isCurrentMonth && 'ItemCurrentDay'}
            ${unavailable ? 'ItemUnavailable' : 'Pointer'}`}
            >
                <span style={{ height: 'auto'}}>{day.getDate()}</span>
                <div className="ItemAvailabilityContainer">
                    <div className={`${ unavailable ? 'ItemAMUnavailable' : 'ItemAMAvailable'}`}/>
                    <div className={`${ unavailable ? 'ItemPMUnavailable' : 'ItemPMAvailable'}`} />
                </div>
            </div>
        </div>
    )
}

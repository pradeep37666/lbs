import React, { useState, useContext, useEffect } from 'react'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import './CalendarItem.css'
import { ApplicationContext } from '../../pages/application/Application'
import compareDates from '../../util/compareDates'

export default function CalendarItem({day, index, onClick, isCurrentMonth, unavailable }) {
    const {selected, currentDate, confirmedStart, confirmedEnd } = useContext(ApplicationContext)

    const handleClick = () => {
        if(unavailable) return
        onClick(day)
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
            ${confirmedStart && confirmedEnd && day < confirmedEnd.day && day > confirmedStart.day &&  'ItemApplicationPeriod'}
            ${selected && compareDates(selected, day) && 'ItemCircleSelected'}
            ${confirmedEnd && compareDates(confirmedEnd.day, day) && 'ItemCircleSelected'}
            ${confirmedStart && compareDates(confirmedStart.day, day) && 'ItemCircleSelected'} 
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

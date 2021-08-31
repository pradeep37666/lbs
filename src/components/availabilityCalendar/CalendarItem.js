import React, { useState, useContext, useEffect } from 'react'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import './CalendarItem.css'
import { ApplicationContext } from '../../pages/application/Application'
import compareDates from '../../util/compareDates'

export default function CalendarItem({day, index, onClick, isCurrentMonth, unavailable }) {
    const [isApplicationPeriod, setIsApplicationPeriod] = useState(false)
    const {selected, currentDate, confirmedStart, confirmedEnd } = useContext(ApplicationContext)

    useEffect(() => {
        // Clicking outside of the set start and end period
        if(confirmedStart && !confirmedEnd?.sameTimeSlot && selected > confirmedEnd.day) return
        // Colors the days in between the set start and end points
        if(confirmedStart && !confirmedEnd?.sameTimeSlot && day > confirmedStart.day && day < confirmedEnd.day){
            setIsApplicationPeriod(true)
            return
        }
        // Start is set with no end point
        if(confirmedStart && selected && day < selected && day > confirmedStart.day){
            setIsApplicationPeriod(true)
            return
        }
        setIsApplicationPeriod(false)
    },[selected,confirmedEnd])

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
            ${isApplicationPeriod ? 'ItemApplicationPeriod' : null}
            ${confirmedEnd && compareDates(confirmedEnd.day, day) && 'ItemCircleConfirmed'}
            ${selected && compareDates(selected, day) && 'ItemCircleSelected'}
            
            ${confirmedStart && compareDates(confirmedStart.day, day) && 'ItemCircleConfirmed'} 
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

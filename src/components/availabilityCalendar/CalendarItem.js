import React, { useState, useContext, useEffect } from 'react'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import './CalendarItem.css'
import { ApplicationContext } from '../../pages/application/Application'
import compareDates from '../../util/compareDates'
import getAvailability from '../../util/getAvailability'

export default function CalendarItem({day, index, onClick, isCurrentMonth }) {
    const [isApplicationPeriod, setIsApplicationPeriod] = useState(false)
    const [booked, setBooked] = useState(false)
    const [availability, setAvailability] = useState()
    
    const { state } = useContext(ApplicationContext)
    const {selected, currentDate, confirmedStart, confirmedEnd, yearAvailability, itemAvailability } = state

    useEffect(() => {
        if(!yearAvailability) return
        setAvailability(getAvailability(day, itemAvailability, yearAvailability))
        if(day.getDate() % 5 === 0) setBooked(true)
        if(day.getDate() < currentDate && isCurrentMonth) {
            setBooked(true)
        }
    },[yearAvailability])
        
    
    

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
    },[selected,confirmedEnd, confirmedStart])

    const handleClick = () => {
        if(booked || !availability.am && !availability.pm) return
        onClick({day, availability})
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
            ${availability && !availability.am && !availability.pm ? 'ItemUnavailable' : 'Pointer'}`}
            >
                <span style={{ height: 'auto'}}>{day.getDate()}</span>
                <div className="ItemAvailabilityContainer">
                    <div className={`${booked ? 'ItemBooked' : null}
                    ${ availability && !availability.am ? 'ItemAMUnavailable' : 'ItemAMAvailable'}`}/>
                    <div className={`${booked ? 'ItemBooked' : null}
                    ${ availability && !availability.pm ? 'ItemPMUnavailable' : 'ItemPMAvailable'}`} />
                </div>
            </div>
        </div>
    )
}

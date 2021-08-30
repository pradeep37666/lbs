import React, { useState, useContext, useEffect } from 'react'
import CalendarItem from './CalendarItem'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import { ApplicationContext } from '../../pages/application/Application'
import compareDates from '../../util/compareDates'

export default function CalendarRow({ days, isCurrentMonth }) {
    const { selectedStart, setSelectedStart, setConfirmedStart, confirmedStart } = useContext(ApplicationContext)
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        if(!selectedStart){
            setExpanded(false)
            return
        }
        if(days.find(day => compareDates(day, selectedStart))){
            setExpanded(true) 
        } else {
            setExpanded(false)
        }
    },[selectedStart])

    
    const handleItemClick = (day) => {    
        if(selectedStart && compareDates(selectedStart, day)){
            setSelectedStart(null) 
            // setExpanded(!expanded)
            return
        } 
        setSelectedStart(day)
    }
    
    const handleMorningClick = () => {
        // Reset if a start date has already been confirmed
        if(confirmedStart){
            console.log('hegsoiesh')
            setConfirmedStart(null)
            return
        }
        setConfirmedStart({ day: selectedStart, am: true })
    }
    const handleAfternoonClick = () => {
        if(confirmedStart){
            setConfirmedStart(null)
            return
        }
        setConfirmedStart({ day: selectedStart, pm: true})
    }
    
    return (
        <div className={`CalendarRow ${expanded && 'CalendarRowExpanded'}`}>
            { days.map((day, index) => {
                return (
                <CalendarItem 
                onClick={handleItemClick}
                day={day} 
                index={index} 
                key={index}
                isCurrentMonth={isCurrentMonth}
                unavailable={isCurrentMonth}
                />)
            })}
            { expanded && 
            <div className="CalendarPadding">
                <TimeSlotPicker 
                morning={confirmedStart && compareDates(selectedStart, confirmedStart.day) && confirmedStart?.am }
                afternoon={confirmedStart && compareDates(selectedStart, confirmedStart.day) && confirmedStart?.pm }
                morningClick={handleMorningClick}
                afternoonClick={handleAfternoonClick}
                />
            </div>}
        </div>
    )
}

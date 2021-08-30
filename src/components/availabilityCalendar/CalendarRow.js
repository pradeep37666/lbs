import React, { useState, useContext, useEffect } from 'react'
import CalendarItem from './CalendarItem'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import { ApplicationContext } from '../../pages/application/Application'
import compareDates from '../../util/compareDates'

export default function CalendarRow({ days, isCurrentMonth }) {
    const { selected, setSelected, setConfirmedStart, confirmedStart, setConfirmedEnd, confirmedEnd } = useContext(ApplicationContext)
    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        if(!selected){
            setExpanded(false)
            return
        }
        if(days.find(day => compareDates(day, selected))){
            setExpanded(true) 
        } else {
            setExpanded(false)
        }
    },[selected])

    
    const handleItemClick = (day) => {    
        if(selected && compareDates(selected, day)){
            console.log('a')
            setSelected(null) 
            // setExpanded(!expanded)
            return
        } 
        setSelected(day)
    }
    
    const handleMorningClick = () => {
        setExpanded(false)
        // morning has already been selected
        if(confirmedStart && compareDates(selected, confirmedStart.day)){
            // Changing from afternoon to morning
            if(confirmedStart?.pm){
                setConfirmedStart({ day: selected, am: true})
                return
            }
            setSelected(null)
            setConfirmedStart(null)
            setConfirmedEnd(null)
            return
        }
        if(confirmedStart){
            setConfirmedEnd({ day: selected, am: true })
            return
        }
        setConfirmedStart({ day: selected, am: true })
    }
    
    const handleAfternoonClick = () => {
        setExpanded(false)
        // Afternoon has already been selected
        if(confirmedStart && compareDates(selected, confirmedStart.day)){
            // Changing from morning to afternoon
            if(confirmedStart?.am){
                console.log('aighsd')
                setConfirmedStart({ day: selected, pm: true})
                return
            }
            // Clicking on the same time period, remove
            setSelected(null)
            setConfirmedStart(null)
            setConfirmedEnd(null)
            return
        }
        if(confirmedStart){
            setConfirmedEnd({ day: selected, pm: true })
            return
        }
        setConfirmedStart({ day: selected, pm: true})
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
                morning={confirmedStart && selected && compareDates(selected, confirmedStart.day) && confirmedStart?.am || confirmedEnd && selected && compareDates(selected, confirmedEnd.day) && confirmedEnd?.am}
                afternoon={confirmedStart && selected && compareDates(selected, confirmedStart.day) && confirmedStart?.pm || confirmedEnd && selected && compareDates(selected, confirmedEnd.day) && confirmedEnd?.pm }
                morningClick={handleMorningClick}
                afternoonClick={handleAfternoonClick}
                />
            </div>}
        </div>
    )
}

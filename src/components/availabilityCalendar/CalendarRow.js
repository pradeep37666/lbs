import React, { useState, useContext, useEffect } from 'react'
import CalendarItem from './CalendarItem'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import { ApplicationContext } from '../../pages/application/Application'
import compareDates from '../../util/compareDates'

export default function CalendarRow({ days, isCurrentMonth }) {
    const { selected, setSelected, setConfirmedStart, confirmedStart, setConfirmedEnd, confirmedEnd } = useContext(ApplicationContext)
    const [expanded, setExpanded] = useState(false)
    const [morningActive, setMorningActive] = useState(false)
    const [afternoonActive, setAfternoonActive] = useState(false)

    useEffect(() => {
        handleMorningLogic()
        handleAfternoonLogic()
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
        // morning has already been selected
        if(confirmedStart && compareDates(selected, confirmedStart.day)){
            // Changing from afternoon to morning
            if(confirmedStart?.pm && confirmedEnd){
                setConfirmedStart({ day: selected, am: true})
            }
            if(confirmedStart?.pm){
                setConfirmedEnd({ day: selected, am: true})
                return
            }
            setSelected(null)
            setConfirmedStart(null)
            setConfirmedEnd(null)
            return
        }
        // Start has already been selected, set end point
        if(confirmedStart){
            setConfirmedEnd({ day: selected, am: true })
            return
        }
        // No start selected, set start point
        setSelected(null)
        setConfirmedStart({ day: selected, am: true })
        setConfirmedEnd({ day: selected, am: true, sameTimeSlot: true })
    }
    
    const handleAfternoonClick = () => {
        // Afternoon has already been selected
        if(confirmedStart && compareDates(selected, confirmedStart.day)){
            // Changing from morning to afternoon
            if(confirmedStart?.am && confirmedEnd){
                setConfirmedStart({ day: selected, pm: true})
            }
            if(confirmedStart?.am){
                console.log('aighsd')
                setConfirmedEnd({ day: selected, pm: true})
                return
            }
            // Clicking on the same time period, clear everything
            setSelected(null)
            setConfirmedStart(null)
            setConfirmedEnd(null)
            return
        }
        if(confirmedStart){
            setConfirmedEnd({ day: selected, pm: true })
            return
        }
        setConfirmedStart({ day: selected, pm: true, })
        setConfirmedEnd({ day: selected, pm: true, sameTimeSlot: true})
    }
    
    const handleMorningLogic = () => {
        if(confirmedStart && selected && compareDates(selected, confirmedStart.day) && confirmedStart?.am
        || confirmedEnd && selected && compareDates(selected, confirmedEnd.day) && confirmedEnd?.am){
            setMorningActive(true)
            return
        }
        setMorningActive(false)
    }

    const handleAfternoonLogic = () => {
        if(confirmedStart && selected && compareDates(selected, confirmedStart.day) && confirmedStart?.pm 
        || confirmedEnd && selected && compareDates(selected, confirmedEnd.day) && confirmedEnd?.pm){
            setAfternoonActive(true)
            return
        }
        setAfternoonActive(false)
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
                morning={morningActive}
                afternoon={afternoonActive}
                morningClick={handleMorningClick}
                afternoonClick={handleAfternoonClick}
                />
            </div>}
        </div>
    )
}

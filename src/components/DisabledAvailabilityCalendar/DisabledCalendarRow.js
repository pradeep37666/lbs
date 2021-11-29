import React, { useState, useContext, useEffect } from 'react'
import DisabledCalendarItem from './DisabledCalendarItem'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import { ApplicationContext } from '../modals/AvailabilityModal/AvailabilityModal'
import compareDates from '../../util/compareDates'
import ValidationPopup from '../ValidationPopup/ValidationPopup'
import '../../components/FormComponents/BasicDetails'
import getDateIndex from '../../util/getDateIndex'

export default function DisabledCalendarRow({ days, isCurrentMonth }) {
    const { state, dispatch } = useContext(ApplicationContext)
    const { selected, confirmedStart, confirmedEnd, yearAvailability } = state
    
    const [expanded, setExpanded] = useState(false)
    const [errorHidden, setErrorHidden] = useState(true)
    const [morningActive, setMorningActive] = useState(false)
    const [morningUnavailable, setMorningUnavailable] = useState(false)
    const [afternoonUnavailable, setAfternoonUnavailable] = useState(false)
    const [afternoonActive, setAfternoonActive] = useState(false)

    useEffect(() => {
        setErrorHidden(true)
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
    },[selected, confirmedStart, confirmedEnd])

    const handleItemClick = ({ day, availability, booked }) => { 
        // Clicking on a day that is already selected
        if(selected && compareDates(selected, day)){
            dispatch({ type: 'setSelected', data: null})
            return
        } 
        setMorningUnavailable(!availability.am || booked.am)
        setAfternoonUnavailable(!availability.pm || booked.pm)
        dispatch({ type: 'setSelected', data: day})
    }
    
    const handleMorningClick = () => {
        if(confirmedStart && !compareDates(selected, confirmedStart.day)){
            const valid = validateTimeSlots({ am: true})
            if(!valid) return 
        }
        // morning has already been selected
        if(confirmedStart && compareDates(selected, confirmedStart.day)){
            // Changing from afternoon to morning
            if(confirmedStart?.pm && confirmedEnd){
                dispatch({type: 'setConfirmedStart', data: { day: selected, am: true}})
            }
            if(confirmedStart?.pm){
                dispatch({ type: 'setConfirmedEnd', data: { day: selected, am: true}})
                return
            }
            // Clicking on the same time period, clear everything
            dispatch({type: 'setSelected', data: null})
            dispatch({type: 'setConfirmedStart', data: null})
            dispatch({type: 'setConfirmedEnd', data: null})
            return
        }
        if(confirmedStart && selected < confirmedStart.day && confirmedEnd.sameTimeSlot){
            dispatch({ type: 'setConfirmedStart', data: { day: selected, am: true }})
            dispatch({ type: 'setConfirmedEnd', data: {day: selected, am: true, sameTimeSlot: true} })
            return
        }
        if(confirmedStart && selected < confirmedStart.day ){
            dispatch({type: 'setConfirmedStart', data: { day: selected, am: true}})
            return 
        }
        // Start has already been selected, set end point
        if(confirmedStart){
            dispatch({type: 'setConfirmedEnd', data: { day: selected, am: true}})
            return
        }
        // No start selected, set start point
        dispatch({type: 'setConfirmedStart', data: { day: selected, am: true}})
        dispatch({type: 'setConfirmedEnd', data: { day: selected, am: true, sameTimeSlot: true}})
    }

    const validateTimeSlots = ({ am }) => {
        const startIndex = getDateIndex(confirmedStart.day)
        console.log(confirmedStart.day, startIndex * 2)
        const endIndex = getDateIndex(selected)
        // console.log("morning start" ,confirmedStart?.am, )
        // console.log("morning end", confirmedEnd?.am )
        const timeSlot = yearAvailability.slice((startIndex * 2) + (confirmedStart?.am ? 1 : 2), (endIndex * 2) + (am ? 2 : 3))
        console.log('timeslot', timeSlot)
        if(timeSlot.indexOf('0') > -1) { 
            setExpanded(false)
            setErrorHidden(false)
            return false
        }
        return true
    }

    const handleAfternoonClick = () => {
        if(confirmedStart && !compareDates(selected, confirmedStart.day)){
            const valid = validateTimeSlots({ am: false})
            if(!valid) return 
        }
        // Afternoon has already been selected
        if(confirmedStart && compareDates(selected, confirmedStart.day)){
            // Changing from morning to afternoon
            if(confirmedStart?.am && confirmedEnd){
                dispatch({type: 'setConfirmedStart', data: { day: selected, pm: true}})
            }
            if(confirmedStart?.am){
                console.log('aighsd')
                dispatch({type: 'setConfirmedEnd', data: { day: selected, pm: true}})
                return
            }
            // Clicking on the same time period, clear everything
            dispatch({type: 'setSelected', data: null})
            dispatch({type: 'setConfirmedStart', data: null})
            dispatch({type: 'setConfirmedEnd', data: null})
            return
        }
        if(confirmedStart && selected < confirmedStart.day && confirmedEnd.sameTimeSlot){
            dispatch({ type: 'setConfirmedStart', data: { day: selected, pm: true }})
            dispatch({ type: 'setConfirmedEnd', data: {day: selected, pm: true, sameTimeSlot: true} })
            return
        }
        if(confirmedStart && selected < confirmedStart.day){
            dispatch({type: 'setConfirmedStart', data: { day: selected, pm: true}})
            return 
        }
        if(confirmedStart){
            dispatch({type: 'setConfirmedEnd', data: { day: selected, pm: true}})
            return
        }
        dispatch({type: 'setConfirmedStart', data: { day: selected, pm: true }})
        dispatch({type: 'setConfirmedEnd', data: { day: selected, pm: true, sameTimeSlot: true}})
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
        <div className="CalendarRowErrorContainer">
            {!errorHidden && <ValidationPopup errorText={'error'} errorHeader='Invalid Time Slot' hide={errorHidden}/>}
            <div className={`CalendarRow ${expanded && 'CalendarRowExpanded'}`}>
                { days.map((day, index) => {
                    return (
                    <DisabledCalendarItem 
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
                    morningUnavailable={morningUnavailable}
                    afternoonUnavailable={afternoonUnavailable}
                    morningClick={handleMorningClick}
                    afternoonClick={handleAfternoonClick}
                    />
                </div>}
            </div>
        </div>
    )
}

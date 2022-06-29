import React, { useState, useContext, useEffect } from 'react'
import CalendarItem from './CalendarItem'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import { ApplicationContext } from '../../pages/application/Application'
import compareDates from '../../util/compareDates'
import ValidationPopup from '../ValidationPopup/ValidationPopup'
import '../../components/FormComponents/BasicDetails'
import getDateIndex from '../../util/dateUtils/getDateIndex'

export default function CalendarRow({ days, isCurrentMonth }) {
    const { state, dispatch } = useContext(ApplicationContext)
    const { selected, confirmedStart, confirmedEnd, yearAvailability } = state
    
    const [ expanded, setExpanded ] = useState(false)
    const [ errorHidden, setErrorHidden ] = useState(true)
    const [ morningActive, setMorningActive ] = useState(false)
    const [ morningUnavailable, setMorningUnavailable ] = useState(false)
    const [ afternoonUnavailable, setAfternoonUnavailable ] = useState(false)
    const [ afternoonActive, setAfternoonActive ] = useState(false)

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
        if(selected && compareDates(selected, day)){
            dispatch({ type: 'setSelected', data: null})
            return
        } 
        setMorningUnavailable(!availability.am || booked.am)
        setAfternoonUnavailable(!availability.pm || booked.pm)
        dispatch({ type: 'setSelected', data: day})
    }
    
    const handleMorningClick = () => {
        if(confirmedStart && !compareDates(selected, confirmedStart.dateObj)){
            const valid = validateTimeSlots({ am: true })
            if(!valid) return 
        }
        // morning has already been selected
        if(confirmedStart && compareDates(selected, confirmedStart.dateObj)){
            // Changing from afternoon to morning
            if(confirmedStart?.pm && confirmedEnd){
                dispatch({type: 'setConfirmedStart', data: { dateObj: selected, timeslot: 'morning', am: true}})
            }
            if(confirmedStart?.pm){
                dispatch({ type: 'setConfirmedEnd', data: { dateObj: selected, timeslot: 'morning', am: true}})
                return
            }
            // Clicking on the same time period, clear everything
            dispatch({type: 'setSelected', data: null})
            dispatch({type: 'setConfirmedStart', data: null})
            dispatch({type: 'setConfirmedEnd', data: null})
            return
        }
        if(confirmedStart && selected < confirmedStart.dateObj && confirmedEnd.sameTimeSlot){
            dispatch({ type: 'setConfirmedStart', data: { dateObj: selected, timeslot: 'morning',am: true }})
            dispatch({ type: 'setConfirmedEnd', data: {dateObj: selected, timeslot: 'morning',am: true, sameTimeSlot: true} })
            return
        }
        if(confirmedStart && selected < confirmedStart.dateObj ){
            dispatch({type: 'setConfirmedStart', data: { dateObj: selected,timeslot: 'morning', am: true}})
            return 
        }
        // Start has already been selected, set end point
        if(confirmedStart){
            dispatch({type: 'setConfirmedEnd', data: { dateObj: selected,timeslot: 'morning', am: true}})
            return
        }
        // No start selected, set start point
        dispatch({type: 'setConfirmedStart', data: { dateObj: selected,timeslot: 'morning', am: true}})
        dispatch({type: 'setConfirmedEnd', data: { dateObj: selected,timeslot: 'morning', am: true, sameTimeSlot: true}})
    }

    const handleAfternoonClick = () => {
        if(confirmedStart && !compareDates(selected, confirmedStart.dateObj)){
            const valid = validateTimeSlots({ am: false})
            if(!valid) return 
        }
        // Afternoon has already been selected
        if(confirmedStart && compareDates(selected, confirmedStart.dateObj)){
            // Changing from morning to afternoon
            if(confirmedStart?.am && confirmedEnd){
                dispatch({type: 'setConfirmedEnd', data: { dateObj: selected, timeslot: 'afternoon', pm: true}})
            }
            if(confirmedStart?.am){
                console.log('aighsd')
                dispatch({type: 'setConfirmedEnd', data: { dateObj: selected,timeslot: 'afternoon', pm: true}})
                return
            }
            // Clicking on the same time period, clear everything
            dispatch({type: 'setSelected', data: null})
            dispatch({type: 'setConfirmedStart', data: null})
            dispatch({type: 'setConfirmedEnd', data: null})
            return
        }
        if(confirmedStart && selected < confirmedStart.dateObj && confirmedEnd.sameTimeSlot){
            dispatch({ type: 'setConfirmedStart', data: { dateObj: selected, timeslot: 'afternoon',pm: true }})
            dispatch({ type: 'setConfirmedEnd', data: {dateObj: selected, timeslot: 'afternoon',pm: true, sameTimeSlot: true} })
            return
        }
        if(confirmedStart && selected < confirmedStart.dateObj){
            dispatch({type: 'setConfirmedStart', data: { dateObj: selected, timeslot: 'afternoon',pm: true}})
            return 
        }
        if(confirmedStart){
            dispatch({type: 'setConfirmedEnd', data: { dateObj: selected,timeslot: 'afternoon', pm: true}})
            return
        }
        dispatch({type: 'setConfirmedStart', data: { dateObj: selected,timeslot: 'afternoon', pm: true }})
        dispatch({type: 'setConfirmedEnd', data: { dateObj: selected, timeslot: 'afternoon',pm: true, sameTimeSlot: true}})
    }

    const validateTimeSlots = ({ am }) => {
        const startIndex = getDateIndex(confirmedStart)
        const endIndex = getDateIndex({ dateObj: selected, timeslot: am ? 'morning' : 'afternoon'})
        const timeSlot = yearAvailability.slice(startIndex, endIndex)

        if(timeSlot.indexOf('0') > -1) { 
            setExpanded(false)
            setErrorHidden(false)
            return false
        }
        return true
    }
    
    const handleMorningLogic = () => {
        if(confirmedStart && selected && compareDates(selected, confirmedStart.dateObj) && confirmedStart?.am
        || confirmedEnd && selected && compareDates(selected, confirmedEnd.dateObj) && confirmedEnd?.am){
            setMorningActive(true)
            return
        }
        setMorningActive(false)
    }

    const handleAfternoonLogic = () => {
        if(confirmedStart && selected && compareDates(selected, confirmedStart.dateObj) && confirmedStart?.pm 
        || confirmedEnd && selected && compareDates(selected, confirmedEnd.dateObj) && confirmedEnd?.pm){
            setAfternoonActive(true)
            return
        }
        setAfternoonActive(false)
    }

    return (
        <div className="CalendarRowErrorContainer">
            {!errorHidden && 
                <ValidationPopup 
                    errorText={'error'} 
                    errorHeader='Invalid Time Slot' 
                    hide={errorHidden}
                />
            }
            <div className={`CalendarRow ${expanded && 'CalendarRowExpanded'}`}>
                {days.map((day, index) => (
                    <CalendarItem 
                    onClick={handleItemClick}
                    day={day} 
                    index={index} 
                    key={index}
                    isCurrentMonth={isCurrentMonth}
                    unavailable={isCurrentMonth}
                    />
                ))}
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

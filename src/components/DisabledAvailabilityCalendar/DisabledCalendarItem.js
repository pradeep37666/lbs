import React, { useState, useContext, useEffect } from 'react'
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker'
import { ApplicationContext } from '../AvailabilityModal/AvailabilityModal'
import compareDates from '../../util/compareDates'
import getAvailability from '../../util/getAvailability'

export default function DisabledCalendarItem({day, index, onClick, isCurrentMonth }) {
    const [isApplicationPeriod, setIsApplicationPeriod] = useState(false)
    const [booked, setBooked] = useState(false)
    const [availability, setAvailability] = useState()
    
    const { state } = useContext(ApplicationContext)
    const {selected, currentDate, confirmedStart, confirmedEnd, yearAvailability, itemAvailability } = state

    useEffect(() => {
        
        if(!yearAvailability) return
        const { availability, booked } = getAvailability(day, itemAvailability, yearAvailability)
        console.log(day, availability, booked)
        setAvailability(availability)
        console.log(availability)
        setBooked(booked)
        if(day.getDate() < currentDate && isCurrentMonth) {
            setBooked({ am: true, pm: true })
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

    const handleClick = (e) => {
        e.stopPropagation()
    }

    const handleApplicationPeriodLogic = () => {
        if(!confirmedStart ) return ''
        if(!selected && confirmedEnd.sameTimeSlot) return ''
        if(!selected && !confirmedEnd.sameTimeSlot && !compareDates(day, confirmedStart.day) && !compareDates(day, confirmedEnd.day) ) return ''
        if(selected && compareDates(selected, confirmedStart.day) && confirmedEnd.sameTimeSlot) return ''
        if(selected && !confirmedEnd.sameTimeSlot && compareDates(day, selected) && !compareDates(day,confirmedStart.day) && !compareDates(day,confirmedEnd.day)) return ''
        if( selected && !compareDates(selected, confirmedStart.day) && compareDates(day, selected) && (selected > confirmedStart.day)){
            return 'ItemApplicationPeriodEnd'
        }
        if(selected && confirmedEnd.sameTimeSlot && compareDates(day, confirmedStart.day) && selected < confirmedStart.day) return ''
        if( selected && compareDates(day,confirmedStart.day)) {
            return 'ItemApplicationPeriodStart'
        }
        if( compareDates(day, confirmedStart.day)){
            return 'ItemApplicationPeriodStart'
        }
        if(compareDates(day, confirmedEnd.day)){
            return 'ItemApplicationPeriodEnd'
        }
    }

    const handleUnavailableLogic = () => {
        if(availability && (!availability.am || booked.am) && (!availability.pm || booked.pm) ) return true
        return false
    }

    return (
        <div 
        key={index} 
        className={`CalendarItem 
        ${isApplicationPeriod ? 'ItemApplicationPeriod' : ''}
        ${ handleApplicationPeriodLogic() } `}
        style={{ gridColumnStart: index === 0 ? day.getDay() + 1 : null}}
        >
            <div 
            onClick={handleClick}
            className={`
            ItemCircle  
            ${confirmedEnd && compareDates(confirmedEnd.day, day) && 'ItemCircleConfirmed'}
            ${selected && compareDates(selected, day) && 'ItemCircleSelected'}
            ${confirmedStart && compareDates(confirmedStart.day, day) && 'ItemCircleConfirmed'} 
            ${currentDate === day.getDate() && isCurrentMonth && 'ItemCurrentDay'}
            ${handleUnavailableLogic() ? 'ItemUnavailable' : ''}`}
            >
                <span className="CalendarItemText" style={{ height: 'auto'}}>{day.getDate()}</span>
                <div className="ItemAvailabilityContainer">
                    <div className={`${booked.am ? 'ItemBooked' : null}
                    ${ availability && !availability.am ? 'ItemAMUnavailable' : 'ItemAMAvailable'}`}/>
                    <div className={`${booked.pm ? 'ItemBooked' : null}
                    ${ availability && !availability.pm ? 'ItemPMUnavailable' : 'ItemPMAvailable'}`} />
                </div>
            </div>
        </div>
    )
}

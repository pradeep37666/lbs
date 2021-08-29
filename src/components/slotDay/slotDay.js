import React from 'react';
import './slotDay.css';
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker';

export default function SlotDay(props) {

    const handleOpenSlot = () => {
        // calls to parent to close every day, then we open just the one that was clicked on
        props.closeAll();
        props.setOpen(!props.open);
    }
    const handleMorningClick = () => {
       props.setMorning(!props.morning)
    }

    const handleAfternoonClick = () => {
        props.setAfternoon(!props.afternoon)
    }
    return (
        <div>
            <div className="DayDotsFlex">
                <div className={`DayInactive ${props.morning || props.afternoon ? 'DayActive' : ''}`} onClick={handleOpenSlot}>
                    {props.day}
                    {props.open ? <div className="triangle"/>: ''}
                    
                    </div>
                <div className="DotsFlex">
                    <div className={`AvailabilityDot ${props.morning ? 'DotMorningActive' : ''}`}/>
                    <div className={`AvailabilityDot ${props.afternoon ? 'DotAfternoonActive' : ''}`}/>
                </div>
            </div>
            {/* this will go in the onclick div to get middle of it and appear there */}
            {props.open ? <TimeSlotPicker morningClick={handleMorningClick} afternoonClick={handleAfternoonClick} morning={props.morning} afternoon={props.afternoon}/> : ''}
        </div>
    )
}

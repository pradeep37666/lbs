import React from 'react';
import './slotDay.css';
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker';

export default function SlotDay({ open, onClick, onMorningClick, onAfternoonClick, morningSelected, afternoonSelected, day}) {

    const handleMorningClick = () => {
       onMorningClick()
    }

    const handleAfternoonClick = () => {
        onAfternoonClick()
    }
    
    return (
        <div>
            <div className="DayDotsFlex">
                <div className={`DayInactive ${morningSelected || afternoonSelected ? 'DayActive' : ''}`} onClick={onClick}>
                    { day }
                    { open && <div className="triangle"/> }
                </div>
                <div className="DotsFlex">
                    <div className={`AvailabilityDot ${morningSelected ? 'DotMorningActive' : ''}`}/>
                    <div className={`AvailabilityDot ${afternoonSelected ? 'DotAfternoonActive' : ''}`}/>
                </div>
            </div>
            {open && <TimeSlotPicker morningClick={handleMorningClick} afternoonClick={handleAfternoonClick} morning={morningSelected} afternoon={afternoonSelected}/> }
        </div>
    )
}

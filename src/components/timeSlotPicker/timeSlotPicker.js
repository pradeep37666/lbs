import React from 'react';
import './timeSlotPicker.css';
import {ReactComponent as MorningIcon} from './../../assets/Icons/MorningIcon.svg';
import {ReactComponent as AfternoonIcon} from './../../assets/Icons/AfternoonIcon.svg';
import {ReactComponent as AfternoonIconRed} from './../../assets/Icons/AfternoonIcon-red.svg';

export default function TimeSlotPicker({ morning, afternoon, morningClick, afternoonClick, morningUnavailable, afternoonUnavailable }) {
    const handleMorningClick = () => {
        if(morningUnavailable) return
        morningClick()
    }

    const handleAfternoonClick = () => {
        if(afternoonUnavailable) return
        afternoonClick()
    }

    return (
        <div className="PickerMain">
            <div className="PickerHeader">Availability Time Slot</div>
            <div className="MorningAfternoonFlex">
                <div className={`TimeSlotDiv 
                ${morning ? 'BackgroundMorning' : ''}
                ${morningUnavailable ? 'MorningUnavailable' : 'Pointer'}`} onClick={handleMorningClick}>
                    <MorningIcon width="100%" height="50%"/>
                    <div className="DayText">Morning</div>
                    <div className="TimeText">8am - 12pm</div>
                    </div>
                <div 
                className={`TimeSlotDiv 
                ${afternoon ? 'BackgroundAfternoon' : ''}
                ${afternoonUnavailable ? 'AfternoonUnavailable' : 'Pointer'}`} 
                onClick={handleAfternoonClick}
                >
                    {afternoon ? <AfternoonIcon fill="#fff" stroke="#fff" width="100%" height="50%"/> : <AfternoonIconRed width="100%" height="50%"/>}
                    <div className="DayText">Afternoon</div>
                    <div className="TimeText">1pm - 5pm</div>
                </div>
            </div>
        </div>
    )
}

import React from 'react';
import './timeSlotPicker.css';
import MorningIcon from '../../assets/Icons/MorningIcon';
import AfternoonIcon from '../../assets/Icons/AfternoonIcon';
import {ReactComponent as AfternoonIconRed} from './../../assets/Icons/AfternoonIcon-red.svg';

export default function TimeSlotPicker({ morning, afternoon, morningClick, afternoonClick, morningUnavailable, afternoonUnavailable }) {
    const handleMorningClick = (e) => {
        e.stopPropagation()
        if(morningUnavailable) return
        morningClick()
    }

    const handleAfternoonClick = (e) => {
        e.stopPropagation()
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
                    <MorningIcon color={morningUnavailable ? "gray" : null}/>
                    <div className="DayText">Morning</div>
                    <div className="TimeText">8am - 12pm</div>
                    </div>
                <div 
                className={`TimeSlotDiv 
                ${afternoon ? 'BackgroundAfternoon' : ''}
                ${afternoonUnavailable ? 'AfternoonUnavailable' : 'Pointer'}`} 
                onClick={handleAfternoonClick}
                >
                    <AfternoonIcon color={afternoon ? '#e9d8b4' : afternoonUnavailable ? "gray" : null }/>
                    <div className="DayText">Afternoon</div>
                    <div className="TimeText">1pm - 5pm</div>
                </div>
            </div>
        </div>
    )
}

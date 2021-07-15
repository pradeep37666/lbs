import React, { useState } from 'react';
import './timeSlotPicker.css';

export default function TimeSlotPicker() {

    const [morning, setMorning] = useState(false);
    const [afternoon, setAfternoon] = useState(false);

    const handleMorningClick = () => {
        setMorning(!morning);
    }

    const handleAfternoonClick = () => {
        setAfternoon(!afternoon);
    }

    return (
        <div className="PickerMain">
            <div className="PickerHeader">Availability Time Slot</div>
            <div className="MorningAfternoonFlex">
                <div className={`TimeSlotDiv ${morning ? 'BackgroundMorning' : ''}`} onClick={handleMorningClick}>
                    <div className="DayText">Morning</div>
                    <div className="TimeText">8am - 12pm</div>
                    </div>
                <div className={`TimeSlotDiv ${afternoon ? 'BackgroundAfternoon' : ''}`} onClick={handleAfternoonClick}>
                    <div className="DayText">Afternoon</div>
                    <div className="TimeText">1pm - 5pm</div>
                </div>
            </div>
        </div>
    )
}

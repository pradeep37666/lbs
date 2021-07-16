import React, { useState } from 'react';
import './timeSlotPicker.css';

export default function TimeSlotPicker(props) {

    const [morning, setMorning] = useState(props.morning);
    const [afternoon, setAfternoon] = useState(props.afternoon);

    const handleMorningClick = () => {
        setMorning(!morning);
        props.changeMorning(!morning);
    }

    const handleAfternoonClick = () => {
        setAfternoon(!afternoon);
        props.changeAfternoon(!afternoon);
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

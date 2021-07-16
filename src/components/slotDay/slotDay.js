import React, { useState, useEffect } from 'react';
import './slotDay.css';
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker';


export default function SlotDay(props) {

    const [dayOpen, setDayOpen] = useState(false);
    const [morning, setMorning] = useState(false);
    const [afternoon, setAfternoon] = useState(false);
    useEffect(() => {
        props.dayMorningUpdate(morning);
    //eslint-disable-next-line
    }, [morning])

    useEffect(() => {
        props.dayAfternoonUpdate(afternoon);
    //eslint-disable-next-line
    }, [afternoon])

    return (
        <div>
            <div className="DayDotsFlex">
                <div className={`DayInactive ${morning || afternoon ? 'DayActive' : ''}`} onClick={() => setDayOpen(!dayOpen)}>{props.day}</div>
                <div className="DotsFlex">
                    <div className={`AvailabilityDot ${morning ? 'DotMorningActive' : ''}`}/>
                    <div className={`AvailabilityDot ${afternoon ? 'DotAfternoonActive' : ''}`}/>
                </div>
            </div>
            {dayOpen ? <TimeSlotPicker changeMorning={setMorning} changeAfternoon={setAfternoon} morning={morning} afternoon={afternoon}/> : ''}
        </div>
    )
}

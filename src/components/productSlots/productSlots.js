import React from 'react';
import './productSlots.css';
import TimeSlotPicker from '../timeSlotPicker/timeSlotPicker';

export default function productSlots() {
    return (
        <div className="ProdcutAvailabiltySection">
            <div className="DayDotsFlex">
                <div className="DayInactive">Monday</div>
                <div className="DotsFlex">
                    <div className="AvailabilityDot"/>
                    <div className="AvailabilityDot"/>
                </div>
            </div>
            <TimeSlotPicker />
        </div>
    )
}

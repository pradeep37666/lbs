import React from 'react'
import AvailabilityCalendar from '../availabilityCalendar/AvailabilityCalendar'
import './ItemAvailability.css'

export default function ItemAvailability({ handleNextPage }) {
    return (
        <div >
            Item availability

            <button onClick={() => handleNextPage('ItemOptions')}>next</button>
        <div className="AvailabilityContainer">
            <AvailabilityCalendar />
        </div>
            
        </div>
    )
}

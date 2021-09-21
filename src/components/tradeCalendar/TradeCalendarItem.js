import React, { useEffect } from 'react'
import Instance from '../../util/axios'
import './TradeCalendarItem.css'

export default function TradeCalendarItem({ booking, setSelectedBooking }) {

    
    return (
        <div 
        onClick={() => {
            setSelectedBooking(booking)
        }}
        className="TradeCalendarItemContainer"
        style={{ gridColumnStart: (booking.startDate - 426), gridColumnEnd: ((booking.endDate - 426) + 1)}}>
            {booking.u_id}
        </div>
    )
}

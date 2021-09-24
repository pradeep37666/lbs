import Arrow from '../../assets/Icons/Arrow'
import React, { useEffect } from 'react'
import Instance from '../../util/axios'
import getDateObject from '../../util/getDateObject'
import getImage from '../../util/getImage'
import './TradeCalendarItem.css'

export default function TradeCalendarItem({ booking, setSelectedBooking, row }) {
    const itemImages = booking.items_pictures.split(',')
    console.log(booking)
    // console.log(getDateObject(471))
    console.log(booking.start_date)
    console.log(booking.end_date)
    const sameTimeSlot = booking.start_date === booking.end_date
    return (
        <div 
        onClick={() => {
            setSelectedBooking(booking)
        }}
        className="TradeCalendarItem"
        style={{ gridRowStart: row, gridColumnStart: (booking.start_date - 426), gridColumnEnd: ((booking.end_date - 426) + 1)}}>
            
            <div style={ sameTimeSlot ? { flexDirection: 'column'} : null }className="TradeCalendarItemTimes">
                <span>{getDateObject(booking.start_date)?.morning ? '8am' : '1pm'}</span>
                <Arrow vertical={sameTimeSlot} width={40} height={20}/>
                <span>{getDateObject(booking.end_date)?.morning ? '12pm' : '5pm'}</span>
            </div>
        </div>
    )
}

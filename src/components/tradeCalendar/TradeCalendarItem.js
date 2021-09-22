import React, { useEffect } from 'react'
import Instance from '../../util/axios'
import getDateObject from '../../util/getDateObject'
import getImage from '../../util/getImage'
import './TradeCalendarItem.css'

export default function TradeCalendarItem({ booking, setSelectedBooking }) {
    const itemImages = booking.items_pictures.split(',')

    // console.log(getDateObject(471))
    return (
        <div 
        onClick={() => {
            setSelectedBooking(booking)
        }}
        className="TradeCalendarItemContainer"
        style={{ gridColumnStart: (booking.start_date - 426), gridColumnEnd: ((booking.end_date - 426) + 1)}}>
            <div>
               <img 
               className="TradeCalendarItemPicture"
               src={getImage(itemImages[0])} />
               <span>{booking.items_title}</span>
            </div>
            <div>

            </div>
            {booking.u_id}
        </div>
    )
}

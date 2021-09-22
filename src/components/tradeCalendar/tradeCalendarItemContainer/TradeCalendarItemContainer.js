import React from 'react'
import TradeCalendarItem from '../TradeCalendarItem'
import getImage from '../../../util/getImage'
import './TradeCalendarItemContainer.css'

export default function TradeCalendarItemContainer({ bookingItem, setSelectedBooking, totalDates }) {
    const bookings = bookingItem.bookings
    const itemImage = bookings[0].items_pictures.split(',')[0]
    console.log(itemImage)
    const renderBookings = () => {
        
        return bookings.map(( booking, index) => {
            return (
                <TradeCalendarItem 
                setSelectedBooking={setSelectedBooking}
                booking={booking} 
                key={index} />
            )
        })
    }

    return (
        <div className="TradeCalendarItemContainer" style={{ display: 'grid', gridTemplateColumns: `repeat(${totalDates * 2}, 40px)`}} >
            <div>
               <img 
               className="TradeCalendarItemPicture"
               src={getImage(itemImage)} />
            </div>
            <h3>{bookingItem.items_title}</h3>
            { renderBookings() }
        </div>
    )
}

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
            const prevBookings = bookings.slice(0, index)
            let row = 2
            prevBookings.forEach(prevBooking => {
                if(prevBooking.start_date <= booking.start_date && prevBooking.end_date >= booking.start_date){
                    row ++
                }
                if(prevBooking.start_date === booking.start_date ){
                    row ++
                }
                if(prevBooking.start_date <= booking.end_date && prevBooking.end_date >= booking.end_date){
                    row++
                }
            })
            
            return (
                <TradeCalendarItem 
                setSelectedBooking={setSelectedBooking}
                row={row}
                booking={booking} 
                key={index} />
            )
        })
    }

    return (
        <div className="TradeCalendarItemContainer" style={{ display: 'grid', gridTemplateColumns: `repeat(${totalDates * 2}, 40px)`, gridTemplateRows: 'repeat(1, 50px)'}} >
            <div className="TradeCalendarItemDetails" style={{ position: 'sticky', left: 10, gridRowStart: 1}}>
               <img 
               className="TradeCalendarItemPicture"
               src={getImage(itemImage)} />
               <span>{bookingItem.items_title}</span>
            </div>
            
            { renderBookings() }
        </div>
    )
}

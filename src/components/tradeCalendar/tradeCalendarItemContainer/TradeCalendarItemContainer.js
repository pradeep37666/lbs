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
                    return
                }
                if(prevBooking.start_date === booking.start_date ){
                    row ++
                    return
                }
                if(prevBooking.start_date <= booking.end_date && prevBooking.end_date >= booking.end_date){
                    row++
                    return
                }
            })
            
            return (
                <TradeCalendarItem 
                setSelectedBooking={setSelectedBooking}
                row={row}
                booking={booking} 
                key={index}
                index={index} />
            )
        })
    }

    const renderColumns = () => {
        return Array(totalDates * 2).fill(null).map((value, index) => {
            return (
            <div 
            style={{ gridRowStart: 1, gridRowEnd: 5, gridColumnStart: (index + 1), gridColumnEnd: ( index + 2), borderLeft: '1px solid #dedede', zIndex: 1}}
            >
                
            </div>)
        })
    }

    return (
        <div className="TradeCalendarItemContainer" style={{ display: 'grid', gridTemplateColumns: `repeat(${totalDates * 2}, 50px)`, gridTemplateRows: 'repeat(1, 50px)'}} >
            <div className="TradeCalendarItemDetails" style={{ position: 'sticky', left: 10, gridRowStart: 1}}>
               <img 
               className="TradeCalendarItemPicture"
               src={getImage(itemImage)} />
               <span>{bookingItem.items_title}</span>
            </div>
            
            { renderColumns() }
            { renderBookings()}
        </div>
    )
}

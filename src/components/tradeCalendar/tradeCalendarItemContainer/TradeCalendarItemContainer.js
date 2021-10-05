import React from 'react'
import TradeCalendarItem from '../TradeCalendarItem'
import getImage from '../../../util/getImage'
import './TradeCalendarItemContainer.css'
import userEvent from '@testing-library/user-event'
import useGlobalState from '../../../util/useGlobalState'

export default function TradeCalendarItemContainer({ bookingItem, setSelectedBooking, totalDates, header, currentMonth, currentYear}) {
    const { state } = useGlobalState()
    const { user } = state
    const bookings = bookingItem.bookings
    const itemImage = bookings[0].items_pictures.split(',')[0]
    const isLend = bookings[0].io_id === user.id

    const renderBookings = () => {        
        return bookings.map(( booking, index) => {
            const prevBookings = bookings.slice(0, index)
            let row = header ? 3 : 2
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
                index={index} 
                currentMonth={currentMonth}
                currentYear={currentYear}
                />
            )
        })
    }

    const renderColumns = () => {
        return Array(totalDates * 2).fill(null).map((value, index) => {
            return (
            <div 
            style={{ gridRowStart: 1, gridRowEnd: 5, gridColumnStart: (index + 1), gridColumnEnd: ( index + 2), borderLeft: '1px solid #dedede', zIndex: 1}}
            />)
        })
    }

    return (
        <div className="TradeCalendarItemContainer" style={{ display: 'grid', gridTemplateColumns: `repeat(${totalDates * 2}, 50px)`, gridTemplateRows: 'repeat(1, 60px)' }} >
             { header &&
                <div className="TradeCalendarItemDetails" style={{ gridRowStart: 1}}>
                    <span className="TradeCalendarBorrowHeader">
                        { isLend ? 'My Lends' : 'My Borrows'}
                    </span>
                </div>
            }
            <div className="TradeCalendarItemDetails" style={{ gridRowStart: header ? 2 : 1}}> 
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

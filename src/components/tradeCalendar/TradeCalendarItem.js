import Arrow from '../../assets/Icons/Arrow'
import React, { useEffect } from 'react'
import Instance from '../../util/axios'
import getDateObject from '../../util/getDateObject'
import getImage from '../../util/getImage'
import './TradeCalendarItem.css'
import useGlobalState from '../../util/useGlobalState'
import getDateIndex from '../../util/getDateIndex'

export default function TradeCalendarItem({ booking, setSelectedBooking, row, currentMonth, currentYear }) {
    const { state, dispatch } = useGlobalState()
    const { user } = state

    const itemImages = booking.items_pictures.split(',')

    const currentMonthDateIndex = getDateIndex(new Date(currentYear, currentMonth)) * 2
        
    const isLend = booking.io_id === user.id
    const sameTimeSlot = booking.start_date === booking.end_date
    return (
        <div 
        onClick={() => {
            setSelectedBooking(booking)
        }}
        className="TradeCalendarItem"
        style={{ gridRowStart: row, gridColumnStart: (booking.start_date - currentMonthDateIndex), gridColumnEnd: ((booking.end_date - currentMonthDateIndex) + 1)}}>
            
            <div style={ sameTimeSlot ? { flexDirection: 'column'} : null } className={isLend ? "TradeCalendarItemLend" : "TradeCalendarItemBorrow"}>
                <span>{getDateObject(booking.start_date)?.morning ? '8am' : '1pm'}</span>
                <Arrow vertical={sameTimeSlot} width={40} height={20}/>
                <span>{getDateObject(booking.end_date)?.morning ? '12pm' : '5pm'}</span>
            </div>
        </div>
    )
}

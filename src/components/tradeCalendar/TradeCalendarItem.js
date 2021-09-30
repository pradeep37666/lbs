import Arrow from '../../assets/Icons/Arrow'
import React, { useEffect } from 'react'
import Instance from '../../util/axios'
import getDateObject from '../../util/getDateObject'
import getImage from '../../util/getImage'
import './TradeCalendarItem.css'
import useGlobalState from '../../util/useGlobalState'
import getDateIndex from '../../util/getDateIndex'
import stripes from '../../assets/Images/CancelledStripes.png'

export default function TradeCalendarItem({ booking, setSelectedBooking, row, currentMonth, currentYear }) {
    const { state, dispatch } = useGlobalState()
    const { user } = state

    const currentMonthDateIndex = getDateIndex(new Date(currentYear, currentMonth)) * 2
        
    const isLend = booking.io_id === user.id
    const isConfirmed = booking.status > 2
    const isCancelled = booking.status === 0
    const sameTimeSlot = booking.start_date === booking.end_date

    const getCalendarItemClass = () => {

        if(isCancelled){
            return 'TradeCalendarItemCancelled'
        }
        if(isConfirmed){
            return isLend ? "TradeCalendarItemLend" : "TradeCalendarItemBorrow"
        }
        return 'TradeCalendarItemPending'
    }
    
    return (
        <div 
        onClick={() => {
            console.log(getDateIndex(new Date(2021,10,1)) * 2)
            console.log(currentMonthDateIndex)
            console.log(booking.start_date - currentMonthDateIndex)
            setSelectedBooking(booking)
        }}
        className="TradeCalendarItem"
        style={{ gridRowStart: row, gridColumnStart: (booking.start_date - currentMonthDateIndex), gridColumnEnd: ((booking.end_date - currentMonthDateIndex) + 1)}}>
            
            <div style={{ flexDirection: sameTimeSlot ? 'column' : null , backgroundImage: isCancelled ? `url(${stripes})` : null, backgroundSize: 'auto'}} className={getCalendarItemClass()}>
                <span>{getDateObject(booking.start_date)?.morning ? '8am' : '1pm'}</span>
                <Arrow vertical={sameTimeSlot} width={40} height={20}/>
                <span>{getDateObject(booking.end_date)?.morning ? '12pm' : '5pm'}</span>
            </div>
        </div>
    )
}

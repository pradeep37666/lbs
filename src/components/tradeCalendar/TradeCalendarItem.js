import Arrow from '../../assets/Icons/Arrow'
import React, { useEffect } from 'react'
import Instance from '../../util/axios'
import getDateObject from '../../util/dateUtils/getDateObject'
import getImage from '../../util/getImage'
import './TradeCalendarItem.css'
import useGlobalState from '../../util/useGlobalState'
import getDateIndex from '../../util/dateUtils/getDateIndex'
import LendStripes from '../../assets/Images/LendStripes.png'
import BorrowStripes from '../../assets/Images/BorrowStripes.png'
import { isMobile } from 'react-device-detect'
export default function TradeCalendarItem({ booking, setSelectedBooking, row, currentMonth, currentYear }) {
    const { state, dispatch } = useGlobalState()
    const { user } = state

    const currentMonthDateIndex = getDateIndex({
        dateObj: new Date(currentYear, currentMonth), 
        timeslot: 'morning'
    })

    const isLend = booking.io_id === user.id
    const isConfirmed = booking.status > 2
    const isCancelled = booking.status === 0 || booking.status === 2
    const sameTimeSlot = booking.start_date === booking.end_date
    
    
    const getBackgroundImage = () => {
        if(!isCancelled) return null
        return isLend ? `url(${LendStripes})` : `url(${BorrowStripes})`
    }
    
    const getBookingStartPosition = () => {
        if(booking.start_date <= currentMonthDateIndex){
            return 1
        }
        return booking.start_date - currentMonthDateIndex + 1
    }

    const getBookingEndPosition = () => {
         return booking.end_date - currentMonthDateIndex + 2
    }

    const isVertical = () => {
        if(booking.start_date <= currentMonthDateIndex && booking.end_date - currentMonthDateIndex === 1){
            return true
        }
        if(sameTimeSlot){
            return true
        }
        return false
    }

    const getCalendarItemClass = () => {
        if(isCancelled){
            return isLend ? 'TradeCalendarItemLendCancelled' : 'TradeCalendarItemBorrowCancelled'
        }
        if(isConfirmed){
            return isLend ? "TradeCalendarItemLend" : "TradeCalendarItemBorrow"
        }
        return 'TradeCalendarItemPending'
    }

    return (
        <div 
        onClick={() => {
            console.log(booking)
            setSelectedBooking(booking)
        }}
        className="TradeCalendarItem"
        style={{ gridRowStart: row, gridColumnStart: getBookingStartPosition(), gridColumnEnd: getBookingEndPosition()}}>
            
            <div 
            style={{ flexDirection: isVertical() ? 'column' : null , backgroundImage: getBackgroundImage(), backgroundSize: 'auto', padding: sameTimeSlot ? '0.5rem 0' : '0.5rem'}} 
            className={getCalendarItemClass()}>
                <span>{getDateObject(booking.start_date)?.timeslot === 'morning' ? '8am' : '1pm'}</span>
                <Arrow rotation={sameTimeSlot ? 90 : 0} width={ isMobile ? 20 : 40} height={ isMobile ? 10: 20}/>
                <span>{getDateObject(booking.end_date)?.timeslot === 'morning' ? '12pm' : '5pm'}</span>
            </div>
        </div>
    )
}

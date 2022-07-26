import React from 'react'
import './TradeCalendarItem.css'
import getDateObject from '../../util/dateUtils/getDateObject'
import Arrow from '../../assets/Icons/Arrow'
import useGlobalState from '../../util/useGlobalState'
import getDateIndex from '../../util/dateUtils/getDateIndex'
import LendStripes from '../../assets/Images/LendStripes.png'
import BorrowStripes from '../../assets/Images/BorrowStripes.png'
import { isMobile } from 'react-device-detect'

export default function TradeCalendarItem({ booking, setSelectedBooking, row, currentMonth, currentYear }) {
    const { state } = useGlobalState()
    const { user } = state

    const currentMonthDateIndex = getDateIndex({
        dateObj: new Date(currentYear, currentMonth), 
        timeslot: 'morning'
    })

    const isLend = booking.lenderId === user.id
    const isConfirmed = booking.status === 'APPROVED'
    const isCancelled = booking.status === 'REJECTED' || booking.status === 'CANCELLED' || booking.status === 'DISPUTED' || booking.status === 'RESOLVED'
    const sameTimeSlot = booking.startDateIndex === booking.endDateIndex
    
    const getBackgroundImage = () => {
        if(!isCancelled) return null
        return isLend ? `url(${LendStripes})` : `url(${BorrowStripes})`
    }
    
    const getBookingStartPosition = () => {
        if(booking.startDateIndex <= currentMonthDateIndex){
            return 1
        }
        return booking.startDateIndex - currentMonthDateIndex + 1
    }

    const getBookingEndPosition = () => {
         return booking.endDateIndex - currentMonthDateIndex + 2
    }

    const isVertical = () => {
        if((booking.startDateIndex <= currentMonthDateIndex) && (booking.endDateIndex - currentMonthDateIndex === 1)){
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
            onClick={() => setSelectedBooking(booking)}
            className="TradeCalendarItem"
            style={{ gridRowStart: row, gridColumnStart: getBookingStartPosition(), gridColumnEnd: getBookingEndPosition()}}
        >
            <div 
                style={{ flexDirection: isVertical() ? 'column' : null , backgroundImage: getBackgroundImage(), backgroundSize: 'auto', padding: sameTimeSlot ? '0.5rem 0' : '0.5rem'}} 
                className={getCalendarItemClass()}
            >
                <span>
                    {getDateObject(booking.startDateIndex)?.timeslot === 'morning' ? '8am' : '1pm'}
                </span>
                <Arrow 
                    rotation={sameTimeSlot ? 90 : 0} 
                    width={ isMobile ? 20 : 40} 
                    height={ isMobile ? 10: 20}
                />
                <span>
                    {getDateObject(booking.endDateIndex)?.timeslot === 'morning' ? '12pm' : '5pm'}
                </span>
            </div>
        </div>
    )
}

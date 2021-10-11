import React, { useEffect, useRef, useState } from 'react'
import getDateIndex from '../../util/getDateIndex'
import './TradeCalendar.css'
import TradeCalendarItem from './TradeCalendarItem'
import getDateObject from '../../util/getDateObject'
import TradeCalendarItemContainer from './tradeCalendarItemContainer/TradeCalendarItemContainer'
import compareDates from '../../util/compareDates'
import { isMobile } from 'react-device-detect'

export default function TradeCalendar({ borrowerBookingItems, lenderBookingItems, setSelectedBooking }) {
    const tradeCalendarRef = useRef()
    const [currentDate, setCurrentDate] = useState()
    const [currentMonth, setCurrentMonth] = useState()
    const [currentYear, setCurrentYear] = useState()
    const [totalDates, setTotalDates] = useState()
    

    useEffect(() => {
        const today = new Date()
        const currentDate = today.getDate()
        const currentMonth = today.getMonth()
        const currentYear = today.getFullYear()
        setCurrentDate(currentDate)
        setCurrentMonth(currentMonth)
        setCurrentYear(currentYear)
        
    },[])

    useEffect(() => {
        if(!tradeCalendarRef.current) return
        if(currentDate < 7) return 
        tradeCalendarRef.current.scrollTo((((currentDate) * 2) - 8) * (isMobile ? 25 : 50), 0)
    },[tradeCalendarRef.current])

   
    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
      }

    const renderBookingItemContainers = (bookingItems) => {
        
        return bookingItems.map(( bookingItem, index) => {
            return (
                <TradeCalendarItemContainer
                header={index === 0}
                setSelectedBooking={setSelectedBooking}
                bookingItem={bookingItem} 
                key={index} 
                totalDates={totalDates}
                currentMonth={currentMonth}
                currentYear={currentYear}
                />
            )
        })
    }
 
    const getAllDays = () => {
       
        const dates = []
        const date = new Date(currentYear, currentMonth, 1)
        for(let i=0; i< 3; i++){
            const month = date.getMonth()
            const monthDays = getDaysInMonth(month, currentYear)
            dates.push(monthDays)
            date.setMonth(currentMonth + (i + 1))
        }
        
        return dates.flat()
    }

    const dayArray = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", ]
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const renderDates = () => {
        if(!currentMonth || !currentYear || !currentDate) return
        const dates = getAllDays()
        if(!totalDates) setTotalDates(dates.length)
        const arr = []
        for(let i=0; i<totalDates; i++){
            const isCurrentDay = dates[i].getMonth() === currentMonth && dates[i].getDate() === currentDate
            arr.push(
            <div className="TradeCalendarDayItemContainer" style={{ gridColumnStart: (i * 2) + 1, gridColumnEnd: (i * 2) + 3, position: 'relative' }} key={i}>
                { dates[i].getDate() === 1 &&
                    <span className="TradeCalendarMonthLabel">{monthArray[dates[i].getMonth()]}</span>
                }
                
                <div className="TradeCalendarDayItem">
                    <span className="TradeCalendarDayItemName">{dayArray[dates[i].getDay()]}</span>
                    <div className={isCurrentDay ? 'TradeCalendarCurrentDay' : "TradeCalendarDayItemDate"}>
                        <span>{dates[i].getDate()}</span>  
                    </div>
                    
                </div>
            </div>)
            // arr.push(<div className="TradeCalendarFillerItem"></div>)
            
        }
        return arr
    }

    return (
        <>
            { currentYear && 
            <div className="TradeCalendarContainer" ref={tradeCalendarRef} >
                <div style={{ width: `${ (totalDates * 2) *( isMobile ? 25 : 50)}px`}}>
                    <div className="TradeCalendarDaysContainer" style={{ gridTemplateColumns: `repeat(${totalDates * 2}, ${ isMobile ? 25 : 50}px)`, paddingTop: 35 }}>
                        {renderDates()} 
                    </div>
                    
                    {lenderBookingItems.length > 0 && 
                    renderBookingItemContainers(lenderBookingItems)
                    }
                    {borrowerBookingItems.length > 0 && 
                    renderBookingItemContainers(borrowerBookingItems)
                    }
                    
                </div>
                
            </div>
            }
        </>
    )
}

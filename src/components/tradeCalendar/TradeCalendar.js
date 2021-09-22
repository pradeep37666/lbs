import React, { useEffect, useState } from 'react'
import getDateIndex from '../../util/getDateIndex'
import './TradeCalendar.css'
import TradeCalendarItem from './TradeCalendarItem'
import getDateObject from '../../util/getDateObject'
import TradeCalendarItemContainer from './tradeCalendarItemContainer/TradeCalendarItemContainer'

export default function TradeCalendar({ bookingItems, setSelectedBooking }) {
    const [currentDate, setCurrentDate] = useState()
    const [currentMonth, setCurrentMonth] = useState()
    const [currentYear, setCurrentYear] = useState()
    const [totalDates, setTotalDates] = useState()
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {
        const today = new Date()
        const currentDate = today.getDate()
        const currentMonth = today.getMonth()
        const currentYear = today.getFullYear()
        setCurrentDate(currentDate)
        setCurrentMonth(currentMonth)
        setCurrentYear(currentYear)
    })

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
      }

    const renderBookingItems = () => {
        
        return bookingItems.map(( bookingItem, index) => {
            return (
                <TradeCalendarItemContainer
                setSelectedBooking={setSelectedBooking}
                bookingItem={bookingItem} 
                key={index} 
                totalDates={totalDates}
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


    const renderDates = () => {
        if(!currentMonth || !currentYear || !currentDate) return
        const dates = getAllDays()
        if(!totalDates) setTotalDates(dates.length)
        const arr = []
        for(let i=0; i<totalDates; i++){
            arr.push(<span style={{ borderRight: '1px solid black'}}>{dates[i].getDate()}</span>)
            arr.push(<span style={{ borderRight: '1px solid black'}}> </span>)
            
        }
        return arr
        // return dates.map((date, index ) => {
        //     // console.log(date)
        //     return (<span key={index}>{date.getDate()}</span>)
        // })
    }

    // console.log('jan', new Date(currentYear, 0, 1))
    // console.log((getDateIndex(new Date(currentYear, currentMonth, 23)) * 2) + 1)
    // console.log(getDateObject(471))
    return (
        <>
            { currentYear && 
            <div className="TradeCalendarContainer" >
                <div>
                    <span>{monthArray[currentMonth]}</span>
                    <div className="TradeCalendarDaysContainer" style={{ display: 'grid', gridTemplateColumns: `repeat(${totalDates * 2}, 40px)`, postion: 'sticky', top: 0 }}>
                    {renderDates()} 
                    
                    </div>
                    
                        {bookingItems && renderBookingItems()}
                    
                </div>
                
            </div>
            }
        </>
    )
}

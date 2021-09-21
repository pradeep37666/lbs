import React, { useEffect, useState } from 'react'
import getDateIndex from '../../util/getDateIndex'
import './TradeCalendar.css'
import TradeCalendarItem from './TradeCalendarItem'

export default function TradeCalendar({ bookings, setSelectedBooking }) {
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
            arr.push(<span>{dates[i].getDate()}</span>)
            arr.push(<span> </span>)
            
        }
        return arr
        // return dates.map((date, index ) => {
        //     // console.log(date)
        //     return (<span key={index}>{date.getDate()}</span>)
        // })
    }


    console.log((getDateIndex(new Date(currentYear, currentMonth + 1, 1)) * 2) +1)
    return (
        <>
            { currentYear && 
            <div className="TradeCalendarContainer" >
                <div>
                    <span>{monthArray[currentMonth]}</span>
                    <div className="TradeCalendarDaysContainer" style={{ display: 'grid', gridTemplateColumns: `repeat(${totalDates * 2}, 40px` }}>
                    {renderDates()} 
                    {bookings && renderBookings()}
                    </div>
                </div>
                
            </div>
            }
        </>
    )
}

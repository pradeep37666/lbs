import React, { useEffect, useState } from 'react'
import './TradeCalendar.css'

export default function TradeCalendar({ bookings }) {
    const [currentDate, setCurrentDate] = useState()
    const [currentMonth, setCurrentMonth] = useState()
    const [currentYear, setCurrentYear] = useState()
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

    const renderDaysOfMonth = () => {
        const dates = []
        let date = new Date(currentYear, currentMonth, 1)
        while(date.getMonth() === currentMonth){
            dates.push(<span>{date.getDate()}</span>)
            date.setDate(date.getDate() + 1)
        }
        // setMonthDays
        return dates
    }

    const renderBookings = () => {
        return bookings.map(( booking, index) => {
            return (
                <div key={index}>
                    {booking.u_id}
                </div>
            )
        })
    }
 
    return (
        <div className="TradeCalendarContainer">
            <div>
                <span>{monthArray[currentMonth]}</span>
                <div className="TradeCalendarDaysContainer" >
                   {renderDaysOfMonth()} 
                </div>
            </div>
            {bookings && renderBookings()}
        </div>
    )
}

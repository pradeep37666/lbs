import React from 'react'
import './AvailabilityCalendar.css'
import CalendarItem from './CalendarItem';

export default function AvailabilityCalendar({ month }) {
    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
      }
    const dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday' ]

    const days = getDaysInMonth(7, 2021)
    return (
        <div>
            <div className="CalendarContainer">
                {dayArray.map((day, index) => {
                    return <div key={index}>{day}</div>
                })}
                { days.map((day, index) => {
                return (
                <CalendarItem day={day} index={index}/>
                )})}
            </div>
            
        </div>
    )
}

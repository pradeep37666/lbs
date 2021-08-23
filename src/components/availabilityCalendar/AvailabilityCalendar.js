import React from 'react'
import './AvailabilityCalendar.css'
import CalendarItem from './CalendarItem';
import CalendarRow from './CalendarRow';

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
    const dayArray = ['Su','Mo','Tu','We','Th','Fr','Sa' ]

    const days = getDaysInMonth(5, 2021)

    const renderRows = () => {
        const rows = []
        let rowDays = []
        for(let i = 0; i < days.length; i++){
            console.log(days[i])
            rowDays.push(days[i])
            // add a new row when there are 7 days in the rowDays array
            if(days[i].getDay() === 6){
                rows.push(<CalendarRow days={rowDays}/>)
                rowDays = []
                continue
            }
            // add a last row if there are now enough days to make a new week
            if(i + 1 === days.length){
                rows.push(<CalendarRow days={rowDays}/>)
                break
            }

        }
        console.log(rows)
        return rows
    }
    return (
        <div>
            <div className="CalendarContainer">
                <div className="CalendarRow">
                  {dayArray.map((day, index) => {
                    return <div key={index}>{day}</div>
                })}  
                </div>
                
                { renderRows() }
            </div>
            
        </div>
    )
}

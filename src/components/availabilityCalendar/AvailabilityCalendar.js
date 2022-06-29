import React, { useContext} from 'react'
import './AvailabilityCalendar.css'
import { monthArray, dayArray } from '../../assets/Data/LBSArray'
import CalendarRow from './CalendarRow'
import { ApplicationContext } from '../../pages/application/Application'

export default function AvailabilityCalendar({ month, year }) {
    const { state } = useContext(ApplicationContext)
    const { currentMonth, currentYear } = state

    function getDaysInMonth(month, year) {
        let date = new Date(year, month, 1)
        let days = []
        while (date.getMonth() === month) {
          days.push(new Date(date))
          date.setDate(date.getDate() + 1)
        }
        return days
    }
    const days = getDaysInMonth(month, year)

    const renderRows = () => {
        const rows = []
        let rowDays = []
        for(let i = 0; i < days.length; i++){
            rowDays.push(days[i])
            if(days[i].getDay() === 6){
                rows.push(
                    <CalendarRow 
                    key={i}
                    days={rowDays}
                    isCurrentMonth={currentMonth === month}
                    />
                )
                rowDays = []
                continue
            }
            if(i + 1 === days.length){
                rows.push(
                    <CalendarRow 
                    key={i}
                    days={rowDays} 
                    isCurrentMonth={currentMonth === month}
                    />
                )
                break
            }
        }
        return rows
    }

    const renderCurrentYearLabel = () => {
        if(currentMonth === month){
            return <span className="CalendarCurrentYearLabel">{currentYear}</span>
        }
        if(monthArray[month] === 'January'){
            return <span className="CalendarCurrentYearLabel">{currentYear + 1}</span>
        }
    }

    return (
        <div className="CalendarContainer">
            { renderCurrentYearLabel() }
            <div className="CalendarInfoContainer">
                <span className="CalendarMonth">{monthArray[month]} </span>
                <span className="CalendarYear">{year}</span>
            </div>
            <div>
                <div className="CalendarRow">
                    {dayArray.map((day, index) => {
                        return <div className="CalendarItemDayName" key={index}>{day}</div>
                    })}  
                </div>
                { renderRows() }
            </div>
        </div>
    )
}
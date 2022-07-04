import React, { useContext} from 'react'
import DisabledCalendarRow from './DisabledCalendarRow'
import { ApplicationContext } from '../modals/AvailabilityModal/AvailabilityModal'
import { dayArray, monthArray } from '../../assets/Data/LBSArray'

export default function DisabledAvailabilityCalendar({ month, year }) {
    const { state } = useContext(ApplicationContext)
    const { currentMonth } = state

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
                    <DisabledCalendarRow 
                    key={i}
                    isCurrentMonth={currentMonth === month}
                    days={rowDays}
                    /> 
                )
                rowDays = []
                continue
            }
            if(i + 1 === days.length){
                rows.push(
                <DisabledCalendarRow 
                key={i}
                days={rowDays} 
                isCurrentMonth={currentMonth === month}
                />)
                break
            }
        }
        return rows
    }

    return (
        <div className="CalendarContainer">
            <div className="CalendarInfoContainer">
                <span className="CalendarMonth">{monthArray[month]}</span>
                <span className="CalendarYear">{year}</span>
            </div>
            <div>
                <div className="CalendarRow">
                {dayArray.map((day, index) => (
                    <div 
                        className="CalendarItemDayName" 
                        key={index}
                    >
                        {day}
                    </div>
                ))}  
                </div>
                { renderRows() }
            </div>
        </div>
    )
}

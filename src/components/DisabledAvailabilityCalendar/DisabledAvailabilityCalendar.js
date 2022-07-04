import React, { useContext} from 'react'
import DisabledCalendarItem from './DisabledCalendarItem'
import DisabledCalendarRow from './DisabledCalendarRow'
import { ApplicationContext } from '../modals/AvailabilityModal/AvailabilityModal'
import { dayArray } from '../../assets/Data/LBSArray'

export default function DisabledAvailabilityCalendar({ month, year, }) {
    const { state } = useContext(ApplicationContext)
    const { currentMonth, currentYear } = state
    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1)
        var days = []
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
            // add a new row when there are 7 days in the rowDays array
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
            // add a last row if there are now enough days to make a new week
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

    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <div className="CalendarContainer">
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

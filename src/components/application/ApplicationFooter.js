import React, { useContext } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import './ApplicationFooter.css'

export default function ApplicationFooter() {
    const { confirmedStart } = useContext(ApplicationContext)
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return (
        <div className="ApplicationFooterContainer">
            <div>
                <h3>Collect</h3>
                <div>
                    {confirmedStart?.am ? '8:00am' : '1:00pm'}
                    {dayArray[confirmedStart.day.getDay()]}
                </div>
                <div>{confirmedStart.day.getDate()}</div>
            </div>
            <div>
                <h3>Return</h3>
                <div>
                    {confirmedStart?.am ? '8:00am' : '1:00pm'}
                    {dayArray[confirmedStart.day.getDay()]}
                </div>
                <div>{confirmedStart.day.getDate()}</div>
            </div>
        </div>
    )
}

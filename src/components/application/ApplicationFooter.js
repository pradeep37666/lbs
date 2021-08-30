import React, { useContext } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import './ApplicationFooter.css'

export default function ApplicationFooter() {
    const { confirmedStart, confirmedEnd, setConfirmedStart, setConfirmedEnd, setSelected, handleNextPage } = useContext(ApplicationContext)
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const clearDates = () => {
        setConfirmedEnd(null)
        setConfirmedStart(null)
        setSelected(null)
    }

    return (
        <div className="ApplicationFooterContainer">
            <div className="ApplicationFooterDetailsContainer">
                <div>
                    <h3>Collect</h3>
                    <div>
                        {confirmedStart?.am ? '8:00am' : '1:00pm'}
                        {dayArray[confirmedStart.day.getDay()]}
                    </div>
                    <div>{confirmedStart.day.getDate()}</div>
                </div>
                {confirmedEnd &&
                <div>
                    <h3>Return</h3>
                    <div>
                        {confirmedEnd?.am ? '8:00am' : '1:00pm'}
                        {dayArray[confirmedEnd.day.getDay()]}
                    </div>
                    <div>{confirmedEnd.day.getDate()}</div>
                </div>
                }
            </div>
            <div className="ApplicationFooterButtonContainer">
                <div onClick={clearDates} className="ApplicationFooterClearButton">
                    <h3>Clear Dates</h3>
                </div>
                <div onClick={() => handleNextPage('ItemOptions')} className="ApplicationFooterNextButton">
                    <h3>Next</h3>
                </div>  
            </div>
            
        </div>
    )
}

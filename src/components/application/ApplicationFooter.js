import React, { useContext } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import './ApplicationFooter.css'

export default function ApplicationFooter() {
    const { confirmedStart, confirmedEnd, setConfirmedStart, setConfirmedEnd, setSelected, handleNextPage } = useContext(ApplicationContext)
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthArray = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"]

    const clearDates = () => {
        setConfirmedEnd(null)
        setConfirmedStart(null)
        setSelected(null)
    }

    const handleDate = (confirmedDate) => {
        const date = confirmedDate.day.getDate().toString()
        const lastChar = date.charAt(date.length - 1)
        switch(lastChar){
            case '1' : return date + 'st'
            case '2' : return date + 'nd'
            case '3' : return date + 'rd'
            default : return date + 'th'
        }
        
    }
    return (
        <div className="ApplicationFooter">
         <div className="ApplicationFooterContainer">
            <div className="ApplicationFooterPriceContainer">
                <span>Total Price</span>
                <span>$75</span>
            </div>
            <div className="ApplicationFooterDetailsContainer">
                <div>
                    <h3>Collect</h3>
                    <div>
                        {confirmedStart?.am ? '8:00am' : '1:00pm'}
                        {dayArray[confirmedStart.day.getDay()]}
                    </div>
                    <div>
                        { handleDate(confirmedStart)}
                        { monthArray[confirmedStart.day.getMonth()]}
                    </div>
                </div>
                <div>
                    <h2>{'\u2192'}</h2>
                </div>
                <div>
                    <h3>Return</h3>
                    <div>
                        {confirmedEnd?.am ? '12:00am' : '5:00pm'}
                        {dayArray[confirmedEnd.day.getDay()]}
                    </div>
                    <div>
                        {handleDate(confirmedEnd)}
                        { monthArray[confirmedEnd.day.getMonth()]}
                    </div>
                </div>
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
        </div>
    )
}

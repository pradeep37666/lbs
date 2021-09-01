import React, { useContext } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import getDateIndex from '../../util/getDateIndex'
import './ApplicationFooter.css'

export default function ApplicationFooter() {
    const  { state, dispatch, handleNextPage } = useContext(ApplicationContext)
    const { page, item, confirmedStart, confirmedEnd } = state
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthArray = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"]

    const clearDates = () => {
        dispatch({ type: 'setConfirmedEnd', data: null})
        dispatch({ type: 'setConfirmedStart', data: null})
        dispatch({ type: 'setSelectedEnd', data: null})
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

    const handleClick = () => {
        let route
        if(page === 'ItemAvailability') route = 'ItemOptions'
        if(page === 'ItemOptions') route = 'ItemOverview'
        if(page === 'ItemOverview') route = 'ItemAvailability'
        handleNextPage(route)
    }

    const calculatePrice = () => {
        if(confirmedEnd.sameTimeSlot) return item.price
        //const days = confirmedEnd.day.getDate() - confirmedStart.day.getDate()
        const days = getDateIndex(confirmedEnd.day) - getDateIndex(confirmedStart.day)
        let timeSlots
        if(confirmedStart?.am && confirmedEnd?.am || confirmedStart?.pm && confirmedEnd?.pm){
            timeSlots = (days * 2) + 1
        }
        if(confirmedStart?.am && confirmedEnd?.pm){
            timeSlots = (days + 1) * 2
        }
        if(confirmedStart?.pm && confirmedEnd?.am){
            timeSlots = days * 2
        }
        return item.price * timeSlots
    }

    return (
        <div className="ApplicationFooter">
         <div className="ApplicationFooterContainer">
            <div className="ApplicationFooterPriceContainer">
                <span>Total Price</span>
                <span>${calculatePrice()}</span>
            </div>
            <div className="ApplicationFooterDetailsContainer">
                <div className="ApplicationFooterDetails">
                    <p>Collect</p>
                    <div>
                        <span className="ApplicationFooterTime">{confirmedStart?.am ? '8:00am' : '1:00pm'}</span>
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
                <div className="ApplicationFooterDetails">
                    <p>Return</p>
                    <div>
                        <span className="ApplicationFooterTime">{confirmedEnd?.am ? '12:00pm' : '5:00pm'}</span>
                        {dayArray[confirmedEnd.day.getDay()]}
                    </div>
                    <div>
                        {handleDate(confirmedEnd)}
                        { monthArray[confirmedEnd.day.getMonth()]}
                    </div>
                </div>
            </div>
            <div className="ApplicationFooterButtonContainer">
                <div 
                onClick={clearDates} 
                className={`ApplicationFooterClearButton
                ${page === 'ItemAvailability' ? '' : 'ApplicationFooterClearRemoved'}`}
                
                >
                    <h4>Clear Dates</h4>
                </div>
                <div 
                onClick={handleClick} 
                className={`ApplicationFooterNextButton
                ${page === 'ItemAvailability' ? '' : 'ApplicationFooterLargeNextButton'}`}
                >
                    <h4>Next</h4>
                </div>  
            </div>
            
            </div>
        </div>
    )
}

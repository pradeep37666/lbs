import React, { useContext } from 'react'
import Arrow from '../../assets/Icons/Arrow'
import { ApplicationContext } from '../../pages/application/Application'
import getDateIndex from '../../util/getDateIndex'
import getDateSuffix from '../../util/getDateSuffix'
import useGlobalState from '../../util/useGlobalState'
import './ApplicationFooter.css'

export default function ApplicationFooter() {
    const globalState = useGlobalState().state
    const { user } = globalState
    const  { state, dispatch, handleNextPage } = useContext(ApplicationContext)
    const { page, item, confirmedStart, confirmedEnd, deliverySelected, pickupSelected, address, currentYear } = state
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthArray = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"]

    const clearDates = () => {
        dispatch({ type: 'setConfirmedEnd', data: null})
        dispatch({ type: 'setConfirmedStart', data: null})
        dispatch({ type: 'setSelectedEnd', data: null})
    }
    console.log('===', address)
    const handleClick = () => {
        let route
        if(page === 'ItemAvailability') route = 'ItemOptions'
        if(page === 'ItemOptions') {
            if((deliverySelected || pickupSelected) && (!address && !user?.address) ){
                return
            }
            route = 'ItemOverview'
        }
        if(page === 'ItemOverview') route = 'ItemAvailability'
        handleNextPage(route)
    }

    const calculatePrice = () => {
        let discountTimeSlots = 0
        if(item.discount > 0) discountTimeSlots = getDiscountTimeSlots()
        let price
        if(confirmedEnd.sameTimeSlot) {
            price = item.price 
        }
        const startIndex =  getDateIndex(confirmedStart.day) 
        const endIndex = getDateIndex(confirmedEnd.day)
        const totalDays = (endIndex - startIndex >= 0) ? endIndex - startIndex : getYearCrossoverDays(startIndex, endIndex)

        const totalTimeSlots = getTotalTimeSlots(totalDays)
        const weekendTimeSlots = totalTimeSlots - discountTimeSlots
        price = (weekendTimeSlots * item.price) + (discountTimeSlots * (item.price * (1 - item.discount / 100)))
        
        // Dont' calculate delivery and pickup if the user is looking at the calendar
        if(page === 'ItemAvailability' && !confirmedEnd.sameTimeSlot){
            return price.toFixed(2)
        }
        return (price + getCostOfExtras()).toFixed(2)
    }

    const getTotalTimeSlots = (totalDays) => {
        if(confirmedStart?.am && confirmedEnd?.am || confirmedStart?.pm && confirmedEnd?.pm){
            return (totalDays * 2) + 1
        }
        if(confirmedStart?.am && confirmedEnd?.pm){
            return (totalDays + 1) * 2
        }
        if(confirmedStart?.pm && confirmedEnd?.am){
            return totalDays * 2
        }
    }

    const getCostOfExtras = () => {
        let costOfExtras = 0
        if(deliverySelected){
            costOfExtras += item.deliveryPrice
        } 
        if(pickupSelected){
            costOfExtras += item.deliveryPrice 
        }
        return costOfExtras

    }
    const getYearCrossoverDays = (startIndex, endIndex) => {
        console.log(startIndex, endIndex)
        const nextYear = currentYear + 1
        const isLeapYear = (nextYear % 4 === 0 && nextYear % 100 !== 0) || nextYear % 400 === 0;
        const nextYearsDays = isLeapYear ? 366 : 365
        
        const crossoverDays = nextYearsDays - startIndex
        return crossoverDays + endIndex
    }

    const getDiscountTimeSlots = () => {
        const startDay = new Date(confirmedStart.day.getFullYear(), confirmedStart.day.getMonth(), confirmedStart.day.getDate())
        let timeSlots = 0
        while(startDay <= confirmedEnd.day) {
            const day = startDay.getDay()
            const date = startDay.getDate()
            if( day > 0 && day < 6 ){
                console.log('a')
                timeSlots += 2
            }
            startDay.setDate(date + 1)
        }
        if(confirmedStart?.pm && isWeekday(confirmedStart.day)) timeSlots -= 1
        if(confirmedEnd?.am && isWeekday(confirmedEnd.day)) timeSlots -= 1
        return timeSlots
    }

    const isWeekday = (dateObj) => {
        const day = dateObj.getDay()
        return day > 0 && day < 6
    } 
    return (
        <div className="ApplicationFooter">
         <div className="ApplicationFooterContainer">
            <div className="ApplicationFooterPriceContainer">
                <span>Total Price</span>
                <span className="ApplicatonFooterPrice">${calculatePrice()}</span>
            </div>
            <div className="ApplicationFooterDetailsContainer">
                <div className="ApplicationFooterDetails">
                    <span className="ApplicationFooterDetailsHeader">Collect</span>
                    <div>
                        <span className="ApplicationFooterTime">{confirmedStart?.am ? '8:00am' : '1:00pm'} </span>
                        <span className="ApplicationFooterDay">{dayArray[confirmedStart.day.getDay()]}</span>
                    </div>
                    <div>
                        <span>{ getDateSuffix(confirmedStart.day)} </span> 
                        <span>{ monthArray[confirmedStart.day.getMonth()]}</span>
                    </div>
                </div>
                <div className="ApplicationFooterArrowContainer">
                    <Arrow />
                </div>
                <div className="ApplicationFooterDetails">
                    <span className="ApplicationFooterDetailsHeader">Return</span>
                    <div>
                        <span className="ApplicationFooterTime">{confirmedEnd?.am ? '12:00pm' : '5:00pm'} </span>
                        <span className="ApplicationFooterDay">{dayArray[confirmedEnd.day.getDay()]}</span>
                    </div>
                    <div>
                        <span>{getDateSuffix(confirmedEnd.day)} </span>
                        <span>{ monthArray[confirmedEnd.day.getMonth()]}</span>
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

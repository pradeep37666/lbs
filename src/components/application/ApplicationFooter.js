import React, { useContext } from 'react'
import Arrow from '../../assets/Icons/Arrow'
import { ApplicationContext } from '../../pages/application/Application'

import getDateSuffix from '../../util/getDateSuffix'
import useGlobalState from '../../util/useGlobalState'
import './ApplicationFooter.css'
import Button from '../Button/Button'
import { pick } from 'query-string'

export default function ApplicationFooter() {
    const globalState = useGlobalState().state
    const { user } = globalState
    const  { state, dispatch, handleNextPage } = useContext(ApplicationContext)
    const { page, item, confirmedStart, confirmedEnd, deliverySelected, pickupSelected, address, currentYear, bookingPriceCalculator } = state
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthArray = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"]

    const clearDates = () => {
        dispatch({ type: 'setConfirmedEnd', data: null})
        dispatch({ type: 'setConfirmedStart', data: null})
        dispatch({ type: 'setSelectedEnd', data: null})
    }

    const handleClick = () => {
        let route
        if(page === 'ItemAvailability'){ 
            route = item.deliveryPrice > 0 ? 'ItemOptions' : 'ItemOverview'
        }
        if(page === 'ItemOptions') {
            if((deliverySelected || pickupSelected) && (!address && !user?.address) ){
                return
            }
            route = 'ItemOverview'
        }
        if(page === 'ItemOverview') route = 'ItemAvailability'
        handleNextPage(route)
    }
    console.log(deliverySelected, pickupSelected)
    return (
        <div className="ApplicationFooter">
         <div className="ApplicationFooterContainer">
            <div className="ApplicationFooterPriceContainer">
                <span>Total Price</span>
                <span className="ApplicatonFooterPrice">${bookingPriceCalculator ? bookingPriceCalculator.getTotalPrice() : null }</span>
            </div>
            <div className="ApplicationFooterDetailsContainer">
                <div className="ApplicationFooterDetails">
                    <span className="ApplicationFooterDetailsHeader">Collect</span>
                    <div>
                        <span className="ApplicationFooterTime">{confirmedStart?.am ? '8:00am' : '1:00pm'} </span>
                        <span className="ApplicationFooterDay">{dayArray[confirmedStart.dateObj.getDay()]}</span>
                    </div>
                    <div>
                        <span>{ getDateSuffix(confirmedStart.dateObj)} </span> 
                        <span>{ monthArray[confirmedStart.dateObj.getMonth()]}</span>
                    </div>
                </div>
                <div className="ApplicationFooterArrowContainer">
                    <Arrow />
                </div>
                <div className="ApplicationFooterDetails">
                    <span className="ApplicationFooterDetailsHeader">Return</span>
                    <div>
                        <span className="ApplicationFooterTime">{confirmedEnd?.am ? '12:00pm' : '5:00pm'} </span>
                        <span className="ApplicationFooterDay">{dayArray[confirmedEnd.dateObj.getDay()]}</span>
                    </div>
                    <div>
                        <span>{getDateSuffix(confirmedEnd.dateObj)} </span>
                        <span>{ monthArray[confirmedEnd.dateObj.getMonth()]}</span>
                    </div>
                </div>
            </div>
            <div className="ApplicationFooterButtonContainer">
                { page === 'ItemAvailability' &&
                <Button 
                text="Clear Dates"
                onClick={clearDates}
                invertedColors
                style={{ marginRight: '0.5rem'}}
                />}
                <Button 
                onClick={handleClick}
                text="Next"
                isDisabled={page === 'ItemOptions' && (!address && (deliverySelected || pickupSelected))}
                />
            </div>
            
            </div>
        </div>
    )
}

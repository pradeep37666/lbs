import React, { useContext, useEffect } from 'react'
import './ApplicationFooter.css'
import { ApplicationContext } from '../../pages/application/Application'
import useGlobalState from '../../util/useGlobalState'
import Button from '../Button/Button'
import BookingDatesPanel from '../BookingDatesPanel/BookingDatesPanel'

export default function ApplicationFooter() {
    const globalState = useGlobalState().state
    const { user } = globalState
    const  { state, dispatch, handleNextPage } = useContext(ApplicationContext)
    const { 
        page, item, confirmedStart, confirmedEnd,
        deliverySelected, pickupSelected, address, 
        currentYear, bookingPriceCalculator 
    } = state

    const clearDates = () => {
        dispatch({ type: 'setConfirmedEnd', data: null})
        dispatch({ type: 'setConfirmedStart', data: null})
        dispatch({ type: 'setSelectedEnd', data: null})
    }

    const handleClick = () => {
        let route
        if(page === 'ItemAvailability'){ 
            route = item.deliveryPrice > 0 
            ? 'ItemOptions' 
            : 'ItemOverview'
        }
        if(page === 'ItemOptions') {
            if(
                (deliverySelected || pickupSelected) && 
                (!address && !user?.address) 
            ){ return }
            route = 'ItemOverview'
        }
        if(page === 'ItemOverview') route = 'ItemAvailability'
        handleNextPage(route)
    }
    
    return (
        <div className="ApplicationFooter">
         <div className="ApplicationFooterContainer">
            <div className="ApplicationFooterPriceContainer">
                <span>Total Price</span>
                <span className="ApplicatonFooterPrice">${bookingPriceCalculator ? bookingPriceCalculator.getTotalPrice() : null }</span>
            </div>
           <BookingDatesPanel 
           startDate={confirmedStart}
           endDate={confirmedEnd}
           
           />
            <div className="ApplicationFooterButtonContainer">
                { page === 'ItemAvailability' &&
                <Button 
                text="Clear Dates"
                onClick={clearDates}
                invertedColors
                style={{ marginRight: '0.5rem'}}
                />
                }
                <Button 
                onClick={handleClick}
                text="Next"
                isDisabled={page === 'ItemOptions' && 
                    (!address && (deliverySelected || pickupSelected))
                }
                />
            </div>
            
            </div>
        </div>
    )
}

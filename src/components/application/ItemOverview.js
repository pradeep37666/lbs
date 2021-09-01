import React, { useContext } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import {ReactComponent as StarFilled} from '../../assets/Icons/StarFilled.svg'
import './ItemOverview.css'
import getDateIndex from '../../util/getDateIndex'

export default function ItemOverview() {
    const { state, dispatch } = useContext(ApplicationContext)
    const { item, confirmedEnd, confirmedStart, deliverySelected, pickupSelected,  } = state

    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthArray = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"]

    const handleDate = (confirmedDate) => {
        const date = confirmedDate.day.getDate()
        const dateString = date.toString()
        const lastChar = dateString.charAt(dateString.length - 1)

        switch(lastChar){
        case '1' : {
            if(date > 10 && date < 20){
                return date + 'th'
            }
            return date + 'st'
        }
        case '2' : {
            if(date > 10 && date < 20){
                return date + 'th'
            }
            return date + 'nd'
        }
        case '3' : {
            if(date > 10 && date < 20){
                return date + 'th'
            }
            return date + 'rd'
        }
        default : return date + 'th'
        }
    }
    
    const calculatePrice = () => {
        if(confirmedEnd.sameTimeSlot) return item.price
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

    const calculateBorrowOptions = () => {
        return ((deliverySelected ? item.deliveryPrice : 0) + (pickupSelected ? item.deliveryPrice : 0))
    }

    return (
        <div className="ItemOverviewContainer">
            <div className="ApplicationOverviewContainer">
                <span className="ApplicationOverviewHeader">Application Overview</span>
                <div>
                    <p>Item</p>
                    <p>{item.title}</p>
                </div>
                <div>
                    <p>Itemised Costs</p>
                    <div className="ItemOverviewItemContainer">
                        <p>Cost for items</p>
                        <span className="ItemOverviewPrice">${calculatePrice()}</span>
                    </div>
                    <div>
                        <div className="ItemOverviewItemContainer">
                            <p>Borrow options total</p>
                            <span className="ItemOverviewPrice">${calculateBorrowOptions()}</span>
                        </div>
                        { deliverySelected && 
                        <div className="ItemOverviewItemContainer">
                            <span>Item Delivery</span>
                            <span className="ItemOverviewPrice">${item.deliveryPrice}</span>
                        </div>}
                    </div>
                    
                    <div className="ItemOverviewItemContainer">
                        <p>Total Price</p>
                        <span className="ItemOverviewPrice">${ calculatePrice() + calculateBorrowOptions()}</span>
                    </div>
                    <div className="ItemOverviewItemContainer">
                        <p>Itemised Extras</p>
                        <span 
                        onClick={() => dispatch({ type: 'setPage', data: 'ItemOptions'})}
                        className="ItemOverviewEditButton"
                        >
                            Edit Options
                        </span>
                    </div>
                </div>
            </div>
            <div className="ApplicationOverviewContainer">
                <div className="ItemOverviewItemContainer">
                    <span className="ApplicationOverviewHeader">Dates</span>
                    <span 
                    onClick={() => dispatch({ type: 'setPage', data: 'ItemAvailability'})}
                    className="ItemOverviewEditButton"
                    >
                        Edit Dates
                    </span>
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
                <div className="ApplicationFooterArrowContainer">
                    <span className="ApplciationFooterArrow">{'\u2192'}</span>
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
            </div>
        </div>
    )
}

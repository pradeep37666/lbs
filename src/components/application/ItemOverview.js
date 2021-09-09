import React, { useContext } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import {ReactComponent as StarFilled} from '../../assets/Icons/StarFilled.svg'
import './ItemOverview.css'
import getDateIndex from '../../util/getDateIndex'
import Arrow from '../../assets/Icons/Arrow'
import ApplicationItemCard from './ApplicationItemCard'
import instance from '../../util/axios'
import { useHistory } from 'react-router'
import { CometChat } from '@cometchat-pro/chat'
import useGlobalState from '../../util/useGlobalState'
import axios from 'axios'

export default function ItemOverview() {
    const { state, dispatch } = useContext(ApplicationContext)
    const globalState = useGlobalState()
    const user  = globalState.state.user
    const { page, item, confirmedEnd, confirmedStart, deliverySelected, pickupSelected } = state

    const history = useHistory()
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
    
    // const calculatePrice = () => {
    //     if(confirmedEnd.sameTimeSlot) return item.price
    //     const days = getDateIndex(confirmedEnd.day) - getDateIndex(confirmedStart.day)
    //     let timeSlots
    //     if(confirmedStart?.am && confirmedEnd?.am || confirmedStart?.pm && confirmedEnd?.pm){
    //         timeSlots = (days * 2) + 1
    //     }
    //     if(confirmedStart?.am && confirmedEnd?.pm){
    //         timeSlots = (days + 1) * 2
    //     }
    //     if(confirmedStart?.pm && confirmedEnd?.am){
    //         timeSlots = days * 2
    //     }
    //     return item.price * timeSlots 
    // }

    const calculatePrice = () => {
        let discountTimeSlots = 0
        if(item.discount > 0) discountTimeSlots = calculateDiscountTimeSlots()
        let price
        if(confirmedEnd.sameTimeSlot) {
            price = item.price 
        }
        const days = getDateIndex(confirmedEnd.day) - getDateIndex(confirmedStart.day)
        let totalTimeSlots
        if(confirmedStart?.am && confirmedEnd?.am || confirmedStart?.pm && confirmedEnd?.pm){
            totalTimeSlots = (days * 2) + 1
        }
        if(confirmedStart?.am && confirmedEnd?.pm){
            totalTimeSlots = (days + 1) * 2
        }
        if(confirmedStart?.pm && confirmedEnd?.am){
            totalTimeSlots = days * 2
        }
        const weekendTimeSlots = totalTimeSlots - discountTimeSlots
        price = (weekendTimeSlots * item.price) + (discountTimeSlots * (item.price * (1 - item.discount / 100)))
        return price 
    }

    const calculateTotalPrice = () => {
        let price
        if(confirmedEnd.sameTimeSlot) {
            price = item.price 
        }
        const days = getDateIndex(confirmedEnd.day) - getDateIndex(confirmedStart.day)
        let totalTimeSlots
        if(confirmedStart?.am && confirmedEnd?.am || confirmedStart?.pm && confirmedEnd?.pm){
            totalTimeSlots = (days * 2) + 1
        }
        if(confirmedStart?.am && confirmedEnd?.pm){
            totalTimeSlots = (days + 1) * 2
        }
        if(confirmedStart?.pm && confirmedEnd?.am){
            totalTimeSlots = days * 2
        }
        price = item.price * totalTimeSlots
        return price
    }

    const calculateDiscountTimeSlots = () => {
        const startDay = new Date(confirmedStart.day.getFullYear(), confirmedStart.day.getMonth(), confirmedStart.day.getDate())
        let timeSlots = 0
        while(startDay <= confirmedEnd.day) {
            const day = startDay.getDay()
            const date = startDay.getDate()
            if( day > 0 && day < 6 ){
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
    const calculateBorrowOptions = () => {
        return ((deliverySelected ? item.deliveryPrice : 0) + (pickupSelected ? item.deliveryPrice : 0))
    }

    const saveBooking = async () => {
        let deliveryOption = (deliverySelected && pickupSelected) ? 'both' : deliverySelected ? 'delivery' : 'pickup'
        const startIndex = (getDateIndex(confirmedStart.day) * 2) + (confirmedStart.day?.am ? 2 : 1)
        const endIndex = (getDateIndex(confirmedEnd.day) * 2) + (confirmedEnd.day?.am ? 2 : 1)
        try{
            const { data, status } = await instance.post('booking/save', {
                i_id: item.i_id,
                io_id: item.u_id,
                deliveryOption,
                startDate: startIndex,
                endDate: endIndex
            })
            sendEnquiry(item)
            history.push({ 
                pathname: `/item/${item.i_id}`, 
                state: {bookingCreated: true, price: calculatePrice()}
            })
        } catch(e) {
            console.log(e.response.error.message)
        }
        
    }

    const unblockUser = async () => {
        const res = await axios.delete(`https://192491b43d1b6230.api-US.cometchat.io/v3.0/users/${item.u_id}/blockedusers`, {
            headers: {
                'apiKey' : process.env.REACT_APP_CHAT_API_KEY
            },
            data: {
                blockedUids: [user.id]
            }
        })
        console.log('res', res)
        // const usersList = [user.id, item.u_id]
        // CometChat.unblockUsers(usersList).then(
        //     list => {
        //       console.log("users list unblocked", { list });
        //     },
        //     error => {
        //       console.log("unblocking user fails with error", error);
        //     }
        //   );
    }
    const sendEnquiry = async (item) => {
        await unblockUser()
        const textMessage = new CometChat.TextMessage(item.u_id, `${user.fullName} has enquired about your ${item.title}`, CometChat.RECEIVER_TYPE.USER)
        textMessage.setMetadata({ enquiry: true, itemName: item.title })
        try{
            const res = await CometChat.sendMessage(textMessage)
            console.log(res)
        } catch(e) {
            console.log(e)
        }
    }

    return (
            <div className="ApplicationOverviewContainer">
                <span className="ApplicationOverviewHeader">Application Overview</span>
                <ApplicationItemCard item={item}/>
                <div>
                    <span className="ApplicationOverviewSubHeader">Itemised Costs</span>
                    <div className="ItemOverviewItemContainer">
                        <p>Cost for items</p>
                        <span className="ItemOverviewPrice">${calculateTotalPrice()}</span>
                    </div>
                    <div className="ItemOverviewBorrowContainer">
                        <div className="ItemOverviewItemContainer">
                            <p>Borrow options total</p>
                            <span className="ItemOverviewPrice">${calculateBorrowOptions()}</span>
                        </div>
                        { deliverySelected && 
                        <div className="ItemOverviewItemContainer">
                            <span className="ItemOverviewSmallText">Item Delivery</span>
                            <span className="ItemOverviewSmallText">${item.deliveryPrice}</span>
                        </div>}
                        { pickupSelected && 
                        <div className="ItemOverviewItemContainer">
                            <span className="ItemOverviewSmallText">Item Pickup</span>
                            <span className="ItemOverviewSmallText">${item.deliveryPrice}</span>
                        </div>}
                    </div>
                    <div className="ItemOverviewItemContainer">
                        <span className="ItemOverviewSmallText">Off Peak Discount </span>
                        <span className="ItemOverviewSmallText">-${calculateDiscountTimeSlots() * item.price * (item.discount / 100)}</span>

                    </div>
                    <div className="ItemOverviewItemContainer">
                        <p>Total Price</p>
                        <span className="ItemOverviewPrice">${ calculatePrice() + calculateBorrowOptions()}</span>
                    </div>
                    <div className="ItemOverviewItemContainer">
                        <span className="ApplicationOverviewSubHeader">Dates</span>
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
                            <span className="ApplicationFooterTime">{confirmedStart?.am ? '8:00am' : '1:00pm'} </span>
                            <span>{dayArray[confirmedStart.day.getDay()]}</span>
                        </div>
                        <div>
                            <span>{ handleDate(confirmedStart)} </span>
                            <span>{ monthArray[confirmedStart.day.getMonth()]}</span>
                        </div>
                    </div>
                    <div className="ApplicationFooterArrowContainer">
                        <Arrow />
                    </div>
                    <div className="ApplicationFooterDetails">
                        <p>Return</p>
                        <div>
                            <span className="ApplicationFooterTime">{confirmedEnd?.am ? '12:00pm' : '5:00pm'} </span>
                            <span>{dayArray[confirmedEnd.day.getDay()]}</span>
                        </div>
                        <div>
                            <span>{handleDate(confirmedEnd)} </span>
                            <span>{ monthArray[confirmedEnd.day.getMonth()]} </span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <div className="ItemOverviewSendButton" onClick={saveBooking}>
                <span className="ItemOverviewSendText">Send</span>
            </div>
                
            
            </div>
    )
}

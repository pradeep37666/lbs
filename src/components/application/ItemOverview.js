import React, { useContext, useState } from 'react'
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
import Button from '../Button/Button'

export default function ItemOverview() {
    const [isLoading, setIsLoading] = useState(false)
    const { state, dispatch } = useContext(ApplicationContext)
    const globalState = useGlobalState()
    const user  = globalState.state.user
    const { item, confirmedEnd, confirmedStart, deliverySelected, pickupSelected, address, currentYear, bookingPriceCalculator } = state

    const history = useHistory()
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthArray = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"]

    const getDateSuffix = (confirmedDate) => {
        const date = confirmedDate.dateObj.getDate()
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
    
    const saveBooking = async () => {

        let deliveryOption = (deliverySelected && pickupSelected) ? 'both' : deliverySelected ? 'delivery' : 'pickup'
        if(!deliverySelected && !pickupSelected) {
            deliveryOption = 'none'
        }
        const startIndex = (getDateIndex(confirmedStart.dateObj) * 2) + (confirmedStart.timeslot === 'morning' ? 1 : 2)
        let endIndex = (getDateIndex(confirmedEnd.dateObj) * 2) + (confirmedEnd.timeslot === 'morning' ? 1 : 2)
        if(endIndex < startIndex){
            endIndex += 730
        }
        confirmedStart.dateObj.setHours(confirmedStart?.am ? 6 : 12)
        
        const price = bookingPriceCalculator.getTotalPrice()

        setIsLoading(true)
        try{
            await instance.post(`booking/save/${confirmedStart.dateObj.getTime()}`, {
                i_id: item.i_id,
                io_id: item.u_id,
                deliveryOption,
                startDate: startIndex,
                endDate: endIndex,
                year: currentYear,
                address: address ? address : user.address,
                price
            })
            await sendEnquiry(item)
            setIsLoading(false)
            history.push({ 
                pathname: `/item/${item.i_id}`, 
                state: { bookingCreated: true, price }
            })
        } catch(e) {
            setIsLoading(false)
            console.log(e.response)
        }
        
    }

    const unblockUser = async () => {
        var blockedUsersRequest = new CometChat.BlockedUsersRequestBuilder()
        .setLimit(10)
        .build();
        const blockedUsers = await blockedUsersRequest.fetchNext()
        let userId, blockedId
        // Applicant has blocked the item owner
        if(blockedUsers.find(user => user.uid === item.u_id)){
            userId = user.id
            blockedId = item.u_id
        } else {
            // Item owner has blocked the applicant
            userId = item.u_id
            blockedId = user.id
        }
        try{
            
            const res = await axios.delete(`https://192491b43d1b6230.api-US.cometchat.io/v3.0/users/${userId}/blockedusers`, {
                headers: {
                    'apiKey' : process.env.REACT_APP_CHAT_API_KEY
                },
                data: {
                    blockedUids: [blockedId]
                }
            })
            console.log('response from unblock function', res)
            return
        } catch(e) {
            console.log(e)
            return
        }
    }

    const sendEnquiry = async (item) => {
        await unblockUser()
        const textMessage = new CometChat.TextMessage(item.u_id, `${user.fullName} has enquired about your ${item.title}`, CometChat.RECEIVER_TYPE.USER)
        textMessage.setMetadata({ enquiry: true, itemName: item.title })
        try{
            const res = await CometChat.sendMessage(textMessage)
            console.log('message', res)
        } catch(e) {
            console.log(e)
        }
    }

    return (
            <div className="ApplicationOverviewContainer">
                <div className="ItemOverviewCardContainer">
                    <span className="ApplicationOverviewHeader">Application Overview</span>
                    <ApplicationItemCard item={item}/>
                </div>
                
                <div>
                    <span className="ApplicationOverviewSubHeader">Itemised Costs</span>
                    <div className="ItemOverviewItemContainer">
                        <p>Cost for items</p>
                        <span className="ItemOverviewPrice">${bookingPriceCalculator.getPriceWithoutExtras()}</span>
                    </div>
                    <div className="ItemOverviewBorrowContainer">
                        <div className="ItemOverviewItemContainer">
                            <p>Borrow options total</p>
                            <span className="ItemOverviewPrice">${bookingPriceCalculator.getPriceOfExtras()}</span>
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
                        <span className="ItemOverviewSmallText">-${bookingPriceCalculator.getOffPeakDiscount()}</span>

                    </div>
                    <div className="ItemOverviewItemContainer">
                        <p>Total Price</p>
                        <span className="ItemOverviewPrice">${bookingPriceCalculator.getTotalPrice()}</span>
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
                            <span>{dayArray[confirmedStart.dateObj.getDay()]}</span>
                        </div>
                        <div>
                            <span>{ getDateSuffix(confirmedStart) } </span>
                            <span>{ monthArray[confirmedStart.dateObj.getMonth()]}</span>
                        </div>
                    </div>
                    <div className="ApplicationFooterArrowContainer">
                        <Arrow />
                    </div>
                    <div className="ApplicationFooterDetails">
                        <p>Return</p>
                        <div>
                            <span className="ApplicationFooterTime">{confirmedEnd?.am ? '12:00pm' : '5:00pm'} </span>
                            <span>{dayArray[confirmedEnd.dateObj.getDay()]}</span>
                        </div>
                        <div>
                            <span>{ getDateSuffix(confirmedEnd) } </span>
                            <span>{ monthArray[confirmedEnd.dateObj.getMonth()]} </span>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            <Button 
            onClick={saveBooking}
            text="Send"
            isLoading={isLoading}
            style={{ width: '75%', alignSelf: 'center', marginTop: '1rem'}}
            />
                
            
            </div>
    )
}

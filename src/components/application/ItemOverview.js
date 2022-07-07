import React, { useContext, useState } from 'react'
import './ItemOverview.css'
import { ApplicationContext } from '../../pages/application/Application'
import checkIfLeapYear from '../../util/dateUtils/checkIfLeapYear'
import getDateIndex from '../../util/dateUtils/getDateIndex'
import Arrow from '../../assets/Icons/Arrow'
import ApplicationItemCard from './ApplicationItemCard'
import { useHistory } from 'react-router'
import { CometChat } from '@cometchat-pro/chat'
import useGlobalState from '../../util/useGlobalState'
import Button from '../Button/Button'
import getDateSuffix from '../../util/dateUtils/getDateSuffix'
import { fullNameDayArray, monthArray } from '../../assets/Data/LBSArray'
import { BOOKING_STATUSES } from '../../assets/Data/LBSEnum'
import Instance, { CometChatInstance } from '../../util/axios'

export default function ItemOverview() {
    const [ isLoading, setIsLoading ] = useState(false)
    const { state, dispatch } = useContext(ApplicationContext)
    const globalState = useGlobalState()
    const user  = globalState.state.user
    const { 
        item, confirmedEnd, confirmedStart, 
        deliverySelected, pickupSelected, address, 
        currentYear, bookingPriceCalculator, currentMonth 
    } = state

    const history = useHistory()
    
    const saveBooking = async () => {
        const bookingInfo = getBookingInfo()
        try{
            setIsLoading(true)
            await makeBooking(bookingInfo, item)
        } catch(e) {
            console.log(e.response)
        } finally {
            setIsLoading(false)
        }
    }

    const getBookingInfo = () => {
        let deliveryOption = (deliverySelected && pickupSelected) ? 'BOTH' : deliverySelected ? 'DELIVERY' : 'PICKUP'
        if(!deliverySelected && !pickupSelected) deliveryOption = 'NONE'
        const startIndex = (getDateIndex(confirmedStart))
        let endIndex = (getDateIndex(confirmedEnd))
        let bookingYear = currentYear
        if(currentMonth >= 10 && startIndex < 200){
            bookingYear += 1
        }
        if((endIndex < startIndex) && (startIndex <= checkIfLeapYear(currentYear) ? 730 : 732)){
            endIndex += checkIfLeapYear(currentYear) ? 731 : 729
        }
        const bookingStartTime = new Date(confirmedStart.dateObj.getTime())
        bookingStartTime.setHours(confirmedStart?.am ? 6 : 12)
        const price = bookingPriceCalculator.getTotalPrice()
        return ({
            borrowerAddress: address ?? '',
            lenderId: item.userId,
            borrowerId: user.id,
            itemId: item.id,
            status: BOOKING_STATUSES.APPLIED,
            error: false,
            deliveryOption,
            startDateIndex: startIndex,
            endDateIndex: endIndex,
            startYear: bookingYear,
            endYear: confirmedEnd.dateObj.getFullYear(),
            price,
        })
    }

    const unblockUser = async () => {
        try{
            let blockedUsersRequest = new CometChat.BlockedUsersRequestBuilder().setLimit(10).build()
            const blockedUsers = await blockedUsersRequest.fetchNext()
            let userId, blockedId
            // Applicant has blocked the item owner
            if(blockedUsers.find(user => user.uid === item.userId)){
                userId = user.id
                blockedId = item.userId
            } else {
                // Item owner has blocked the applicant
                userId = item.userId
                blockedId = user.id
            }
            await CometChatInstance.delete(`/users/${userId}/blockedusers`, {
                headers: { 'apiKey' : process.env.REACT_APP_CHAT_API_KEY },
                data: { blockedUids: [blockedId] }
            })
        } catch(e) {
            console.log(e)
        }
    }

    const sendEnquiry = async (item) => {
        await unblockUser()
        const textMessage = new CometChat.TextMessage(item.userId, `${user.firstName} ${user.lastName} has enquired about your ${item.title}`, CometChat.RECEIVER_TYPE.USER)
        textMessage.setMetadata({ enquiry: true, itemName: item.title })
        try{
            await CometChat.sendMessage(textMessage)
        } catch(e) {
            console.log(e.response)
        }
    }

    const makeBooking = async (bookingInfo, item) => {
        const { data } = await Instance.post('/bookings', bookingInfo)
        await sendEnquiry(item)
        if (!data) return
        history.push({
            pathname: `/item/${item.id}`,
            state: { bookingCreated: true, price: bookingInfo.price}
        })
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
                            <span>{fullNameDayArray[confirmedStart.dateObj.getDay()]}</span>
                        </div>
                        <div>
                            <span>{ getDateSuffix(confirmedStart.dateObj) } </span>
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
                            <span>{fullNameDayArray[confirmedEnd.dateObj.getDay()]}</span>
                        </div>
                        <div>
                            <span>{ getDateSuffix(confirmedEnd.dateObj) } </span>
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

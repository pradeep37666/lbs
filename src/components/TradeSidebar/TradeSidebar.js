import React, { useEffect, useState } from 'react'
import './TradeSidebar.css'
import Instance from '../../util/axios'
import getDateObject from '../../util/dateUtils/getDateObject'
import ApplicationItemCard from '../application/ApplicationItemCard'
import { Avatar, CircularProgress } from '@material-ui/core'
import getImage from '../../util/getImage'
import useGlobalState from '../../util/useGlobalState'
import RatingFiller from '../ratingFiller/ratingFiller'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'
import TradeCalendarStatusPanel from '../tradeCalendar/tradeCalendarStatusPanel/TradeCalendarStatusPanel'
import BookingPriceCalculator from '../../util/BookingPriceCalculator'
import BookingDatesPanel from '../BookingDatesPanel/BookingDatesPanel'
import { DELIVERY_OPTIONS } from '../../assets/Data/LBSEnum'

export default function TradeSidebar({ 
    booking, 
    getBookings, 
    setReportModalVisible, 
    setReviewModalVisible 
}) {
    const { state } = useGlobalState()
    const { user } = state
    const [ item, setItem ] = useState(null)
    const [ userDetails, setUserDetails ] = useState()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ bookingPriceCalculator, setBookingPriceCalculator ] = useState()

    useEffect(() => {
        if (!booking.item) return
        setItem(booking.item)
        getUserDetails()
    },[booking])

    useEffect(() => {
        if(!item) return
        const beginDate = getDateObject(booking.startDateIndex)
        const endDate = getDateObject(booking.endDateIndex)
        const newBookingPriceCalculator = new BookingPriceCalculator(item.price, item.discount, item.deliveryPrice, item.pickupPrice, beginDate, endDate)
        newBookingPriceCalculator.setDeliverySelected(booking.deliveryOption === DELIVERY_OPTIONS.BOTH || booking.deliveryOption === DELIVERY_OPTIONS.DELIVERY)
        newBookingPriceCalculator.setPickupSelected(booking.deliveryOption === DELIVERY_OPTIONS.BOTH || booking.deliveryOption === DELIVERY_OPTIONS.PICKUP)
        console.log({newBookingPriceCalculator})
        setBookingPriceCalculator(newBookingPriceCalculator)
    },[item])

    const getUserDetails = async () => {
        const userId = user.id === booking.lenderId ? booking.borrowerId : booking.lenderId
        try{
            setIsLoading(true)
            const {data, status} = await Instance.get(`users/${userId}`)
            if(status !== 200) return
            setUserDetails(data)
        } catch(err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const calculateTotal = () => {
        let total
        if (!bookingPriceCalculator.deliveryPrice && !bookingPriceCalculator.pickupPrice)
            total = booking.price
        if (bookingPriceCalculator.deliveryPrice && !bookingPriceCalculator.pickupPrice)
            total = booking.price - bookingPriceCalculator.deliveryPrice
        if (!bookingPriceCalculator.deliveryPrice && bookingPriceCalculator.pickupPrice)
            total = booking.price - bookingPriceCalculator.pickupPrice
        if (bookingPriceCalculator.deliveryPrice && bookingPriceCalculator.pickupPrice)
            total = booking.price - bookingPriceCalculator.deliveryPrice - bookingPriceCalculator.pickupPrice
        return parseFloat(total).toFixed(2)
    }

    return (
        <div className="TradeSidebarContainer">

            { isLoading ? (
                <CircularProgress style={{ justifySelf: 'center', alignSelf: 'center'}} color="inherit" />
            ) : (
            <>
                <div className="TradeSidebarSection">
                    <span className="TradeSidebarHeading">Trade Details</span>
                </div>
                <div className="TradeSidebarSection">
                    <span className="TradeSidebarSubHeading">Item</span>
                    <ApplicationItemCard 
                        price={item.price}
                        item={item}
                    />
                </div>
                <div className="TradeSidebarSection">
                    <TradeCalendarStatusPanel 
                        getBookings={getBookings} 
                        booking={booking} 
                        userDetails={userDetails} 
                        setReportModalVisible={setReportModalVisible}
                        setReviewModalVisible={setReviewModalVisible}
                        startDate={bookingPriceCalculator.start}
                        endDate={bookingPriceCalculator.end}
                    />
                </div>
                <div className="TradeSidebarSection">
                    <div className="TradeSidebarSubHeading">
                        <span >Itemised Costs</span>
                    </div>
                    <div className="TradeSidebarCostFlex">
                        <span>Cost for Item </span>
                        <span className="ItemOverviewPrice">
                            ${calculateTotal()}
                        </span>
                    </div>
                    { bookingPriceCalculator.deliverySelected &&
                    <div className="TradeSidebarCostFlex">
                        <span>Item Delivery </span>
                        <span className="ItemOverviewPrice">
                            ${parseFloat(bookingPriceCalculator.deliveryPrice).toFixed(2)}
                        </span>
                    </div>}
                    { bookingPriceCalculator.pickupSelected &&
                    <div className="TradeSidebarCostFlex">
                        <span>Item Pickup </span>
                        <span className="ItemOverviewPrice">
                            ${parseFloat(bookingPriceCalculator.pickupPrice).toFixed(2)}
                        </span>
                    </div>}
                    <div className="TradeSidebarCostFlex" style={{ paddingTop: '1rem', borderTop: '1px solid #31364c'}}>
                        <span>Total Price</span>
                        <span className="ItemOverviewPrice">${ bookingPriceCalculator.getTotalPrice() }</span>
                    </div>
                </div>
                <div className="TradeSidebarSection">
                    <span className="TradeSidebarHeading">Dates</span>
                   <BookingDatesPanel 
                   startDate={bookingPriceCalculator.start}
                   endDate={bookingPriceCalculator.end}
                   />
                </div>
                {booking.deliveryOption !== DELIVERY_OPTIONS.NONE &&
                 <div className="TradeSidebarSection">
                    <div className="TradeSidebarLocationContainer">
                        {booking.deliveryOption === DELIVERY_OPTIONS.BOTH &&
                        <>
                        <span className="TradeSidebarHeading BorrowerAddressLocation">Delivery / Pickup Location</span>
                        <span style={{ textAlign: 'center'}}>{booking.borrowerAddress?.fullAddress}</span>
                        </>
                        }
                        {booking.deliveryOption === DELIVERY_OPTIONS.DELIVERY &&
                        <>
                        <span className="TradeSidebarHeading BorrowerAddressLocation">Delivery Location</span>
                        <span style={{ textAlign: 'center'}}>{booking.borrowerAddress?.fullAddress}</span>
                        </>
                        }
                        {booking.deliveryOption === DELIVERY_OPTIONS.PICKUP &&
                        <>
                        <span className="TradeSidebarHeading BorrowerAddressLocation">Pickup Location</span>
                        <span style={{ textAlign: 'center'}}>{booking.borrowerAddress?.fullAddress}</span>
                        </>
                        }
                    </div>
                </div>
                }
                {userDetails &&
                <div className="TradeSidebarSection">
                    <div className="TradeSidebarHeading">
                      <span >Applicant Overview</span>  
                    </div>
                    <div className="TradeSidebarUserContainer">
                        <div className="TradeSidebarUserAvatar">
                            <Avatar 
                                sizes='' 
                                src={userDetails.avatar ? getImage(userDetails.avatar) : MissingProfile} 
                            />
                        </div>
                        <div>
                            <span className="TradeSidebarUserName">{userDetails.fullName}</span> 
                            <div className="TradeSidebarUserRatingContainer">
                                <span>Lender:</span>
                                <span> {userDetails.lender_rating}/5</span>
                                <RatingFiller rating={userDetails.lender_rating}/>
                            </div>
                            <div className="TradeSidebarUserRatingContainer">
                                <span>Borrower: </span>
                                <span>{userDetails.borrower_rating}/5</span>
                                <RatingFiller rating={userDetails.borrower_rating}/>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </>
            )}
        </div>
    )
}

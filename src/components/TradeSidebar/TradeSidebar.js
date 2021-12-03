import React, {useEffect, useState} from 'react'
import Instance from '../../util/axios'
import getDateObject from '../../util/dateUtils/getDateObject'
import ApplicationItemCard from '../application/ApplicationItemCard'
import Arrow from '../../assets/Icons/Arrow.js'
import getDateSuffix from '../../util/dateUtils/getDateSuffix'
import './TradeSidebar.css'
import { Avatar, CircularProgress } from '@material-ui/core'
import getImage from '../../util/getImage'
import useGlobalState from '../../util/useGlobalState'
import RatingFiller from '../ratingFiller/ratingFiller'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'
import TradeCalendarStatusPanel from '../tradeCalendar/tradeCalendarStatusPanel/TradeCalendarStatusPanel'
import BookingPriceCalculator from '../../util/BookingPriceCalculator'
import BookingDatesPanel from '../BookingDatesPanel/BookingDatesPanel'

export default function TradeSidebar({ booking, getBookings, setReportModalVisible, setReviewModalVisible }) {
    const { state } = useGlobalState()
    const { user } = state
    const [item, setItem] = useState(null)
    const [userDetails, setUserDetails] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [bookingPriceCalculator, setBookingPriceCalculator] = useState()


    useEffect(() => {
        setIsLoading(true)
        const getItemDetails = async () => {
            try{
               const { data, status } = await Instance.get(`items/findByIid?i_id=${booking.i_id}&u_id=${booking.u_id}`)
                if(status !== 200) return 
                setItem(data.item) 
                getUserDetails()
            } catch(e) {
                console.log(e)
            }
            setIsLoading(false)
        }
        getItemDetails()
    },[booking])

    useEffect(() => {
        if(!item) return
        const beginDate = getDateObject(booking.start_date)
        const endDate = getDateObject(booking.end_date)
        const newBookingPriceCalculator = new BookingPriceCalculator(item.price, item.discount, item.deliveryPrice, beginDate, endDate)
        newBookingPriceCalculator.setDeliverySelected(booking.delivery_option === "both" || booking.delivery_option === "delivery")
        newBookingPriceCalculator.setPickupSelected(booking.delivery_option === "both" || booking.delivery_option === "pickup")
        setBookingPriceCalculator(newBookingPriceCalculator)
    },[item])

    const getUserDetails = async () => {
        const id = booking.io_id === user.id ? booking.u_id : booking.io_id
        try{
           const {data, status} = await Instance.get(`/user/getOneUser?id=${id}`)
           if(status !== 200) return
           
           console.log(data)
           setUserDetails(data)
        } catch(err) {
            console.log(err)
        }
        
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
                    item={item}/>
                </div>
                <div className="TradeSidebarSection">
                    <TradeCalendarStatusPanel 
                    getBookings={getBookings} 
                    booking={booking} 
                    userDetails={userDetails} 
                    setReportModalVisible={setReportModalVisible}
                    setReviewModalVisible={setReviewModalVisible}
                    />

                </div>
                <div className="TradeSidebarSection">
                    <div className="TradeSidebarSubHeading">
                        <span >Itemised Costs</span>
                    </div>
                    
                    <div className="TradeSidebarCostFlex">
                        <span>Cost for Item </span>
                        <span className="ItemOverviewPrice">${ bookingPriceCalculator.getPriceWithoutExtras() }</span>
                    </div>
                    { bookingPriceCalculator.deliverySelected &&
                    <div className="TradeSidebarCostFlex">
                        <span>Item Delivery </span>
                        <span className="ItemOverviewPrice">${bookingPriceCalculator.deliveryPrice}</span>
                    </div>}
                    { bookingPriceCalculator.pickupSelected &&
                    <div className="TradeSidebarCostFlex">
                        <span>Item Pickup </span>
                        <span className="ItemOverviewPrice">${bookingPriceCalculator.deliveryPrice}</span>
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
                { booking.delivery_option !== 'none' &&
                 <div className="TradeSidebarSection">
                    <div className="TradeSidebarLocationContainer">
                        <span className="TradeSidebarHeading">Delivery / Pickup Location</span>
                        <span style={{ textAlign: 'center'}}>{booking.address}</span>
                    </div>
                </div>}
                { userDetails &&
                <div className="TradeSidebarSection">
                    <div className="TradeSidebarHeading">
                      <span >Applicant Overview</span>  
                    </div>
                    

                    <div className="TradeSidebarUserContainer">
                        <div className="TradeSidebarUserAvatar">
                            <Avatar sizes='' src={userDetails.avatar ? getImage(userDetails.avatar) : MissingProfile} />
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
                    
                    
                </div>}
            
            </>)}
        </div>
    )
}

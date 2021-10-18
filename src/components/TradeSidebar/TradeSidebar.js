import React, {useEffect, useState} from 'react'
import Instance from '../../util/axios'
import getDateObject from '../../util/getDateObject'
import ApplicationItemCard from '../application/ApplicationItemCard'
import Arrow from '../../assets/Icons/Arrow.js'
import getDateSuffix from '../../util/getDateSuffix'
import './TradeSidebar.css'
import { Avatar, CircularProgress } from '@material-ui/core'
import getImage from '../../util/getImage'
import useGlobalState from '../../util/useGlobalState'
import RatingFiller from '../ratingFiller/ratingFiller'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'
import TradeCalendarStatusPanel from '../tradeCalendar/tradeCalendarStatusPanel/TradeCalendarStatusPanel'

export default function TradeSidebar({ booking, getBookings, setReportModalVisible, setReviewModalVisible }) {
    const { state } = useGlobalState()
    const { user } = state
    const [item, setItem] = useState(null)
    const [userDetails, setUserDetails] = useState()
    const [isLoading, setIsLoading] = useState(true)

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
    console.log(booking)
    const beginDate = getDateObject(booking.start_date)
    const endDate = getDateObject(booking.end_date)

    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]
    const monthArray = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"]

    return (
        <div className="TradeSidebarContainer">

            { isLoading ? (
                <CircularProgress style={{ justifySelf: 'center', alignSelf: 'center'}}/>
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
                        <span className="ItemOverviewPrice">${ item.price * ((booking.end_date - booking.start_date) + 1)}</span>
                    </div>
                    { booking.delivery_option === "delivery" || booking.delivery_option === "both" &&
                    <div className="TradeSidebarCostFlex">
                        <span>Item Delivery </span>
                        <span className="ItemOverviewPrice">${item.deliveryPrice}</span>
                    </div>}
                    { booking.delivery_option === "pickup" || booking.delivery_option === "both" &&
                    <div className="TradeSidebarCostFlex">
                        <span>Item Pickup </span>
                        <span className="ItemOverviewPrice">${item.deliveryPrice}</span>
                    </div>}
                    <div className="TradeSidebarCostFlex" style={{ paddingTop: '1rem', borderTop: '1px solid #31364c'}}>
                        <span>Total Price</span>
                        <span className="ItemOverviewPrice">${ booking.price }</span>

                    </div>
                </div>
                <div className="TradeSidebarSection">
                    <span className="TradeSidebarHeading">Dates</span>
                    <div className="ApplicationFooterDetailsContainer">
                        <div className="ApplicationFooterDetails">
                            <span className="ApplicationFooterDetailsHeader">Collect</span>
                            <div style={{ textAlign: 'center'}}>
                                <span className="ApplicationFooterTime">{beginDate?.morning ? '8:00am' : '1:00pm'} </span>
                                <span className="ApplicationFooterDay">{dayArray[beginDate.date.getDay()]}</span>
                            </div>
                            <div>
                                <span>{getDateSuffix(beginDate.date)} </span>
                                <span>{ monthArray[beginDate.date.getMonth()]}</span>
                            </div>
                        </div>
                        <div className="ApplicationFooterArrowContainer">
                            <Arrow />
                        </div>
                        <div className="ApplicationFooterDetails">
                            <span className="ApplicationFooterDetailsHeader">Return</span>
                            <div style={{ textAlign: 'center' }}>
                                <span className="ApplicationFooterTime">{endDate?.morning ? '12:00pm' : '5:00pm'} </span>
                                <span className="ApplicationFooterDay">{dayArray[endDate.date.getDay()]}</span>
                            </div>
                            <div>
                                <span>{getDateSuffix(endDate.date)} </span>
                                <span>{ monthArray[endDate.date.getMonth()]}</span>
                            </div>
                        </div>
                    </div>

                </div>
                { booking.delivery_option !== 'none' &&
                 <div className="TradeSidebarSection">
                    <div className="TradeSidebarLocationContainer">
                        <span className="TradeSidebarHeading">Delivery / Pickup Location</span>
                        <span>{booking.address}</span>
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
                            <span>Lender: </span>
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

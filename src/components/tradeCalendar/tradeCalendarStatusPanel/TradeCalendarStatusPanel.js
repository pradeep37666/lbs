import React, { useEffect, useState } from 'react'
import './TradeCalendarStatusPanel.css'
import Instance from '../../../util/axios'
import useGlobalState from '../../../util/useGlobalState'
import StatusOne from './StatusOne'
import StatusTwo from './StatusTwo'
import StatusZero from './StatusZero'
import StatusThree from './StatusThree'
import StatusFour from './StatusFour'
import StatusFive from './StatusFive'
import Pickup from './Pickup'
import getDateObject from '../../../util/dateUtils/getDateObject'
import StatusSix from './StatusSix'
import StatusSeven from './StatusSeven'
import DropOff from './DropOff'
import StatusEight from './StatusEight'
import { BOOKING_STATUSES } from '../../../assets/Data/LBSEnum'

export default function TradeCalendarStatusPanel({ 
    booking, 
    userDetails, 
    getBookings, 
    setReportModalVisible, 
    setReviewModalVisible 
}) {
    const [ status, setStatus ] = useState()
    const [ isApproveLoading, setIsApproveLoading ] = useState(false)
    const { state } = useGlobalState()
    const { user } = state
    const isOwner = booking.lenderId === user.id

    useEffect(() => {
        console.log({booking})
        setStatus(booking.status)
    },[booking])

    const renderStatusPanel = () => {
        if(status === BOOKING_STATUSES.REJECTED){
            return <StatusZero updateBookingStatus={updateBookingStatus} booking={booking}/>
        }
        if(status === BOOKING_STATUSES.ITEM_RETURNED){
            return <StatusSeven booking={booking} isOwner={isOwner} />
        }
        const dropOff = isDropoffTime()
        if(dropOff && status >= 3){
            return (
                <DropOff 
                    booking={booking}
                    finishBooking={finishBooking}
                    updateBookingStatus={updateBookingStatus}
                    isOwner={isOwner}
                    userDetails={userDetails}
                    setReviewModalVisible={setReviewModalVisible}
                    setReportModalVisible={setReportModalVisible}
                />
            )
        }
        const isHourBefore = isPickupTime()
        if(isHourBefore && status === 3) {
            return <Pickup 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                userDetails={userDetails} 
                setReportModalVisible={setReportModalVisible}
            />
        } 
        switch(status){
            case 'APPLIED' : {
                return <StatusOne 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                booking={booking} 
                approveBooking={approveBooking} 
                isLoading={isApproveLoading}/>
            }
            case 'TO_RESCHEDULE' : {
                return <StatusTwo 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                booking={booking}/>
            }
            case 'BOTH_CONFIRMED' : {
                return <StatusThree 
                isOwner={isOwner} 
                userDetails={userDetails} />
            }
            case 4 : {
                return (
                <StatusFour 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                booking={booking} 
                userDetails={userDetails}
                setReportModalVisible={setReportModalVisible} />
                )
            }
            case 5 : {
                return <StatusFive isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} userDetails={userDetails}/>
            }
            case 6 : {
                return <StatusSix isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} userDetails={userDetails}/>
            }
            case 8 : {
                return <StatusEight isOwner={isOwner} />
            }
            default : {
                return 'default'
            }
        }
    }

    const isPickupTime = () => {
        const startSlot = getDateObject(booking.start_date)
        if(startSlot?.morning){
            startSlot.dateObj.setHours(8, 0, 0) 
        } else{
            startSlot.dateObj.setHours(13, 0, 0) 
        }
        const now = new Date()
        const oneHour = 60 * 60 * 1000

        if((startSlot.dateObj.getTime() - oneHour) < now.getTime()){
            return true
        }
        return false
        
    }

    const isDropoffTime = () => {
        const endSlot = getDateObject(booking.endDateIndex)
        if(endSlot?.morning){
            endSlot.dateObj.setHours(12, 0, 0)
        } else {
            endSlot.dateObj.setHours(17, 0, 0)
        }
        const now = new Date()
        const oneHour = 60 * 60 * 1000
        if(endSlot.dateObj.getTime() - oneHour < now.getTime()){
            return true
        }
    }

    const approveBooking = async () => {
        try{
            setIsApproveLoading(true)
            const { status } = await Instance.get(`/bookings/${booking.id}/approve`)
            if (status !== 200) return
            setStatus(BOOKING_STATUSES.APPROVED)
            getBookings()
        } catch(err) {
            console.log(err.response)
        } finally {
            setIsApproveLoading(false)
        }
    }

    const updateBookingStatus = async (newStatus) => {
        try{
            const { status} = await Instance.patch(`/bookings/${booking.id}/status`, { status: newStatus })
            if(status !== 200) return
            setStatus(newStatus)
            getBookings()
        } catch(err) {
            console.log(err)
        }
    }

    const finishBooking = async () => {
        try{
            const { data, status } = await Instance.get(`/booking/finish?b_id=${booking.b_id}`)
            console.log(data, status)
        } catch(err){
            console.log(err.response)
        }
    }
    
    return (
        <div className="TradeStatusContainer">
            {renderStatusPanel()}
        </div>
    )
}

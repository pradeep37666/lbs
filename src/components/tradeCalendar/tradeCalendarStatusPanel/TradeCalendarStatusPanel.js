import React, { useEffect, useState } from 'react'
import Instance from '../../../util/axios'
import useGlobalState from '../../../util/useGlobalState'
import './TradeCalendarStatusPanel.css'
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

export default function TradeCalendarStatusPanel({ booking, userDetails, getBookings, setReportModalVisible, setReviewModalVisible }) {
    const [status, setStatus] = useState()
    const [isApproveLoading, setIsApproveLoading] = useState(false)
    const { state } = useGlobalState()
    const { user } = state
    const isOwner = booking.io_id === user.id

    useEffect(() => {
        setStatus(booking.status)
    },[booking])

    const renderStatusPanel = () => {
        // return <Pickup isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} userDetails={userDetails} setReportModalVisible={setReportModalVisible}/>
        if(status === 0){
            return <StatusZero updateBookingStatus={updateBookingStatus} booking={booking}/>
        }
        if( status === 7){
            return <StatusSeven booking={booking} isOwner={isOwner} />
        }
        const dropOff = isDropoffTime()
        if(dropOff && status >= 3){
        // if(status >= 3){
        // if(dropOff || status >= 1){
            return (
            <DropOff 
            booking={booking}
            finishBooking={finishBooking}
            updateBookingStatus={updateBookingStatus}
            isOwner={isOwner}
            userDetails={userDetails}
            setReviewModalVisible={setReviewModalVisible}
            setReportModalVisible={setReportModalVisible}
            />)
        }
        const isHourBefore = isPickupTime()
        if(isHourBefore && status === 3) return <Pickup isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} userDetails={userDetails} setReportModalVisible={setReportModalVisible}/>
        switch(status){
            case 1 : {
                return <StatusOne 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                booking={booking} 
                approveBooking={approveBooking} 
                isLoading={isApproveLoading}/>
            }
            case 2 : {
                return <StatusTwo 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                booking={booking}/>
            }
            case 3 : {
                return <StatusThree 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                booking={booking} 
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
        console.log(startSlot)
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
        const endSlot = getDateObject(booking.end_date)
        if(endSlot?.morning){
            endSlot.dateObj.setHours(12, 0, 0)
        } else{
            endSlot.dateObj.setHours(17, 0, 0)
        }
        const now = new Date()
        const oneHour = 60 * 60 * 1000
        if(endSlot.dateObj.getTime() - oneHour < now.getTime()){
            return true
        }
    }
    const approveBooking = async () => {
        setIsApproveLoading(true)
        try{
            const { data, status} = await Instance.get(`/booking/approve?b_id=${booking.b_id}`)
            console.log(data,status)
            setIsApproveLoading(false)
            setStatus(3)
            getBookings()
        } catch(err) {
            setIsApproveLoading(false)
            console.log(err.response)
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
    const updateBookingStatus = async (newStatus) => {
        try{
            const newBooking = {b_id: booking.b_id, status: newStatus}
            const { data, status} = await Instance.put('/booking/update', newBooking)
            console.log(data,status)
            if(status === 200){
                setStatus(newStatus)
                getBookings()
            }
        } catch(err) {
            console.log(err)
        }
        
    }
    
    return (
        <div className="TradeStatusContainer">
                
                {renderStatusPanel()}
        </div>
    )
}

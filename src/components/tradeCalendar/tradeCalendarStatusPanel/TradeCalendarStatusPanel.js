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
import getDateObject from '../../../util/getDateObject'
import StatusSix from './StatusSix'
import DropOff from './DropOff'

export default function TradeCalendarStatusPanel({ booking, userDetails, getBookings, setReportModalVisible }) {
    const [status, setStatus] = useState()
    const { state } = useGlobalState()
    const { user } = state
    const isOwner = booking.io_id === user.id
    console.log(booking)
    useEffect(() => {
        setStatus(booking.status)
    },[booking])

    const renderStatusPanel = () => {
        if(status === 0){
            return <StatusZero updateBookingStatus={updateBookingStatus} booking={booking}/>
        }
        const dropOff = isDropoffTime()
        if(dropOff && status >= 3){
            return (
            <DropOff 
            booking={booking}
            updateBookingStatus={updateBookingStatus}
            isOwner={isOwner}
            userDetails={userDetails}
            />)
        }
        const isHourBefore = isPickupTime()
        if(isHourBefore || status === 3) return <Pickup isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} userDetails={userDetails} setReportModalVisible={setReportModalVisible}/>
        switch(status){
            case 1 : {
                return <StatusOne isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} approveBooking={approveBooking}/>
            }
            case 2 : {
                return <StatusTwo isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking}/>
            }
            case 3 : {
                return <StatusThree isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} userDetails={userDetails} />
            }
            case 4 : {
                return <StatusFour isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} userDetails={userDetails}/>
            }
            case 5 : {
                return <StatusFive isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} userDetails={userDetails}/>
            }
            case 6 : {
                return <StatusSix isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} userDetails={userDetails}/>
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
            startSlot.date.setHours(8, 0, 0) 
        } else{
            startSlot.date.setHours(14, 0, 0) 
        }
        const now = new Date()
        const oneHour = 60 * 60 * 1000

        if(startSlot.date.getTime() - oneHour < now.getTime()){
            return true
        }
        return false
        
    }

    const isDropoffTime = () => {
        const endSlot = getDateObject(booking.end_date)
        if(endSlot?.morning){
            endSlot.date.setHours(12, 0, 0)
        } else{
            endSlot.date.setHours(17, 0, 0)
        }
        const now = new Date()
        const oneHour = 60 * 60 * 1000
        if(endSlot.date.getTime() - oneHour < now.getTime()){
            return true
        }
    }
    const approveBooking = async () => {
        try{
            const { data, status} = await Instance.get(`/booking/approve?b_id=${booking.b_id}`)
            console.log(data,status)
            setStatus(3)
            getBookings()
        } catch(err) {
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

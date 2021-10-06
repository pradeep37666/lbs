import React, { useEffect, useState } from 'react'
import Instance from '../../../util/axios'
import useGlobalState from '../../../util/useGlobalState'
import './TradeCalendarStatusPanel.css'
import StatusOne from './StatusOne'
import StatusTwo from './StatusTwo'
import StatusZero from './StatusZero'
import StatusThree from './StatusThree'
import getDateObject from '../../../util/getDateObject'

export default function TradeCalendarStatusPanel({ booking, userDetails, getBookings }) {
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
        checkTimeslot()
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
                return 'four'
            }
            case 5 : {
                return 'five'
            }
            case 6 : {
                return 'six'
            }
            default : {
                return 'default'
            }
        }
    }

    const checkTimeslot = () => {
        // const startSlot= getDateObject(booking.start_date)
        // startSlot.date.setTime
    }

    const approveBooking = async () => {
        try{
            const { data, status} = await Instance.get(`/booking/approve?b_id=${booking.b_id}`)
            console.log(data,status)
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

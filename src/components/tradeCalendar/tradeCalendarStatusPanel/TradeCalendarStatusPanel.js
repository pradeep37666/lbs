import React, { useEffect, useState } from 'react'
import Instance from '../../../util/axios'
import useGlobalState from '../../../util/useGlobalState'
import './TradeCalendarStatusPanel.css'
import StatusOne from './StatusOne'
import StatusTwo from './StatusTwo'
import StatusZero from './StatusZero'
import StatusThree from './StatusThree'

export default function TradeCalendarStatusPanel({ booking, userDetails }) {
    const [status, setStatus] = useState()
    const { state } = useGlobalState()
    const { user } = state
    const isOwner = booking.io_id === user.id
    useEffect(() => {
        setStatus(booking.status)
    },[booking])

    const renderStatusPanel = () => {
        switch(status){
            case 0 : {
                return <StatusZero updateBookingStatus={updateBookingStatus} booking={booking}/>
                break
            }
            case 1 : {
                return <StatusOne isOwner={isOwner} updateBookingStatus={updateBookingStatus} />
            }
            case 2 : {
                return <StatusTwo isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking}/>
            }
            case 3 : {
                return <StatusThree isOwner={isOwner} updateBookingStatus={updateBookingStatus} booking={booking} />
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

    const updateBookingStatus = async (newStatus) => {
        try{
            const newBooking = {b_id: booking.b_id, status: newStatus, type: isOwner ? 'lender' : 'borrower'}
            const { data, status} = await Instance.put('/booking/update', newBooking)
            console.log(data,status)
            if(status === 200){
                setStatus(newStatus)
            }
        } catch(err) {
            console.log(err)
        }
        
    }
    

    const statusTwo = () => {
        return(
            <div className="TradeStatusButtonContainer">
                { isOwner ? (
                    <div>
                        status two
                    </div>
                ) : (
                    <div>
                        status two borrower
                    </div>
                )}
            </div>
        )
    }

    const statusThree = () =>{
        return (
            <div className="TradeStatusButtonContainer">
                <div>
                    <span>Get the product ready to be borrowed by </span>
                    <span>{userDetails.fullName}</span>
                </div>
            </div>
        )
    }
    return (
        <div className="TradeStatusContainer">
                {renderStatusPanel()}
        </div>
    )
}

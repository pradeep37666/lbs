import React, { useState } from 'react'
import Application from '../../../pages/application/Application'
import Instance from '../../../util/axios'

export default function StatusOne({ isOwner, updateBookingStatus, booking }) {
    const [cancelPressed, setCancelPressed] = useState(false)


    const approveBooking = async () => {
        try{
            const { data, status} = await Instance.get(`/booking/approve?b_id=${booking.b_id}`)
            console.log(data,status)
        } catch(err) {
            console.log(err.response)
        }
    }
    return (
        <>
            { isOwner ? (
                cancelPressed ? (
                    <div className="TradeStatusContentContainer">
                        <span>Please let the Borrower know why you have declined their booking application. If a scheduling issue, ask them to choose alernative dates.</span>
                        <div className="TradeStatusButtonContainer">
                            <div className="TradeStatusDeclineButton" onClick={() => updateBookingStatus(0)}>
                                <span>Completely Cancel</span>
                            </div>
                            <div className="TradeStatusApproveButton" onClick={() => updateBookingStatus(2)}>
                                <span>Ask to Book New Times</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="TradeStatusButtonContainer">
                        <div className="TradeStatusDeclineButton" onClick={() => setCancelPressed(true)}>
                            <span>Decline</span>
                        </div>
                        <div className="TradeStatusApproveButton" onClick={approveBooking}>
                            <span>Approve</span>
                        </div> 
                    </div>
                    
                ) 
                
            ) : (
                    <div>
                        <span>Application sent, the item owner has 24 hours to respond</span>
                        <div className="TradeStatusDeclineButton" onClick={() => updateBookingStatus(0)}>
                            <span>Cancel Borrow</span>
                        </div>
                    </div>
                
                
            )}
        </>
    )
}
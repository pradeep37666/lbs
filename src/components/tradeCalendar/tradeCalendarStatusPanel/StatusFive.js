import React, { useState } from 'react'


export default function StatusFive({ isOwner, updateBookingStatus, booking, approveBooking, userDetails }) {
    const [cancelPressed, setCancelPressed] = useState(false)
    
    return (
        <div className="TradeStatusContentContainer">
            { (isOwner && userDetails) ? (
                <span>
                    Currently {userDetails.fullName} has your item, be a helpful lender and lend a hand to them if they have any questions.
                </span>
                
            ) : (
                    userDetails && 
                    <>
                        <span>Have you picked up the item from {userDetails.fullName}?</span>
                        <div className="TradeStatusButtonContainer">
                        
                            <div className="TradeStatusDeclineButton" onClick={() => setCancelPressed(true)}>
                                <span>No</span>
                            </div>
                            <div className="TradeStatusApproveButton" onClick={() => updateBookingStatus(6)}>
                                <span>Yes</span>
                            </div>
                        </div>
                    </>
                
            )}
        </div>
    )
}
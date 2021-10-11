import React, { useState } from 'react'

export default function DropOff({ booking, isOwner, updateBookingStatus,  userDetails}) {
    const [noPressed, setNoPressed] = useState()

    return (
        <div className="TradeStatusContentContainer">
           { isOwner && userDetails ? (
                 noPressed ? (
                    <>
                        <span>Would you like to send a report?</span>
                        <div className="TradeStatusButtonContainer">
                            <div className="TradeStatusDeclineButton">
                                <span>No</span>
                            </div>
                            <div className="TradeStatusApproveButton" onClick={() => updateBookingStatus(2)}>
                                <span>Yes</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <span>Has {userDetails.fullName} dropped off the item?</span>
                        <div className="TradeStatusButtonContainer">
                        
                            <div className="TradeStatusDeclineButton" onClick={() => setNoPressed(true)}>
                                <span>No</span>
                            </div>
                            <div className="TradeStatusApproveButton" onClick={() => updateBookingStatus(5)}>
                                <span>Yes</span>
                            </div>
                        </div>
                    </>
                )
           ) : (
                userDetails && 
                <>
                    <span>Item returned, thank you for borrowing this item with Little Big Shed.</span>
                    <div className="TradeStatusButtonContainer">
                        <div className="TradeStatusApproveButton" onClick={() => null}>
                            <span>Rate Lender</span>
                        </div>
                    </div>
                </>
           ) }
        </div>
    )
}

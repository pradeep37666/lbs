import React, { useState } from 'react'

export default function DropOff({ booking, isOwner, updateBookingStatus,  userDetails, setReviewModalVisible, setReportModalVisible}) {
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
                            <div className="TradeStatusApproveButton" onClick={() => setReportModalVisible(true)}>
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
                            <div className="TradeStatusApproveButton" onClick={() => setReviewModalVisible(true)}>
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
                        <div className="TradeStatusApproveButton" onClick={() => setReviewModalVisible(true)}>
                            <span>Rate Lender</span>
                        </div>
                    </div>
                </>
           ) }
        </div>
    )
}

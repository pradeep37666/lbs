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
                            <div className="TradeStatusApproveButton" onClick={() => {
                                updateBookingStatus(7)
                                setReviewModalVisible(true)
                            }}>
                                <span>Yes</span>
                            </div>
                        </div>
                    </>
                )
           ) : (
                userDetails && booking.status !== 7 ? (
                    <>
                        <span>Your item is due today. Please check that it's in the same condition as when you borrowed it.</span>
                    </>
                ) : (
                     <>
                        <span>Item returned, thank you for borrowing this item with Little Big Shed.</span>
                        <div className="TradeStatusButtonContainer">
                            <div className="TradeStatusApproveButton" onClick={() => setReviewModalVisible(true)}>
                                <span>Rate Lender</span>
                            </div>
                        </div>
                    </>
                )

               
           ) }
        </div>
    )
}

import React, { useState } from 'react'

export default function Pickup({ isOwner, userDetails, updateBookingStatus, booking, setReportModalVisible }) {
    const [noPressed, setNoPressed] = useState(false)
    if(!userDetails){
        return ''
    }
    console.log(booking)
    console.log(userDetails)
    return (
        <div className="TradeStatusContentContainer">
            { isOwner ? (
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
                        <span>Has {userDetails.fullName} picked up the item?</span>
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
                        <span>Has {userDetails.fullName} successfully provided you the item?</span>
                        <div className="TradeStatusButtonContainer">
                        
                            <div className="TradeStatusDeclineButton" onClick={() => setNoPressed(true)}>
                                <span>No</span>
                            </div>
                            <div className="TradeStatusApproveButton" onClick={() => updateBookingStatus(4)}>
                                <span>Yes</span>
                            </div>
                        </div>
                    </>
                )
           ) }
        </div>
    )
}

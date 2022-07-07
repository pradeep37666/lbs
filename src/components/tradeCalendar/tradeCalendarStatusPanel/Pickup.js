import React, { useState } from 'react'

export default function Pickup({ isOwner, userDetails, updateBookingStatus, setReportModalVisible }) {
    const [noPressed, setNoPressed] = useState(false)
    if(!userDetails){
        return ''
    }
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
                        <span>Has {`${userDetails.firstName} ${userDetails.lastName}`} picked up the item?</span>
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
                        <span>Has {`${userDetails.firstName} ${userDetails.lastName}`} successfully provided you the item?</span>
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

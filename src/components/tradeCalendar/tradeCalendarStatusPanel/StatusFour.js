import React, { useState } from 'react'
import Application from '../../../pages/application/Application'
import Instance from '../../../util/axios'

export default function StatusFour({ isOwner, updateBookingStatus, userDetails, setReportModalVisible }) {
    const [noPressed, setNoPressed] = useState(false)
    
    return (
        <div className="TradeStatusContentContainer">
            { isOwner ? (
                 userDetails && !noPressed ? (
                    <>
                        <span>Has {`${userDetails.firstName} ${userDetails.lastName}`} picked up the item?</span>
                        <div className="TradeStatusButtonContainer">
                        
                            <div className="TradeStatusDeclineButton" onClick={() => setNoPressed(true)}>
                                <span>No</span>
                            </div>
                            <div className="TradeStatusApproveButton" onClick={() => updateBookingStatus(6)}>
                                <span>Yes</span>
                            </div>
                        </div>
                    </> 
                 ) : (
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
                 )
                 
            ) : (
                    <span>
                        Enjoy the use of your item.
                    </span>
                
                
            )}
        </div>
    )
}
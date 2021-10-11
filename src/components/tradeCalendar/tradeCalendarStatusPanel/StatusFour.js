import React, { useState } from 'react'
import Application from '../../../pages/application/Application'
import Instance from '../../../util/axios'

export default function StatusFour({ isOwner, updateBookingStatus, userDetails }) {
    const [cancelPressed, setCancelPressed] = useState(false)
    
    return (
        <div className="TradeStatusContentContainer">
            { isOwner ? (
                 userDetails && 
                 <>
                     <span>Has {userDetails.fullName} picked up the item?</span>
                     <div className="TradeStatusButtonContainer">
                     
                         <div className="TradeStatusDeclineButton" onClick={() => setCancelPressed(true)}>
                             <span>No</span>
                         </div>
                         <div className="TradeStatusApproveButton" onClick={() => updateBookingStatus(6)}>
                             <span>Yes</span>
                         </div>
                     </div>
                 </>
            ) : (
                    <span>
                        Enjoy the use of your item.
                    </span>
                
                
            )}
        </div>
    )
}
import React, { useState } from 'react'
import Application from '../../../pages/application/Application'
import Instance from '../../../util/axios'

export default function StatusSix({ isOwner, updateBookingStatus, booking, approveBooking, userDetails }) {
    const [cancelPressed, setCancelPressed] = useState(false)
    
    return (
        <div className="TradeStatusContentContainer">
            { isOwner ? (
                
                <span>
                    Currently {userDetails.fullName} has your item, be a helpful lender and lend a hand to them if they have any questions.
                </span>
                
                
            ) : (
                userDetails && 
                <span>
                    Enjoy the use of your item.
                </span>
                
            )}
        </div>
    )
}
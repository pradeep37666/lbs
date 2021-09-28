import React from 'react'

export default function StatusThree({ isOwner, updateBookingStatus, booking, userDetails }) {
    return (
        <div className="TradeStatusContentContainer">
           { isOwner ? (
               <div>
                <span>Get the product ready to be borrowed by </span>
                <span>{userDetails.fullName}</span>
               </div>
           ) : (
                <span>The owner has approved your booking</span>
           ) }
        </div>
    )
}

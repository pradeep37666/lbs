import React from 'react'

export default function StatusThree({ isOwner, updateBookingStatus, booking, userDetails }) {

    return (
        <div className="TradeStatusContentContainer">
           { isOwner && userDetails ? (
                <div>
                    <span>Get the product ready to be borrowed by </span>
                    <span>{userDetails.fullName}</span>
                </div>
           ) : (
                <span>Get ready to pick your up your item</span>
           ) }
        </div>
    )
}

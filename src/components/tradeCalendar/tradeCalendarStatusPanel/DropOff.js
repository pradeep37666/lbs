import React, { useState } from 'react'

export default function DropOff({ booking, isOwner, updateBookingStatus}) {
    const [noPressed, setNoPressed] = useState()

    return (
        <div className="TradeStatusContentContainer">
            { isOwner ? (
                <div>
                    <span>Drop off</span>
                </div>
            
            ) : (
                <div>
                    <span>drop off borrower</span>
                </div>
            )}
        </div>
    )
}

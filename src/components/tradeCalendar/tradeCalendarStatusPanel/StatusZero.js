import React from 'react'

export default function StatusZero({ updateBookingStatus}) {
    return (
        <div className="TradeStatusContentContainer">
        {/* <div className="TradeStatusContentContainer" onClick={() => updateBookingStatus(1)}> */}
            <span>This booking has been cancelled</span>
        </div>
    )
}

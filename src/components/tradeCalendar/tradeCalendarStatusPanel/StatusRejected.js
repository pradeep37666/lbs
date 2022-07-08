import React from 'react'
import StatusButton from './StatusButton'

export const StatusRejected = () => {
    return (
        <div className="TradeStatusContentContainer">
            <span style={{marginBottom: '0.5em'}}>
            You have completely cancelled this booking.
            </span>
            <StatusButton 
                text='You Completely Cancelled This Booking'
                nonBtn={true}
            />
        </div>
    )
}

export default StatusRejected
import React, { useState } from 'react'
import { BOOKING_STATUSES } from '../../../assets/Data/LBSEnum'
import StatusButton from './StatusButton'
import BookingDatesPanel from '../../BookingDatesPanel/BookingDatesPanel'

export const StatusApplied = ({ 
    isOwner, 
    updateBookingStatus, 
    approveBooking, 
    isLoading,
    startDate,
    endDate
}) => {
    const [cancelPressed, setCancelPressed] = useState(false)
    
    return (
        <>
            { isOwner ? (
                cancelPressed ? (
                    <div className="TradeStatusContentContainer">
                        <span style={{marginBottom: '0.5em'}}>
                            Please let the Borrower know why you have declined their booking application. If a scheduling issue, ask them to choose alernative dates.
                        </span>
                        <div className="TradeStatusButtonContainer">
                            <StatusButton 
                                text='Completely Cancel'
                                type='white'
                                onClick={() => updateBookingStatus(BOOKING_STATUSES.REJECTED)}
                            />
                            <StatusButton 
                                text='Ask to Book New Times'
                                type='blue'
                                onClick={() => updateBookingStatus(BOOKING_STATUSES.TO_RESCHEDULE)}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <BookingDatesPanel 
                            startDate={startDate}
                            endDate={endDate}
                        />
                        <div className="TradeStatusButtonContainer">
                            <StatusButton 
                                text='Decline'
                                type='white'
                                onClick={() => setCancelPressed(true)}
                            />
                            <StatusButton 
                                text='Approve'
                                type='red'
                                onClick={approveBooking}
                                isLoading={isLoading}
                            />
                        </div>
                    </>
                ) 
            ) : (
                <div className="TradeStatusContentContainer">
                    <span style={{marginBottom: '0.5em'}}>
                        Application sent, the item owner has 24 hours to respond
                    </span>
                    <StatusButton 
                        text='Cancel Borrow'
                        type='white'
                        onClick={updateBookingStatus(BOOKING_STATUSES.REJECTED)}
                        width='100%'
                    />
                </div>
            )}
        </>
    )
}

export default StatusApplied
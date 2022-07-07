import React from 'react'
import { useHistory } from 'react-router'
import { BOOKING_STATUSES } from '../../../assets/Data/LBSEnum'

export default function StatusTwo({ isOwner, updateBookingStatus, booking }) {
    const itemId = booking.id
    const history = useHistory()
    return (
        <div className="TradeStatusContentContainer">
                { isOwner ? (
                    <div className="TradeStatusButtonContainer">
                        <span>You have asked for new times from this user</span>
                    </div>
                ) : (
                    < >
                        <span>The owner has re-scheduled the booking</span>
                        <div className="TradeStatusButtonContainer">
                            <div className="TradeStatusDeclineButton" onClick={() => updateBookingStatus(BOOKING_STATUSES.REJECTED)}>
                                <span>Cancel</span>
                            </div>
                            <div className="TradeStatusApproveButton" onClick={() => {history.push(`/item/${itemId}/application`)}}>
                                <span>Apply Again</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
    )
}


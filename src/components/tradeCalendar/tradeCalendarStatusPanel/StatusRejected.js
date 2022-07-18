import React from 'react'
import StatusButton from './StatusButton'

export const StatusRejected = ({ userDetails, status, isOwner }) => {
    return (
        <>
            {isOwner ? (
                <div className="TradeStatusContentContainer">
                <span style={{marginBottom: '0.5em'}}>
                {status === 'CANCELLED' 
                ? `${userDetails.firstName} ${userDetails.lastName} completely cancelled this booking.`
                : 'You completely cancelled this booking.'
                } 
                </span>
                <StatusButton 
                    text={status === 'CANCELLED' 
                    ? `${userDetails.firstName} ${userDetails.lastName} completely cancelled this booking.`
                    : 'You completely cancelled this booking.'
                    } 
                    nonBtn={true}
                />
            </div>
            ) : (
                <div className="TradeStatusContentContainer">
                    <span style={{marginBottom: '0.5em'}}>
                    {status === 'REJECTED' 
                    ? `${userDetails.firstName} ${userDetails.lastName} completely cancelled this booking.`
                    : 'You completely cancelled this booking.'
                    } 
                    </span>
                    <StatusButton 
                        text={status === 'REJECTED' 
                        ? `${userDetails.firstName} ${userDetails.lastName} completely cancelled this booking.`
                        : 'You completely cancelled this booking.'
                        } 
                        nonBtn={true}
                    />
                </div>
            )}
        </>
    )
}

export default StatusRejected
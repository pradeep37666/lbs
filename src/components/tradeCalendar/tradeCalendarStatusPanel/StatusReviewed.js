import React from 'react'

export const StatusReviewed = ({ isOwner }) => {
    return (
        <div className="TradeStatusContentContainer">
            { isOwner ? (
                <span>
                    Item returned, thank you for using little big shed
                </span>
            ) : ( 
                <span>
                    Borrow complete
                </span>
            )}
        </div>
    )
}

export default StatusReviewed
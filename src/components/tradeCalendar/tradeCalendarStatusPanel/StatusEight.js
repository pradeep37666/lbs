import React from 'react'

export default function StatusEight({ isOwner, }) {
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

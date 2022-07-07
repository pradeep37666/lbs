import React, { useState } from 'react'

export default function StatusSeven({ isOwner, booking,  }) {
    
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
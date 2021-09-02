import React from 'react'
import './ReceivedMessage.css'
export default function ReceivedMessage({ message }) {
    return (
        <div className="ReceivedMessageContainer">
            <p>{message}</p>
        </div>
    )
}

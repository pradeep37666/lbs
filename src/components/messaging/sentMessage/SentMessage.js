import React from 'react'
import './SentMessage.css'

export default function SentMessage({ message }) {
    return (
        <div className="SentMessageContainer">
            <p>{message}</p>
        </div>
    )
}

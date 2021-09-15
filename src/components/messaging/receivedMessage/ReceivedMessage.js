import { Avatar } from '@material-ui/core'
import React from 'react'
import getImage from '../../../util/getImage'
import './ReceivedMessage.css'
export default function ReceivedMessage({ user, message }) {
    console.log('message', user)
    return (
        <div className="ReceivedMessageContainer">
            <Avatar src={getImage(user.avatar)} className="ReceivedMessageImage" />
             <div className="ReceivedMessageTextContainer">
                <p>{message}</p>
                <div className="MessageTriangle"></div>
            </div>
        </div>
       
    )
}

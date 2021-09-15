import { Avatar } from '@material-ui/core'
import React from 'react'
import getImage from '../../../util/getImage'
import './ReceivedMessage.css'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'

export default function ReceivedMessage({ user, message }) {
    return (
        <div className="ReceivedMessageContainer">
            <Avatar src={user ? getImage(user.avatar) : MissingProfile} className="ReceivedMessageImage" />
             <div className="ReceivedMessageTextContainer">
                <p>{message}</p>
                <div className="MessageTriangle"></div>
            </div>
        </div>
       
    )
}

import { Avatar } from '@material-ui/core'
import React from 'react'
import getImage from '../../../util/getImage'
import './ReceivedMessage.css'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import GreyTriangle from '../../../assets/Icons/GreyTriangle'

export default function ReceivedMessage({ user, message }) {
    console.log(user)
    return (
        <div className="ReceivedMessageContainer">
            <div className="ReceivedMessageImageContainer">
                <Avatar src={user && user.avatar ? getImage(user.avatar) : MissingProfile} className="ReceivedMessageImage" />
            </div>
            
             <div className="ReceivedMessageTextContainer">
                <p>{message}</p>
                
            </div>
            <GreyTriangle />
        </div>
       
    )
}

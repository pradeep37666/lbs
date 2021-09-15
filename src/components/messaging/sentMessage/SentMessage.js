import React from 'react'
import getImage from '../../../util/getImage'
import useGlobalState from '../../../util/useGlobalState'
import './SentMessage.css'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import { Avatar } from '@material-ui/core'

export default function SentMessage({ message }) {
    const { state } = useGlobalState()
    const { user } = state
    return (
        <div className="SentMessageContainer">
            
            <div className="SentMessageTextContainer">
                <p>{message}</p>
            </div> 
            <Avatar src={getImage(user.avatar ? user.avatar : MissingProfile) } className="SentMessageImage" />
        </div>
        
    )
}

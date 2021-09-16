import React from 'react'
import getImage from '../../../util/getImage'
import useGlobalState from '../../../util/useGlobalState'
import './SentMessage.css'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import { Avatar } from '@material-ui/core'
import BrownTriangle from '../../../assets/Icons/BrownTriangle'

export default function SentMessage({ message }) {
    const { state } = useGlobalState()
    const { user } = state

    return (
        <div className="SentMessageContainer">
            
            <div className="SentMessageTextContainer">
                <p>{message}</p>
            </div> 
            <div className="SentMessageImageContainer">
               <Avatar src={user ? getImage(user.avatar) : MissingProfile } className="SentMessageImage" /> 
            </div>
            
            <BrownTriangle />
        </div>
        
    )
}

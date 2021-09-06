import React, { useRef, useState } from 'react'
import { CircularProgress, Popover } from '@material-ui/core'
import './UserCard.css'
import axios from 'axios'
export default function UserCard({ conversation, setActiveChatUser }) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleClick = () => {
        setActiveChatUser(conversation.conversationWith)
    }

    const deleteChat = async (e) => {
        e.stopPropagation()
        const {data, status} = await axios.delete(`https://${process.env.REACT_APP_CHAT_APP_ID}.api-US.cometchat.io/v3.0/conversations/${conversation.conversationId}`,{
            headers: {
                apiKey: process.env.REACT_APP_CHAT_API_KEY
            }
        })
        setActiveChatUser(null)
        
    }

    return (
        <div className="UserCard" onClick={handleClick}>

            { isDeleting ? (
                <CircularProgress  size={30}/>
            ) : (
                
                <>
                    <div className="UserCardTop" >
                    <img src={conversation.conversationWith.avatar} style={{ height: 50, width: 50}}></img>
                        <div className="UserCardDetails">
                            <ul style={{ listStyleType: 'none'}}>
                                <li>{conversation.conversationWith.name}</li>
                            </ul>
                        </div>
                        <div  style={{ background: 'red' }} onClick={deleteChat}>
                            <p>delete chat</p>

                        </div>
                        <div>

                        </div> 
                    </div>
                    <div className="UserCardBottom">
                        <p>{conversation.conversationWith.name} has enquired about your "ITEM NAME"</p>
                    </div>
                </>
            )}
            
        </div>
    )
}

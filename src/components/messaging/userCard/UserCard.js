import React from 'react'
import './UserCard.css'
export default function UserCard({ conversation, setActiveChatUser }) {

    const handleClick = () => {
        setActiveChatUser(conversation.conversationWith)
    }

    return (
        <div className="UserCard" onClick={handleClick}>
            <div className="UserCardTop" >
               <img src={conversation.conversationWith.avatar} style={{ height: 50, width: 50}}></img>
                <div className="UserCardDetails">
                    <ul style={{ listStyleType: 'none'}}>
                        <li>{conversation.conversationWith.name}</li>
                        <li>Status: ITEM STATUS</li>
                    </ul>
                </div>
                <div>

                </div> 
            </div>
            <div className="UserCardBottom">
                <p>Billy has enquired about your "ITEM NAME"</p>
            </div>
            
        </div>
    )
}

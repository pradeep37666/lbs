import React, { useRef, useState, useEffect } from 'react'
import { CircularProgress, Popover } from '@material-ui/core'
import './UserCard.css'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import useGlobalState from '../../../util/useGlobalState'
import Instance from '../../../util/axios'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function UserCard({ conversation, setActiveChatUser, setConversations, setPopupOpen, popupOpen }) {
    const dotRef = useRef()
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [isDeleting, setIsDeleting] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    console.log(conversation)

    useEffect(() => {
        
        getUserRating()
    }, [])

    const getUserRating = async () => {
        // const { data, status } = await Instance.get('/user/me?')
    }

    const handleClick = () => {
        setActiveChatUser(conversation.conversationWith)
    }

    const deleteChat = async (e) => {
        setIsDeleting(true)
        e.stopPropagation()
        try{
            const {data, status} = await axios.delete(`https://${process.env.REACT_APP_CHAT_APP_ID}.api-US.cometchat.io/v3.0/conversations/${conversation.conversationId}`,{
                headers: {
                    apiKey: process.env.REACT_APP_CHAT_API_KEY
                }
            })    
        } catch (e) {
            console.log(e)
        }
        setConversations(conversations => conversations.filter(item => item.conversationId != conversation.conversationId))
        setActiveChatUser(null)
        setIsDeleting(false)
        
    }


    const renderLastMessage = () => {
        
        if(conversation.lastMessage.data.metadata?.enquiry){
           return conversation.lastMessage.sender.uid === user.id ? (
               // User has enquired about someone else's item
                `You enquired about ${conversation.conversationWith.name}'s ${conversation.lastMessage.data.metadata.itemName}` 
            ) : (
                // Someone has enquired about the user's item
                `${conversation.conversationWith.name} has enquired about your ${conversation.lastMessage.data.metadata.itemName}`
            )
            
            
        }
        
        return 'not an enquiry'
    }
    return (
        <div style={isDeleting ? { alignItems: 'center', justifyContent: 'center' } : null } className="UserCard" onClick={handleClick}>

            { isDeleting ? (
                <CircularProgress  size={30}/>
            ) : (
                
                <>
                    <div className="UserCardContent">
                        <div className="UserCardTop" >
                        <img src={conversation.conversationWith.avatar} style={{ height: 50, width: 50}}></img>
                            <div className="UserCardDetails">
                                <ul style={{ listStyleType: 'none'}}>
                                    <li>{conversation.conversationWith.name}</li>
                                </ul>
                            </div>
                            
                            <div>

                            </div> 
                        </div>
                        <div className="UserCardBottom">
                            <div>
                                <span>{renderLastMessage()}</span>
                            </div>
                            
                        </div>
                    </div>
                    <div className="UserCardIconContainer">
                        <div ref={dotRef}>

                        
                            <MoreHorizIcon 
                            
                            onClick={(e) => {
                                e.stopPropagation()
                                setPopupOpen(conversation.conversationId)
                                setAnchorEl(dotRef.current)
                            }}
                            style={{ fill: '#b43b4c' }} />
                        </div>
                            <Popover 
                            style={{ marginTop: 20 }}
                            anchorEl={anchorEl}
                            onClose={(e) => {
                                e.stopPropagation()
                                setPopupOpen(null)
                            
                            }}
                            open={popupOpen && popupOpen === conversation.conversationId}>
                                <div className="UserCardDeleteButton" onClick={deleteChat}>
                                    <p>Delete conversation</p>
                                </div>
                            </Popover>
                            <ChevronRightIcon style={{ fill: '#b43b4c' }} />
                    </div>
                </>
            )}
            
        </div>
    )
}

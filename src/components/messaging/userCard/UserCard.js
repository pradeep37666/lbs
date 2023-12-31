import React, { useRef, useState, useEffect } from 'react'
import './UserCard.css'
import { Avatar, CircularProgress, Popover } from '@material-ui/core'
import useGlobalState from '../../../util/useGlobalState'
import Instance from '../../../util/axios'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import { CometChat } from '@cometchat-pro/chat'
import getImage from '../../../util/getImage'

export default function UserCard({
    conversation,
    popupOpen,
    unReadUsers,
    setActiveChatUser,
    setPopupOpen,
    setMessages,
}) {
    const dotRef = useRef()
    const { state } = useGlobalState()
    const { user } = state
    const [isDeleting, setIsDeleting] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [cardUser, setCardUser] = useState()
    const uid = conversation?.conversationWith?.uid

    useEffect(() => {
        getUserRating()
    }, [conversation])
   
    const getUserRating = async () => {
        try {
            const { data, status } = await Instance.get(`users/${conversation.conversationWith.uid}`)
            if (status !== 200) return
            setCardUser(data)
        } catch (e) {
            console.log(e)
        }
    }

    const blockUser = async () => {
        const userList = [user.id, conversation.conversationWith.uid]
        try {
            const res = await CometChat.blockUsers(userList)
            setActiveChatUser(false)
            setMessages(null)

        } catch (e) {
            console.log(e)
        }
    }

    const renderLastMessage = () => {
        if (conversation.lastMessage.data.metadata?.enquiry) {
            return conversation.lastMessage.sender.uid === user.id ? (
                // User has enquired about someone else's item
                `You enquired about ${conversation.conversationWith.name}'s ${conversation.lastMessage.data.metadata.itemName}`
            ) : (
                // Someone has enquired about the user's item
                `${conversation.conversationWith.name} has enquired about your ${conversation.lastMessage.data.metadata.itemName}`
            )
        }
        return conversation?.lastMessage?.sender?.uid === user.id ? (
            <>
                <span className="LastMessageOwner">You: </span>
                <span>{
                    conversation?.lastMessage?.data?.text?.length > 25 ? (
                        `${conversation?.lastMessage?.data?.text.slice(0, 25)}...`
                    ) : (
                        conversation.lastMessage.data.text
                    )}

                </span>
            </>
        ) : (
            <>
                <span className="LastMessageOwner">{conversation.conversationWith.name}: </span>
                <span>{conversation?.lastMessage?.data?.text.split(0, 20)}</span>
            </>
        )
    }

    const handleCardClick = () => {
        setActiveChatUser(conversation.conversationWith)
        setMessages(null)
    }

    return (
        <div>
            {/* <div className='chat-head-btn'>
                <button className='btn btn-blue-bg'>Trades</button>
                <button className='btn btn-blue-border'>Users</button>
            </div> */}
            <div
                style={isDeleting ? { alignItems: 'center', justifyContent: 'center' } : null}
                className="UserCard"
                onClick={handleCardClick}
            >

                {isDeleting ? (
                    <CircularProgress size={30} />
                ) : (

                    <>
                        <div className="UserCardContent">
                            <div className="UserCardTop" >
                                <span className={`userstatus ${conversation.conversationWith.status==='online'?'active':''}`}></span>
                                <Avatar src={cardUser && cardUser.avatar ? getImage(cardUser.avatar) : MissingProfile} style={{ height: 70, width: 70 }}></Avatar>
                                <div className="UserCardDetails">
                                    <h6>{conversation.conversationWith.name}</h6>
                                    <span><b>Status:</b> Borrow Enquiry</span>
                                    <span><b>Status:</b> Borrow Enquiry</span>
                                </div>

                            </div>
                            <div className="UserCardBottom">
                                <div>
                                    {renderLastMessage()}
                                </div>
                            </div>
                        </div>
                        <div className="UserCardIconContainer">
                            <div ref={dotRef} className="UserCardDotIconContainer">
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
                                open={popupOpen ? popupOpen === conversation.conversationId : false}>
                                <div className="UserCardBlockButton" onClick={blockUser}>
                                    <p>Block User</p>
                                </div>
                            </Popover>
                            <ChevronRightIcon style={{ fill: '#b43b4c' }} />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

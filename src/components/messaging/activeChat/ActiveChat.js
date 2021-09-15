import React, { useEffect, useState, useRef } from 'react'
import './ActiveChat.css'
import { CometChat, CometChatConstants } from '@cometchat-pro/chat'
import useGlobalState from '../../../util/useGlobalState'
import { Avatar, CircularProgress } from '@material-ui/core'
import ReceivedMessage from '../receivedMessage/ReceivedMessage'
import SentMessage from '../sentMessage/SentMessage'
import EnquiryMessage from '../equiryMessage/EnquiryMessage'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import Instance from '../../../util/axios'
import {ReactComponent as StarFilled} from '../../../assets/Icons/StarFilled.svg';
import getImage from '../../../util/getImage'

export default function ActiveChat({ activeChatUser, messages, setMessages, getConversations }) {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [messageText, setMessageText] = useState("") 
    const [isLoading, setIsLoading] = useState(true)
    const [activeUserDetails, setActiveUserDetails] = useState()


    useEffect(() => {
        setMessageText('')
        setIsLoading(true)
        console.log('active chat use effect')
        if(!messages) return
        setIsLoading(false)
        if(activeChatUser){
            getActiveUserDetails()
        }

    },[activeChatUser, messages])

    const getActiveUserDetails = async () => {
        try{
            const {data, status} = await Instance.get(`user/getOneUser?id=${activeChatUser.uid}`)
            setActiveUserDetails(data)
        } catch(e){
            console.log(e)
        }
    }

    const sendMessage = async () => {
        
        const textMessage = new CometChat.TextMessage(activeChatUser.uid, messageText, CometChat.RECEIVER_TYPE.USER)
        setMessageText('')
        try{
            const sentMessage = await CometChat.sendMessage(textMessage)
            setMessages(prevMessages => [...prevMessages, sentMessage])
        } catch(e) {
            console.log(e)
        }
       getConversations()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await sendMessage()
    }

    const handleChange = (e) => {
        setMessageText(e.target.value)
    }

    const renderMessages = () => {
        return messages.map((message, index ) => {
            if(message.data?.metadata?.enquiry){
                const isOwnEnquiry = message.sender.uid === user.id
                return <EnquiryMessage messageObj={message} />
            }
            return (
                message.sender.uid === user.id ? (
                   <div key={index}>
                        <SentMessage message={message.data.text}/>

                    </div> 
                ) : (
                    <div key={index}>
                        <ReceivedMessage message={message.data.text}/>
                    </div>
                )
                
            )
        })
    }
    return (
        <div className="ActiveChatContainer">
            <div className="ActiveChatHeader">
                <Avatar src={activeUserDetails ? getImage(activeUserDetails.avatar) : MissingProfile}/>
                <span className="ActiveChatHeaderText">{activeChatUser.name}</span>
                <span>{activeUserDetails && activeUserDetails.lender_rating}/5</span>
                <StarFilled fill='#e9d8b4' className="StarIconRating"/>
            </div>
            <div style={ isLoading ? { justifyContent: 'center', alignItems: 'center'} : null} className="ActiveChatMessageContainer">
                {isLoading ? (
                    <CircularProgress size={30}/>
                ) : (
                     messages && renderMessages() 
                )}
                {/* <div ref={messageEndRef}></div> */}
             </div>
            <div className="ActiveChatInputContainer">
                <form 
                onSubmit={handleSubmit}
                style={{ width: '100%'}}
                >
                <input 
                className="ActiveChatInput"
                placeholder="Message" 
                onChange={handleChange}
                value={messageText}
                />
                </form>  
                <button className="ActiveChatButton" onClick={handleSubmit}>Send</button>
            
            </div>
            
        </div>
    )
}

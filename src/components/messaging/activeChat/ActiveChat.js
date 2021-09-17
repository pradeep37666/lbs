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
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ScrollToBottom from 'react-scroll-to-bottom'

export default function ActiveChat({ activeChatUser, messages, setMessages, getConversations }) {
    const messageEndRef = useRef(null)
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [messageText, setMessageText] = useState("") 
    const [isLoading, setIsLoading] = useState(true)
    const [activeUserDetails, setActiveUserDetails] = useState()
    const [messagesLoaded, setMessagesLoaded] = useState(false)


    useEffect(() => {
        setMessageText('')
        setIsLoading(true)
        autoScroll()
        if(!messages) return
        setIsLoading(false)
        if(activeChatUser){
            setActiveUserDetails(null)
            getActiveUserDetails()
        }
        
    },[activeChatUser, messages, messagesLoaded])

    // useEffect(() => {
        
    // }) 

    // useEffect(() => {
    //     autoScroll()
    // }, [])

    const autoScroll = () => {
        console.log('messages', messages)
        setMessagesLoaded(true)
        console.log('a')
        console.log(messageEndRef.current.scrollHeight) 
        messageEndRef.current.scrollTo(0, 300)
    }
    
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
                return <EnquiryMessage messageObj={message} key={index}/>
            }
            return (
                message.sender.uid === user.id ? (
                   <div key={index}>
                        <SentMessage message={message.data.text}/>

                    </div> 
                ) : (
                    <div key={index}>
                        <ReceivedMessage user={activeUserDetails} message={message.data.text} />
                    </div>
                )
                
            )
        })
        // if(messagesArray.length > 0){
        //     messagesArray.push(<div>aaaa</div>)
        // }
        // return messagesArray
    }

    return (
        <div className="ActiveChatContainer">
            {!isLoading &&
            <div className="ActiveChatHeader">
                <div className="ActiveChatHeaderUser">
                    <Avatar src={activeUserDetails && activeUserDetails.avatar ? getImage(activeUserDetails.avatar) : MissingProfile}/>
                    <span className="ActiveChatHeaderText">{activeChatUser.name}</span>
                </div>

                <div className="ActiveChatHeaderRating">
                    <span>{activeUserDetails && activeUserDetails.lender_rating}/5</span>
                    <StarFilled fill='#e9d8b4' className="StarIconRating"/>
                </div>
            </div>}
            
            <div ref={messageEndRef} style={ isLoading ? { justifyContent: 'center', alignItems: 'center'} : null} className="ActiveChatMessageContainer">
                {isLoading ? (
                    <CircularProgress size={30}/>
                ) : (
                    <>
                    {messages && renderMessages() }
                    
                    </>
                )}
            
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
                <div className="ActiveChatButton" onClick={handleSubmit}>
                    <ArrowUpwardIcon style={{ color: 'white' }}/>
                </div>
            
            </div>
            
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import './messages.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import { CometChat } from '@cometchat-pro/chat'
import UserCard from '../../components/messaging/userCard/UserCard'
import ActiveChat from '../../components/messaging/activeChat/ActiveChat'
import { Facebook } from 'react-content-loader'
import { ClickAwayListener } from '@material-ui/core'
import useGlobalState from '../../util/useGlobalState'
import Instance from '../../util/axios'
import { isMobile } from 'react-device-detect'

export default function Messages() {
    const { state } = useGlobalState()
    const { user } = state
    const [accountContent, setAccountContent] = useState('Messages')
    const [messages, setMessages] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [conversations, setConversations] = useState([])
    const [activeChatUser, setActiveChatUser] = useState()
    const [popupOpen, setPopupOpen] = useState(false)

    useEffect(() => {
        CometChat.addMessageListener(user.id,
            new CometChat.MessageListener({
                onTextMessageReceived: handleTextMessage
            }))
        return () => {
            CometChat.removeMessageListener(user.id)
        }
    }, [activeChatUser])

    useEffect(() => {
        // sendMessage()
        getConversations()

        if(!activeChatUser) return
        getMessages()
    }, [activeChatUser])

    
    const getConversations = async () => {
        try{
           let conversationRequest = new CometChat.ConversationsRequestBuilder().setLimit(10).build()
            const conversations = await conversationRequest.fetchNext()
            setConversations(conversations) 
            console.log(conversations)
            setIsLoading(false)
        } catch(e) {
            console.log(e)
        }
        
    }

    const getMessages = async () => {
        // setIsLoading(true)
        try{
            const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(0).setUID(activeChatUser.uid).build()
            const res = await messagesRequest.fetchPrevious()
            setMessages(res)
            // setIsLoading(false)
        } catch(e) {
            console.log('error fetching messages', e)
        }
    }

    const handleTextMessage = async (msg) => {
        if(activeChatUser && ((msg.sender.uid === activeChatUser.uid) || (msg.sender.uid === user.id))){
            setMessages(prevMessages => [...prevMessages, msg])
        }
        try{        
           getConversations()
        } catch(e) {
            console.log(e)
        }
    }

    const renderCards = () => {
        return conversations.map((conversation, index) => {
            return (
            <UserCard 
            setActiveChatUser={setActiveChatUser}
            conversation={conversation} 
            setConversations={setConversations}
            key={index}
            popupOpen={popupOpen}
            setPopupOpen={setPopupOpen}
            setMessages={setMessages}
            />
            )
        })
    }

    const renderSkeletons = () => {
        const array = Array(5).fill()
        return array.map((skeleton, index) => <Facebook key={index} style={{ height: 110}}  />)
    }
    return (
        <PageWrapper>
            <ClickAwayListener onClickAway={() => setPopupOpen(false)}>
            <div className="UserShedWrapper">
            { !isMobile && <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>}
            <div className="ContentContainer">
                <div className="UserCardContainer">
                    { isLoading ? (
                        renderSkeletons()
                    ):(
                        <>
                            <span className="MessagesHeading">Messages</span>
                            {renderCards()}
                        </>   
                    )}
                </div>
                { activeChatUser && 
                <ActiveChat 
                activeChatUser={activeChatUser} 
                setActiveChatUser={setActiveChatUser}
                messages={messages} 
                setMessages={setMessages}
                getConversations={getConversations}
                />}

             </div>

             </div>
             </ClickAwayListener>
         </PageWrapper>
     )
 }

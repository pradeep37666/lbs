import React, { useState, useEffect } from 'react'
import './messages.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import { CometChat } from '@cometchat-pro/chat'
import UserCard from '../../components/messaging/userCard/UserCard'
import ActiveChat from '../../components/messaging/activeChat/ActiveChat'
import { CircularProgress, ClickAwayListener } from '@material-ui/core'
import useGlobalState from '../../util/useGlobalState'
import { isMobile } from 'react-device-detect'
import NoContent from '../../components/NoContent/NoContent'
import { useHistory } from 'react-router'
import { async } from 'validate.js'

export default function Messages() {
    const { state } = useGlobalState()
    const { user } = state
    const history = useHistory()
    const [ accountContent, setAccountContent ] = useState('Messages')
    const [ messages, setMessages ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ conversations, setConversations ] = useState([])
    const [ activeChatUser, setActiveChatUser ] = useState()
    const [ popupOpen, setPopupOpen ] = useState(false)

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
        getConversations()
        if(!activeChatUser) return
        getMessages()
    }, [activeChatUser])
    
    const getConversations = async () => {
        try{
           let conversationRequest = new CometChat.ConversationsRequestBuilder().setLimit(10).build()
            const conversations = await conversationRequest.fetchNext()
            setConversations(conversations) 
            setIsLoading(false)
        } catch(e) {
            console.log(e)
        }
    }

    const getMessages = async () => {
        try{
            const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(0).setUID(activeChatUser.uid).build()
            const response = await messagesRequest.fetchPrevious()
            setMessages(response)
            const lastMessage = response[response.length - 1];
            markAsRead(lastMessage)
        } catch(e) {
            console.log('error fetching messages', e)
        }
    }

    const markAsRead = async (lastMessage) => {
        try {
          CometChat.markAsRead(lastMessage)
        } catch (error) {
          console.log({error})
        }
    }

    const handleTextMessage = async (msg) => {
        if(activeChatUser && ((msg.sender.uid === activeChatUser.uid) || (msg.sender.uid === user.id))){
            setMessages(prevMessages => [...prevMessages, msg])
        }
        try{        
           getConversations()
           await markAsRead(msg)
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

    return (
        <PageWrapper>
            <ClickAwayListener onClickAway={() => setPopupOpen(false)}>
            <div className="UserShedWrapper">
                { !isMobile && <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>}
                <div className="ContentContainer" style={ isLoading ? { display: 'flex', justifyContent: 'center', alignItems: 'center'} : null}>
                    { isLoading ? (
                        <CircularProgress 
                        color="inherit"
                        />
                    ) : (
                        conversations.length === 0 ? (
                            <NoContent 
                            header="No Active Conversations"
                            text="You currently do not have any active conversations, borrow or lend an item to start messaging other users"
                            buttonText="Search for an item"
                            onButtonClick={() => history.push('/search')}
                            />
                        ) : (
                            <>
                                <div className="UserCardContainer">
                                    <span className="MessagesHeading">Messages</span>
                                    {renderCards()}
                                </div>
                                { activeChatUser && 
                                    <ActiveChat 
                                    activeChatUser={activeChatUser} 
                                    setActiveChatUser={setActiveChatUser}
                                    messages={messages} 
                                    setMessages={setMessages}
                                    getConversations={getConversations}
                                    />
                                }
                            </>
                        )
                    )}
                </div>
             </div>
             </ClickAwayListener>
         </PageWrapper>
     )
 }

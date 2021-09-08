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

export default function Messages() {
    const { state } = useGlobalState()
    const { user } = state
    const [accountContent, setAccountContent] = useState('Messages')
    const [messages, setMessages] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [conversations, setConversations] = useState([])
    const [activeChatUser, setActiveChatUser] = useState()
    const [popupOpen, setPopupOpen] = useState()

    useEffect(() => {
        CometChat.addMessageListener(user.id,
            new CometChat.MessageListener({
                onTextMessageReceived: handleTextMessage
            }))
    }, [])

    useEffect(() => {
        console.log('use effect')
        // sendMessage()
        getConversations()

        if(!activeChatUser) return
        getMessages()
    }, [activeChatUser, ])

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
        // setIsLoading(true)
        try{
            const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(0).setUID(activeChatUser.uid).build()
            const res = await messagesRequest.fetchPrevious()
            console.log(res)
            setMessages(res)
            // setIsLoading(false)
        } catch(e) {
            console.log('error fetching messages', e)
        }
    }
        
    const handleTextMessage = async (msg) => {
        console.log('message from listener', msg)
        if(activeChatUser && (msg.sender.uid === activeChatUser.uid)){
            setMessages(prevMessages => [...prevMessages, msg])
        }
        try{
           const newConversation = await CometChat.CometChatHelper.getConversationFromMessage(msg)
           getConversations()
        //    const index = conversations.findIndex(conversation => conversation.conversationId === newConversation.conversationId)
        //    const newConversationsArray = conversations
        //    if(index > -1){
        //     newConversationsArray.splice(index, 1)
        //    }
        //    newConversationsArray.push(newConversation)
        //    console.log(newConversationsArray)
        //    setConversations(newConversationsArray)
           // setConversations(prevConversations => [...prevConversations, newConversation]) 
        } catch(e) {
            console.log(e)
        }
        

    }
    const sendMessage = async () => {
        // const textMessage = new CometChat.TextMessage('0730ac8d-7aa9-4c7e-ab1e-e8c2b3698e3c','hello', CometChat.RECEIVER_TYPE.USER)
        // console.log(textMessage)
        // try{
        //     const res = await CometChat.sendMessage(textMessage)
        //     console.log(res)
        // } catch(e) {
        //     console.log(e)
        // }
       
    }

    const renderCards = () => {
        console.log('render cards')
        return conversations.map((conversation, index) => {
            return (
            <UserCard 
            setActiveChatUser={setActiveChatUser}
            conversation={conversation} 
            setConversations={setConversations}
            key={index}
            popupOpen={popupOpen}
            setPopupOpen={setPopupOpen}
            />
            )
        })
    }

    return (
        <PageWrapper>
            <ClickAwayListener onClickAway={() => setPopupOpen(false)}>
            <div className="UserShedWrapper">
            <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>
            <div className="ContentContainer">
                {/* <div className="UserShed__Title">
                    {accountContent}
                </div> */}
                <div className="UserCardContainer">

                    { isLoading ? (
                        Array(5).fill(<Facebook />)
                    ):(
                        <div>
                            <h1>Messages</h1>
                            {renderCards()}
                        </div>   
                    )}
                </div>
                { activeChatUser && 
                <ActiveChat activeChatUser={activeChatUser} messages={messages} setMessages={setMessages}/>}

             </div>

             </div>
             </ClickAwayListener>
         </PageWrapper>
     )
 }

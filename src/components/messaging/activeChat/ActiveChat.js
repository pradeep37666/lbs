import React, { useEffect, useState } from 'react'
import './ActiveChat.css'
import { CometChat, CometChatConstants } from '@cometchat-pro/chat'
import useGlobalState from '../../../util/useGlobalState'
import { CircularProgress } from '@material-ui/core'
import ReceivedMessage from '../receivedMessage/ReceivedMessage'
import SentMessage from '../sentMessage/SentMessage'
import EnquiryMessage from '../equiryMessage/EnquiryMessage'

export default function ActiveChat({ activeChatUser }) {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [messageText, setMessageText] = useState("") 
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setMessageText('')
        CometChat.addMessageListener(user.id,
            new CometChat.MessageListener({
                onTextMessageReceived: handleTextMessage
            }))

        const getMessages = async () => {
            setIsLoading(true)
            try{
                const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(0).setUID(activeChatUser.uid).build()
                const res = await messagesRequest.fetchPrevious()
                console.log(res)
                setMessages(res)
                setIsLoading(false)
            } catch(e) {
                console.log('error fetching messages', e)
            }
        }
        
        getMessages()
    },[activeChatUser])

    const handleTextMessage = (textMessage) => {
        setMessages(prevMessages => [ ...prevMessages, textMessage ])
    }

    const sendMessage = async () => {
        
        const textMessage = new CometChat.TextMessage('ddb8dc38-a334-495d-9444-7013e88a6947', messageText, CometChat.RECEIVER_TYPE.USER)
        setMessageText('')
        try{
            const sentMessage = await CometChat.sendMessage(textMessage)
            setMessages(prevMessages => [...prevMessages, sentMessage])
        } catch(e) {
            console.log(e)
        }
       
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
                return <EnquiryMessage message={message.data.metadata.enquiry} />
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
            <h1>{activeChatUser.name}</h1>
            {isLoading ? (
                <CircularProgress size={30}/>
            ) : (
            <div>
                { messages && renderMessages() }
            </div>
            )}
            <form 
            onSubmit={handleSubmit}
            className="ActiveChatInputContainer"
            >
                <input 
                className="ActiveChatInput"
                placeholder="Message" 
                onChange={handleChange}
                value={messageText}
                />
                <button>Send</button>
            </form>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import './ActiveChat.css'
import { CometChat, CometChatConstants } from '@cometchat-pro/chat'
import useGlobalState from '../../../util/useGlobalState'
import { CircularProgress } from '@material-ui/core'
import ReceivedMessage from '../receivedMessage/ReceivedMessage'
import SentMessage from '../sentMessage/SentMessage'

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
                onTextMessageReceived: textMessage => {
                    console.log('message received successfully', textMessage)
                }
            }))

        const getMessages = async () => {
            setIsLoading(true)
            try{
                const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(10).setUID(activeChatUser.uid).build()
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

    const sendMessage = async () => {
        const textMessage = new CometChat.TextMessage(activeChatUser.uid, messageText, CometChat.RECEIVER_TYPE.USER)
        textMessage.setMetadata({ enquiry: 'mower'})
        try{
            const res = await CometChat.sendMessage(textMessage)
            setMessageText('')
            console.log('sent message', res)
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
            return (
                message.sender.uid === user.id ? (
                   <div key={index}>
                        <SentMessage message={message.data.text}/>

                    </div> 
                ) : (
                    <div>
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

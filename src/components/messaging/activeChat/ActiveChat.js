import React, { useEffect, useState } from 'react'
import './ActiveChat.css'
import { CometChat, CometChatConstants } from '@cometchat-pro/chat'
import useGlobalState from '../../../util/useGlobalState'

export default function ActiveChat({ activeChatUser }) {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [messageText, setMessageText] = useState("") 
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessageText('')
        CometChat.addMessageListener(user.id,
            new CometChat.MessageListener({
                onTextMessageReceived: textMessage => {
                    console.log('message received successfully', textMessage)
                }
            }))

        const getMessages = async () => {
            console.log(user.id)
            const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(10).build()
            const res = await messagesRequest.fetchPrevious()
            console.log('messages', res)
        }
        
        getMessages()
    },[activeChatUser])

    const sendMessage = async () => {
        const textMessage = new CometChat.TextMessage('SUPERHERO1',messageText, CometChat.RECEIVER_TYPE.USER)
        try{
            const res = await CometChat.sendMessage(textMessage)
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

    return (
        <div className="ActiveChatContainer">
            <h1>{activeChatUser.name}</h1>
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

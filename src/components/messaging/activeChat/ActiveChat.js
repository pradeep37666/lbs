import React, { useEffect, useState } from 'react'
import './ActiveChat.css'
import { CometChat, CometChatConstants } from '@cometchat-pro/chat'

export default function ActiveChat({ user }) {
    const [messageText, setMessageText] = useState("") 
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const getMessages = async () => {
            const messagesRequest = new CometChat.MessagesRequestBuilder().setLimit(10).setUID(user.id).build()
            const res = await messagesRequest.fetchPrevious()
            console.log(res)
        }
        getMessages()
    },[])

    const sendMessage = async () => {
        const textMessage = new CometChat.TextMessage('SUPERHERO2',messageText, CometChat.RECEIVER_TYPE.USER)
        console.log(textMessage)
        try{
            const res = await CometChat.sendMessage(textMessage)
            console.log(res)
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
            <h1>Billy King</h1>
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

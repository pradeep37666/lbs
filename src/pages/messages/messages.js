import React, { useState, useEffect } from 'react'
import './messages.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import { CometChat } from '@cometchat-pro/chat'
import UserCard from '../../components/messaging/userCard/UserCard'
import ActiveChat from '../../components/messaging/activeChat/ActiveChat'
import { Facebook } from 'react-content-loader'

export default function Messages() {
    const [accountContent, setAccountContent] = useState('Messages')
    const [isLoading, setIsLoading] = useState(true)
    const [conversations, setConversations] = useState([])
    const [activeChatUser, setActiveChatUser] = useState()

    useEffect(() => {
        sendMessage()
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
        getConversations()
    }, [])

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
        return conversations.map((conversation, index) => {
            return (
            <UserCard 
            setActiveChatUser={setActiveChatUser}
            conversation={conversation} 
            key={index}/>
            )
        })
    }

    return (
        <PageWrapper>
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
                <ActiveChat activeChatUser={activeChatUser} />}

            </div>

            </div>
        </PageWrapper>
    )
}

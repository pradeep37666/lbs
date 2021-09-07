import React, { useState, useEffect } from 'react'
import './messages.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import { CometChat } from '@cometchat-pro/chat'
import UserCard from '../../components/messaging/userCard/UserCard'
import ActiveChat from '../../components/messaging/activeChat/ActiveChat'
import { Facebook } from 'react-content-loader'
import { ClickAwayListener } from '@material-ui/core'

export default function Messages() {
    const [accountContent, setAccountContent] = useState('Messages')
    const [isLoading, setIsLoading] = useState(true)
    const [conversations, setConversations] = useState([])
    const [activeChatUser, setActiveChatUser] = useState()
    const [popupOpen, setPopupOpen] = useState()

    useEffect(() => {
        console.log('use effect')
        sendMessage()
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
        getConversations()
    }, [activeChatUser])

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
                <ActiveChat activeChatUser={activeChatUser} />}

             </div>

             </div>
             </ClickAwayListener>
         </PageWrapper>
     )
 }

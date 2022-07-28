import React, { useState } from 'react'
import { CircularProgress, Dialog, DialogContent } from '@material-ui/core'
import { CometChat } from '@cometchat-pro/chat'

const ColdChatModal = ({ onClick, item, open }) => {
    const [ chatText, setChatText ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    const startColdChat = async () => {
        if (chatText === '') onClick()
        const textMessage = new CometChat.TextMessage(
            item.userId,
            chatText,
            CometChat.RECEIVER_TYPE.USER
        )
        try {
            setIsLoading(true)
            await CometChat.sendMessage(textMessage)
            onClick()
        } catch (error) {
            console.log(error.response)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog
        open={open}
        onClose={onClick}
        >
            <DialogContent className="BorrowerMain" >
                <span className="ApplicationModalTitle">Start Chat</span><br></br>
                {/* <span className="ApplicationModalText">Add some text to prompt users to send a message</span> */}
                <textarea
                    rows="10"
                    maxLength="254"
                    className="LoginInput PostItem__TextArea"
                    onChange={(e) => setChatText(e.target.value)}
                />
                {isLoading
                ?   
                    <div
                        className="ApplicationModalButton" 
                        style={{ margin: '1rem 0'}}
                    >
                        <CircularProgress size={30} color="#000"/>
                    </div>
                :
                    <div 
                        className="ApplicationModalButton" 
                        onClick={startColdChat} 
                        style={{ margin: '1rem 0'}}
                    >
                        <span className="ApplicationModalButtonText">Send</span>
                    </div>
                }
            </DialogContent>
        </Dialog>
    )
}

export default ColdChatModal
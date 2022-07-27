import React, { useState } from 'react'
import { Dialog, DialogContent } from '@material-ui/core'
import { CometChat } from '@cometchat-pro/chat'

const ColdChatModal = ({ onClick, item, open }) => {
    const [ chatText, setChatText ] = useState('')

    const startColdChat = async () => {
        if (chatText === '') onClick()
        const textMessage = new CometChat.TextMessage(
            item.userId,
            chatText,
            CometChat.RECEIVER_TYPE.USER
        )
        try {
            await CometChat.sendMessage(textMessage)
            onClick()
        } catch (error) {
            console.log(error.response)
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
                <div 
                    className="ApplicationModalButton" 
                    onClick={startColdChat} 
                    style={{ margin: '1rem 0'}}
                >
                    <span className="ApplicationModalButtonText">Send</span>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ColdChatModal
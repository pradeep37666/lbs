import React from 'react'
import useGlobalState from '../../../util/useGlobalState'
import './EnquiryMessage.css'

export default function EnquiryMessage({ messageObj }) {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const renderEnquiry = () => {
        if(messageObj.data.metadata?.enquiry){
            return messageObj.sender.uid === user.id ? (
                // User has enquired about someone else's item
                //  `You enquired about ${messageObj.receiver.name}'s ${messageObj.data.metadata.itemName}` 
                 <>
                    <span className="EnquiryMessageText">You </span>
                    <span className="EnquiryMessageText">enquired about </span>
                    <span className="EnquiryMessageBold">{messageObj.receiver.name}'s</span>
                    <span className="EnquiryMessageText"> {messageObj.data.metadata.itemName}</span>
                 </>
             ) : (
                 // Someone has enquired about the user's item
                 <>
                    <span className="EnquiryMessageBold">{messageObj.sender.name} </span>
                    <span className="EnquiryMessageText">enquired about </span>
                    <span className="EnquiryMessageText">your </span>
                    <span className="EnquiryMessageText"> {messageObj.data.metadata.itemName}</span>
                 </>
                 
             )
         }
    }
    return (
        <div className="EnquiryMessageContainer">
            <p>{renderEnquiry()}</p>
        </div>
    )
}

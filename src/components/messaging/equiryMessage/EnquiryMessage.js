import React from 'react'
import useGlobalState from '../../../util/useGlobalState'
import './EnquiryMessage.css'

export default function EnquiryMessage({ messageObj }) {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    console.log('enquiry', messageObj)
    const renderEnquiry = () => {
        if(messageObj.data.metadata?.enquiry){
            return messageObj.sender.uid === user.id ? (
                // User has enquired about someone else's item
                 `You enquired about ${messageObj.receiver.name}'s ${messageObj.data.metadata.itemName}` 
             ) : (
                 // Someone has enquired about the user's item
                 `${messageObj.sender.name} has enquired about your ${messageObj.data.metadata.itemName}`
             )
         }
    }
    return (
        <div className="EnquiryMessageContainer">
            <p>{renderEnquiry()}</p>
        </div>
    )
}

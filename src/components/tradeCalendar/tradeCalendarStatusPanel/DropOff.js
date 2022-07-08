import React, { useState } from 'react'
import { BOOKING_STATUSES } from '../../../assets/Data/LBSEnum'
import StatusButton from './StatusButton'

export const DropOff = ({
    isOwner, 
    updateBookingStatus,  
    userDetails, 
    setReviewModalVisible, 
    setReportModalVisible, 
    endDateObj
}) => {
    const [ noPressed, setNoPressed ] = useState()
    const endTime = endDateObj.timeslot === 'morning' ? '8:00am' : '1:00pm'

    return (
        <div className="TradeStatusContentContainer">
           { isOwner && userDetails ? (
                 noPressed ? (
                    <>
                        <span style={{marginBottom: '0.5em'}}>
                            Would you like to send a report?
                        </span>
                        <div className="TradeStatusButtonContainer">
                            <StatusButton 
                                text='Submit Report'
                                type='blue'
                                onClick={() => setReportModalVisible(true)}
                                width='100%'
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <span style={{marginBottom: '0.5em'}}>
                            Has {`${userDetails.firstName} ${userDetails.lastName}`} dropped off the item?
                        </span>
                        <div className="TradeStatusButtonContainer">
                            <StatusButton 
                                text='No'
                                type='white'
                                onClick={() => setNoPressed(true)}
                            />
                            <StatusButton 
                                text='Yes'
                                type='blue'
                                onClick={async () => {
                                    await updateBookingStatus(BOOKING_STATUSES.ITEM_RETURNED)
                                    setReviewModalVisible(true)
                                }}
                            />
                        </div>
                    </>
                )
            ) : (
                <>
                    <span style={{marginBottom: '0.5em'}}>
                        Your item is due today. Please check that it’s in the same condition as when you borrowed it.
                    </span>
                    <StatusButton 
                        text={
                            <div>
                                Your Item Is Due Back At <b>{endTime}</b>
                            </div>
                        }
                        nonBtn={true}
                    />
                </>
            )}
        </div>
    )
}

export default DropOff
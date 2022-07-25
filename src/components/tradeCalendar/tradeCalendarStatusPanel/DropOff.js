import React, { useState } from 'react'
import { dayArray, monthArray } from '../../../assets/Data/LBSArray'
import { BOOKING_STATUSES } from '../../../assets/Data/LBSEnum'
import getDateSuffix from '../../../util/dateUtils/getDateSuffix'
import StatusButton from './StatusButton'

export const DropOff = ({
    isOwner, 
    updateBookingStatus,  
    userDetails, 
    setReportModalVisible, 
    endDateObj,
    isLoading
}) => {
    const [ noPressed, setNoPressed ] = useState()
    const endTime = endDateObj.timeslot === 'morning' ? '8:00am' : '1:00pm'
    const endDay = dayArray[endDateObj.dateObj.getDay()]
    const endDate = getDateSuffix(endDateObj.dateObj)
    const endMonth = monthArray[endDateObj.dateObj.getMonth()]
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
                                onClick={() => updateBookingStatus(BOOKING_STATUSES.ITEM_RETURNED)}
                                isLoading={isLoading}
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
                                Your Item Is Due Back At 
                                <div style={{display: 'flex'}}>
                                    <p style={{fontWeight: 'bold', color: '#AC172C', margin: '0'}}>{endTime}&nbsp;</p>
                                    <p style={{fontWeight: 'bold', margin: '0'}}>{endDay}&nbsp;</p>
                                    <p style={{margin: '0'}}>{endDate}</p>
                                    <p style={{margin: '0'}}>&nbsp; - &nbsp;</p>
                                    <p style={{margin: '0'}}>{endMonth}</p>
                                </div>
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
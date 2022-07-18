import React from 'react'
import { dayArray, monthArray } from '../../../assets/Data/LBSArray'
import getDateSuffix from '../../../util/dateUtils/getDateSuffix'
import StatusButton from './StatusButton'

export const StatusConfirmed = ({ isOwner, userDetails, endDateObj }) => {
    const endTime = endDateObj.timeslot === 'morning' ? '8:00am' : '1:00pm'
    const endDay = dayArray[endDateObj.dateObj.getDay()]
    const endDate = getDateSuffix(endDateObj.dateObj)
    const endMonth = monthArray[endDateObj.dateObj.getMonth()]
    return (
        <div className="TradeStatusContentContainer">
            <div className="TradeStatusContentContainer">
            { isOwner && userDetails ? (
                <>
                    <span style={{marginBottom: '0.5em'}}>
                        Currently {`${userDetails.firstName} ${userDetails.lastName}`} has your item, be a helpful lender and lend a hand to them if they have any questions.
                    </span>
                    {endDateObj &&
                    <StatusButton 
                        text={
                            <div style={{display: 'flex'}}>
                                <p style={{fontWeight: 'bold', color: '#AC172C', margin: '0'}}>{endTime}&nbsp;</p>
                                <p style={{fontWeight: 'bold', margin: '0'}}>{endDay}&nbsp;</p>
                                <p style={{margin: '0'}}>{endDate}</p>
                                <p style={{margin: '0'}}>&nbsp; - &nbsp;</p>
                                <p style={{margin: '0'}}>{endMonth}</p>
                            </div>
                        }
                        nonBtn={true}
                    />
                    }
                </>
            ) : (
                userDetails && 
                <>
                    <span style={{marginBottom: '0.5em'}}>
                        When you return your item, please check that it’s in the same condition as when you borrowed it.
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
        </div>
    )
}

export default StatusConfirmed
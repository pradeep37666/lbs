import React, { useEffect, useState } from 'react'
import Instance from '../../../util/axios'
import './TradeCalendarStatusPanel.css'

export default function TradeCalendarStatusPanel({ booking }) {
    const [status, setStatus] = useState()
    console.log(booking)
    useEffect(() => {
        setStatus(booking.status)
    },[booking])


    const renderStatusPanel = () => {
        switch(status){
            case 0 : {
                return statusOne()
                break
            }
            case 1 : {
                return 'one'
            }
            case 2 : {
                return 'two'
            }
            case 3 : {
                return 'three'
            }
            case 4 : {
                return 'four'
            }
            case 5 : {
                return 'five'
            }
            case 6 : {
                return 'six'
            }
            default : {
                return 'default'
            }
        }
    }

    const updateBooking = async () => {
        try{
            const newBooking = booking
            newBooking.status = 1
            const { data, status} = await Instance.put('/booking/update', newBooking)
            console.log(data,status)
        } catch(err) {
            console.log(err)
        }
        
    }
    const statusOne = () => {
        return (
            <div className="TradeStatusButtonContainer">
                <div className="TradeStatusDeclineButton ">
                    <span>Decline</span>
                </div>
                <div className="TradeStatusApproveButton" onClick={updateBooking}>
                    <span>Approve</span>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div>
                {renderStatusPanel()}
                {booking.items_title}
            </div>

        </div>
    )
}

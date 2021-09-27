import React, { useEffect, useState } from 'react'
import Instance from '../../../util/axios'
import useGlobalState from '../../../util/useGlobalState'
import './TradeCalendarStatusPanel.css'

export default function TradeCalendarStatusPanel({ booking }) {
    const [status, setStatus] = useState()
    const { state } = useGlobalState()
    const { user } = state
    const isOwner = booking.io_id === user.id
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
                return statusThree()
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

    const approveBooking = async () => {
        try{
            const newBooking = booking
            newBooking.status = 3
            const { data, status} = await Instance.put('/booking/update', newBooking)
            console.log(data,status)
        } catch(err) {
            console.log(err)
        }
        
    }
    const statusOne = () => {
        return (
            <div className="TradeStatusButtonContainer">
                { isOwner ? (
                    <>
                        <div className="TradeStatusDeclineButton ">
                            <span>Decline</span>
                        </div>
                        <div className="TradeStatusApproveButton" onClick={approveBooking}>
                            <span>Approve</span>
                        </div> 
                    </>
                ) : (
                    <div>
                        <span>Application sent, the item owner has 24 hours to respond</span>
                    </div>
                )}
            </div>
        )
    }

    const statusThree = () =>{
        return (
            <div className="TradeStatusButtonContainer">
                <div>
                    <span>Get the product ready to be borrowed by </span>
                </div>
            </div>
        )
    }
    return (
        <div className="TradeStatusContainer">
                {renderStatusPanel()}
        </div>
    )
}

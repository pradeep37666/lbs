import React, { useEffect, useState } from 'react'
import './TradeCalendarStatusPanel.css'
import Instance from '../../../util/axios'
import useGlobalState from '../../../util/useGlobalState'
import StatusRejected  from './StatusRejected'
import StatusApplied from './StatusApplied'
import StatusReschedule from './StatusReschedule'
import StatusApproved from './StatusApproved'
import Pickup from './Pickup'
import StatusConfirmed from './StatusConfirmed'
import StatusItemReturn from './StatusItemReturn'
import StatusReviewed from './StatusReviewed'
import getDateObject from '../../../util/dateUtils/getDateObject'
import DropOff from './DropOff'
import { BOOKING_STATUSES, SNACKBAR_BUTTON_TYPES } from '../../../assets/Data/LBSEnum'
import StatusDefault from './StatusDefault'
import useErrorState from '../../../util/reducers/errorContext'

export const TradeCalendarStatusPanel = ({ 
    booking, 
    userDetails, 
    getBookings, 
    setReportModalVisible, 
    setReviewModalVisible,
    startDate,
    endDate,
}) => {
    const [ status, setStatus ] = useState()
    const [ isApproveLoading, setIsApproveLoading ] = useState(false)
    const { state } = useGlobalState()
    const { user } = state
    const isOwner = booking.lenderId === user.id
    const { errorDispatch } = useErrorState()

    useEffect(() => {
        setStatus(booking.status)
    },[])

    useEffect(() => {
        console.log({status})
    },[status])

    const renderStatusPanel = () => {
        // An hour before booking time
        const isHourBefore = true
        // const isHourBefore = isPickupTime()
        if(isHourBefore && 
            (status === BOOKING_STATUSES.APPROVED || 
            (isOwner && status === BOOKING_STATUSES.BORROWER_CONFIRMED) || 
            (!isOwner && status === BOOKING_STATUSES.LENDER_CONFIRMED)
            )
        )   return <Pickup 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                userDetails={userDetails} 
                setReportModalVisible={setReportModalVisible}
                status={status}
            />

        // An hour before returning time
        const dropOff = isDropoffTime()
        if(dropOff && status !== BOOKING_STATUSES.BOTH_CONFIRMED)
            return <DropOff 
                booking={booking}
                updateBookingStatus={updateBookingStatus}
                isOwner={isOwner}
                userDetails={userDetails}
                setReviewModalVisible={setReviewModalVisible}
                setReportModalVisible={setReportModalVisible}
                endDateObj={endDate}
            />

        // Booking approved but not an hour before booking time
        if((status === BOOKING_STATUSES.APPROVED) ||
            (isOwner && status === BOOKING_STATUSES.BORROWER_CONFIRMED) ||
            (!isOwner && status === BOOKING_STATUSES.LENDER_CONFIRMED)
        )   return <StatusApproved 
                isOwner={isOwner} 
                userDetails={userDetails} 
                startDateObj={startDate}
            />
        
        // Lender and / or Borrower confirmed pickup
        if((status === BOOKING_STATUSES.BOTH_CONFIRMED) ||
           (isOwner && status === BOOKING_STATUSES.LENDER_CONFIRMED) ||
           (!isOwner && status === BOOKING_STATUSES.BORROWER_CONFIRMED)
        )   return <StatusConfirmed 
                isOwner={isOwner}
                userDetails={userDetails}
                endDateObj={endDate}
            />
        
        // Display a review submitted
        if((status === BOOKING_STATUSES.BOTH_REVIEWED) ||
           (isOwner && status === BOOKING_STATUSES.LENDER_REVIEWED) ||
           (!isOwner && status === BOOKING_STATUSES.BORROWER_REVIEWED)
        ) return <StatusReviewed isOwner={isOwner} />

        switch(status){
            case BOOKING_STATUSES.APPLIED: {
                return <StatusApplied 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                isLoading={isApproveLoading}
                startDate={startDate}
                endDate={endDate}/>
            }
            case BOOKING_STATUSES.REJECTED: {
                return <StatusRejected 
                userDetails={userDetails}
                isOwner={isOwner}
                status={status}/>
            }
            case BOOKING_STATUSES.CANCELLED: {
                return <StatusRejected 
                userDetails={userDetails}
                isOwner={isOwner}
                status={status}/>
            }
            case BOOKING_STATUSES.TO_RESCHEDULE: {
                return <StatusReschedule 
                isOwner={isOwner} 
                updateBookingStatus={updateBookingStatus} 
                booking={booking}/>
            }
            case BOOKING_STATUSES.ITEM_RETURNED: {
                return <StatusItemReturn 
                isOwner={isOwner}
                setReviewModalVisible={setReportModalVisible}/>
            }
            default: {
                return <StatusDefault />
            }
        }
    }

    const isPickupTime = () => {
        const startSlot = getDateObject(booking.startDateIndex)
        if(startSlot?.morning) 
            startSlot.dateObj.setHours(8, 0, 0) 
        else 
            startSlot.dateObj.setHours(13, 0, 0) 
        const now = new Date()
        const oneHour = 60 * 60 * 1000
        if((startSlot.dateObj.getTime() - oneHour) < now.getTime())
            return true 
        return false
    }

    const isDropoffTime = () => {
        const endSlot = getDateObject(booking.endDateIndex)
        if(endSlot?.morning) 
            endSlot.dateObj.setHours(12, 0, 0)
        else 
            endSlot.dateObj.setHours(17, 0, 0)
        const now = new Date()
        const oneHour = 60 * 60 * 1000
        if(endSlot.dateObj.getTime() - oneHour < now.getTime()) 
            return true
        return false
    }

    const updateBookingStatus = async (newStatus) => {
        try{
            const { status} = await Instance.patch(`/bookings/${booking.id}/status`, { status: newStatus })
            if(status !== 200) return
            setStatus(newStatus)
            getBookings()
        } catch(error) {
            console.log(error.response)
            if (newStatus === 'APPROVED' && error?.response?.status === 400) {
                errorDispatch({type: 'openSnackBar', data: {
                    message: 'Booking date conflicts with existing booking(s).',
                    btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
                    btnFunc: () => {
                        errorDispatch({type: 'closeSnackBar'})
                    }
                }}) 
            } else if (newStatus === 'REJECTED' && error?.response?.status === 400) {
                errorDispatch({type: 'openSnackBar', data: {
                    message: 'Unable to reject once booking approved',
                    btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
                    btnFunc: () => {
                        errorDispatch({type: 'closeSnackBar'})
                    }
                }}) 
            }
        }
    }
    
    return (
        <div className="TradeStatusContainer">
            {status && renderStatusPanel()}
        </div>
    )
}

export default TradeCalendarStatusPanel
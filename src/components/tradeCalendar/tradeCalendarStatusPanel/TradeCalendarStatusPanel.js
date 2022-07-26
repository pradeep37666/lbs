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
import useErrorState from '../../../util/reducers/errorContext'
import DisputeBookingModal from '../../modals/DisputeBookingModal/DisputeBookingModal'
import StatusDisputed from './StatusDisputed'

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
    const [ isDisputeOpen, setIsDisputeOpen ] = useState(false)

    useEffect(() => {
        setStatus(booking.status)
    },[])

    const renderStatusPanel = () => {
        // const isHourBeforePickup = isPickupTime()
        const isHourBeforePickup = true
        const isHourBeforeDropoff = true

        if (status === BOOKING_STATUSES.DISPUTED ||
            status === BOOKING_STATUSES.RESOLVED) 
            return <StatusDisputed /> 
        if (status === BOOKING_STATUSES.APPLIED)
            return <StatusApplied 
            isOwner={isOwner} 
            updateBookingStatus={updateBookingStatus} 
            isLoading={isApproveLoading}
            startDate={startDate}
            endDate={endDate}
            />
        if (status === BOOKING_STATUSES.REJECTED)
            return <StatusRejected 
            userDetails={userDetails}
            isOwner={isOwner}
            status={status}
            />
        if (status === BOOKING_STATUSES.CANCELLED)
            return <StatusRejected 
            userDetails={userDetails}
            isOwner={isOwner}
            status={status}
            />
        if (status === BOOKING_STATUSES.TO_RESCHEDULE)
            return <StatusReschedule 
            isOwner={isOwner} 
            updateBookingStatus={updateBookingStatus} 
            booking={booking}
            />
        if(status === BOOKING_STATUSES.ITEM_RETURNED ||
          (isOwner && status === BOOKING_STATUSES.BORROWER_REVIEWED) ||
          (!isOwner && status === BOOKING_STATUSES.LENDER_REVIEWED)
        )   return <StatusItemReturn 
                isOwner={isOwner}
                setReviewModalVisible={setReviewModalVisible}
            />
        // Booking approved but not an hour before booking time
        if(!isHourBeforePickup && status === BOOKING_STATUSES.APPROVED)
            return <StatusApproved 
                isOwner={isOwner} 
                userDetails={userDetails} 
                startDateObj={startDate}
            />
        // An hour before booking time
        if(isHourBeforePickup && !isHourBeforeDropoff &&
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
        // Lender and / or Borrower confirmed pickup
        if(!isHourBeforeDropoff &&
            status !== BOOKING_STATUSES.ITEM_RETURNED &&
            (status === BOOKING_STATUSES.BOTH_CONFIRMED ||
            (isOwner && status === BOOKING_STATUSES.LENDER_CONFIRMED) ||
            (!isOwner && status === BOOKING_STATUSES.BORROWER_CONFIRMED)
            )
        )   return <StatusConfirmed 
                isOwner={isOwner}
                userDetails={userDetails}
                endDateObj={endDate}
            />
        // Display a review submitted
        if(isHourBeforeDropoff &&
            (status === BOOKING_STATUSES.BOTH_REVIEWED ||
            (isOwner && status === BOOKING_STATUSES.LENDER_REVIEWED) ||
            (!isOwner && status === BOOKING_STATUSES.BORROWER_REVIEWED)
            )
        )   return <StatusReviewed isOwner={isOwner} 
            />
        
        // An hour before returning time
        if(isHourBeforeDropoff)
            return <DropOff 
                booking={booking}
                updateBookingStatus={updateBookingStatus}
                isOwner={isOwner}
                userDetails={userDetails}
                setReviewModalVisible={setReviewModalVisible}
                setReportModalVisible={setReportModalVisible}
                endDateObj={endDate}
                isLoading={isApproveLoading}
            />
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
            setIsApproveLoading(true)
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
        } finally {
            setIsApproveLoading(false)
        }
    }
    
    return (
        <>
            <div className="TradeStatusContainer">
                {status && renderStatusPanel()}
            </div>
            {status !== BOOKING_STATUSES.DISPUTED &&
             status !== BOOKING_STATUSES.RESOLVED &&
            <div className='TradeDisputeContainer'>
                <button
                    className='TradeDisputeBtn'
                    onClick={() => setIsDisputeOpen(true)}
                >
                    Dispute Trade
                </button>
            </div>
            }
            <DisputeBookingModal 
                open={isDisputeOpen} 
                onClick={() => setIsDisputeOpen(false)}
                updateBookingStatus={updateBookingStatus}
            />
        </>
    )
}

export default TradeCalendarStatusPanel
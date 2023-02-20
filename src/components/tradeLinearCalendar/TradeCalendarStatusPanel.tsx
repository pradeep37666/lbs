import moment from 'moment'
import React, { SetStateAction, useEffect, useState } from 'react'
import {
  BOOKING_STATUSES,
  SNACKBAR_BUTTON_TYPES,
} from '../../assets/Data/LBSEnum'
import { Booking } from '../../types/Booking'
import Instance from '../../util/axios'
import useErrorState from '../../util/reducers/errorContext'
import useGlobalState from '../../util/useGlobalState'
import { BookingStatus } from '../../types/Booking'
import DisputeBookingModal from '../modals/DisputeBookingModal/DisputeBookingModal'
import DropOff from '../tradeCalendar/tradeCalendarStatusPanel/DropOff'
import Pickup from '../tradeCalendar/tradeCalendarStatusPanel/Pickup'
import StatusApplied from '../tradeCalendar/tradeCalendarStatusPanel/StatusApplied'
import StatusApproved from '../tradeCalendar/tradeCalendarStatusPanel/StatusApproved'
import StatusConfirmed from '../tradeCalendar/tradeCalendarStatusPanel/StatusConfirmed'
import StatusDisputed from '../tradeCalendar/tradeCalendarStatusPanel/StatusDisputed'
import StatusItemReturn from '../tradeCalendar/tradeCalendarStatusPanel/StatusItemReturn'
import StatusRejected from '../tradeCalendar/tradeCalendarStatusPanel/StatusRejected'
import StatusReschedule from '../tradeCalendar/tradeCalendarStatusPanel/StatusReschedule'
import StatusReviewed from '../tradeCalendar/tradeCalendarStatusPanel/StatusReviewed'
import './TradeCalendarStatusPanel.css'

type Props = {
  booking: Booking
  userDetails: any
  getBookings: () => void
  setReportModalVisible: React.Dispatch<SetStateAction<boolean>>
  setReviewModalVisible: React.Dispatch<SetStateAction<boolean>>
  startDate: string
  endDate: string
}

export const TradeCalendarStatusPanel = ({
  booking,
  userDetails,
  getBookings,
  setReportModalVisible,
  setReviewModalVisible,
  startDate,
  endDate,
}: Props) => {
  const [status, setStatus] = useState<string>('')
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const { state } = useGlobalState()
  const { user } = state
  const isOwner = booking.lenderId === user.id
  const { errorDispatch } = useErrorState()
  const [isDisputeOpen, setIsDisputeOpen] = useState(false)

  useEffect(() => {
    setStatus(booking.status)
  }, [])

  const renderStatusPanel = () => {
    const isHourBeforePickup = isPickupTime()
    const isHourBeforeDropoff = isDropoffTime()

    if (
      status === BOOKING_STATUSES.DISPUTED ||
      status === BOOKING_STATUSES.RESOLVED
    )
      return <StatusDisputed />
    if (status === BOOKING_STATUSES.APPLIED)
      return (
        <StatusApplied
          isOwner={isOwner}
          updateBookingStatus={updateBookingStatus}
          isLoading={isApproveLoading}
          startDate={startDate}
          endDate={endDate}
        />
      )
    if (
      status === BOOKING_STATUSES.REJECTED ||
      status === BOOKING_STATUSES.CANCELLED
    )
      return (
        <StatusRejected
          userDetails={userDetails}
          isOwner={isOwner}
          status={status}
        />
      )
    if (status === BOOKING_STATUSES.TO_RESCHEDULE)
      return (
        <StatusReschedule
          isOwner={isOwner}
          updateBookingStatus={updateBookingStatus}
          booking={booking}
        />
      )
    if (
      status === BOOKING_STATUSES.ITEM_RETURNED ||
      (isOwner && status === BOOKING_STATUSES.BORROWER_REVIEWED) ||
      (!isOwner && status === BOOKING_STATUSES.LENDER_REVIEWED)
    )
      return (
        <StatusItemReturn
          isOwner={isOwner}
          setReviewModalVisible={setReviewModalVisible}
        />
      )
    // Booking approved but not an hour before booking time
    if (!isHourBeforePickup && status === BOOKING_STATUSES.APPROVED)
      return (
        <StatusApproved
          isOwner={isOwner}
          userDetails={userDetails}
          startDate={startDate}
        />
      )
    // An hour before booking time
    if (
      isHourBeforePickup &&
      !isHourBeforeDropoff &&
      (status === BOOKING_STATUSES.APPROVED ||
        (isOwner && status === BOOKING_STATUSES.BORROWER_CONFIRMED) ||
        (!isOwner && status === BOOKING_STATUSES.LENDER_CONFIRMED))
    )
      return (
        <Pickup
          isOwner={isOwner}
          updateBookingStatus={updateBookingStatus}
          userDetails={userDetails}
          setReportModalVisible={setReportModalVisible}
          status={status}
        />
      )
    // Lender and / or Borrower confirmed pickup
    if (
      !isHourBeforeDropoff &&
      status !== BOOKING_STATUSES.ITEM_RETURNED &&
      (status === BOOKING_STATUSES.BOTH_CONFIRMED ||
        (isOwner && status === BOOKING_STATUSES.LENDER_CONFIRMED) ||
        (!isOwner && status === BOOKING_STATUSES.BORROWER_CONFIRMED))
    )
      return (
        <StatusConfirmed
          isOwner={isOwner}
          userDetails={userDetails}
          endDate={endDate}
        />
      )
    // Display a review submitted
    if (
      isHourBeforeDropoff &&
      (status === BOOKING_STATUSES.BOTH_REVIEWED ||
        (isOwner && status === BOOKING_STATUSES.LENDER_REVIEWED) ||
        (!isOwner && status === BOOKING_STATUSES.BORROWER_REVIEWED))
    )
      return <StatusReviewed isOwner={isOwner} />

    // An hour before returning time
    if (isHourBeforeDropoff)
      return (
        <DropOff
          updateBookingStatus={updateBookingStatus}
          isOwner={isOwner}
          userDetails={userDetails}
          setReportModalVisible={setReportModalVisible}
          endDateObj={endDate}
          isLoading={isApproveLoading}
        />
      )
  }

  const isPickupTime = () => {
    const startDateMoment = moment(startDate)
    const now = moment()
    if (startDateMoment.isSameOrBefore(now.subtract(1, 'hour'))) return true
    return false
  }

  const isDropoffTime = () => {
    const endDateMoment = moment(startDate)
    const now = moment()
    if (endDateMoment.isSameOrBefore(now.subtract(1, 'hour'))) return true
    return false
  }

  const updateBookingStatus = async (newStatus: BookingStatus) => {
    try {
      setIsApproveLoading(true)
      const { status } = await Instance.patch(
        `/bookings/${booking.id}/status`,
        { status: newStatus }
      )
      if (status !== 200) return
      setStatus(newStatus)
      getBookings()
    } catch (error: any) {
      console.log(error.response)
      if (newStatus === 'APPROVED' && error?.response?.status === 400) {
        errorDispatch({
          type: 'openSnackBar',
          data: {
            message: 'Booking date conflicts with existing booking(s).',
            btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
            btnFunc: () => {
              errorDispatch({ type: 'closeSnackBar' })
            },
          },
        })
      } else if (newStatus === 'REJECTED' && error?.response?.status === 400) {
        errorDispatch({
          type: 'openSnackBar',
          data: {
            message: 'Unable to reject once booking approved',
            btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
            btnFunc: () => {
              errorDispatch({ type: 'closeSnackBar' })
            },
          },
        })
      }
    } finally {
      setIsApproveLoading(false)
    }
  }

  return (
    <>
      <div className='TradeStatusContainer'>
        {status && renderStatusPanel()}
      </div>
      {status !== BOOKING_STATUSES.DISPUTED &&
        status !== BOOKING_STATUSES.RESOLVED && (
          <div className='TradeDisputeContainer'>
            <button
              className='TradeDisputeBtn'
              onClick={() => setIsDisputeOpen(true)}
            >
              Dispute Trade
            </button>
          </div>
        )}
      <DisputeBookingModal
        open={isDisputeOpen}
        onClick={() => setIsDisputeOpen(false)}
        updateBookingStatus={updateBookingStatus}
      />
    </>
  )
}

export default TradeCalendarStatusPanel

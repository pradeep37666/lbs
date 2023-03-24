import moment from 'moment'
import React, { SetStateAction, useEffect, useState } from 'react'
import {
  BOOKING_STATUSES,
  SNACKBAR_BUTTON_TYPES,
} from '../../assets/Data/LBSEnum'
import BookingService from '../../services/booking'
import {
  Booking,
  BookingAction,
  BookingEventStatus,
  BookingStatus,
} from '../../types/Booking'
import { UserTradeData } from '../../types/User'
import Instance from '../../util/axios'
import useErrorState from '../../util/reducers/errorContext'
import getMostRecentBookingEvent from '../../util/tradeUtils/getMostRecentBookingEvent'
import useGlobalState from '../../util/useGlobalState'
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
  selectedBooking: Booking
  userDetails: UserTradeData | null
  getBookings: () => void
  toggleReportModal: () => void
  toggleReviewModal: () => void
  startDate: string
  endDate: string
}

export const TradeCalendarStatusPanel = ({
  selectedBooking,
  userDetails,
  getBookings,
  toggleReportModal,
  toggleReviewModal,
  startDate,
  endDate,
}: Props) => {
  const [status, setStatus] = useState<BookingEventStatus>(
    BookingEventStatus.APPLIED
  )
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const { state } = useGlobalState()
  const { user } = state
  const isOwner = selectedBooking.borrowerId === user.id
  const isBorrower = selectedBooking.borrowerId === user.id
  const isLender = selectedBooking.item.userId === user.id
  const { errorDispatch } = useErrorState()
  const [isDisputeOpen, setIsDisputeOpen] = useState(false)
  const bookingStatus = getMostRecentBookingEvent(
    selectedBooking.bookingEvents
  )?.event

  useEffect(() => {
    setStatus(bookingStatus ?? BookingEventStatus.APPLIED)
  }, [])

  const renderStatusPanel = () => {
    const isHourBeforePickup = isPickupTime()
    const isHourBeforeDropoff = isDropoffTime()

    if (!userDetails) return

    if (
      status === BOOKING_STATUSES.DISPUTED ||
      status === BOOKING_STATUSES.RESOLVED
    )
      return <StatusDisputed />
    if (status === BOOKING_STATUSES.APPLIED)
      return (
        <StatusApplied
          isBorrower={isBorrower}
          handleBookingAction={handleBookingAction}
          updateBookingStatus={updateBookingStatus}
          isLoading={isApproveLoading}
          startDate={startDate}
          endDate={endDate}
          selectedBooking={selectedBooking}
        />
      )
    if (
      status === BOOKING_STATUSES.REJECTED ||
      status === BOOKING_STATUSES.CANCELLED
    )
      return (
        <StatusRejected
          userDetails={userDetails}
          isLender={isLender}
          status={status}
        />
      )
    if (status === BOOKING_STATUSES.TO_RESCHEDULE)
      return (
        <StatusReschedule
          isOwner={isOwner}
          updateBookingStatus={updateBookingStatus}
          booking={selectedBooking}
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
          toggleReviewModal={toggleReviewModal}
        />
      )
    // Booking approved but not an hour before booking time
    if (!isHourBeforePickup && status === BOOKING_STATUSES.APPROVED)
      return (
        <StatusApproved
          isLender={isLender}
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
          // @ts-ignore
          updateBookingStatus={updateBookingStatus}
          userDetails={userDetails}
          toggleReportModal={toggleReportModal}
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
          endDate={endDate}
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

  // New function to handle booking actions

  const handleBookingAction = async (action: BookingAction) => {
    try {
      setIsApproveLoading(true)
      switch (action) {
        case 'REJECT':
          const res = await BookingService.rejectBooking(selectedBooking.id)
          setStatus(BookingEventStatus.REJECTED)
          getBookings()
          break
        case 'APPROVE':
          if (!selectedBooking.bookingDurations[0]) return
          const approveRes = await BookingService.approveBooking(
            selectedBooking.id,
            selectedBooking.bookingDurations[0].id
          )
          setStatus(BookingEventStatus.APPROVED)
          getBookings()
          break
        case 'COMPLETE':
          await BookingService.completeBooking(selectedBooking.id)
          getBookings()
          break
      }
    } catch (error) {
      console.log('BOOKING ACTION ERROR', error)
      errorDispatch({
        type: 'openSnackBar',
        data: {
          message: 'Something went wrong...',
          btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
          btnFunc: () => {
            errorDispatch({ type: 'closeSnackBar' })
          },
        },
      })
    } finally {
      setIsApproveLoading(false)
    }
  }

  // TODO - old booking action function keep for typesafety - slowly remove as
  // more backend routes added
  const updateBookingStatus = async (newStatus: BookingStatus) => {
    try {
      setIsApproveLoading(true)
      const { status } = await Instance.patch(
        `/bookings/${selectedBooking.id}/status`,
        { status: newStatus }
      )
      if (status !== 200) return
      // setStatus(newStatus)
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

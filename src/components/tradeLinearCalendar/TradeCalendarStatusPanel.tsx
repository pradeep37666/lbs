import moment from 'moment'
import React, { SetStateAction, useEffect, useState } from 'react'
import { SNACKBAR_BUTTON_TYPES } from '../../assets/Data/LBSEnum'
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
import getBookingDuration from '../../util/tradeUtils/getBookingDuration'
import getMostRecentBookingEvent from '../../util/tradeUtils/getMostRecentBookingEvent'
import isBothConfirmed from '../../util/tradeUtils/getIsBothConfirmed'
import isDropoffTime from '../../util/tradeUtils/isDropoffTime'
import isPickupTime from '../../util/tradeUtils/isPickupTime'
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
import getIsBothConfirmed from '../../util/tradeUtils/getIsBothConfirmed'
import StatusExtension from '../tradeCalendar/extension/StatusExtension'

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
  const [status, setStatus] = useState<BookingStatus>(selectedBooking.status)
  const [isBothConfirmed, setIsBothConfirmed] = useState(
    getIsBothConfirmed(selectedBooking.bookingEvents)
  )
  const [isApproveLoading, setIsApproveLoading] = useState(false)
  const [isDisputed, setIsDisputed] = useState(false)
  const { state } = useGlobalState()
  const { user } = state
  const isOwner = selectedBooking.borrowerId === user.id
  const isBorrower = selectedBooking.borrowerId === user.id
  const isLender = selectedBooking.item.userId === user.id
  const { errorDispatch } = useErrorState()
  const [isDisputeOpen, setIsDisputeOpen] = useState(false)
  const bookingDuration = getBookingDuration(selectedBooking.bookingDurations)
  const bookingEventStatus = getMostRecentBookingEvent(
    selectedBooking.bookingEvents
  )?.event

  console.log('SELECTED', JSON.stringify(selectedBooking, null, 2))

  const renderStatusPanel = () => {
    if (!bookingDuration) return
    // const isHourBeforePickup = isPickupTime(bookingDuration.startDate)
    const isHourBeforePickup = false
    const isHourBeforeDropoff = isDropoffTime(bookingDuration.endDate)

    // TODO - Use backend flow diagram to refactor and reconfigure if chain to mimic new booking flow

    if (!userDetails) return

    if (isDisputed) return <StatusDisputed />
    if (status === 'APPLIED')
      return (
        <StatusApplied
          isLender={isLender}
          handleBookingAction={handleBookingAction}
          isLoading={isApproveLoading}
          startDate={startDate}
          endDate={endDate}
          selectedBooking={selectedBooking}
        />
      )
    if (status === 'REJECTED' || status === 'CANCELLED')
      return (
        <StatusRejected
          userDetails={userDetails}
          isLender={isLender}
          status={status}
        />
      )
    if (status === 'TO_RESCHEDULE')
      return (
        <StatusReschedule
          isOwner={isOwner}
          updateBookingStatus={updateBookingStatus}
          booking={selectedBooking}
        />
      )
    if (
      (isOwner &&
        bookingEventStatus === BookingEventStatus.BORROWER_REVIEWED) ||
      (!isOwner && bookingEventStatus === BookingEventStatus.LENDER_REVIEWED)
    )
      return (
        <StatusItemReturn
          isOwner={isOwner}
          toggleReviewModal={toggleReviewModal}
        />
      )

    // Booking approved but not an hour before booking time
    if (!isHourBeforePickup && status === 'APPROVED') {
      return (
        <StatusApproved
          isLender={isLender}
          userDetails={userDetails}
          startDate={startDate}
        />
      )
    }

    // An hour before booking time
    if (
      isHourBeforePickup &&
      !isHourBeforeDropoff &&
      (status === 'IN_PROGRESS' ||
        (isLender &&
          bookingEventStatus === BookingEventStatus.BORROWER_CONFIRMED) ||
        (isBorrower &&
          bookingEventStatus === BookingEventStatus.LENDER_CONFIRMED))
    )
      return (
        <Pickup
          isLender={isLender}
          // @ts-ignore
          updateBookingStatus={updateBookingStatus}
          handleBookingAction={handleBookingAction}
          userDetails={userDetails}
          toggleReportModal={toggleReportModal}
          status={bookingEventStatus}
        />
      )

    // Lender and / or Borrower confirmed pickup
    if (
      !isHourBeforeDropoff &&
      status === 'IN_PROGRESS' &&
      (isBothConfirmed ||
        (isLender &&
          bookingEventStatus === BookingEventStatus.LENDER_CONFIRMED) ||
        (isBorrower &&
          bookingEventStatus === BookingEventStatus.BORROWER_CONFIRMED))
    ) {
      if (
        bookingEventStatus === BookingEventStatus.EXTENSION_APPROVED ||
        bookingEventStatus === BookingEventStatus.EXTENSION_REJECTED ||
        bookingEventStatus === BookingEventStatus.EXTENSION_REQUESTED
      ) {
        return (
          <StatusExtension
            extensionStatus={bookingEventStatus}
            isLender={isLender}
            handleBookingAction={handleBookingAction}
            userDetails={userDetails}
            endDate={endDate}
            selectedBooking={selectedBooking}
            bookingDuration={bookingDuration}
          />
        )
      }
      return (
        <StatusConfirmed
          bookingDuration={bookingDuration}
          isLender={isLender}
          userDetails={userDetails}
          endDate={endDate}
          selectedBooking={selectedBooking}
        />
      )
    }

    // Display a review submitted
    if (
      isHourBeforeDropoff &&
      ((isOwner && bookingEventStatus === BookingEventStatus.LENDER_REVIEWED) ||
        (!isOwner &&
          bookingEventStatus === BookingEventStatus.BORROWER_REVIEWED))
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

  // New function to handle booking actions

  const handleBookingAction = async (action: BookingAction) => {
    try {
      setIsApproveLoading(true)
      switch (action) {
        case 'REJECT':
          await BookingService.rejectBooking(selectedBooking.id)
          setStatus(BookingEventStatus.REJECTED)
          getBookings()
          break
        case 'CANCEL':
          await BookingService.cancelBooking(selectedBooking.id)
          setStatus(BookingEventStatus.CANCELLED)
          getBookings()
          break
        case 'APPROVE':
          if (!selectedBooking.bookingDurations[0]) return
          await BookingService.approveBooking(
            selectedBooking.id,
            selectedBooking.bookingDurations[0].id
          )
          setStatus(BookingEventStatus.APPROVED)
          getBookings()
          break
        case 'BORROWER_CONFIRM':
          await BookingService.borrowerConfirm(selectedBooking.id)
          setStatus('IN_PROGRESS')
          break
        case 'LENDER_CONFIRM':
          await BookingService.lenderConfirm(selectedBooking.id)
          break
        case 'BOTH_CONFIRM':
          bookingEventStatus === BookingEventStatus.BORROWER_CONFIRMED
            ? await BookingService.lenderConfirm(selectedBooking.id)
            : await BookingService.borrowerConfirm(selectedBooking.id)
          setIsBothConfirmed(true)
          break
        case 'COMPLETE':
          await BookingService.completeBooking(selectedBooking.id)
          getBookings()
          break
        default: {
          throw Error('unhandled error')
        }
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
      {bookingEventStatus !== BookingEventStatus.DISPUTED &&
        bookingEventStatus !== BookingEventStatus.RESOLVED && (
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

import moment from 'moment'
import { useEffect, useState } from 'react'
import { SNACKBAR_BUTTON_TYPES } from '../../assets/Data/LBSEnum'
import BookingService from '../../services/booking'
import {
  Booking,
  BookingAction,
  BookingEventStatus,
  BookingStatus,
} from '../../types/Booking'
import { UserTradeData } from '../../types/User'
import useErrorState from '../../util/reducers/errorContext'
import getBookingDuration from '../../util/tradeUtils/getBookingDuration'
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
import StatusExtension from '../tradeCalendar/extension/StatusExtension'
import BookingEventService from '../../util/BookingEventService'
import getBookingActionError from '../../util/tradeUtils/getBookingActionError'
import getIsDisputed from '../../util/tradeUtils/getIsDisputed'

type Props = {
  selectedBooking: Booking
  userDetails: UserTradeData | null
  getBookings: () => Promise<void>
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
  const [isBookingActionLoading, setIsBookingActionLoading] = useState(false)
  const [isDisputed, setIsDisputed] = useState(false)
  const { state } = useGlobalState()
  const { user } = state
  const isBorrower = selectedBooking.borrowerId === user.id
  const isLender = selectedBooking.item.userId === user.id
  const { errorDispatch } = useErrorState()
  const [isDisputeOpen, setIsDisputeOpen] = useState(false)
  const bookingDuration = getBookingDuration(selectedBooking.bookingDurations)
  const [bookingEventStatus, setBookingEventStatus] = useState<
    BookingEventStatus | undefined
  >(getMostRecentBookingEvent(selectedBooking.bookingEvents)?.event)

  useEffect(() => {
    setStatus(selectedBooking.status)
    setIsDisputed(getIsDisputed(selectedBooking.disputes))
  }, [])

  const handleBookingAction = async (
    action: BookingAction,
    event?: BookingEventStatus
  ) => {
    const bookingDurationId = selectedBooking.bookingDurations[0]?.id
    try {
      setIsBookingActionLoading(true)
      switch (action) {
        case 'REJECT':
          if (!bookingDurationId) return
          await BookingService.rejectBooking(
            selectedBooking.id,
            bookingDurationId
          )
          getBookings()
          event === BookingEventStatus.EXTENSION_REJECTED
            ? setBookingEventStatus(BookingEventStatus.EXTENSION_REJECTED)
            : setStatus('REJECTED')
          break
        case 'CANCEL':
          if (!bookingDurationId) return
          await BookingService.cancelBooking(
            selectedBooking.id,
            bookingDurationId
          )
          getBookings()
          event === BookingEventStatus.EXTENSION_CANCELLED
            ? setBookingEventStatus(BookingEventStatus.EXTENSION_CANCELLED)
            : setStatus('CANCELLED')
          break
        case 'DISPUTE':
          await BookingService.disputeBooking(selectedBooking.id)
          setIsDisputed(true)
          getBookings()
          break
        case 'RESCHEDULE':
          await BookingService.rescheduleBooking(selectedBooking.id)
          getBookings()
          setStatus('TO_RESCHEDULE')
          break
        case 'APPROVE':
          if (!bookingDurationId) return
          await BookingService.approveBooking(
            selectedBooking.id,
            bookingDurationId
          )
          getBookings()
          event === BookingEventStatus.EXTENSION_APPROVED
            ? setBookingEventStatus(BookingEventStatus.EXTENSION_APPROVED)
            : setStatus('APPROVED')
          break
        case 'BORROWER_CONFIRM':
          await BookingService.borrowerConfirm(selectedBooking.id)
          getBookings()
          setBookingEventStatus(BookingEventStatus.BORROWER_CONFIRMED)
          break
        case 'LENDER_CONFIRM':
          await BookingService.lenderConfirm(selectedBooking.id)
          setStatus('IN_PROGRESS')
          getBookings()
          setBookingEventStatus(BookingEventStatus.LENDER_CONFIRMED)
          break
        case 'COMPLETE':
          await BookingService.completeBooking(selectedBooking.id)
          getBookings()
          setStatus('ENDED')
          break
        default: {
          throw Error('unhandled booking action specified')
        }
      }
    } catch (error) {
      errorDispatch({
        type: 'openSnackBar',
        data: {
          message: getBookingActionError(action),
          btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
          btnFunc: () => {
            errorDispatch({ type: 'closeSnackBar' })
          },
        },
      })
    } finally {
      setIsBookingActionLoading(false)
    }
  }

  const renderStatusPanel = () => {
    if (!bookingDuration || !userDetails) return
    if (isDisputed) return <StatusDisputed />

    switch (status) {
      case 'APPLIED':
        return (
          <StatusApplied
            isLender={isLender}
            handleBookingAction={handleBookingAction}
            isLoading={isBookingActionLoading}
            startDate={startDate}
            endDate={endDate}
          />
        )
      case 'APPROVED':
        return (
          <StatusApproved
            isLender={isLender}
            userDetails={userDetails}
            startDate={startDate}
          />
        )
      case 'REJECTED':
      case 'CANCELLED':
        return (
          <StatusRejected
            userDetails={userDetails}
            isLender={isLender}
            status={status}
          />
        )
      case 'TO_RESCHEDULE':
        return (
          <StatusReschedule
            isLender={isLender}
            handleBookingAction={handleBookingAction}
            booking={selectedBooking}
          />
        )
      case 'IN_PROGRESS':
        return renderBookingInProgress()
      case 'ENDED':
        return renderBookingEnded()
      default:
        throw Error('Unhandled booking status')
    }
  }

  const renderBookingInProgress = () => {
    if (!userDetails || !bookingDuration) return
    const isLenderConfirmed = BookingEventService.isLenderConfirmed(
      selectedBooking.bookingEvents
    )
    const isBorrowerConfirmed = BookingEventService.isBorrowerConfirmed(
      selectedBooking.bookingEvents
    )
    const isAfterEndDate = moment().isSameOrAfter(bookingDuration.endDate)

    if (isAfterEndDate) {
      return (
        <DropOff
          handleBookingAction={handleBookingAction}
          isLender={isLender}
          userDetails={userDetails}
          endDate={endDate}
          isLoading={isBookingActionLoading}
          toggleDisputeModal={() => setIsDisputeOpen(!isDisputeOpen)}
        />
      )
    }

    if (
      bookingEventStatus === BookingEventStatus.EXTENSION_APPROVED ||
      bookingEventStatus === BookingEventStatus.EXTENSION_REJECTED ||
      bookingEventStatus === BookingEventStatus.EXTENSION_REQUESTED ||
      bookingEventStatus === BookingEventStatus.EXTENSION_CANCELLED
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
          isLoading={isBookingActionLoading}
        />
      )
    }

    if (
      (isLender &&
        bookingEventStatus === BookingEventStatus.LENDER_CONFIRMED) ||
      (isBorrower &&
        bookingEventStatus === BookingEventStatus.BORROWER_CONFIRMED)
    ) {
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

    if (
      (isLender && !isLenderConfirmed) ||
      (isBorrower && !isBorrowerConfirmed)
    ) {
      return (
        <Pickup
          isLender={isLender}
          handleBookingAction={handleBookingAction}
          userDetails={userDetails}
          toggleDisputeModal={() => setIsDisputeOpen(!isDisputeOpen)}
          isLoading={isBookingActionLoading}
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

  const renderBookingEnded = () => {
    if (
      (isBorrower &&
        bookingEventStatus === BookingEventStatus.BORROWER_REVIEWED) ||
      (isBorrower &&
        BookingEventService.isBorrowerReviewed(selectedBooking.bookingEvents))
    ) {
      return <StatusReviewed isLender={isLender} />
    } else if (
      (isLender && bookingEventStatus === BookingEventStatus.LENDER_REVIEWED) ||
      (isLender &&
        BookingEventService.isLenderReviewed(selectedBooking.bookingEvents))
    ) {
      return <StatusReviewed isLender={isLender} />
    } else {
      return (
        <StatusItemReturn
          isLender={isLender}
          toggleReviewModal={toggleReviewModal}
        />
      )
    }
  }

  return (
    <>
      <div className='TradeStatusContainer'>{renderStatusPanel()}</div>
      {bookingEventStatus !== BookingEventStatus.DISPUTED &&
        bookingEventStatus !== BookingEventStatus.RESOLVED && (
          <div className='TradeDisputeContainer'>
            <button
              className='TradeDisputeBtn'
              disabled={selectedBooking.status !== 'IN_PROGRESS' || isDisputed}
              onClick={() => setIsDisputeOpen(true)}
            >
              Dispute Trade
            </button>
          </div>
        )}
      <DisputeBookingModal
        isOpen={isDisputeOpen}
        onClose={() => setIsDisputeOpen(false)}
        handleBookingAction={handleBookingAction}
        isLoading={isBookingActionLoading}
      />
    </>
  )
}

export default TradeCalendarStatusPanel

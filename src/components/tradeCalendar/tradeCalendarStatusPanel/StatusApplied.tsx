import React, { useState } from 'react'
import { BOOKING_STATUSES } from '../../../assets/Data/LBSEnum'
import StatusButton from './StatusButton'
import BookingDatesPanel from '../../BookingDatesPanel/BookingDatesPanel'
import { BookingStatus } from '../../../types/Booking'

type Props = {
  isOwner: boolean
  updateBookingStatus: (newStatus: BookingStatus) => Promise<void>
  isLoading: boolean
  startDate: string
  endDate: string
}

export const StatusApplied = ({
  isOwner,
  updateBookingStatus,
  isLoading,
  startDate,
  endDate,
}: Props) => {
  const [cancelPressed, setCancelPressed] = useState(false)

  const noOwnerContent = (
    <div className='TradeStatusContentContainer'>
      <span style={{ marginBottom: '0.5em' }}>
        Your booking request has been sent, the item owner has 24 hours to
        respond
      </span>
      <StatusButton
        text='Cancel Borrow'
        type='white'
        onClick={() => updateBookingStatus('CANCELLED')}
        width='100%'
      />
    </div>
  )

  const bookingDetailsContent = (
    <>
      <BookingDatesPanel startDate={startDate} endDate={endDate} />
      <div className='TradeStatusButtonContainer'>
        <StatusButton
          text='Decline'
          type='white'
          onClick={() => setCancelPressed(true)}
        />
        <StatusButton
          text='Approve'
          type='red'
          onClick={() => updateBookingStatus('APPROVED')}
          isLoading={isLoading}
        />
      </div>
    </>
  )

  const cancelPressedContent = (
    <div className='TradeStatusContentContainer'>
      <span style={{ marginBottom: '0.5em' }}>
        Please let the Borrower know why you have declined their booking
        application. If a scheduling issue, ask them to choose alernative dates.
      </span>
      <div className='TradeStatusButtonContainer'>
        <StatusButton
          text='Completely Cancel'
          type='white'
          onClick={() => updateBookingStatus('REJECTED')}
        />
        <StatusButton
          text='Ask to Book New Times'
          type='blue'
          onClick={() => updateBookingStatus('TO_RESCHEDULE')}
        />
      </div>
    </div>
  )

  return (
    <>
      {isOwner
        ? cancelPressed
          ? cancelPressedContent
          : bookingDetailsContent
        : noOwnerContent}
    </>
  )
}

export default StatusApplied

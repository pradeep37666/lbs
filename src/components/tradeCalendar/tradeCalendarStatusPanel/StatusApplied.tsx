import React, { useState } from 'react'
import StatusButton from './StatusButton'
import BookingDatesPanel from '../../BookingDatesPanel/BookingDatesPanel'
import { Booking, BookingAction, BookingStatus } from '../../../types/Booking'
import BookingService from '../../../services/booking'

type Props = {
  isLender: boolean
  handleBookingAction: (action: BookingAction) => Promise<void>
  isLoading: boolean
  startDate: string
  endDate: string
  selectedBooking: Booking
}

export const StatusApplied = ({
  isLender,
  handleBookingAction,
  isLoading,
  startDate,
  endDate,
  selectedBooking,
}: Props) => {
  const [isCancelPressed, setIsCancelPressed] = useState(false)

  const noOwnerContent = (
    <div className='TradeStatusContentContainer'>
      <span style={{ marginBottom: '0.5em' }}>
        Your booking request has been sent, the item owner has 24 hours to
        respond
      </span>
      <StatusButton
        text='Cancel Borrow'
        type='white'
        onClick={() => handleBookingAction('CANCEL')}
        width='100%'
      />
    </div>
  )

  const bookingDetailsContent = (
    <>
      <BookingDatesPanel
        startDate={new Date(startDate)}
        endDate={new Date(endDate)}
      />
      <div className='TradeStatusButtonContainer'>
        <StatusButton
          text='Decline'
          type='white'
          onClick={() => setIsCancelPressed(true)}
          isLoading={isLoading}
        />
        <StatusButton
          text='Approve'
          type='red'
          onClick={() => handleBookingAction('APPROVE')}
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
          onClick={() => handleBookingAction('REJECT')}
        />
        <StatusButton
          text='Ask to Book New Times'
          type='blue'
          onClick={() => handleBookingAction('REJECT')}
        />
      </div>
    </div>
  )

  return (
    <>
      {isLender
        ? isCancelPressed
          ? cancelPressedContent
          : noOwnerContent
        : bookingDetailsContent}
    </>
  )
}

export default StatusApplied

import React from 'react'
import { useHistory } from 'react-router'
import { Booking, BookingAction } from '../../../types/Booking'
import StatusButton from './StatusButton'

type Props = {
  isLender: boolean
  handleBookingAction: (action: BookingAction) => Promise<void>
  booking: Booking
}

export const StatusReschedule = ({
  isLender,
  handleBookingAction,
  booking,
}: Props) => {
  const itemId = booking.itemId
  const history = useHistory()

  return (
    <div className='TradeStatusContentContainer'>
      {isLender ? (
        <div className='TradeStatusContentContainer'>
          <span style={{ marginBottom: '0.5em' }}>
            You have asked for new times from this borrower, they have 24hrs to
            send their new times before this trade is completely cancelled.
          </span>
          <StatusButton text='Wait For New Times' nonBtn={true} />
        </div>
      ) : (
        <>
          <span style={{ marginBottom: '0.5em' }}>
            The owner has asked that you reschedule the booking.
          </span>
          <div className='TradeStatusButtonContainer'>
            <StatusButton
              text='Cancel'
              type='white'
              onClick={() => handleBookingAction('CANCEL')}
            />
            <StatusButton
              text='Apply Again'
              type='red'
              onClick={() => {
                history.push(`/item/${itemId}/application`)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default StatusReschedule

import React from 'react'
import { useHistory } from 'react-router'
import { Booking, BookingStatus } from '../../../types/Booking'
import StatusButton from './StatusButton'

type Props = {
  isOwner: boolean
  updateBookingStatus: (status: BookingStatus) => Promise<void>
  booking: Booking
}

export const StatusReschedule = ({
  isOwner,
  updateBookingStatus,
  booking,
}: Props) => {
  const itemId = booking.itemId
  const history = useHistory()

  return (
    <div className='TradeStatusContentContainer'>
      {isOwner ? (
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
            The owner has re-scheduled the booking
          </span>
          <div className='TradeStatusButtonContainer'>
            <StatusButton
              text='Cancel'
              type='white'
              onClick={() => updateBookingStatus('REJECTED')}
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

import React, { useState } from 'react'
import {
  BookingAction,
  BookingEventStatus,
  BookingStatus,
} from '../../../types/Booking'
import { UserTradeData } from '../../../types/User'
import StatusButton from './StatusButton'

type Props = {
  isLender: boolean
  userDetails: UserTradeData
  isBothConfirmed: boolean
  updateBookingStatus: (status: BookingEventStatus) => Promise<void>
  handleBookingAction: (action: BookingAction) => Promise<void>
  bookingEventStatus: BookingEventStatus
  toggleReportModal: () => void
}

export const Pickup = ({
  isLender,
  userDetails,
  updateBookingStatus,
  handleBookingAction,
  toggleReportModal,
  bookingEventStatus,
}: Props) => {
  const [isDisputeClicked, setIsDisputeClicked] = useState(false)

  return (
    <div className='TradeStatusContentContainer'>
      {isLender ? (
        isDisputeClicked ? (
          <>
            <span style={{ marginBottom: '0.5em' }}>
              Would you like to dispute this trade?
            </span>
            <div className='TradeStatusButtonContainer'>
              <StatusButton
                text='Dispute Trade'
                type='blue'
                onClick={() => updateBookingStatus(BookingEventStatus.DISPUTED)}
                width='100%'
              />
            </div>
          </>
        ) : (
          <>
            <span style={{ marginBottom: '0.5em' }}>
              Has {`${userDetails.firstName} ${userDetails.lastName}`} picked up
              the item?
            </span>
            <div className='TradeStatusButtonContainer'>
              <StatusButton
                text='No'
                type='white'
                onClick={() => setIsDisputeClicked(true)}
              />
              <StatusButton
                text='Yes'
                type='blue'
                onClick={() =>
                  handleBookingAction(
                    bookingEventStatus ===
                      BookingEventStatus.BORROWER_CONFIRMED ||
                      bookingEventStatus === BookingEventStatus.IN_PROGRESS
                      ? 'LENDER_CONFIRM'
                      : 'BORROWER_CONFIRM'
                  )
                }
              />
            </div>
          </>
        )
      ) : isDisputeClicked ? (
        <>
          <span style={{ marginBottom: '0.5em' }}>
            Would you like to dispute this trade?
          </span>
          <div className='TradeStatusButtonContainer'>
            <StatusButton
              text='Dispute Trade'
              type='blue'
              onClick={() => updateBookingStatus(BookingEventStatus.DISPUTED)}
              width='100%'
            />
          </div>
        </>
      ) : (
        <>
          <span style={{ marginBottom: '0.5em' }}>
            Has {`${userDetails.firstName} ${userDetails.lastName}`}{' '}
            successfully provided you the item?
          </span>
          <div className='TradeStatusButtonContainer'>
            <StatusButton
              text='No'
              type='white'
              onClick={() => setIsDisputeClicked(true)}
            />
            <StatusButton
              text='Yes'
              type='blue'
              onClick={() =>
                handleBookingAction(
                  bookingEventStatus === BookingEventStatus.LENDER_CONFIRMED
                    ? 'BOTH_CONFIRM'
                    : 'BORROWER_CONFIRM'
                )
              }
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Pickup

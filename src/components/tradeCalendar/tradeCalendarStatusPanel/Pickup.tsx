import React, { useState } from 'react'
import { BOOKING_STATUSES } from '../../../assets/Data/LBSEnum'
import { BookingEventStatus, BookingStatus } from '../../../types/Booking'
import { UserTradeData } from '../../../types/User'
import StatusButton from './StatusButton'

type Props = {
  isOwner: boolean
  userDetails: UserTradeData
  updateBookingStatus: (status: BookingEventStatus | string) => Promise<void>
  status: string
  toggleReportModal: () => void
}

export const Pickup = ({
  isOwner,
  userDetails,
  updateBookingStatus,
  toggleReportModal,
  status,
}: Props) => {
  const [isNotPressed, setIsNotPressed] = useState(false)
  const confirmationStatus = () => {
    if (isOwner) {
      switch (status) {
        case BookingEventStatus.APPROVED:
          return BookingEventStatus.LENDER_CONFIRMED
        case BookingEventStatus.BORROWER_CONFIRMED:
          return BookingEventStatus.BOTH_CONFIRMED
        default:
          return BookingEventStatus.APPROVED
      }
    } else {
      switch (status) {
        case BookingEventStatus.APPROVED:
          return BookingEventStatus.BORROWER_CONFIRMED
        case BookingEventStatus.LENDER_CONFIRMED:
          return BookingEventStatus.BOTH_CONFIRMED
        default:
          return BookingEventStatus.APPROVED
      }
    }
  }

  if (!userDetails) {
    return <div />
  }

  return (
    <div className='TradeStatusContentContainer'>
      {isOwner ? (
        isNotPressed ? (
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
                onClick={() => setIsNotPressed(true)}
              />
              <StatusButton
                text='Yes'
                type='blue'
                onClick={() => updateBookingStatus(confirmationStatus())}
              />
            </div>
          </>
        )
      ) : isNotPressed ? (
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
              onClick={() => setIsNotPressed(true)}
            />
            <StatusButton
              text='Yes'
              type='blue'
              onClick={() => updateBookingStatus(confirmationStatus())}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Pickup

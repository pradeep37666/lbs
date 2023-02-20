import React, { useState } from 'react'
import { BOOKING_STATUSES } from '../../../assets/Data/LBSEnum'
import StatusButton from './StatusButton'

export const Pickup = ({
  isOwner,
  userDetails,
  updateBookingStatus,
  setReportModalVisible,
  status,
}) => {
  const [isNotPressed, setIsNotPressed] = useState(false)
  const confirmationStatus = () => {
    if (isOwner) {
      switch (status) {
        case BOOKING_STATUSES.APPROVED:
          return BOOKING_STATUSES.LENDER_CONFIRMED
        case BOOKING_STATUSES.BORROWER_CONFIRMED:
          return BOOKING_STATUSES.BOTH_CONFIRMED
        default:
          return
      }
    } else {
      switch (status) {
        case BOOKING_STATUSES.APPROVED:
          return BOOKING_STATUSES.BORROWER_CONFIRMED
        case BOOKING_STATUSES.LENDER_CONFIRMED:
          return BOOKING_STATUSES.BOTH_CONFIRMED
        default:
          return
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
                onClick={() => updateBookingStatus(BOOKING_STATUSES.DISPUTED)}
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
              onClick={() => updateBookingStatus(BOOKING_STATUSES.DISPUTED)}
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

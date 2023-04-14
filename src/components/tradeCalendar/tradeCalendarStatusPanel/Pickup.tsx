import React, { useState } from 'react'
import { BookingAction } from '../../../types/Booking'
import { UserTradeData } from '../../../types/User'
import StatusButton from './StatusButton'

type Props = {
  isLender: boolean
  userDetails: UserTradeData
  handleBookingAction: (action: BookingAction) => Promise<void>
  toggleDisputeModal: () => void
  isLoading: boolean
}

export const Pickup = ({
  isLender,
  userDetails,
  handleBookingAction,
  toggleDisputeModal,
  isLoading,
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
                onClick={() => toggleDisputeModal()}
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
                isLoading={isLoading}
                onClick={() => handleBookingAction('LENDER_CONFIRM')}
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
              onClick={() => toggleDisputeModal()}
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
              onClick={() => handleBookingAction('BORROWER_CONFIRM')}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Pickup

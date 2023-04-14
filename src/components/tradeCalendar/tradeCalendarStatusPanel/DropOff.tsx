import moment from 'moment'
import React, { useState } from 'react'
import { dayArray, monthArray } from '../../../assets/Data/LBSArray'
import { BookingAction, BookingStatus } from '../../../types/Booking'
import { User, UserTradeData } from '../../../types/User'
import getDateSuffix from '../../../util/dateUtils/getDateSuffix'
import StatusButton from './StatusButton'

type Props = {
  isLender: boolean
  handleBookingAction: (action: BookingAction) => Promise<void>
  userDetails: UserTradeData | null
  endDate: string
  isLoading: boolean
  toggleDisputeModal: () => void
}

export const DropOff = ({
  isLender,
  handleBookingAction,
  userDetails,
  endDate,
  isLoading,
  toggleDisputeModal,
}: Props) => {
  const [noPressed, setNoPressed] = useState<boolean | undefined>()
  const endTime = moment(endDate).hours() === 8 ? '8:00am' : '1:00pm'
  const endDay = dayArray[moment(endDate).day()]
  const endDateSuffix = getDateSuffix(new Date(endDate))
  const endMonth = monthArray[moment(endDate).month()]

  const renderContent = () => {
    if (isLender && userDetails) {
      if (noPressed) {
        return (
          <>
            <span style={{ marginBottom: '0.5em' }}>
              Would you like to dispute this trade?
            </span>
            <div className='TradeStatusButtonContainer'>
              <StatusButton
                text='Dispute Trade'
                type='blue'
                onClick={toggleDisputeModal}
                width='100%'
              />
            </div>
          </>
        )
      } else {
        return (
          <>
            <span style={{ marginBottom: '0.5em' }}>
              Has {`${userDetails.firstName} ${userDetails.lastName}`} dropped
              off the item?
            </span>
            <div className='TradeStatusButtonContainer'>
              <StatusButton
                text='No'
                type='white'
                onClick={() => setNoPressed(true)}
              />
              <StatusButton
                text='Yes'
                type='blue'
                onClick={() => handleBookingAction('COMPLETE')}
                isLoading={isLoading}
              />
            </div>
          </>
        )
      }
    } else {
      return (
        <>
          <span style={{ marginBottom: '0.5em' }}>
            Your item is now due. Please check that it’s in the same condition
            as when you borrowed it.
          </span>
          <StatusButton
            text={
              <div>
                Your Item Is Due Back At
                <div style={{ display: 'flex' }}>
                  <p
                    style={{
                      fontWeight: 'bold',
                      color: '#AC172C',
                      margin: '0',
                    }}
                  >
                    {endTime}&nbsp;
                  </p>
                  <p style={{ fontWeight: 'bold', margin: '0' }}>
                    {endDay}&nbsp;
                  </p>
                  <p style={{ margin: '0' }}>{endDateSuffix}</p>
                  <p style={{ margin: '0' }}>&nbsp; - &nbsp;</p>
                  <p style={{ margin: '0' }}>{endMonth}</p>
                </div>
              </div>
            }
            nonBtn={true}
          />
        </>
      )
    }
  }

  return <div className='TradeStatusContentContainer'>{renderContent()}</div>
}

export default DropOff

import moment from 'moment'
import React, { useState } from 'react'
import { BookingStatus } from '../../../types/Booking'
import { User, UserTradeData } from '../../../types/User'
import getDateSuffix from '../../../util/dateUtils/getDateSuffix'
import StatusButton from './StatusButton'

type Props = {
  isOwner: boolean
  updateBookingStatus: (bookingStatus: BookingStatus) => Promise<void>
  userDetails: UserTradeData | null
  endDate: string
  isLoading: boolean
}

export const DropOff = ({
  isOwner,
  updateBookingStatus,
  userDetails,
  endDate,
  isLoading,
}: Props) => {
  const [noPressed, setNoPressed] = useState<boolean | undefined>()
  const endTime = moment(endDate).hours() === 8 ? '8:00am' : '1:00pm'
  const endDay = moment(endDate).day()
  const endDateSuffix = getDateSuffix(endDate)
  const endMonth = moment(endDate).month()
  return (
    <div className='TradeStatusContentContainer'>
      {isOwner && userDetails ? (
        noPressed ? (
          <>
            <span style={{ marginBottom: '0.5em' }}>
              Would you like to dispute this trade?
            </span>
            <div className='TradeStatusButtonContainer'>
              {/* TODO FIND CORRECT BOOKING STATUS PREVIOUS WAS DISPUTED */}
              <StatusButton
                text='Dispute Trade'
                type='blue'
                onClick={() => updateBookingStatus('IN_PROGRESS')}
                width='100%'
              />
            </div>
          </>
        ) : (
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
              {/* TODO FIND CORRECT BOOKING STATUS PREVIOUS WAS RETURNED */}
              <StatusButton
                text='Yes'
                type='blue'
                onClick={() => updateBookingStatus('IN_PROGRESS')}
                isLoading={isLoading}
              />
            </div>
          </>
        )
      ) : (
        <>
          <span style={{ marginBottom: '0.5em' }}>
            Your item is due today. Please check that it’s in the same condition
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
      )}
    </div>
  )
}

export default DropOff

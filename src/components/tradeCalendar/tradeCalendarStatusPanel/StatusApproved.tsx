import moment from 'moment'
import React from 'react'
import { dayArray, monthArray } from '../../../assets/Data/LBSArray'
import getDateSuffix from '../../../util/dateUtils/getDateSuffix'
import StatusButton from './StatusButton'

type Props = {
  isOwner: boolean
  userDetails: any
  startDate: string
}

export const StatusApproved = ({ isOwner, userDetails, startDate }: Props) => {
  const startTime = moment(startDate).hours() === 8 ? '8:00am' : '1:00pm'
  const startDay = dayArray[new Date(startDate).getDay()]
  const startDateWithSuffix = getDateSuffix(startDate)
  const startMonth = monthArray[new Date(startDate).getMonth()]

  return (
    <div className='TradeStatusContentContainer'>
      {isOwner && userDetails ? (
        <>
          <div style={{ marginBottom: '0.5em' }}>
            <span>Get the product ready to be borrowed by </span>
            <span>{`${userDetails.firstName} ${userDetails.lastName}`}</span>
          </div>
          <StatusButton
            text={
              <div style={{ display: 'flex' }}>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#AC172C',
                    margin: '0',
                  }}
                >
                  {startTime}&nbsp;
                </p>
                <p style={{ fontWeight: 'bold', margin: '0' }}>
                  {startDateWithSuffix}&nbsp;
                </p>
                <p style={{ margin: '0' }}>{startDateWithSuffix}</p>
                <p style={{ margin: '0' }}>&nbsp; - &nbsp;</p>
                <p style={{ margin: '0' }}>{startMonth}</p>
              </div>
            }
            nonBtn={true}
          />
        </>
      ) : (
        <>
          <div style={{ marginBottom: '0.5em' }}>
            <span>Get ready to pick up your item from </span>
            <span>{`${userDetails.firstName} ${userDetails.lastName}`}</span>
          </div>
          <StatusButton
            text={
              <div style={{ display: 'flex' }}>
                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#AC172C',
                    margin: '0',
                  }}
                >
                  {startTime}&nbsp;
                </p>
                <p style={{ fontWeight: 'bold', margin: '0' }}>
                  {startDay}&nbsp;
                </p>
                <p style={{ margin: '0' }}>{startDateWithSuffix}</p>
                <p style={{ margin: '0' }}>&nbsp; - &nbsp;</p>
                <p style={{ margin: '0' }}>{startMonth}</p>
              </div>
            }
            nonBtn={true}
          />
        </>
      )}
    </div>
  )
}

export default StatusApproved

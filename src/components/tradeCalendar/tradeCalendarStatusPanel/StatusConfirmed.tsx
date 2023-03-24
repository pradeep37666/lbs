import moment from 'moment'
import React from 'react'
import { dayArray, monthArray } from '../../../assets/Data/LBSArray'
import { User, UserTradeData } from '../../../types/User'
import getDateSuffix from '../../../util/dateUtils/getDateSuffix'
import StatusButton from './StatusButton'

type Props = {
  isOwner: boolean
  userDetails: UserTradeData | null
  endDate: string
}

export const StatusConfirmed = ({ isOwner, userDetails, endDate }: Props) => {
  const endTime = moment(endDate).hours() === 12 ? `12:00pm ` : `5:00pm `
  const endDay = dayArray[new Date(endDate).getDay()]
  const endDateWithSuffix = getDateSuffix(new Date(endDate))
  const endMonth = monthArray[new Date(endDate).getMonth()]
  return (
    <div className='TradeStatusContentContainer'>
      <div className='TradeStatusContentContainer'>
        {isOwner && userDetails ? (
          <>
            <span style={{ marginBottom: '0.5em' }}>
              Currently {`${userDetails.firstName} ${userDetails.lastName}`} has
              your item, be a helpful lender and lend a hand to them if they
              have any questions.
            </span>
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
                    {endTime}&nbsp;
                  </p>
                  <p style={{ fontWeight: 'bold', margin: '0' }}>
                    {endDateWithSuffix}&nbsp;
                  </p>
                  <p style={{ margin: '0' }}>{endDateWithSuffix}</p>
                  <p style={{ margin: '0' }}>&nbsp; - &nbsp;</p>
                  <p style={{ margin: '0' }}>{endMonth}</p>
                </div>
              }
              nonBtn={true}
            />
          </>
        ) : (
          userDetails && (
            <>
              <span style={{ marginBottom: '0.5em' }}>
                When you return your item, please check that it's in the same
                condition as when you borrowed it.
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
                        {endDateWithSuffix}&nbsp;
                      </p>
                      <p style={{ margin: '0' }}>{endDateWithSuffix}</p>
                      <p style={{ margin: '0' }}>&nbsp; - &nbsp;</p>
                      <p style={{ margin: '0' }}>{endMonth}</p>
                    </div>
                  </div>
                }
                nonBtn={true}
              />
            </>
          )
        )}
      </div>
    </div>
  )
}

export default StatusConfirmed

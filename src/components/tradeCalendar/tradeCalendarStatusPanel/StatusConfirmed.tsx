import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { Booking, BookingDuration } from '../../../types/Booking'
import { dayArray, monthArray } from '../../../assets/Data/LBSArray'
import { User, UserTradeData } from '../../../types/User'
import getDateSuffix from '../../../util/dateUtils/getDateSuffix'
import StatusButton from './StatusButton'

type Props = {
  isLender: boolean
  userDetails: UserTradeData | null
  endDate: string
  selectedBooking: Booking
  bookingDuration: BookingDuration
}

export const StatusConfirmed = ({
  isLender,
  userDetails,
  endDate,
  selectedBooking,
  bookingDuration,
}: Props) => {
  const endTime = moment(endDate).hours() === 12 ? `12:00pm ` : `5:00pm `
  const endDay = dayArray[new Date(endDate).getDay()]
  const endDateWithSuffix = getDateSuffix(new Date(endDate))
  const endMonth = monthArray[new Date(endDate).getMonth()]
  return (
    <div className='TradeStatusContentContainer'>
      <div className='TradeStatusContentContainer'>
        {isLender && userDetails ? (
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
                        {endDay}&nbsp;
                      </p>
                      <p style={{ margin: '0' }}>{endDateWithSuffix}</p>
                      <p style={{ margin: '0' }}>&nbsp; - &nbsp;</p>
                      <p style={{ margin: '0' }}>{endMonth}</p>
                    </div>
                  </div>
                }
                nonBtn={true}
              />
              <div className='mt-5' />
              <Link
                className='w-full'
                to={{
                  pathname: `/item/${selectedBooking.itemId}/application`,
                  state: {
                    bookingDuration: bookingDuration,
                    deliveryCosts: {
                      deliveryPrice: selectedBooking.deliveryPrice,
                      pickupPrice: selectedBooking.pickupPrice,
                    },
                  },
                }}
                replace
              >
                <StatusButton
                  type='blue'
                  text={
                    <p
                      style={{
                        fontWeight: 'bold',
                        margin: '0',
                        color: 'white',
                      }}
                    >
                      Extend Borrow
                    </p>
                  }
                  width='100%'
                />
              </Link>
            </>
          )
        )}
      </div>
    </div>
  )
}

export default StatusConfirmed

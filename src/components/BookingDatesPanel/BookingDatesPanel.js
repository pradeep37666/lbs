import moment from 'moment'
import React from 'react'
import { monthArray } from '../../assets/Data/LBSArray'
import Arrow from '../../assets/Icons/Arrow'
import getDateSuffix from '../../util/dateUtils/getDateSuffix'

export default function BookingDatesPanel({ startDate, endDate }) {
  const dayArray = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  return (
    <div className='ApplicationFooterDetailsContainer'>
      <div className='ApplicationFooterDetails'>
        <span className='ApplicationFooterDetailsHeader'>Collect</span>
        <div style={{ textAlign: 'center' }}>
          <span className='ApplicationFooterTime'>
            {moment(startDate).hours() === 8 ? `8:00am ` : `1:00pm `}{' '}
          </span>
          <span className='ApplicationFooterDay'>
            {dayArray[startDate.getDay()]}
          </span>
        </div>
        <div>
          <span>{getDateSuffix(startDate)} </span>
          <span>{monthArray[startDate.getMonth()]}</span>
        </div>
      </div>
      <div className='ApplicationFooterArrowContainer'>
        <Arrow />
      </div>
      <div className='ApplicationFooterDetails'>
        <span className='ApplicationFooterDetailsHeader'>Return</span>
        <div style={{ textAlign: 'center' }}>
          <span className='ApplicationFooterTime'>
            {moment(endDate).hours() === 12 ? `12:00pm ` : `5:00pm `}{' '}
          </span>
          <span className='ApplicationFooterDay'>
            {dayArray[endDate.getDay()]}
          </span>
        </div>
        <div>
          <span>{getDateSuffix(endDate)} </span>
          <span>{monthArray[endDate.getMonth()]}</span>
        </div>
      </div>
    </div>
  )
}

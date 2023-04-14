import moment from 'moment'
import React from 'react'
import { monthArray } from '../../assets/Data/LBSArray'
import Arrow from '../../assets/Icons/Arrow'
import getDateSuffix from '../../util/dateUtils/getDateSuffix'

type Props = {
  startDate: Date
  endDate: Date
  collectText?: string
  returnText?: string
  isExtension?: boolean
}

export default function BookingDatesPanel({
  startDate,
  endDate,
  collectText,
  returnText,
  isExtension,
}: Props) {
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
        <span className='ApplicationFooterDetailsHeader'>
          {collectText ?? 'Collect'}
        </span>
        <div style={{ textAlign: 'center' }}>
          <span className='ApplicationFooterTime'>
            {isExtension
              ? moment(startDate).hours() === 17
                ? `5:00pm `
                : `1:00pm `
              : moment(startDate).hours() === 8
              ? `8:00am `
              : `1:00pm `}{' '}
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
        <span className='ApplicationFooterDetailsHeader'>
          {returnText ?? 'Return'}
        </span>
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

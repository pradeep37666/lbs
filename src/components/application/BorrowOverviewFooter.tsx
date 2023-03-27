import moment from 'moment'
import React from 'react'
import { fullNameDayArray, monthArray } from '../../assets/Data/LBSArray'
import Arrow from '../../assets/Icons/Arrow'
import getDateSuffix from '../../util/dateUtils/getDateSuffix'
import './ItemOverview.css'

type Props = {
  startDate: Date
  endDate: Date
}

const BorrowOverviewFooter = ({ startDate, endDate }: Props) => {
  return (
    <div className='ApplicationFooterDetailsContainer'>
      <div className='ApplicationFooterDetails'>
        <p>Collect</p>
        <div>
          <span className='ApplicationFooterTime'>
            {moment(startDate).hours() === 8 ? `8:00am ` : `1:00pm `}{' '}
          </span>
          {startDate && <span>{fullNameDayArray[startDate.getDay()]}</span>}
        </div>
        <div>
          <span>{getDateSuffix(startDate)} </span>
          {startDate && <span>{monthArray[startDate.getMonth()]}</span>}
        </div>
      </div>
      <div className='ApplicationFooterArrowContainer'>
        <Arrow />
      </div>
      <div className='ApplicationFooterDetails'>
        <p>Return</p>
        <div>
          <span className='ApplicationFooterTime'>
            {moment(endDate).hours() === 12 ? `12:00pm ` : `5:00pm `}{' '}
          </span>
          {endDate && <span>{fullNameDayArray[endDate.getDay()]}</span>}
        </div>
        <div>
          <span>{getDateSuffix(endDate)} </span>
          {endDate && <span>{monthArray[endDate.getMonth()]} </span>}
        </div>
      </div>
    </div>
  )
}

export default BorrowOverviewFooter

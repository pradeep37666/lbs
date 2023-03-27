import moment from 'moment'
import React from 'react'
import { fullNameDayArray, monthArray } from '../../assets/Data/LBSArray'
import Arrow from '../../assets/Icons/Arrow'
import getDateSuffix from '../../util/dateUtils/getDateSuffix'
import './ItemOverview.css'

type Props = {
  originalEndDate: Date
  endDate: Date
}

const ExtendOverviewFooter = ({ originalEndDate, endDate }: Props) => {
  return (
    <div className='ApplicationFooterDetailsContainer'>
      <div className='ApplicationFooterDetails'>
        <p>Original Return</p>
        <div>
          <span className='ApplicationFooterTime'>
            {moment(originalEndDate).hours() === 12 ? `12:00pm ` : `5:00pm `}{' '}
          </span>
          <span>{fullNameDayArray[originalEndDate.getDay()]}</span>
        </div>
        <div>
          <span>{getDateSuffix(originalEndDate)} </span>
          <span>{monthArray[originalEndDate.getMonth()]}</span>
        </div>
      </div>
      <div className='ApplicationFooterArrowContainer'>
        <Arrow />
      </div>
      <div className='ApplicationFooterDetails'>
        <p>New Return</p>
        <div>
          <span className='ApplicationFooterTime'>
            {moment(endDate).hours() === 12 ? `12:00pm ` : `5:00pm `}{' '}
          </span>
          <span>{fullNameDayArray[endDate.getDay()]}</span>
        </div>
        <div>
          <span>{getDateSuffix(endDate)} </span>
          <span>{monthArray[endDate.getMonth()]} </span>
        </div>
      </div>
    </div>
  )
}

export default ExtendOverviewFooter

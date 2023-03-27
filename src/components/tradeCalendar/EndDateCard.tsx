import moment from 'moment'
import React from 'react'
import { dayArray, monthArray } from '../../assets/Data/LBSArray'
import getDateSuffix from '../../util/dateUtils/getDateSuffix'
import StatusButton from './tradeCalendarStatusPanel/StatusButton'

type Props = {
  endDate: string
  isLender?: boolean
}

const EndDateCard = ({ endDate, isLender }: Props) => {
  const endTime = moment(endDate).hours() === 12 ? `12:00pm ` : `5:00pm `
  const endDay = dayArray[new Date(endDate).getDay()]
  const endDateWithSuffix = getDateSuffix(new Date(endDate))
  const endMonth = monthArray[new Date(endDate).getMonth()]
  return (
    <StatusButton
      text={
        <div>
          {isLender ? 'The Item Is Due Back At' : 'Your Item Is Due Back At'}
          <div className='flex'>
            <p className='font-bold text-red-highlight'>{endTime}&nbsp;</p>
            <p className='font-bold'>{endDay}&nbsp;</p>
            <p>{endDateWithSuffix}</p>
            <p>&nbsp; - &nbsp;</p>
            <p>{endMonth}</p>
          </div>
        </div>
      }
      nonBtn={true}
    />
  )
}

export default EndDateCard

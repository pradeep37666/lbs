import React from 'react'
import { UserTradeData } from '../../../types/User'
import EndDateCard from '../EndDateCard'

type Props = {
  isLender: boolean
  userDetails: UserTradeData
  endDate: string
}

const StatusExtensionRejected = ({ isLender, userDetails, endDate }: Props) => {
  return (
    <div className='flex flex-col items-center p-2 text-center'>
      {isLender ? (
        <div>
          <span>
            You have rejected{' '}
            {`${userDetails.firstName} ${userDetails.lastName}`}'s booking
            extension. The prior booking still stands.
          </span>
          <EndDateCard endDate={endDate} isLender={isLender} />
        </div>
      ) : (
        <div>
          <span className='mb-3'>
            Your booking extension request has been rejected.
          </span>
          <EndDateCard endDate={endDate} isLender={isLender} />
        </div>
      )}
    </div>
  )
}

export default StatusExtensionRejected

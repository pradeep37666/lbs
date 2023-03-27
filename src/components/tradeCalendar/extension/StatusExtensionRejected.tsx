import React from 'react'
import { UserTradeData } from '../../../types/User'

type Props = {
  isLender: boolean
  userDetails: UserTradeData
}

const StatusExtensionRejected = ({ isLender, userDetails }: Props) => {
  return (
    <div className='flex flex-col items-center p-2 text-center'>
      {isLender ? (
        <div>
          <span>
            You have rejected{' '}
            {`${userDetails.firstName} ${userDetails.lastName}`}'s booking
            extension. The prior booking still stands.
          </span>
        </div>
      ) : (
        <div>
          <span className='mb-3'>
            Your booking extension request has been rejected.
          </span>
        </div>
      )}
    </div>
  )
}

export default StatusExtensionRejected

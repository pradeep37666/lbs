import React from 'react'
import { UserTradeData } from '../../../types/User'
import EndDateCard from '../EndDateCard'

type Props = {
  isLender: boolean
  userDetails: UserTradeData
  endDate: string
}

const StatusExtensionCancelled = ({
  isLender,
  userDetails,
  endDate,
}: Props) => {
  return (
    <div className='flex flex-col items-center p-2 text-center'>
      {isLender ? (
        <div>
          <span>
            {`${userDetails.firstName} ${userDetails.lastName}`} has cancelled
            their extension request. The prior booking still stands.
          </span>
          <div className='mt-3' />
          <EndDateCard endDate={endDate} isLender={isLender} />
        </div>
      ) : (
        <div>
          <span className='mb-3'>
            You have cancelled your extension request.
          </span>
          <div className='mt-2' />
          <EndDateCard endDate={endDate} isLender={isLender} />
        </div>
      )}
    </div>
  )
}

export default StatusExtensionCancelled

import React from 'react'

type Props = {
  isLender: boolean
}

export const StatusReviewed = ({ isLender }: Props) => {
  return (
    <div className='TradeStatusContentContainer'>
      {isLender ? (
        <span>
          Thank you for your review. Thanks for using Little Big Shed.
        </span>
      ) : (
        <span>Thank you for you review. Borrow complete.</span>
      )}
    </div>
  )
}

export default StatusReviewed

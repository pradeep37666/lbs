import React from 'react'

type Props = {
  isOwner: boolean
}

export const StatusReviewed = ({ isOwner }: Props) => {
  return (
    <div className='TradeStatusContentContainer'>
      {isOwner ? (
        <span>Item returned, thank you for using little big shed</span>
      ) : (
        <span>Borrow complete</span>
      )}
    </div>
  )
}

export default StatusReviewed

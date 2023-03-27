import React from 'react'

type Props = {
  extensionPrice: number | undefined
}

const ExtendApplicationCosts = ({ extensionPrice }: Props) => {
  return (
    <div>
      <div className='ItemOverviewBorrowContainer'>
        <div className='ItemOverviewItemContainer'>
          <p>Cost for Extension</p>
          {extensionPrice && <p>{`$${extensionPrice}`}</p>}
        </div>
      </div>
      <div className='ItemOverviewItemContainer'>
        <p>Total Price</p>
        {extensionPrice && <p>{`$${extensionPrice}`}</p>}
      </div>
    </div>
  )
}

export default ExtendApplicationCosts

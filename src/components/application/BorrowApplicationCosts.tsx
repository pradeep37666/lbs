import React from 'react'
import { Item } from '../../types/Item'
import './ItemOverview.css'
import BookingCalculator from '../../util/calculator/BookingCalculator'
import ItemApplicationCosts from './ItemApplicationCosts'

type Props = {
  bookingCalculator: BookingCalculator
  item: Item
  isDeliverySelected: boolean
  isPickupSelected: boolean
}

const BorrowApplicationCosts = ({
  bookingCalculator,
  item,
  isDeliverySelected,
  isPickupSelected,
}: Props) => {
  return (
    <div>
      <ItemApplicationCosts
        item={item}
        isDeliverySelected={isDeliverySelected}
        isPickupSelected={isPickupSelected}
        bookingCalculator={bookingCalculator}
      />
      <div className='ItemOverviewBorrowContainer'>
        <div className='ItemOverviewItemContainer'>
          <p>Borrow options total</p>
          {bookingCalculator?.calculateTotalPrice() && item && (
            <span className='ItemOverviewPrice'>
              ${bookingCalculator?.calculateBorrowOptions()}
            </span>
          )}
        </div>
        {isDeliverySelected && (
          <div className='ItemOverviewItemContainer'>
            <span className='ItemOverviewSmallText'>Item Delivery</span>
            <span className='ItemOverviewSmallText'>${item.deliveryPrice}</span>
          </div>
        )}
        {isPickupSelected && (
          <div className='ItemOverviewItemContainer'>
            <span className='ItemOverviewSmallText'>Item Pickup</span>
            <span className='ItemOverviewSmallText'>${item.pickupPrice}</span>
          </div>
        )}
      </div>
      <div className='ItemOverviewItemContainer'>
        <span className='ItemOverviewSmallText'>Off Peak Discount </span>
        <span className='ItemOverviewSmallText'>
          -${bookingCalculator?.calculateOffPeakDiscount()}
        </span>
      </div>
      <div className='ItemOverviewItemContainer'>
        <p>Total Price</p>
        <span className='ItemOverviewPrice'>
          ${bookingCalculator?.calculateTotalPrice()}
        </span>
      </div>
    </div>
  )
}

export default BorrowApplicationCosts

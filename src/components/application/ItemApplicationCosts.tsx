import React from 'react'
import { Item } from '../../types/Item'
import BookingCalculator from '../../util/calculator/BookingCalculator'

type Props = {
  item: Item | null
  isDeliverySelected: boolean
  isPickupSelected: boolean
  bookingCalculator: BookingCalculator
}

const ItemApplicationCosts = ({
  item,
  isDeliverySelected,
  isPickupSelected,
  bookingCalculator,
}: Props) => {
  return (
    <div className='ItemOverviewItemContainer'>
      <p>Cost for items</p>

      {bookingCalculator?.getUpdatedTotalPrice() && item && (
        <span className='ItemOverviewPrice'>
          $
          {isDeliverySelected && isPickupSelected
            ? parseInt(bookingCalculator?.getUpdatedTotalPrice()) -
              item.pickupPrice -
              item.deliveryPrice
            : isDeliverySelected
            ? parseInt(bookingCalculator?.getUpdatedTotalPrice()) -
              item.deliveryPrice
            : isPickupSelected
            ? parseInt(bookingCalculator?.getUpdatedTotalPrice()) -
              item.pickupPrice
            : bookingCalculator?.getUpdatedTotalPrice()}
        </span>
      )}
    </div>
  )
}

export default ItemApplicationCosts

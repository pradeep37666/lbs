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
  const getTotalPrice = () => {
    if (!item) return
    const basePrice = parseInt(bookingCalculator?.calculateTotalPrice())
    let totalPrice = basePrice
    if (isDeliverySelected && isPickupSelected) {
      totalPrice -= item.pickupPrice + item.deliveryPrice
    } else if (isDeliverySelected) {
      totalPrice -= item.deliveryPrice
    } else if (isPickupSelected) {
      totalPrice -= item.pickupPrice
    }
    return totalPrice
  }

  return (
    <div className='ItemOverviewItemContainer'>
      <p>Cost for items</p>

      {bookingCalculator?.calculateTotalPrice() && item && (
        <span className='ItemOverviewPrice'>${getTotalPrice()}</span>
      )}
    </div>
  )
}

export default ItemApplicationCosts

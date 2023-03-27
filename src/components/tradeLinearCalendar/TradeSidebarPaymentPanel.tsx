import React from 'react'
import { Item } from '../../types/Item'
import './TradeSidebar.css'
import BookingCalculator from '../../util/calculator/BookingCalculator'
import { BookingDuration } from '../../types/Booking'

type Props = {
  bookingPriceCalculator: BookingCalculator
  selectedBookingDuration: BookingDuration
  isDeliverySelected: boolean
  isPickupSelected: boolean
  item: Item
}

const TradeSidebarPaymentPanel = ({
  bookingPriceCalculator,
  isDeliverySelected,
  isPickupSelected,
  item,
  selectedBookingDuration,
}: Props) => {
  const itemCost = bookingPriceCalculator.calculateItemCostsWithoutOptions()
  return (
    <div className='TradeSidebarSection'>
      <div className='TradeSidebarSubHeading'>
        <span>Itemised Costs</span>
      </div>
      <div className='TradeSidebarCostFlex'>
        <span>Cost for Item </span>
        {bookingPriceCalculator?.calculateTotalPrice() && item && (
          <span className='ItemOverviewPrice'>${itemCost}</span>
        )}
      </div>
      {isDeliverySelected && item && (
        <div className='TradeSidebarCostFlex'>
          <span>Item Delivery </span>
          <span className='ItemOverviewPrice'>{`$${item.deliveryPrice}`}</span>
        </div>
      )}
      {isPickupSelected && item && (
        <div className='TradeSidebarCostFlex'>
          <span>Item Pickup </span>
          <span className='ItemOverviewPrice'>{`$${item.pickupPrice}`}</span>
        </div>
      )}
      <div
        className='TradeSidebarCostFlex'
        style={{
          paddingTop: '1rem',
          borderTop: '1px solid #31364c',
          paddingBottom: 0,
        }}
      >
        <span className='ItemOverviewSmallText'>Off Peak Discount</span>
        <span className='ItemOverviewSmallText'>
          -${bookingPriceCalculator?.calculateOffPeakDiscount().toFixed(2)}
        </span>
      </div>
      <div className='TradeSidebarCostFlex' style={{ paddingTop: '0.5rem' }}>
        <span>Total Price</span>
        <span className='ItemOverviewPrice'>
          ${selectedBookingDuration.totalPrice}
        </span>
      </div>
    </div>
  )
}

export default TradeSidebarPaymentPanel

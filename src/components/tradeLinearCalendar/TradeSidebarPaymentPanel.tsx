import React from 'react'
import { Item } from '../../types/Item'
import './TradeSidebar.css'
import BookingCalculator from '../../util/calculator/BookingCalculator'

type Props = {
  bookingPriceCalculator: BookingCalculator
  isDeliverySelected: boolean
  isPickupSelected: boolean
  item: Item
}

const TradeSidebarPaymentPanel = ({
  bookingPriceCalculator,
  isDeliverySelected,
  isPickupSelected,
  item,
}: Props) => {
  return (
    <div className='TradeSidebarSection'>
      <div className='TradeSidebarSubHeading'>
        <span>Itemised Costs</span>
      </div>
      <div className='TradeSidebarCostFlex'>
        <span>Cost for Item </span>
        {bookingPriceCalculator?.getUpdatedTotalPrice() && item && (
          <span className='ItemOverviewPrice'>
            $
            {isDeliverySelected && isPickupSelected
              ? parseInt(bookingPriceCalculator?.getUpdatedTotalPrice()) -
                item.pickupPrice -
                item.deliveryPrice
              : isDeliverySelected
              ? parseInt(bookingPriceCalculator?.getUpdatedTotalPrice()) -
                item.deliveryPrice
              : isPickupSelected
              ? parseInt(bookingPriceCalculator?.getUpdatedTotalPrice()) -
                item.pickupPrice
              : bookingPriceCalculator?.getUpdatedTotalPrice()}
          </span>
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
          ${bookingPriceCalculator?.getUpdatedTotalPrice()}
        </span>
      </div>
    </div>
  )
}

export default TradeSidebarPaymentPanel

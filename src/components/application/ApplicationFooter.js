import React, { useContext, useEffect } from 'react'
import './ApplicationFooter.css'
import useGlobalState from '../../util/useGlobalState'
import Button from '../Button/Button'
import BookingDatesPanel from '../BookingDatesPanel/BookingDatesPanel'
import { BookingContext } from '../../pages/application/Application'

export default function ApplicationFooter() {
  const globalState = useGlobalState().state
  const { user } = globalState
  const { state, dispatch, handleNextPage } = useContext(BookingContext)
  const {
    page,
    item,
    startDate,
    endDate,
    isDeliverySelected,
    isPickupSelected,
    borrowerAddress,
    bookingCalculator,
  } = state

  const clearDates = () => {
    dispatch({ type: 'setStartDate', data: null })
    dispatch({ type: 'setEndDate', data: null })
  }

  const handleClick = () => {
    let route
    if (page === 'ItemAvailability') {
      route = item.deliveryPrice > 0 ? 'ItemOptions' : 'ItemOverview'
    }
    if (page === 'ItemOptions') {
      if (
        (isDeliverySelected || isPickupSelected) &&
        !borrowerAddress &&
        !user?.address
      ) {
        return
      }
      route = 'ItemOverview'
    }
    if (page === 'ItemOverview') route = 'ItemAvailability'
    handleNextPage(route)
  }

  return (
    <div className='ApplicationFooter'>
      <div className='ApplicationFooterContainer'>
        <div className='ApplicationFooterPriceContainer'>
          <span>Total Price</span>
          <span className='ApplicatonFooterPrice'>
            ${bookingCalculator && bookingCalculator.getUpdatedTotalPrice()}
          </span>
        </div>
        <BookingDatesPanel startDate={startDate} endDate={endDate} />
        <div className='ApplicationFooterButtonContainer'>
          {page === 'ItemAvailability' && (
            <Button
              text='Clear Dates'
              onClick={clearDates}
              invertedColors
              style={{ marginRight: '0.5rem' }}
            />
          )}
          <Button
            onClick={handleClick}
            text='Next'
            isDisabled={
              page === 'ItemOptions' &&
              !borrowerAddress &&
              (isDeliverySelected || isPickupSelected)
            }
          />
        </div>
      </div>
    </div>
  )
}

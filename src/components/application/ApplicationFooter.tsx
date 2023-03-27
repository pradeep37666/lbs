import React, { useContext, useEffect } from 'react'
import './ApplicationFooter.css'
import useGlobalState from '../../util/useGlobalState'
import Button from '../Button/Button'
import BookingDatesPanel from '../BookingDatesPanel/BookingDatesPanel'
import { BookingContext } from '../../pages/application/Application'
import calculateExtensionPrice from '../../util/tradeUtils/calculateExtensionPrice'
import moment from 'moment'

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
    mode,
    appliedStartDate,
    appliedEndDate,
    bookingDuration,
  } = state

  const clearDates = () => {
    dispatch({ type: 'setStartDate', data: null })
    dispatch({ type: 'setEndDate', data: null })
  }

  const clearExtensionDates = () => {
    dispatch({ type: 'setStartDate', data: appliedStartDate })
    dispatch({ type: 'setEndDate', data: appliedEndDate })
  }

  const getIsDisabled = () => {
    if (mode === 'EXTEND' && moment(endDate).isSameOrBefore(appliedEndDate)) {
      return true
    } else if (mode === 'APPLY') {
      if (
        page === 'ItemOptions' &&
        !borrowerAddress &&
        (isDeliverySelected || isPickupSelected)
      ) {
        return true
      }
    }
    return false
  }

  const handleClick = () => {
    let route
    if (page === 'ItemAvailability') {
      if (mode === 'APPLY') {
        route =
          item.deliveryPrice || item.pickupPrice > 0
            ? 'ItemOptions'
            : 'ItemOverview'
      } else {
        route = 'ItemOverview'
      }
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
    handleNextPage(route ?? '')
  }

  return (
    <div className='ApplicationFooter'>
      <div className='ApplicationFooterContainer'>
        <div className='ApplicationFooterPriceContainer'>
          <span>{mode === 'EXTEND' ? 'Extension Price' : 'Total Price'}</span>
          <span className='ApplicatonFooterPrice'>
            $
            {bookingCalculator && mode === 'APPLY'
              ? bookingCalculator.calculateTotalPrice()
              : calculateExtensionPrice({ bookingCalculator, bookingDuration })}
          </span>
        </div>
        {startDate && endDate && (
          <BookingDatesPanel startDate={startDate} endDate={endDate} />
        )}
        <div className='ApplicationFooterButtonContainer'>
          {page === 'ItemAvailability' && (
            <Button
              text={mode === 'EXTEND' ? 'Clear Extension' : 'Clear Dates'}
              onClick={() =>
                mode === 'EXTEND' ? clearExtensionDates() : clearDates()
              }
              invertedColors
              style={{ marginRight: '0.5rem' }}
            />
          )}
          <Button
            onClick={handleClick}
            text='Next'
            isDisabled={getIsDisabled()}
          />
        </div>
      </div>
    </div>
  )
}

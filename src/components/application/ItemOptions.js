import React, { useContext, useEffect } from 'react'
import CheckBox from '../checkBox/CheckBox'
import './ItemOptions.css'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'
import useGlobalState from '../../util/useGlobalState'
import { BookingContext } from '../../pages/application/Application'

export default function ItemOptions() {
  const { state, dispatch } = useContext(BookingContext)
  const globalState = useGlobalState().state
  const { user } = globalState
  const { item, isPickupSelected, isDeliverySelected } = state

  const setAddress = addressObj => {
    dispatch({ type: 'setBorrowerAddress', data: addressObj })
  }

  const getMap = () => {
    if (user.address && (isDeliverySelected || isPickupSelected)) {
      return (
        <MapsAutocomplete
          setAddress={setAddress}
          defaultAddress={user.address}
          defaultLocation={user.address.fullAddress}
          defaultLat={user.address.lat}
          defaultLng={user.address.lng}
        />
      )
    } else {
      return <MapsAutocomplete setAddress={setAddress} />
    }
  }

  const handleDeliveryBoxClick = () => {
    dispatch({ type: 'setIsDeliverySelected', data: !isDeliverySelected })
  }

  const handlePickupBoxClick = () => {
    dispatch({ type: 'setIsPickupSelected', data: !isPickupSelected })
  }

  return (
    <div className='OptionsContainer'>
      <div className='OptionsItemHeaderContainer'>
        <span className='OptionsItemHeader'>Borrow Extras</span>
        <br></br>
        <span>Options to help you borrow better</span>
      </div>
      <div className='DeliveryOptionsContainer'>
        {item.deliveryOption === 'BOTH' && (
          <>
            <div className='OptionsItemContainer'>
              <div>
                <span className='OptionsItemHeader'>
                  Delivery{' '}
                  <span className='OptionsPrice'>${item.deliveryPrice}</span>
                </span>
                <p>
                  Have your item delivered to you
                  <br />
                  Where would you like this item to be delivered to?
                </p>
              </div>
              <CheckBox
                checked={isDeliverySelected}
                onClick={handleDeliveryBoxClick}
              />
            </div>
            <div className='OptionsItemContainer'>
              <div>
                <span className='OptionsItemHeader'>
                  Pickup{' '}
                  <span className='OptionsPrice'>${item.pickupPrice}</span>
                </span>
                <p>
                  Have your item picked up from you
                  <br />
                  Where would you like this item to be collected from?
                </p>
              </div>
              <CheckBox
                checked={isPickupSelected}
                onClick={handlePickupBoxClick}
              />
            </div>
          </>
        )}
        {item.deliveryOption === 'DELIVERY' && (
          <div className='OptionsItemContainer'>
            <div>
              <span className='OptionsItemHeader'>
                Delivery{' '}
                <span className='OptionsPrice'>${item.deliveryPrice}</span>
              </span>
              <p>
                Have your item delivered to you
                <br />
                Where would you like this item to be delivered to?
              </p>
            </div>
            <CheckBox
              checked={isDeliverySelected}
              onClick={handleDeliveryBoxClick}
            />
          </div>
        )}
        {item.deliveryOption === 'PICKUP' && (
          <div className='OptionsItemContainer'>
            <div>
              <span className='OptionsItemHeader'>
                Pickup <span className='OptionsPrice'>${item.pickupPrice}</span>
              </span>
              <p>
                Have your item picked up from you
                <br />
                Where would you like this item to be collected from?
              </p>
            </div>
            <CheckBox
              checked={isPickupSelected}
              onClick={handlePickupBoxClick}
            />
          </div>
        )}
      </div>
      {(isDeliverySelected || isPickupSelected) && getMap()}
    </div>
  )
}

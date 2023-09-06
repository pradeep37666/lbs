import { useContext, useEffect, useState } from 'react'
import { validate } from 'validate.js'
import { BookingContext } from '../../pages/application/Application'
import useGlobalState from '../../util/useGlobalState'
import { userAddressConstraints } from '../../util/validationConstraints'
import ValidationTextInput from '../FormComponents/ValidationTextInput'
import CheckBox from '../checkBox/CheckBox'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'
import './ItemOptions.css'

const ADDRESS_INITIAL_VALUES = {
  streetNumber: '',
  streetName: '',
  suburb: '',
  state: '',
  postCode: '',
  country: '',
  fullAddress: '',
  city: '',
}

export default function ItemOptions() {
  const { state, dispatch } = useContext(BookingContext)
  const globalState = useGlobalState().state
  const { user } = globalState
  const { item, isPickupSelected, isDeliverySelected } = state
  const [address, setAddress] = useState(ADDRESS_INITIAL_VALUES)
  const [errorMessages, setErrorMessages] = useState({})

  const getErrorMessage = inputName => {
    if (Object.keys(errorMessages).length === 0) return null
    for (const key in errorMessages) {
      if (Object.keys(errorMessages)[0] === inputName)
        return errorMessages[key][0]
    }
  }
  const validateInputs = () => {
    const { streetNumber, streetName, suburb, state, postCode, country, city } =
      address
    const validationErrors = validate(
      { streetNumber, streetName, suburb, state, postCode, country, city },
      userAddressConstraints
    )
    if (validationErrors) {
      setErrorMessages(validationErrors)
      return false
    }
    setErrorMessages({})
    return true
  }

  const handleAddressSelect = address => {
    console.log("--address--",address);
    if(address!=="")
    setAddress({
      country: address.country ?? '',
      state: address.state ?? '',
      fullAddress: address.fullAddress ?? '',
      postCode: address.postCode ?? '',
      streetName: address.streetName ?? '',
      streetNumber: address.streetNumber ?? '',
      suburb: address.suburb ?? '',
      city: address.city ?  address.city :  address.suburb ?? '',
      lat: address.lat ?? 0,
      lng: address.lng ?? 0,
    })
  }

  useEffect(() => { }, [address])

  const checkAddress = () => {
    const valid = validateInputs()
    if (!valid) return 
    dispatch({ type: 'setBorrowerAddress', data: address })
  }
  useEffect(() => { checkAddress() }, [address])


  const getMap = () => {
    if (user.address && (isDeliverySelected || isPickupSelected)) {
      return (
        <MapsAutocomplete
          setAddress={address => {
            handleAddressSelect(address)
          }}
          defaultAddress={user.address}
          defaultLocation={user.address.fullAddress}
          defaultLat={user.address.lat}
          defaultLng={user.address.lng}
        />
      )
    } else {
      return <MapsAutocomplete setAddress={address => {
        handleAddressSelect(address)
      }} />
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
      {
        (isDeliverySelected || isPickupSelected) && (<div className='flex flex-col gap-3 mb-5 w-full -translate-y-5'>
          <ValidationTextInput
            width='100%'
            value={address.streetNumber}
            label='Street Number'
            fontSize='20px'
            onChange={e =>
              setAddress({ ...address, streetNumber: e.target.value })
            }
            errorMessage={getErrorMessage('streetNumber')}
          />
          <ValidationTextInput
            width='100%'
            value={address.streetName}
            label='Street Name'
            fontSize='20px'
            onChange={e =>
              setAddress({ ...address, streetName: e.target.value })
            }
            errorMessage={getErrorMessage('streetName')}
          />
          <ValidationTextInput
            width='100%'
            label='City'
            value={address.city}
            fontSize='20px'
            onChange={e => setAddress({ ...address, city: e.target.value })}
            errorMessage={getErrorMessage('city')}
          />
          <ValidationTextInput
            width='100%'
            value={address.state}
            label='State'
            fontSize='20px'
            onChange={e => setAddress({ ...address, state: e.target.value })}
            errorMessage={getErrorMessage('state')}
          />
          <ValidationTextInput
            width='100%'
            label='Post Code'
            value={address.postCode}
            fontSize='20px'
            onChange={e => setAddress({ ...address, postCode: e.target.value })}
            errorMessage={getErrorMessage('postCode')}
          />
          <ValidationTextInput
            width='100%'
            label='Country'
            value={address.country}
            fontSize='20px'
            onChange={e => setAddress({ ...address, country: e.target.value })}
            errorMessage={getErrorMessage('country')}
          />
        </div>)
      }
    </div>
  )
}

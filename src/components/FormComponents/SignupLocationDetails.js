import { useContext, useEffect, useState } from 'react'
import { ReactComponent as Logo } from './../../assets/Logos/LogoRed.svg'
import useGlobalState from '../../util/useGlobalState'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'
import Button from '../Button/Button'
import { POST_ITEM_PAGE } from '../../assets/Data/LBSEnum'
import TextInput from '../textInput/textInput'
import { validate } from 'validate.js'
import { userAddressConstraints } from '../../util/validationConstraints'
import ValidationTextInput from './ValidationTextInput'

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

export default function SignupLocationDetails({ context }) {
  const { state, dispatch } = useContext(context)
  const [address, setAddress] = useState(ADDRESS_INITIAL_VALUES)
  const [errorMessages, setErrorMessages] = useState({})
  const { shedAddress } = state
  const user = useGlobalState().state.user

  useEffect(() => {
    if (Object.keys(errorMessages).length > 0) {
      const valid = validateInputs()
      if (valid) {
        setErrorMessages({})
        return
      }
    }
  }, [address])

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

  const checkAddress = () => {
    const valid = validateInputs()
    if (!valid) return

    dispatch({ type: 'setAddress', data: address })
    dispatch({ type: 'setShedAddress', data: address })
    dispatch({
      type: 'setCurrentPage',
      data: POST_ITEM_PAGE.AVAILABILITY,
    })
  }

  const handleAddressSelect = address => {
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

  return (
    <div className='RegistrationWrapper'>
      <div className='LoginMain'>
        <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

        <div className='LoginHeader'>Shed Location</div>
        <div className='LoginText'>
          If you would like to share your shed with users, Little big shed will
          need to know your location in order for borrowers to find you.
        </div>

        {user?.address ? (
          <MapsAutocomplete
            setAddress={address => {
              handleAddressSelect(address)
            }}
            defaultAddress={user.address}
            defaultLocation={user.address.fullAddress}
            defaultLat={user.address.lat}
            defaultLng={user.address.lng}
          />
        ) : (
          <MapsAutocomplete
            setAddress={address => {
              handleAddressSelect(address)
            }}
          />
        )}
        <div className='flex flex-col gap-3 mb-5 w-full -translate-y-5'>
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
        </div>
        <Button
          text='Next'
          isDisabled={!address?.fullAddress}
          onClick={() => {
            checkAddress()
          }}
        />
      </div>
    </div>
  )
}

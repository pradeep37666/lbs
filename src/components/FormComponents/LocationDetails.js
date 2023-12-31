import { useContext } from 'react'
import { ReactComponent as Logo } from './../../assets/Logos/LogoRed.svg'
import useGlobalState from '../../util/useGlobalState'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'
import Button from '../Button/Button'
import { POST_ITEM_PAGE } from '../../assets/Data/LBSEnum'

export default function LocationDetails({ context }) {
    const { state, dispatch } = useContext(context)
    const { shedAddress } = state
    const user = useGlobalState().state.user

    return (
      <div className='RegistrationWrapper'>
        <div className='LoginMain'>
          <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

          <div className='LoginHeader'>Shed Location</div>
          <div className='LoginText'>
            If you would like to share your shed with users, Little big shed
            will need to know your location in order for borrowers to find you.
          </div>

          {user?.address ? (
            <MapsAutocomplete
              setAddress={address =>
                dispatch({ type: 'setShedAddress', data: address })
              }
              defaultAddress={user.address}
              defaultLocation={user.address.fullAddress}
              defaultLat={user.address.lat}
              defaultLng={user.address.lng}
            />
          ) : (
            <MapsAutocomplete
              setAddress={address =>
                dispatch({ type: 'setShedAddress', data: address })
              }
            />
          )}
          <Button
            text='Next'
            isDisabled={!shedAddress?.fullAddress}
            onClick={() => {
              dispatch({
                type: 'setCurrentPage',
                data: POST_ITEM_PAGE.AVAILABILITY,
              })
            }}
          />
        </div>
      </div>
    )
}

import React, { useContext } from 'react'
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg'
import useGlobalState from '../../util/useGlobalState'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'
import Button from '../Button/Button'

export default function LocationDetails({ context }) {
    const { state, dispatch } = useContext(context)
    const { isLenderUpgrade, address } = state
    console.log(address)
    const user = useGlobalState().state.user
    console.log(user)
    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                    <div className="LoginHeader">Shed Location</div>
                    <div className="LoginText">If you would like to share your shed with users, Little big shed will need to know your location in order for borrowers to find you.</div>

                    { user ? (
                        <MapsAutocomplete 
                        setAddress={(address) => dispatch({ type: 'setAddress', data: address})} 
                        defaultLocation={address} 
                        defaultLat={user.lat} 
                        defaultLng={user.lng}/> 
                    ) : (
                        <MapsAutocomplete setAddress={(address) => dispatch({ type: 'setAddress', data: address})}/>
                    )}
                    <Button 
                    
                    text="Next"
                    // isDisabled={address && address?.address_components.length !== 7}
                    onClick={() => {
                        dispatch({ type: 'setCurrentPage', data: 'Availability' })
                    }}/>

                </div>
            </div>
    )
}

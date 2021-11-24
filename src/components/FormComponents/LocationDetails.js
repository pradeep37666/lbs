import React, { useContext } from 'react'
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg'
import useGlobalState from '../../util/useGlobalState'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'
import { FormContext } from '../../pages/account/UpgradeLender/UpgradeLender'
import Button from '../Button/Button'

export default function LocationDetails() {
    const { state, dispatch } = useContext(FormContext)
    const { isLenderUpgrade, address } = state

    const user = useGlobalState().state.user
    console.log('====', address)
    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                    <div className="LoginHeader">Shed Location</div>
                    <div className="LoginText">If you would like to share your shed with users, Little big shed will need to know your location in order for borrowers to find you.</div>
                    {!user ?  
                        <div className="LoginText">You can skip this step and create an account just for borrowing use and update later.</div>
                    
                    : ''}

                    { user ? (
                        <MapsAutocomplete 
                        setAddress={(address) => dispatch({ type: 'setAddress', data: address})} 
                        defaultLocation={user.address} 
                        defaultLat={user.lat} 
                        defaultLng={user.lng}/> 
                    ) : (
                        <MapsAutocomplete setAddress={(address) => dispatch({ type: 'setAddress', data: address})}/>
                    )}
                    <Button 
                    
                    text="Next"
                    isDisabled={!address}
                    onClick={() => {
                        dispatch({ type: 'setCurrentPage', data: 'Availability' })
                    }}/>
                    { !user && <Button text="Skip This Step" /> }

                </div>
            </div>
    )
}

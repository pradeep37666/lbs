import React, { useState } from 'react'
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg'
import ValidationPopup from '../ValidationPopup/ValidationPopup'
import { handleAddress, handleCity, handleCountry, handleState } from '../../util/UserValidation'
import useGlobalState from '../../util/useGlobalState'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'

export default function LocationDetails(props) {

    const { state } = useGlobalState()
    const { user } = state

    const [addressValidation, setAddressValidation] = useState("")
    const [cityValidation, setCityValidation] = useState("")
    const [countryValidation, setCountryValidation] = useState("")
    const [stateValidation, setStateValidation] = useState("")

    const showValidation = (field) => {
        switch (field) {
            case 'address':
                return (addressValidation.length > 0) ? false : true
            case 'city':
                return (cityValidation.length > 0 && addressValidation.length === 0) ? false : true
            case 'country':
                return (countryValidation.length > 0 && addressValidation.length === 0 && cityValidation.length === 0) ? false : true
            case 'state':
                return (stateValidation.length > 0 && addressValidation.length === 0 && cityValidation.length === 0 && countryValidation.length === 0) ? false : true
            default:
                return
        }
    }

    const wipeState = () => {
        props.setAddress("")
        props.setCity("")
        props.setCountry("")
        props.setState("")
    }

    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader">Shed Location</div>
                <div className="LoginText">If you would like to share your shed with users, Little big shed will need to know your location in order for borrowers to find you.</div>
                {!user ?  
                    <div className="LoginText">You can skip this step and create an account just for borrowing use and update later.</div>
                
                : ''}

                <MapsAutocomplete setAddress={props.setAddress}/>

                <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => {
                    user && user.bsb ? props.checkCoords() : props.handleNextPage('Availability')
                }}>Next</button>
                {user ? '' : <button className="LoginFormButton LoginFormButtonInverted" onClick={() => {
                    wipeState()
                    props.handleNextPage('Availability')
                }} style={{marginTop: '1em'}}>Skip This Step</button>
                }
                

                </div>
            </div>
    )
}

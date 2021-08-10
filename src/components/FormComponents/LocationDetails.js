import React, { useState } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import ValidationPopup from '../ValidationPopup/ValidationPopup';
import { handleAddress, handleCity, handleCountry, handleState } from '../../util/UserValidation';

export default function LocationDetails(props) {

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
                <div className="LoginText">You can skip this step and create an account just for borrowing use and update later.</div>

                <div className="LoginHeader" style={{marginBottom: '0'}}>Address</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='43 Brandon Road Runcorn' className="LoginInput" onBlur={(e) => handleAddress(e, props.setAddress, setAddressValidation)}/>
                    <div className={`triangleLeft ${showValidation("address") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={addressValidation} errorHeader='Invalid Address' hide={showValidation("address")}/>
                </div>
                <div className="LoginHeader" style={{marginBottom: '0'}}>City</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='Brisbane' className="LoginInput" onBlur={(e) => handleCity(e, props.setCity, setCityValidation)}/>
                    <div className={`triangleLeft ${showValidation("city") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={cityValidation} errorHeader='Invalid City' hide={showValidation("city")}/>
                </div>
                <div className="LoginHeader" style={{marginBottom: '0'}}>Country</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='Australia' className="LoginInput" onBlur={(e) => handleCountry(e, props.setCountry, setCountryValidation)}/>
                    <div className={`triangleLeft ${showValidation("country") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={countryValidation} errorHeader='Invalid Country' hide={showValidation("country")}/>
                </div>
                <div className="LoginHeader" style={{marginBottom: '0'}}>State</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='Qld' className="LoginInput" onBlur={(e) => handleState(e, props.setState, setStateValidation)}/>
                    <div className={`triangleLeft ${showValidation("state") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={stateValidation} errorHeader='Invalid State' hide={showValidation("state")}/>
                </div>

                <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => props.handleNextPage('Availability')}>Next</button>
                <button className="LoginFormButton LoginFormButtonInverted" onClick={() => {
                    wipeState()
                    props.handleNextPage('Availability')
                }} style={{marginTop: '1em'}}>Skip This Step</button>

                </div>
            </div>
    )
}

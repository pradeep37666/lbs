import React, { useState } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import ValidationPopup from '../ValidationPopup/ValidationPopup';

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

    const handleAddress = (e) => {
        let addressInput = e.target.value;

        if (addressInput.length === 0) {
            props.setAddress("")
            setAddressValidation("Address is required")
        } else if (/\d+\s[a-zA-Z]+/gi.test(addressInput)) {
            props.setAddress(addressInput)
            setAddressValidation("")
        } else {
            props.setAddress("")
            setAddressValidation("Incorrect address format, should be in format: 12 Example Street")
        }
    }

    const handleCity = (e) => {
        let cityInput = e.target.value;

        if (cityInput.length === 0) {
            props.setCity("")
            setCityValidation("City is required")
        } else if (/^([^0-9!@#$%^&*()]*)$/.test(cityInput) && cityInput.length >= 2) {
            props.setCity(cityInput)
            setCityValidation("")
        } else {
            props.setCity("")
            setCityValidation("Incorrect city format, should be in format: Brisbane")
        }
    }

    const handleCountry = (e) => {
        let countryInput = e.target.value;

        if (countryInput.length === 0) {
            props.setCountry("")
            setCountryValidation("Country is required")
        } else if (/^([^0-9!@#$%^&*()]*)$/.test(countryInput) && countryInput.length >= 4) {
            props.setCountry(countryInput)
            setCountryValidation("")
        } else {
            props.setCountry("")
            setCountryValidation("Incorrect country format, should be in format: Australia")
        }
    }

    const handleState = (e) => {
        let stateInput = e.target.value;

        if (stateInput.length === 0) {
            props.setState("")
            setStateValidation("State is required")
        } else if (/^([^0-9!@#$%^&*()]*)$/.test(stateInput) && stateInput.length >= 3) {
            props.setState(stateInput)
            setStateValidation("")
        } else {
            props.setState("")
            setStateValidation("Incorrect state format, should be in format: Australia")
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
                    <input type='text' placeholder='43 Brandon Road Runcorn' className="LoginInput" onBlur={(e) => handleAddress(e)}/>
                    <div className={`triangleLeft ${showValidation("address") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={addressValidation} errorHeader='Invalid Address' hide={showValidation("address")}/>
                </div>
                <div className="LoginHeader" style={{marginBottom: '0'}}>City</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='Brisbane' className="LoginInput" onBlur={(e) => handleCity(e)}/>
                    <div className={`triangleLeft ${showValidation("city") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={cityValidation} errorHeader='Invalid City' hide={showValidation("city")}/>
                </div>
                <div className="LoginHeader" style={{marginBottom: '0'}}>Country</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='Australia' className="LoginInput" onBlur={(e) => handleCountry(e)}/>
                    <div className={`triangleLeft ${showValidation("country") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={countryValidation} errorHeader='Invalid Country' hide={showValidation("country")}/>
                </div>
                <div className="LoginHeader" style={{marginBottom: '0'}}>State</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='Qld' className="LoginInput" onBlur={(e) => handleState(e)}/>
                    <div className={`triangleLeft ${showValidation("state") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={stateValidation} errorHeader='Invalid State' hide={showValidation("state")}/>
                </div>

                <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => props.handleNextPage('Availability')}>Next</button>
                {/* ^ will have verification on V go to next step and clear any state set in above inputs */}
                <button className="LoginFormButton LoginFormButtonInverted" onClick={() => {
                    wipeState()
                    props.handleNextPage('Availability')
                }} style={{marginTop: '1em'}}>Skip This Step</button>

                </div>
            </div>
    )
}

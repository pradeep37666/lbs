import React from 'react'
import './PhoneNumberInput.css'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ValidationPopup from '../ValidationPopup/ValidationPopup'

const PhoneNumberInput = ({ 
    label,
    placeholder,
    value,
    onChange,
    errorMessage,
}) => {

    return (
        <div className={"ValidationInputContainer"}>
            <div className="LoginHeader">
                {label}
            </div>
            <div className="LoginInputValidationContainer">
                <PhoneInput 
                    country={'au'}
                    placeholder={placeholder}
                    value={value}
                    enableSearch={true}
                    autoFormat={false}
                    onChange={onChange}
                    containerClass={'phone_container'}
                    inputClass={'phone_input_container'}
                    buttonClass={'phone_btn_container'}
                    dropdownClass={'phone_dropdown_container'}
                />
                {errorMessage &&
                <ValidationPopup 
                    errorText={errorMessage} 
                    hide={false} 
                    errorHeader={`Invalid ${label}`}
                />
                }
            </div>
        </div>
    )
}

export default PhoneNumberInput
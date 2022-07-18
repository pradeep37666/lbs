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
    inLineError
}) => {

    return (
        <div className={"ValidationInputContainer"}>
            <div className="LoginHeader">
                {label}
            </div>
            <div className="LoginInputValidationContainer">
                <PhoneInput 
                    country={'nz'}
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
                {errorMessage && !inLineError &&
                <ValidationPopup 
                    errorText={errorMessage} 
                    hide={false} 
                    errorHeader={`Invalid ${label}`}
                />
                }
            </div>
            {errorMessage && inLineError &&
            <div className="InLineErrorContainer red_bg">
                <div className="ValidationPopup__Header">{`Invalid ${label}`}</div>
                { errorMessage }
            </div>
            }
        </div>
    )
}

export default PhoneNumberInput
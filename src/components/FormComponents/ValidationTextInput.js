import React, { useState } from "react"
import ValidationPopup from '../ValidationPopup/ValidationPopup'
// import ShowPasswordIcon from '../../assets/Icons/ShowPasswordIcon'

export default function ValidationTextInput({ onChange, errorMessage, label, placeholder, passwordInput, errorHeader }) {
    const [isInputHidden, setIsInputHidden] = useState(true)

    return (
        <div style={{ width: '100%'}}>
            <div className="LoginHeader">
                {label}
            </div>
            <div className="LoginInputValidationContainer">
                {passwordInput ? (
                    <div className="PasswordInputContainer">
                        <input 
                        type={isInputHidden ? 'password' : 'text'}
                        placeholder={placeholder}
                        className="LoginInput"
                        onChange={onChange}/>
                        {/* <ShowPasswordIcon onClick={() => setIsInputHidden(!isInputHidden)} /> */}
                    </div>
                ) : (
                    <input 
                    placeholder={placeholder}
                    className="LoginInput"
                    onChange={onChange}/>
                )}
                { errorMessage ? (
                    <ValidationPopup errorText={errorMessage} hide={false} errorHeader={errorHeader ||  `Invalid ${label}`}/>
                ) : null }
            </div>
        </div>
    )
}

import React, { useState } from "react"
import ValidationPopup from '../ValidationPopup/ValidationPopup'
import ShowPasswordIcon from '../../assets/Icons/ShowPasswordIcon'
import './ValidationTextInput.css'

export default function ValidationTextInput({ 
    onChange, 
    errorMessage, 
    label, 
    placeholder, 
    passwordInput, 
    errorHeader, 
    value, 
    inLineError, 
    inputType 
}) {
    const [isInputHidden, setIsInputHidden] = useState(true)

    return (
        <div className={"ValidationInputContainer"}>
            <div className="LoginHeader">
                {label}
            </div>
            <div className={inLineError && "ValidationInputErrorContainer"}>
                <div className="LoginInputValidationContainer">
                    {passwordInput ? (
                        <div className="PasswordInputContainer">
                            <input 
                            type={isInputHidden ? 'password' : 'text'}
                            placeholder={placeholder}
                            className="PasswordInput"
                            value={value}
                            onChange={onChange}/>
                            <ShowPasswordIcon onClick={() => setIsInputHidden(!isInputHidden)}/>
                        </div>
                    ) : (
                        <input 
                        placeholder={placeholder}
                        className="ValidationInput"
                        onChange={onChange}
                        value={value}
                        type={inputType}
                        step="1"
                        onWheel={e => e.target.blur()}
                        />
                    )}
                </div>
                {errorMessage && !inLineError ? (
                    <ValidationPopup 
                        errorText={errorMessage} 
                        errorHeader={errorHeader} 
                        label={label} 
                    />
                ) : null}
            </div>
        </div>
    )
}

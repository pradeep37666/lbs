import React, { useState, useEffect } from 'react'
import ValidationTextInput from '../../components/FormComponents/ValidationTextInput'
import { newPasswordConstraints } from '../../util/validationConstraints'
import { validate } from 'validate.js'

export default function NewPassword() {
    const [password, setPassword] = useState()
    const [ errorMessages, setErrorMessages] = useState({})
    const [confirmPassword, setConfirmPassword] = useState()

    useEffect(() => {
        if(Object.keys(errorMessages).length > 0){
            const valid = validateInputs()
            if(valid){
                setErrorMessages({})
                return
            }
        }
    },[password, confirmPassword])

    const getErrorMessage = (inputName) => {
        if(Object.keys(errorMessages).length === 0) return null
        for(const key in errorMessages){
            if(Object.keys(errorMessages)[0] === inputName) return errorMessages[key][0]
        }
    }

    const validateInputs = () => {
        const validationErrors = validate({ password, confirmPassword }, newPasswordConstraints)
        if(validationErrors){
            setErrorMessages(validationErrors)
            console.log(validationErrors)
            return false
        }
        setErrorMessages({})
        return true
    }

    const updateUserPassword = async () => {
        const valid = validateInputs()
        if(!valid) return 
    }


    return (
        <div className="LoginMain">
                <div className="LoginHeader">Enter New Password</div>
                <div className="LoginText">
                    Change your password
                </div>
                <ValidationTextInput 
                label="Password" 
                onChange={e => setPassword(e.target.value)}
                errorMessage={getErrorMessage('password')}
                />
                <ValidationTextInput 
                label="Confirm Password" 
                onChange={e => setConfirmPassword(e.target.value)} 
                errorMessage={getErrorMessage('confirmPassword')}
                />
                <div
                onClick={updateUserPassword}
                style={{ width: '100%' }}>
                    <button className="LoginFormButton">Send</button>
                </div>
        </div>
    )
}

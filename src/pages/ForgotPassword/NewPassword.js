import React, { useState, useEffect } from 'react'
import ValidationTextInput from '../../components/FormComponents/ValidationTextInput'
import { newPasswordConstraints } from '../../util/validationConstraints'
import { validate } from 'validate.js'
import Instance from '../../util/axios'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'

export default function NewPassword() {
    const [ password, setPassword ] = useState()
    const [ confirmPassword, setConfirmPassword ] = useState()
    const [ errorMessages, setErrorMessages ] = useState({})
    const [ isLoading, setIsLoading ] = useState(false)
    const history =  useHistory()

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
            return false
        }
        setErrorMessages({})
        return true
    }

    const updateUserPassword = async () => {
        const valid = validateInputs()
        if(!valid) return
        try {
            setIsLoading(true)
            const { status } = await Instance.patch('/auth/updatePassword', {
                password,
                repeatPassword: confirmPassword
            })
            if (status !== 200)
            history.push('/login')
        } catch (error) {
            console.log(error.response)
        } finally {
            setIsLoading(false)
        }
            
    }

    return (
        <div className="LoginMain">
                <div className="LoginHeader">Enter New Password</div>
                <div className="LoginText">
                    Change your password
                </div>
                <ValidationTextInput 
                label="Password" 
                value={password}
                passwordInput
                onChange={e => setPassword(e.target.value)}
                errorMessage={getErrorMessage('password')}
                />
                <ValidationTextInput 
                label="Confirm Password" 
                value={confirmPassword}
                passwordInput
                onChange={e => setConfirmPassword(e.target.value)} 
                errorMessage={getErrorMessage('confirmPassword')}
                />
                <Button 
                    onClick={updateUserPassword}
                    className="LoginFormButton"
                    disabled={isLoading}
                    isLoading={isLoading}
                    text='Send'
                />
        </div>
    )
}

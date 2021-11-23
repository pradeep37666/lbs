import React, { useState, useEffect } from 'react'
import './UpdatePassword.css'
import PageWrapper from '../../../components/pageWrapper/pageWrapper'
import Banner from '../../../components/bannerText/bannerText'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg'
import Instance from '../../../util/axios'
import { useHistory } from 'react-router'
import useGlobalState from '../../../util/useGlobalState'
import ValidationTextInput from '../../../components/FormComponents/ValidationTextInput'
import Button from '../../../components/Button/Button'
import { newPasswordConstraints } from '../../../util/validationConstraints'
import { validate } from 'validate.js'

export default function UpdatePassword() {
    const { state } = useGlobalState()
    const { user } = state
    const history = useHistory()

    const [currentPage, setCurrentPage] = useState('Current Password')
    const [currentPassword, setCurrentPassword] = useState('')
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState()
    const [isUpdateLoading, setIsUpdateLoading] = useState(false)
    const [errorMessages, setErrorMessages] = useState({})
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        if(Object.keys(errorMessages).length > 0){
            const valid = validateInputs()
            if(valid){
                setErrorMessages({})
                return
            }
        }
    },[password, confirmPassword])

    const loginUser = async () => {
        setIsLoginLoading(true)
        try{
            const { data, status } = await Instance.post('/auth/signIn', {
                email: user.email,
                password: currentPassword
            })
            setIsLoginLoading(false)
            setCurrentPage('New Password')
        } catch(err){
            console.log(err)
            setIsLoginLoading(false)
        }
    }

    const updatePassword = async () => {
        const valid = validateInputs()
        if(!valid) return
        setIsUpdateLoading(true)
        try{    
            const { data, status } = await Instance.patch('user/update', { password })
            setIsUpdateLoading(false)
            setShowSuccess(true)
            setTimeout(() => history.push({ pathname: '/user/account' }), 4000);
        } catch(err){
            setIsUpdateLoading(false)
            console.log(err.response)
        }
    }

    const validateInputs = () => {
        const validationErrors = validate({ password, confirmPassword }, newPasswordConstraints)
        if(validationErrors){
            console.log('errors', validationErrors)
            setErrorMessages(validationErrors)
            return false
        }
        setErrorMessages({})
        return true
    }


    const getErrorMessage = (inputName) => {
        if(Object.keys(errorMessages).length === 0) return null
        for(const key in errorMessages){
            if(Object.keys(errorMessages)[0] === inputName) return errorMessages[key][0]
        }
    }

    return (
        <PageWrapper>
            <Banner textBold='Password Update' textNormal={currentPage} />
            {currentPage === 'Current Password' ?
                // first step authenticate
                <div className="LoginMain">
                    <Logo />
                    <div className="LoginHeader UpdatePassword__Header">Update Password</div>
                    <div className="UpdatePassword__Body">Input your current password to authenticate your Little Big Shed account.</div>

                    <ValidationTextInput 
                    passwordInput
                    label="Current Password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    errorMessage={errorMessages?.password}
                    />
                    <div className="LoginText">Forgot password?<span className="RetrieveLink"> Retrieve here</span></div>
                    <Button 
                    isDisabled={!currentPassword}
                    onClick={loginUser}
                    text="Next"
                    isLoading={isLoginLoading}
                    />
                </div>

                :
                //Second step, create new password
                <div className="LoginMain" style={{ position: 'relative'}}>
                    <Logo />
                    <div className="LoginHeader UpdatePassword__Header">Update Password</div>
                    <div className="UpdatePassword__Body">
                        <p>Create a new Little Big Shed password below.</p>
                        <p>Your password must include at least 8 characters, 1 number , 1 uppercase letter and a special character.</p>
                    </div>

                    <ValidationTextInput 
                    passwordInput
                    value={password}
                    errorMessage={getErrorMessage('password')}
                    onChange={e => setPassword(e.target.value)}
                    label="New Password"
                    />

                    <ValidationTextInput 
                    passwordInput
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    label="Confirm New Password"
                    errorMessage={getErrorMessage('confirmPassword')}
                    />

                    <Button 
                    isDisabled={!password || !confirmPassword}
                    text="Update Password"
                    isLoading={isUpdateLoading}
                    onClick={updatePassword}
                    
                    />
                    {showSuccess && 
                    <div className="UpdatePassword__SuccessPopup"> 
                        <div className="LoginHeader">Success!</div>
                        <div className="UpdatePassword__Body">Your password has been successfully updated, you will now be redirected.</div>
                    </div> 
                    }
                </div>
            }

        </PageWrapper>
    )
}

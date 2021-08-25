import React, { useState, useEffect } from 'react'
import './UpdatePassword.css'
import PageWrapper from '../../../components/pageWrapper/pageWrapper'
import Banner from '../../../components/bannerText/bannerText'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg'
import Instance from '../../../util/axios'
import { GetToken } from '../../../util/UserStore'
import ValidationPopup from '../../../components/ValidationPopup/ValidationPopup'
import { handlePassword, handlePasswordConfirm } from '../../../util/UserValidation'
import { useHistory } from 'react-router'
import useGlobalState from '../../../util/useGlobalState'

export default function UpdatePassword() {

    const { state } = useGlobalState()
    const { user } = state
    const history = useHistory()

    const [title, setTitle] = useState('Current Password')
    const [currentPassword, setCurrentPassword] = useState('')

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loginValidation, setLoginValidation] = useState('')
    const [passwordValidation, setPasswordValidation] = useState('')
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState('')

    const [validated, setValidated] = useState(false)

    const [showSuccess, setShowSuccess] = useState(false)

    const authenticate = () => {
        Instance.post('/auth/signIn', {
            email: user.email,
            password: currentPassword
        }).then((response) => {
            console.log(response)
            if (response.status === 404) {
                setLoginValidation("Incorrect password, please try again")
                setCurrentPassword('')
            } else if (response.status === 201) {
                setTitle('New Password')
                setCurrentPassword('')
            }
        })
            .catch((error) => {
                setLoginValidation("Incorrect password, please try again")
                console.log(error)
            })
    }

    const updatePassword = () => {
        const data = {
            password: newPassword
        }

        Instance.put('user/update', data, { headers: { Authorization: `Bearer ${GetToken()}` } })
            .then((response) => {
                if (response.status === 200) {
                    setShowSuccess(true)
                    
                    setTimeout(() => {
                        history.push({pathname: '/user/account'})
                    }, 4000);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleLogin = (e) => {
        setCurrentPassword(e.target.value)
        setLoginValidation('')
    }

    const showValidation = (field) => {
        switch (field) {
            case 'password':
                return (passwordValidation.length > 0) ? false : true
            case 'confirmPassword':
                return (confirmPasswordValidation.length > 0 && passwordValidation.length === 0) ? false : true
            default:
                return
        }
    }

    useEffect(() => {
        if (newPassword && newPassword === confirmPassword) {
            setValidated(true)
        } else setValidated(false)
    }, [newPassword, confirmPassword])

    return (
        <PageWrapper>
            <Banner textBold='Password Update' textNormal={title} />
            {title === 'Current Password' ?
                // first step authenticate
                <div className="LoginMain">
                    <Logo />
                    <div className="LoginHeader UpdatePassword__Header">Update Password</div>
                    <div className="UpdatePassword__Body">Input your current password to authenticate your Little Big Shed account.</div>
                    <div className="LoginHeader--NoMargin">Current Password</div>
                    <div className="PasswordInputContainer">
                        <div className="LoginInputValidationContainer">
                            <input type='password' className="LoginInput" key='current password' onChange={(e) => handleLogin(e)}></input>
                            <div className={`triangleLeft ${loginValidation.length === 0 ? '' : 'ValidationTextHide'}`} />
                            <ValidationPopup errorText={loginValidation} errorHeader='Invalid Password' hide={loginValidation.length === 0} />
                        </div>
                    </div>

                    <div className="LoginText">Forgot password?<span className="RetrieveLink"> Retrieve here</span></div>
                    <button className={`LoginFormButton ${currentPassword.length === 0 ? 'ButtonDisabled' : ''}`} disabled={currentPassword.length === 0 ? true : false} onClick={() => authenticate()}>Next</button>
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
                    <div className="LoginHeader--NoMargin">New Password</div>
                    <div className="LoginInputValidationContainer">
                        <div className="PasswordInputContainer">
                            <input type='password' className="LoginInput" onBlur={(e) => handlePassword(e, setNewPassword, setPasswordValidation)}></input>
                        </div>
                        <div className={`triangleLeft ${showValidation("password") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={passwordValidation} errorHeader='Invalid Password' hide={showValidation("password")} />
                    </div>

                    <div className="LoginHeader--NoMargin">Confirm New Password</div>
                    <div className="LoginInputValidationContainer">
                        <div className="PasswordInputContainer">
                            <input type='password' className="LoginInput" onBlur={(e) => handlePasswordConfirm(e, setConfirmPassword, setConfirmPasswordValidation, newPassword)} />
                        </div>
                        <div className={`triangleLeft ${showValidation("confirmPassword") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={confirmPasswordValidation} errorHeader='Invalid Password' hide={showValidation("confirmPassword")} />
                    </div>

                    <button className={`LoginFormButton ${!validated ? 'ButtonDisabled' : ''}`} disabled={!validated ? true : false} onClick={() => updatePassword()}>Set New Password</button>

                    {showSuccess ? 
                    <div className="UpdatePassword__SuccessPopup"> 
                        <div className="LoginHeader">Success!</div>
                        <div className="UpdatePassword__Body">Your password has been successfully updated, you will now be redirected.</div>
                    </div> 
                    
                    
                    : ''}
                </div>
            }

        </PageWrapper>
    )
}

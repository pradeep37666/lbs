import React, { useContext, useState, useEffect } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import {ReactComponent as CameraIcon} from './../../assets/Icons/CameraIcon.svg';
import LBSSwitch from '../LBSSwitch/LBSSwitch.js';
import { isMobile } from 'react-device-detect';
import Instance from '../../util/axios';
import ValidationTextInput from './ValidationTextInput';
import Button from '../Button/Button';
import { validate } from 'validate.js';
import { registrationConstraints } from '../../util/validationConstraints';

export default function BasicDetails({ context }) {
    const { state, dispatch } = useContext(context)
    const [errorMessages, setErrorMessages] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [emailTakenError, setEmailTakenError] = useState()
    const [phoneTakenError, setPhoneTakenError] = useState()
    const { firstName, lastName, email, phoneNumber, password, confirmPassword, image, isLenderUpgrade } = state
    console.log('state', state)

    useEffect(() => {
        if(Object.keys(errorMessages).length > 0){
            const valid = validateInputs()
            if(valid){
                setErrorMessages({})
                return
            }
        }
    },[firstName, lastName, email, phoneNumber, password, confirmPassword])

    const getErrorMessage = (inputName) => {
        if(Object.keys(errorMessages).length === 0) return null
        for(const key in errorMessages){
            if(Object.keys(errorMessages)[0] === inputName) return errorMessages[key][0]
        }
    }

    const validateInputs = () => {
        const validationErrors = validate({ firstName, lastName, email, phoneNumber, password, confirmPassword}, registrationConstraints)
        if(validationErrors){
            setErrorMessages(validationErrors)
            return false
        }
        setErrorMessages({})
        return true
    }

    const sendVerificationCode = async () => {
        const valid = validateInputs()
        if(!valid) return
        setIsLoading(true)
        const emailExists = await checkIfEmailExists()
        const phoneExists = await checkIfPhoneNumberExists()
        if(emailExists || phoneExists) {
            setIsLoading(false)
            return
        }
        try{
            // const { data, status } = await Instance.get(`/auth/getVerificationCodeToMobile?mobile=${phoneNumber}`)
            // dispatch({ type: 'setCurrentPage', data: 'Verification' })
            dispatch({ type: 'setCurrentPage', data: 'Bank Details' })
        } catch(err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        if (e.target.files.length === 0) return  
        const image = {
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        }
        dispatch({ type: 'setImage', data: image })
    }

    const checkIfEmailExists = async () => {
        try{
            const {  status} = await Instance.get(`/user/checkExist?email=${email}`)
            if(status === 200) {
                setEmailTakenError('Email is taken')
                return true
            }
            return false
        } catch(err){
            console.log(err)
        }
    }

    const checkIfPhoneNumberExists = async () => {
        try{
            const { data, status } = await Instance.get(`/user/checkExist?mobile=${phoneNumber}`)
            if(status === 200) {
                setPhoneTakenError('Phone number is taken')
                return true
            }
            return false
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div className="RegistrationWrapper">
            <div className="LoginMain">

                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>
                <div className="LoginHeader">Basic Details</div>
                <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>
                <ValidationTextInput 
                placeholder="John"
                label="First Name"
                value={firstName}
                onChange={e => dispatch({ type: 'setFirstName', data: e.target.value })}
                errorMessage={getErrorMessage('firstName') }
                />
                <ValidationTextInput 
                placeholder="Doe"
                label="Last Name"
                value={lastName}
                onChange={e => dispatch({ type: 'setLastName', data: e.target.value })}
                errorMessage={getErrorMessage('lastName') }
                />
                <ValidationTextInput 
                placeholder="John@Doe.com"
                label="Email"
                value={email}
                onChange={e => dispatch({ type: 'setEmail', data: e.target.value })}
                errorMessage={emailTakenError ? emailTakenError : getErrorMessage('email')}
                />
                <ValidationTextInput 
                placeholder="0123 456 789"
                label="Phone Number"
                value={phoneNumber}
                onChange={e => dispatch({ type: 'setPhoneNumber', data: e.target.value })}
                errorMessage={phoneTakenError ? phoneTakenError : getErrorMessage('phoneNumber')}
                />
                <div className="LoginHeader">Profile Picture</div>
                <div className="ProfilePictureFlex">
                    <div className="ProfilePictureCircle" >
                        {image ? 
                    
                        <img src={image.preview} alt="" className="ProfilePicturePreview"/>
                    
                        : <CameraIcon className="CameraIcon"/>}
                    </div>
                    <input type="file" id="selectFile" style={{ display: "none" }} onChange={(e) => handleChange(e)} />
                    <button 
                    className="LoginFormButton UploadButton" 
                    onClick={() => document.getElementById('selectFile').click()}
                    >
                        Upload
                    </button>

                </div>

            </div>

            <div className="LoginMain LoginMainNoMarg">
                <div className="LoginHeader">Password</div>
                <div className="LoginText">Create a secure password including: at least 8 characters, 2 numbers and a special character.</div>
                <ValidationTextInput 
                placeholder=""
                value={password}
                passwordInput
                onChange={e => dispatch({ type: 'setPassword', data: e.target.value })}
                label="Password"
                errorMessage={getErrorMessage('password')}
                />
                <ValidationTextInput 
                label="Confirm Password"
                passwordInput
                value={confirmPassword}
                onChange={e => dispatch({ type: 'setConfirmPassword', data: e.target.value })}
                errorMessage={getErrorMessage('confirmPassword')}
                />
            </div>
            

            <div className="LoginMain LoginMainNoMarg">
                <div className="BecomeLenderFlex">
                    <div className="LoginHeader" style={{width: 'auto'}}>Become Lender</div>
                    <div className="LenderSwitchInfoFlex">
                    <LBSSwitch 
                    isChecked={isLenderUpgrade} 
                    onClick={() => dispatch({ type: 'setIsLenderUpgrade', data: !isLenderUpgrade})} 
                    text='Yes'/>
                    </div>
                </div>
                <div className="LoginText">If you would like to share items on Little Big Shed we need some extra details off you.</div>
                <div className="LoginText">These details allow us to send you payments for successful lends and help borrowers find your items</div>

                <Button 
                isLoading={isLoading}
                onClick={sendVerificationCode}
                text="Next"
                />
            </div>
        </div>
    )
}

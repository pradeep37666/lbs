import React, { useState } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import {ReactComponent as CameraIcon} from './../../assets/Icons/CameraIcon.svg';
import {ReactComponent as ShowPassword} from './../../assets/Icons/ShowPassword.svg';
import LenderSwitch from './../../components/becomeLenderSwitch/becomeLenderSwitch.js';
import ValidationPopup from '../ValidationPopup/ValidationPopup.js';
import Instance from '../../util/axios';

export default function BasicDetails(props) {

    const [nameValidation, setNameValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [phoneValidation, setPhoneValidation] = useState("")
    const [passwordValidation, setPasswordValidation] = useState("")
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [image, setImage] = useState( {preview: '', raw: ''} )

    const showValidation = (field) => {
        switch (field) {
            case 'name':
                return (nameValidation.length > 0) ?  false : true 
            case 'email':
                return (emailValidation.length > 0 && nameValidation.length === 0) ? false : true
            case 'phone':
                return (phoneValidation.length > 0 && nameValidation.length === 0 && emailValidation.length === 0) ? false : true
            case 'password':
                return (passwordValidation.length > 0) ? false : true
            case 'confirmPassword':
                return (confirmPasswordValidation.length > 0 && passwordValidation.length === 0) ? false : true
            default:
                return
        }
    }

    const handleFullName = (e) => {
        let nameInput = e.target.value;

        if (nameInput.length === 0) {
            props.setFullName("")
            setNameValidation("Full name is required")
        } else if (nameInput.length >= 4) {
            props.setFullName(nameInput)
            setNameValidation("")
        } else {
            setNameValidation("Full name must be at least 4 characters")
            props.setFullName("")
        }
    }

    const handleEmail = (e) => {
        let emailInput = e.target.value;

        if (emailInput.length === 0) {
            props.setEmail("")
            setEmailValidation("Email is required")
        } else if (/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(emailInput)) {
            // Check if email is already in use
            Instance.get(`/user/checkEmail/?email=${emailInput}`).then((response) => {
                if (response.data.code === 200) {
                    props.setEmail(emailInput)
                    setEmailValidation("")
                } else {
                    props.setEmail("")
                    setEmailValidation("This user already exists, please use another email address")
                }
              })
              .catch((error) => {
                setEmailValidation("Sorry something went wrong, please try again")
              })
        } else {
            props.setEmail("")
            setEmailValidation("Incorrect email format, should be in format: example@example.com")
        }
    }

    const handlePhoneNumber = (e) => {
        let phoneInput = e.target.value;
        if (phoneInput.length === 0) {
            props.setPhoneNumber("")
            setPhoneValidation("Phone number is required")
        } else if (/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/.test(phoneInput)) {
            props.setPhoneNumber(phoneInput)
            setPhoneValidation("")
        } else {
            props.setPhoneNumber("")
            setPhoneValidation("Incorrect phone number format")
        }
    }

    const handlePassword = (e) => {
        let passwordInput = e.target.value;
        if (/^(?=.*[A-Za-z])(?=(?:.*?[0-9]){2})[A-Za-z\d@$!%*#?&]{8,}$/.test(passwordInput)) {
            props.setPassword(passwordInput)
            setPasswordValidation("")
            if (passwordInput !== props.confirmPassword) setConfirmPasswordValidation("Passwords must match")
        } else {
            props.setPassword("")
            setPasswordValidation("Password must be at least 8 characters, contain 2 numbers and a special character")
        }
    }

    const handlePasswordConfirm = (e) => {
        let passwordInput = e.target.value;
        if (passwordInput === props.password) {
            props.setConfirmPassword(passwordInput)
            setConfirmPasswordValidation("")
        } else {
            props.setConfirmPassword("")
            setConfirmPasswordValidation("Passwords must match")
        }
    }

    const handleChange = (e) => {
        if (e.target.files.length) {
            setImage({
              preview: URL.createObjectURL(e.target.files[0]),
              raw: e.target.files[0]
            })
          }
    }

    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">

                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                    <div className="LoginHeader">Basic Details</div>
                    <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>

                    <div className="LoginHeader">Full Name</div>
                    <div className="LoginInputValidationContainer">
                        <input type='text' placeholder='Jane Doe' className="LoginInput" onBlur={(e) => handleFullName(e)}/>
                        <div className={`triangleLeft ${showValidation("name") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={nameValidation} errorHeader='Invalid Full Name' hide={showValidation("name")}/>
                    </div>
                    

                    <div className="LoginHeader">Email</div>
                    <div className="LoginInputValidationContainer">
                        <input type='text' placeholder='JaneDoe@DoeJane.com' className="LoginInput" onBlur={(e) => handleEmail(e)}/>
                        <div className={`triangleLeft ${showValidation("email") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={emailValidation} errorHeader='Invalid Email' hide={showValidation("email")}/>
                    </div>

                    <div className="LoginHeader">Phone Number</div>
                    <div className="LoginInputValidationContainer">
                        <input type='text' placeholder='+61456789012' className="LoginInput" onBlur={(e) => handlePhoneNumber(e)}/>
                        <div className={`triangleLeft ${showValidation("phone") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={phoneValidation} errorHeader='Invalid Phone Number' hide={showValidation("phone")}/>
                    </div>

                    <div className="LoginHeader">Profile Picture</div>
                    <div className="ProfilePictureFlex">
                        <div className="ProfilePictureCircle" >
                        {image.preview ? 
                    
                        <img src={image.preview} alt="dummy" className="ProfilePicturePreview"/>
                    
                        : <CameraIcon className="CameraIcon"/>}
                        </div>
                    <input type="file" id="selectFile" style={{ display: "none" }} onChange={(e) => handleChange(e)} />
                    <button className="LoginFormButton UploadButton" onClick={() => document.getElementById('selectFile').click()}>Upload</button>
                    

                    </div>

                    </div>

                    <div className="LoginMain LoginMainNoMarg">
                    <div className="LoginHeader">Password</div>
                    <div className="LoginText">Create a secure password including: at least 8 characters, 2 numbers and a special character.</div>

                    <div className="LoginHeader">Password</div>
                    <div className="LoginInputValidationContainer">
                    <div className="PasswordInputContainer">
                        <input type={showPassword ? 'text' : 'password'} className="LoginInput" onBlur={(e) => handlePassword(e)}></input>
                        <ShowPassword className="ShowPasswordIcon" onClick={() => setShowPassword(!showPassword)}/>
                    </div>
                        <div className={`triangleLeft ${showValidation("password") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={passwordValidation} errorHeader='Invalid Password' hide={showValidation("password")}/>
                    </div>

                    <div className="LoginHeader">Confirm Password</div>
                    <div className="LoginInputValidationContainer">
                    <div className="PasswordInputContainer">
                        <input type={showConfirmPassword ? 'text' : 'password'} className="LoginInput" onBlur={(e) => handlePasswordConfirm(e)}/>
                        <ShowPassword className="ShowPasswordIcon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
                    </div>
                    <div className={`triangleLeft ${showValidation("confirmPassword") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={confirmPasswordValidation} errorHeader='Invalid Password' hide={showValidation("confirmPassword")}/>
                    </div>

                    </div>

                    <div className="LoginMain LoginMainNoMarg">
                    <div className="BecomeLenderFlex">
                        <div className="LoginHeader" style={{width: 'auto'}}>Become Lender</div>
                        <div className="LenderSwitchInfoFlex">
                        <LenderSwitch setLender={props.setLender}/>
                        <ShowPassword />
                        </div>
                    </div>
                    <div className="LoginText">If you would like to share items on Little Big Shed we need some extra details off you.</div>
                    <div className="LoginText">These details allow us to send you payments for successful lends and help borrowers find your items</div>

                    <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => props.handleNextPage('Verification')}>Next</button>
                    </div>
            </div>
    )
}

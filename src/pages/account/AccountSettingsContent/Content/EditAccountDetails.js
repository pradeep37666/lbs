import React, { useState } from 'react'
import ValidationPopup from '../../../../components/ValidationPopup/ValidationPopup'
import { handleFullName, handleEmail, handlePhoneNumber } from '../../../../util/UserValidation'
import { ReactComponent as CameraIcon } from '../../../../assets/Icons/CameraIcon.svg';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LBSSwitch from '../../../../components/LBSSwitch/LBSSwitch'
import { useHistory } from 'react-router'
import Instance from '../../../../util/axios';
import { Link } from 'react-router-dom';
import useGlobalState from '../../../../util/useGlobalState';
import { Avatar } from '@material-ui/core';
import getImage from '../../../../util/getImage';

export default function EditAccountDetails(props) {
    const { state, dispatch } = useGlobalState()
    const { user } = state

    const history = useHistory()

    const [nameValidation, setNameValidation] = useState("")
    const [emailValidation, setEmailValidation] = useState("")
    const [phoneValidation, setPhoneValidation] = useState("")

    const [image, setImage] = useState({ preview: user.avatar, raw: '' })

    const [name, setName] = useState(user.fullName)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.mobile)

    const [sync, setSync] = useState(false)

    const showValidation = (field) => {
        switch (field) {
            case 'name':
                return (nameValidation.length > 0) ? false : true
            case 'email':
                return (emailValidation.length > 0 && nameValidation.length === 0) ? false : true
            case 'phone':
                return (phoneValidation.length > 0 && nameValidation.length === 0 && emailValidation.length === 0) ? false : true
            default:
                return
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

    const updateBasicDetails = () => {

        // var fdata = new FormData()
        // fdata.append('file', image.raw)

        // image stuff

        const data = {
            fullName: name ? name : user.fullName,
            email: email ? email : user.email,
            mobile: phone ? phone : user.mobile,
            // avatar: image.raw ? image.raw : user.avatar, 
        }

        Instance.put('user/update', data)
            .then((response) => {
                console.log(response)
                let newData = user
                newData.fullName = data.fullName
                newData.email = data.email
                newData.mobile = data.mobile
                dispatch({ type: 'setUser', data: newData })
                history.go(0)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <div className="AccountSettings__Container">
            <div className="AccountSettings__Title">Edit Account Details</div>

            <div className="AccountSettings__UpdateHeader">Full Name</div>
            <div className="LoginInputValidationContainer">
                <input type='text' placeholder='Jane Doe' defaultValue={name} className="LoginInput" onBlur={(e) => handleFullName(e, setName, setNameValidation)} />
                <div className={`triangleLeft ${showValidation("name") ? '' : 'ValidationTextHide'}`} />
                { !showValidation('name') && <ValidationPopup errorText={nameValidation} errorHeader='Invalid Full Name' hide={showValidation("name")} />}
            </div>

            <div className="AccountSettings__UpdateHeader">Email</div>
            <div className="LoginInputValidationContainer">
                <input type='text' placeholder='JaneDoe@DoeJane.com' defaultValue={email} className="LoginInput" onBlur={(e) => handleEmail(e, setEmail, setEmailValidation)} />
                <div className={`triangleLeft ${showValidation("email") ? '' : 'ValidationTextHide'}`} />
                { !showValidation('email') && <ValidationPopup errorText={emailValidation} errorHeader='Invalid Email' hide={showValidation("email")} />}
            </div>

            <div className="AccountSettings__UpdateHeader">Phone Number</div>
            <div className="LoginInputValidationContainer">
                <input type='text' placeholder='+61456789012' defaultValue={phone} className="LoginInput" onBlur={(e) => handlePhoneNumber(e, setPhone, setPhoneValidation)} />
                <div className={`triangleLeft ${showValidation("phone") ? '' : 'ValidationTextHide'}`} />
                { !showValidation('phone') && <ValidationPopup errorText={phoneValidation} errorHeader='Invalid Phone Number' hide={showValidation("phone")} />}
            </div>

            <div className="AccountSettings__UpdateHeader">Profile Picture</div>
            <div className="ProfilePictureFlex">
                <div className="ProfilePictureCircle" >
                    {image.preview ?

                        <img src={getImage(user.avatar)} alt="dummy" className="ProfilePicturePreview" />

                        : <CameraIcon className="CameraIcon" />}
                </div>
                <input type="file" id="selectFile" style={{ display: "none" }} onChange={(e) => handleChange(e)} />
                <button className="LoginFormButton UploadButton" onClick={() => document.getElementById('selectFile').click()}>{!user.avatar ? 'Upload' : 'Change Picture'}</button>

            </div>

            <div className="HL" />
            <Link to='/user/update_password'>
                <div>
                    <div className={'UserShedNav__SecondaryLink UserShedNav__SecondaryLink--active'}>
                        Update Password
                        <ChevronRightIcon style={{ fill: '#b43b4c' }} />
                    </div>
                </div>
            </Link>

            <div className="HL" />

            {/* <div className="AccountSettings__SyncButtonFlex">
                <div className="AccountSettings__UserName AccountSettings__SyncButton__Text">Sync Trade Dates with Calendar</div>
                <div><LBSSwitch set={setSync} text='On' /></div>
            </div>

            <div className="AccountSettings__BodyText">
                <p>If you would like to sync you Little Big Shed calendar dates with your personal calendar, turn this on.</p>
                <p>If you want to keep these details seperate, keep this turned off.</p>

            </div> */}

            <div className="AccountSettings__ButtonFlex">
                <button className="LoginFormButton AccountSettings__SaveButton" onClick={() => updateBasicDetails()}>Save Changes</button>
            </div>

        </div>
    )
}

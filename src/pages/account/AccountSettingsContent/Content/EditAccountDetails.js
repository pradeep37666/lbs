import React, { useState, useEffect } from 'react'
import { ReactComponent as CameraIcon } from '../../../../assets/Icons/CameraIcon.svg';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Instance from '../../../../util/axios';
import { Link } from 'react-router-dom';
import useGlobalState from '../../../../util/useGlobalState';
import getImage from '../../../../util/getImage';
import ValidationTextInput from '../../../../components/FormComponents/ValidationTextInput';
import Button from '../../../../components/Button/Button';
import { updateUserDetailsConstraints } from '../../../../util/validationConstraints';
import { async, validate } from 'validate.js';
import { FileService } from '../../../../services/FileService';

export default function EditAccountDetails(props) {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [ isLoading, setIsLoading ] = useState(false)

    const [ image, setImage ] = useState('')
    const [ imageLink, setImageLink ] = useState('')
    const [ firstName, setFirstName ] = useState(user.firstName)
    const [ lastName, setLastName ] = useState(user.lastName)
    const [ email, setEmail ] = useState(user.email)
    const [ phoneNumber, setPhoneNumber ] = useState(user.mobile)
    const [ errorMessages, setErrorMessages ] = useState({})

    useEffect(() => {
        if(Object.keys(errorMessages).length > 0){
            const valid = validateInputs()
            if(valid){
                setErrorMessages({})
                return
            }
        }
    },[firstName, lastName, email, phoneNumber])

    const getErrorMessage = (inputName) => {
        if(Object.keys(errorMessages).length === 0) return null
        for(const key in errorMessages){
            if(Object.keys(errorMessages)[0] === inputName) return errorMessages[key][0]
        }
    }

    const validateInputs = () => {
        const validationErrors = validate({ firstName, lastName, email, phoneNumber }, updateUserDetailsConstraints)
        if(validationErrors){
            console.log('errors', validationErrors)
            setErrorMessages(validationErrors)
            return false
        }
        setErrorMessages({})
        return true
    }

    const handleChange = async ({ target }) => {
        const file = target.files[0]
        if (target.files.length === 0) return
        const fileLink = await FileService.uploadSingleImage(file)
        if (!fileLink) return
        const image = {
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0]
        }
        setImage(image)
        setImageLink(fileLink)
    }

    const updateBasicDetails = async () => {
        const valid = validateInputs()
        if(!valid) return 
        setIsLoading(true)
        const userDetails = {
            firstName,
            lastName,
            email,
            mobile: phoneNumber,
            avatar: imageLink ? imageLink : '', 
        }
        try{
            const { data } = await Instance.patch('user/update', userDetails)
            // if (!data) error message here
            dispatch({ type: 'setUser', data })
        } catch(err) {
            console.log(err.response)
        } finally {
            setIsLoading(false)
        }
        
    }

    return (
        <div className="AccountSettings__Container">
            <div className="AccountSettings__Title">Edit Account Details</div>
            <ValidationTextInput 
            label="First Name"
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            placeholder="John"
            errorMessage={getErrorMessage('firstName')}
            inLineError
            />
            <ValidationTextInput 
            label="Last Name"
            onChange={e => setLastName(e.target.value)}
            value={lastName}
            placeholder="Doe"
            errorMessage={getErrorMessage('lastName')}
            inLineError
            />
            <ValidationTextInput 
            label="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="John@Doe.com"
            errorMessage={getErrorMessage('email')}
            inLineError
            />
            <ValidationTextInput 
            label="Phone Number"
            onChange={e => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="0425678912"
            errorMessage={getErrorMessage('phoneNumber')}
            inLineError
            />

            <div className="AccountSettings__UpdateHeader">Profile Picture</div>
            <div className="ProfilePictureFlex">
                <div className="ProfilePictureCircle" >
                    {(image || user.avatar) ?
                        image ? (
                            <img src={image.preview} alt="profile picture444" className="ProfilePicturePreview" />
                        ) : (
                            <img src={getImage(user.avatar)} alt="profile picture" className="ProfilePicturePreview" />
                        )
                        : <CameraIcon className="CameraIcon" />}
                </div>
                <input type="file" id="selectFile" style={{ display: "none" }} onChange={handleChange} />
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

            <Button 
            text="Save Changes"
            onClick={updateBasicDetails}
            isLoading={isLoading}
            />

        </div>
    )
}

import React, { useContext, useState, useEffect } from 'react'
import { ReactComponent as Logo } from './../../assets/Logos/LogoRed.svg'
import { ReactComponent as CameraIcon } from './../../assets/Icons/CameraIcon.svg'
import LBSSwitch from '../LBSSwitch/LBSSwitch.js'
import Instance from '../../util/axios'
import ValidationTextInput from './ValidationTextInput'
import Button from '../Button/Button'
import { validate } from 'validate.js'
import { registrationConstraints } from '../../util/validationConstraints'
import { FileService } from '../../services/FileService'
import PhoneNumberInput from '../phoneNumberInput/PhoneNumberInput'
import {
  REGISTER_PAGES,
  SNACKBAR_BUTTON_TYPES,
  SCREEN_TYPE
} from '../../assets/Data/LBSEnum'
import useErrorState from '../../util/reducers/errorContext'
import ValidationPopup from '../ValidationPopup/ValidationPopup'

export default function BasicDetails({ context }) {
  const { state, dispatch } = useContext(context)
  const { errorDispatch } = useErrorState()
  const [errorMessages, setErrorMessages] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [emailTakenError, setEmailTakenError] = useState()
  const [phoneTakenError, setPhoneTakenError] = useState()
  const [imageError, setImageError] = useState('')
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    image,
    isLenderUpgrade,
  } = state

  useEffect(() => {
    if (Object.keys(errorMessages).length > 0) {
      const valid = validateInputs()
      if (valid) {
        setErrorMessages({})
        return
      }
    }
  }, [firstName, lastName, email, phoneNumber, password, confirmPassword])

  const getErrorMessage = inputName => {
    if (Object.keys(errorMessages).length === 0) return null
    for (const key in errorMessages) {
      if (Object.keys(errorMessages)[0] === inputName)
        return errorMessages[key][0]
    }
  }

  const validateInputs = () => {
    const validationErrors = validate(
      { firstName, lastName, email, phoneNumber, password, confirmPassword },
      registrationConstraints
    )
    if (validationErrors) {
      setErrorMessages(validationErrors)
      return false
    }
    setErrorMessages({})
    return true
  }

  const sendVerificationCode = async () => {
    try {
      const valid = validateInputs()
      if (!valid) return
      setIsLoading(true)
      const emailOrMobileExists = await checkEmailandMobile()
      if (emailOrMobileExists) return
      const { status, data } = await Instance.post(
        '/auth/getVerificationCodeToEmail',
        {
          email: `${email}`,
          screenType:SCREEN_TYPE.SIGNUP
          
        }
      )
      if (status === 201)
        dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.VERIFICATION })
    } catch (error) {
      errorDispatch({
        type: 'openSnackBar',
        data: {
          message:
            'Either email or phone number is invalid. Please check the details and try again.',
          btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
          btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
        },
      })
      setEmailTakenError('')
      setPhoneTakenError('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = async ({ target }) => {
    const file = target.files[0]
    if (target.files.length === 0) return
    const fileLink = await FileService.uploadSingleImage(file)
    if (!fileLink) return
    const image = {
      preview: URL.createObjectURL(file),
      raw: file,
    }
    dispatch({ type: 'setImage', data: image })
    dispatch({ type: 'setImageLink', data: fileLink })
  }

  const checkEmailandMobile = async () => {
    try {
      const { data } = await Instance.post(`/users/exists`, {
        email,
        mobile: `+${phoneNumber}`,
      })
      if (data?.email.exist) {
        setEmailTakenError('Email is already in use')
        return true
      } else if (data?.mobile.exist) {
        setPhoneTakenError('Phone Number is already in use')
        return true
      }
      return false
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className='RegistrationWrapper'>
      <div className='LoginMain'>
        <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />
        <div className='LoginHeader'>Basic Details</div>
        <div className='LoginText'>
          Log in or create an account to start sharing and borrowing from Little
          Big Shed.
        </div>
        <ValidationTextInput
          placeholder='John'
          label='First Name'
          value={firstName}
          onChange={e =>
            dispatch({ type: 'setFirstName', data: e.target.value })
          }
          errorMessage={getErrorMessage('firstName')}
        />
        <ValidationTextInput
          placeholder='Doe'
          label='Last Name'
          value={lastName}
          onChange={e =>
            dispatch({ type: 'setLastName', data: e.target.value })
          }
          errorMessage={getErrorMessage('lastName')}
        />
        <ValidationTextInput
          placeholder='johndoe@sample.com'
          label='Email'
          value={email}
          onChange={e => dispatch({ type: 'setEmail', data: e.target.value })}
          errorMessage={
            emailTakenError ? emailTakenError : getErrorMessage('email')
          }
        />
        <PhoneNumberInput
          label={'Phone Number'}
          placeholder={'+61412345678'}
          value={phoneNumber}
          onChange={number =>
            dispatch({ type: 'setPhoneNumber', data: number })
          }
          errorMessage={
            phoneTakenError ? phoneTakenError : getErrorMessage('phoneNumber')
          }
        />
        <div className='LoginHeader'>Profile Picture</div>
        <div className='ProfilePictureFlex'>
          <div className='ProfilePictureCircle'>
            {image ? (
              <img
                src={image.preview}
                alt=''
                className='ProfilePicturePreview'
                onLoad={() => setImageError('')}
                onError={e => setImageError(e)}
              />
            ) : (
              <CameraIcon className='CameraIcon' />
            )}
          </div>
          <input
            type='file'
            id='selectFile'
            style={{ display: 'none' }}
            onChange={e => handleChange(e)}
          />
          <button
            className='LoginFormButton UploadButton'
            onClick={() => document.getElementById('selectFile').click()}
          >
            Upload
          </button>
        </div>
        {imageError ? (
          <ValidationPopup
            errorText='Please try again.'
            errorHeader='Failed to upload an image'
          />
        ) : null}
      </div>

      <div className='LoginMain LoginMainNoMarg'>
        <div className='LoginHeader'>Password</div>
        <div className='LoginText'>
          Create a secure password including: at least 8 characters, 2 numbers
          and a special character.
        </div>
        <ValidationTextInput
          label='Password'
          placeholder=''
          value={password}
          passwordInput
          onChange={e =>
            dispatch({ type: 'setPassword', data: e.target.value })
          }
          errorMessage={getErrorMessage('password')}
        />
        <ValidationTextInput
          label='Confirm Password'
          passwordInput
          value={confirmPassword}
          onChange={e =>
            dispatch({ type: 'setConfirmPassword', data: e.target.value })
          }
          errorMessage={getErrorMessage('confirmPassword')}
        />
      </div>

      <div className='LoginMain LoginMainNoMarg'>
        <div className='BecomeLenderFlex'>
          <div className='LoginHeader' style={{ width: 'auto' }}>
            Become Lender
          </div>
          <div className='LenderSwitchInfoFlex'>
            <LBSSwitch
              isChecked={isLenderUpgrade}
              onClick={() =>
                dispatch({ type: 'setIsLenderUpgrade', data: !isLenderUpgrade })
              }
              text='Yes'
            />
          </div>
        </div>
        <div className='LoginText'>
          If you would like to share items on Little Big Shed we need some extra
          details off you.
        </div>
        <div className='LoginText'>
          These details allow us to send you payments for successful lends and
          help borrowers find your items
        </div>

        <Button
          isLoading={isLoading}
          onClick={sendVerificationCode}
          text='Next'
        />
      </div>
    </div>
  )
}

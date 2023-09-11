import axios from 'axios'
import React, { useState } from 'react'
import validate from 'validate.js'
import ValidationTextInput from '../../components/FormComponents/ValidationTextInput'
import Instance from '../../util/axios'
import { forgetPasswordEmailConstraints } from '../../util/validationConstraints'
import { ResetPasswordPage } from './ForgotPassword'

type Props = {
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  email: string
  switchPage: (page: ResetPasswordPage) => void
}

export default function EnterEmail({
  handleEmailChange,
  email,
  switchPage,
}: Props) {
  const [errorMessages, setErrorMessages] = useState<any>({})

  const getErrorMessage = (inputName:string) => {
    if (Object.keys(errorMessages).length === 0) return null
    for (const key in errorMessages) {
      if (Object.keys(errorMessages)[0] === inputName)
        return errorMessages[key][0]
    }
  }

  const validateInputs = () => {
    const validationErrors = validate(
      { email},
      forgetPasswordEmailConstraints
    )
    if (validationErrors) {
      setErrorMessages(validationErrors)
      return false
    }
    setErrorMessages({})
    return true
  }

  const sendVerificationCode = async () => {    
   const valid = validateInputs()   
   if(!valid){
    return 
   }
    try {
      const { data } = await Instance.post(
        '/users/exists',
        {
          email: `${email}`,
        }
      )
      const { exist } = data.email      
      if (exist) {
        const { status } = await Instance.post(
          '/auth/getVerificationCodeToEmail',
          {
            email: `${email}`,
          }
        )
        if (status !== 201) return
        switchPage('EnterCode')
      }
      else {
        setErrorMessages('This email does not exist')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        if (error.response?.status === 400) {
          setErrorMessages('Invalid Phone Number')
        }
      }
    }
  }

  return (
    <div className='LoginMain'>
      <div className='LoginHeader'>Account Email Address</div>
      <div className='LoginText'>
        Enter the email address associated with your Little Big Shed Account to
        retrieve a new password.
      </div>
      <ValidationTextInput
        label='Email'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleEmailChange(e)
        }
        value={email}
        placeholder='Enter email here...'
        errorMessage={getErrorMessage("email")}
        inLineError={""}
        errorHeader={undefined}
        inputType={undefined}
        passwordInput={false}
      />
      <div onClick={sendVerificationCode} style={{ width: '100%' }}>
        <button className='LoginFormButton'>Send</button>
      </div>
    </div>
  )
}

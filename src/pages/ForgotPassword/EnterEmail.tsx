import React, { useState } from 'react'
import PhoneNumberInput from '../../components/phoneNumberInput/PhoneNumberInput'
import Instance from '../../util/axios'
import ValidationTextInput from '../../components/FormComponents/ValidationTextInput'
import axios from 'axios'
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
  const [verificationError, setVerificationError] = useState('')

  const sendVerificationCode = async () => {
    try {
      const { status } = await Instance.post(
        '/auth/getVerificationCodeToEmail',
        {
          email: `${email}`,
        }
      )
      if (status !== 201) return
      switchPage('EnterCode')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        if (error.response?.status === 400) {
          setVerificationError('Invalid Phone Number')
        }
      }
    }
  }

  return (
    <div className='LoginMain'>
      <div className='LoginHeader'>Account Email Address</div>
      <div className='LoginText'>
        Enter the email address associated with your Little Big Shed Account to
        retieve a new password.
      </div>
      <ValidationTextInput
        label='Email'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleEmailChange(e)
        }
        value={email}
        placeholder='Enter email here...'
        errorMessage={verificationError}
        inLineError
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

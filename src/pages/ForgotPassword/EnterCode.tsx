import React, { useState } from 'react'
import ValidationTextInput from '../../components/FormComponents/ValidationTextInput'
import Instance from '../../util/axios'
import { ReactComponent as Logo } from './../../assets/Logos/LogoRed.svg'
import { ResetPasswordPage } from './ForgotPassword'
import axios from 'axios'

type Props = {
  switchPage: (page: ResetPasswordPage) => void
  email: string
}

export default function EnterCode({ switchPage, email }: Props) {
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')

  const verifyCode = async () => {
    try {
      const { data } = await Instance.post(
        '/auth/verifyCodeWithEmailToGetToken',
        {
          email: `${email}`,
          code,
        }
      )
      if (!data) return
      localStorage.setItem('LBSToken', data.accessToken)
      switchPage('NewPassword')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
        setCodeError('Please Check Your Email')
      }
    }
  }

  return (
    <div className='RegistrationWrapper'>
      <div className='LoginMain'>
        <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

        <div className='LoginHeader'>Verify Your Identity</div>
        <div className='LoginText'>
          Log in or create an account to start sharing and borrowing from Little
          Big Shed.
        </div>

        <ValidationTextInput
          errorMessage={codeError}
          placeholder='0425678910'
          label='Verification Code'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCode(e.target.value)
          }
          errorHeader={false}
          inLineError={false}
          inputType={undefined}
          passwordInput={false}
          value={code}
        />
        <button className='LoginFormButton' onClick={verifyCode}>
          Next
        </button>
      </div>
    </div>
  )
}

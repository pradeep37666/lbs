import React, { useContext, useState } from 'react'
import { SNACKBAR_BUTTON_TYPES } from '../../assets/Data/LBSEnum'
import Instance from '../../util/axios'
import useErrorState from '../../util/reducers/errorContext'
import Button from '../Button/Button'
import { ReactComponent as Logo } from './../../assets/Logos/LogoRed.svg'

export default function Verification({ context }) {
    const [ verificationCode, setVerificationCode ] = useState()
    const [ isLoading, setIsLoading ] = useState(false)
    const { state, dispatch } = useContext(context)
    const { errorDispatch } = useErrorState()
    const { phoneNumber } = state

    const verifyCode = async () => {
        try{
            setIsLoading(true)
            const status = await sendVerifyCode()
            if (status !== 201) return
            dispatch({ type: 'setCurrentPage', data: 'Bank Details'})
        } catch(error){
            errorDispatch({type: 'openSnackBar', data: {
                message: 'verify code is incorrect. Please try again with new code.',
                btnText: SNACKBAR_BUTTON_TYPES.RESEND,
                btnFunc: async () => {
                    try {
                        errorDispatch({type: 'closeSnackBar'})
                        await Instance.post('/auth/getVerificationCodeToMobile', {
                            mobile: `+${phoneNumber}`
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            }})
        } finally {
            setIsLoading(false)
        }
    }

    const sendVerifyCode = async () => {
        errorDispatch({type: 'closeSnackBar'})
        const { status } = await Instance.post('/auth/verifyCodeWithMobile', {
            mobile: `+${phoneNumber}`,
            code: verificationCode,
        })
        return status
    }

    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                    <div className="LoginHeader">Verify Your Identity</div>
                    <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>

                    <div className="LoginHeader">Verification Code</div>
                    <input type='text' placeholder='12345678' className="LoginInput" onChange={e => setVerificationCode(e.target.value)} style={{marginBottom: '1rem'}}/>

                    <Button
                    isLoading={isLoading}
                    onClick={verifyCode}
                    text="Next"
                    />
                </div>
        </div>
    )
}

import React, { useContext, useState } from 'react'
import Instance from '../../util/axios'
import Button from '../Button/Button'
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg'

export default function Verification({ context }) {
    const [verificationCode, setVerificationCode] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const { state, dispatch } = useContext(context)
    const { phoneNumber } = state

    const verifyCode = async () => {
        try{
            setIsLoading(true)
            const { status } =  await Instance.post('/auth/verifyCodeWithMobile', {
                mobile: `+${phoneNumber}`,
                code: verificationCode,
            })
            if (status === 201)
            dispatch({ type: 'setCurrentPage', data: 'Bank Details'})
        } catch(error){
            console.log(error.response)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                    <div className="LoginHeader">Verify Your Identity</div>
                    <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>

                    <div className="LoginHeader">Verification Code</div>
                    <input type='text' placeholder='12345678' className="LoginInput" onChange={e => setVerificationCode(e.target.value)}/>

                    <Button
                    isLoading={isLoading}
                    onClick={verifyCode}
                    text="Next"
                    />
                </div>
        </div>
    )
}

import React, { useContext, useState } from 'react';
import Instance from '../../util/axios';
import Button from '../Button/Button';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';

export default function Verification({ context }) {
    const [verificationCode, setVerificationCode] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const { state, dispatch } = useContext(context)
    const { phoneNumber } = state

    const verifyCode = async () => {
        setIsLoading(true)
        try{
            await Instance.post('/auth/verifyCodeWithMobile', {
                mobile: phoneNumber,
                code: verificationCode
            })
            setIsLoading(false)
            dispatch({ type: 'setCurrentPage', data: 'Bank Details'})
        } catch(err){
            setIsLoading(false)
            console.log(err)
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

import React, { useState } from 'react'
import Instance from '../../util/axios';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';


export default function EnterCode({ setCurrentPage, phoneNumber }) {
    const [code, setCode] = useState()

    const verifyCode = async () => {
        try{
            const { data, status } = await Instance.post('/auth/verifyCodeWithMobile', {
                mobile: phoneNumber,
                code
            })
            console.log(data, status)
        } catch(err){
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
                    <input type='text' placeholder='12345678' className="LoginInput" onChange={e => setCode(e.target.value)}/>

                    <button className="LoginFormButton" onClick={verifyCode}>Next</button>
                </div>
        </div>
    )
}

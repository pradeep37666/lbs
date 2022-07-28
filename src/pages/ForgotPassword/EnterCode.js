import React, { useState } from 'react'
import ValidationTextInput from '../../components/FormComponents/ValidationTextInput'
import Instance from '../../util/axios'
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg'

export default function EnterCode({ setCurrentPage, phoneNumber }) {
    const [code, setCode] = useState()
    const [codeError, setCodeError] = useState()

    const verifyCode = async () => {
        try{
            const { status } = await Instance.post('/auth/verifyCodeWithMobile', {
                mobile: `+${phoneNumber}`,
                code,
            })
            if (status !== 201 ) return
            setCurrentPage("NewPassword")
        } catch(error){
            console.log(error.response)
            setCodeError("Please Check Your Phone")
        }
    }


    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                    <div className="LoginHeader">Verify Your Identity</div>
                    <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>

                    <ValidationTextInput 
                    errorMessage={codeError}
                    placeholder="0425678910"
                    label="Verification Code" 
                    onChange={e => setCode(e.target.value)} />
                    <button className="LoginFormButton" onClick={verifyCode}>Next</button>
                </div>
        </div>
    )
}

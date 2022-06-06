import React, { useEffect, useState } from 'react'
import ValidationTextInput from '../../components/FormComponents/ValidationTextInput'
import Instance from '../../util/axios'

export default function EnterPhone({ setPhoneNumber, phoneNumber, setCurrentPage }) {
    const [verificationError, setVerificationError] = useState()

    const sendVerificationCode = async () => {
        try{
            const { data, status } = await Instance.get(`/auth/getVerificationCodeToMobile?mobile=${phoneNumber}`)
            console.log(data, status)
            setCurrentPage('EnterCode')
        } catch(err){
            console.log(err.response)
            if(err.response.status === 400){
                setVerificationError("Invalid Phone Number")
            }
        }
    }

    return (
        <div className="LoginMain">
                <div className="LoginHeader">Account Phone Number</div>
                <div className="LoginText">
                    Enter the phone number associated with your Little Big Shed Account to retieve a new password.
                </div>
                <ValidationTextInput 
                errorMessage={verificationError}
                label="Phone Number" 
                onChange={e => setPhoneNumber(e.target.value)} 
                />
                <div onClick={sendVerificationCode} style={{ width: '100%' }}>
                    <button className="LoginFormButton">Send</button>
                </div>
        </div>
    )
}

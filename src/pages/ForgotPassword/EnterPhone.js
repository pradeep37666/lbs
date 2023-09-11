import React, { useState } from 'react'
import PhoneNumberInput from '../../components/phoneNumberInput/PhoneNumberInput'
import Instance from '../../util/axios'

export default function EnterPhone({ setPhoneNumber, phoneNumber, setCurrentPage }) {
    const [ verificationError, setVerificationError ] = useState()

    const sendVerificationCode = async () => {
        try{
            const { status } = await Instance.post('/auth/getVerificationCodeToMobile', {
                mobile: `+${phoneNumber}`
            })
            if (status !== 201) return
            setCurrentPage('EnterCode')
        } catch(error){
            console.log(error.response)
            if(error.response.status === 400){
                setVerificationError("Invalid Phone Number")
            }
        }
    }

    return (
        <div className="LoginMain">
                <div className="LoginHeader">Account Phone Number</div>
                <div className="LoginText">
                    Enter the phone number associated with your Little Big Shed Account to retrieve a new password.
                </div>
                <PhoneNumberInput 
                    label={'Phone Number'}
                    placeholder={'+61412345678'}
                    value={phoneNumber}
                    onChange={number => setPhoneNumber(number)}
                    errorMessage={verificationError}
                />
                <div onClick={sendVerificationCode} style={{ width: '100%' }}>
                    <button className="LoginFormButton">Send</button>
                </div>
        </div>
    )
}

import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Instance from '../../../../util/axios';
import { handleCardName, handleCardNumber, handleExpiry, handleCcv, handleAccNumber, handleBsb } from '../../../../util/UserValidation'
import ValidationPopup from '../../../../components/ValidationPopup/ValidationPopup';
import useGlobalState from '../../../../util/useGlobalState';

export default function EditPaymentDetails() {
    const { state, dispatch } = useGlobalState()
    const { user } = state

    const history = useHistory()

    const [cardNameValidation, setCardNameValidation] = useState("")
    const [cardNumberValidation, setCardNumberValidation] = useState("")
    const [expiryValidation, setExpiryValidaiton] = useState("")
    const [ccvValidation, setCcvValidation] = useState("")

    const [accNumberValidation, setAccNumberValidation] = useState("")
    const [bsbValidation, setBsbValidation] = useState("")

    const [cardName, setCardName] = useState()
    const [cardNumber, setCardNumber] = useState()
    const [expiry, setExpiry] = useState()
    const [ccv, setCcv] = useState()

    const [accNumber, setAccNumber] = useState(user.account_number)
    const [bsb, setBsb] = useState(user.bsb)

    const showValidation = (field) => {
        switch (field) {
            case 'cardName':
                return (cardNameValidation.length > 0) ? false : true
            case 'cardNum':
                return (cardNumberValidation.length > 0 && cardNameValidation.length === 0) ? false : true
            case 'expiry':
                return (expiryValidation.length > 0 && cardNameValidation.length === 0 && cardNumberValidation.length === 0) ? false : true
            case 'ccv':
                return (ccvValidation.length > 0 && cardNameValidation.length === 0 && cardNumberValidation.length === 0 && expiryValidation.length === 0) ? false : true
            case 'accNum':
                return (accNumberValidation.length > 0) ? false : true
            case 'bsb':
                return (bsbValidation.length > 0 && accNumberValidation.length === 0) ? false : true
            default:
                return
        }
    }

    const updateBankDetails = () => {
        const stripeData = {
            cardName: cardName,
            cardNumber: cardNumber,
            expiry: expiry,
            ccv: ccv
        }

        // update stripe details
        // in stripe update make sure refresh (history.go(0)) if we wont be updating the bank details

        if (user.bsb) {
            const data = {
                account_number: accNumber ? accNumber : user.account_number,
                bsb: bsb ? bsb : user.bsb
            }

            Instance.put('user/update', data)
                .then((response) => {
                    console.log(response)
                    let newData = user
                    newData.account_number = data.account_number
                    newData.bsb = data.bsb
                    dispatch({ type: 'setUser', data: newData })
                    history.go(0)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }

    return (
        <div className="AccountSettings__Container">
            <div className="AccountSettings__Title">Payment Details</div>
            <div className="AccountSettings__UserName">Card Details</div>
            <div className="AccountSettings__BodyText">We need these details to make a successful trade between 2 parties.</div>

            {/* pull default values from stripe once setup */}

            <div className="LoginHeader LoginHeader--NoMargin">Name on Card</div>
            <div className="LoginInputValidationContainer">
                <input type='text' placeholder='Jane Doe' className="LoginInput" onBlur={(e) => handleCardName(e, setCardName, setCardNameValidation)} />
                <div className={`triangleLeft ${showValidation("cardName") ? '' : 'ValidationTextHide'}`} />
                <ValidationPopup errorText={cardNameValidation} errorHeader='Invalid Card Name' hide={showValidation("cardName")} />
            </div>


            <div className="LoginHeader LoginHeader--NoMargin">Number on Card</div>
            <div className="LoginInputValidationContainer">
                <input type='text' placeholder='1234 5678 9010 1112' className="LoginInput" onBlur={(e) => handleCardNumber(e, setCardNumber, setCardNumberValidation)} />
                <div className={`triangleLeft ${showValidation("cardNum") ? '' : 'ValidationTextHide'}`} />
                <ValidationPopup errorText={cardNumberValidation} errorHeader='Invalid Card Number' hide={showValidation("cardNum")} />
            </div>

            <div className="ExpiryCCVFlex">
                <div className="LoginHeader">Expiry</div>
                <div className="LoginHeader">CCV</div>
            </div>
            <div className="LoginInputValidationContainer">
                <div className="ExpiryCCVFlex">
                    <input type='text' placeholder='MM/YY' className="LoginInput" style={{ marginRight: '.5em' }} onBlur={(e) => handleExpiry(e, setExpiry, setExpiryValidaiton)} />
                    <input type='text' placeholder='000' className="LoginInput" onBlur={(e) => handleCcv(e, setCcv, setCcvValidation)} />
                </div>
                <div className={`triangleLeft ${showValidation("expiry") ? '' : 'ValidationTextHide'}`} />
                <ValidationPopup errorText={expiryValidation} errorHeader='Invalid Expiry Date' hide={showValidation("expiry")} />
                <div className={`triangleLeft ${showValidation("ccv") ? '' : 'ValidationTextHide'}`} />
                <ValidationPopup errorText={ccvValidation} errorHeader='Invalid ccv' hide={showValidation("ccv")} />
            </div>

            {user.bsb ?
                <div>

                    <div className="HL" />

                    <div className="AccountSettings__UserName">Bank Details</div>
                    <div className="AccountSettings__BodyText">Bank details will allow you to upgrade to a lender account.</div>

                    <div className="LoginHeader" style={{ marginBottom: '0' }}>Account Number</div>
                    <div className="LoginInputValidationContainer">

                        <input type='text' placeholder='1234 5678' defaultValue={accNumber} className="LoginInput" onBlur={(e) => handleAccNumber(e, setAccNumber, setAccNumberValidation)} />
                        <div className={`triangleLeft ${showValidation("accNum") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={accNumberValidation} errorHeader='Invalid Account Number' hide={showValidation("accNum")} />
                    </div>

                    <div className="LoginHeader" style={{ marginBottom: '0' }}>BSB</div>
                    <div className="LoginInputValidationContainer">

                        <input type='text' placeholder='123-456' defaultValue={bsb} className="LoginInput" onBlur={(e) => handleBsb(e, setBsb, setBsbValidation)} />
                        <div className={`triangleLeft ${showValidation("bsb") ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={bsbValidation} errorHeader='Invalid BSB' hide={showValidation("bsb")} />
                    </div>

                </div>

                : ''}

            <div className="AccountSettings__ButtonFlex">
                <button className="LoginFormButton AccountSettings__SaveButton" onClick={() => updateBankDetails()}>Save Changes</button>
            </div>

        </div>
    )
}

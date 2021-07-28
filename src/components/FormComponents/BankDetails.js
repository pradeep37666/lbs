import React, { useState } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import ValidationPopup from '../ValidationPopup/ValidationPopup';

export default function BankDetails(props) {

    const [nameValidation, setNameValidation] = useState("")
    const [cardNumberValidation, setCardNumberValidation] = useState("")
    const [expiryValidation, setExpiryValidation] = useState("")
    const [ccvValidation, setCcvValidation] = useState("")

    const [accNumberValidation, setAccNumberValidation] = useState("")
    const [bsbValidation, setBsbValidation] = useState("")

    const showValidation = (field) => {
        switch (field) {
            case 'name':
                return (nameValidation.length > 0) ? false : true
            case 'cardNum':
                return (cardNumberValidation.length > 0 && nameValidation.length === 0) ? false : true
            case 'expiry':
                return (expiryValidation.length > 0 && nameValidation.length === 0 && cardNumberValidation.length === 0) ? false : true
            case 'ccv':
                return (ccvValidation.length > 0 && nameValidation.length === 0 && cardNumberValidation.length === 0 && expiryValidation.length === 0) ? false : true
            case 'accNum':
                return (accNumberValidation.length > 0) ?  false : true
            case 'bsb':
                return (bsbValidation.length > 0 && accNumberValidation.length === 0) ? false : true
            default:
                return
        }
    }

    const handleName = (e) => {
        let nameInput = e.target.value

        if (nameInput.length === 0) {
            props.setCardName("")
            setNameValidation("Card Name is required")
        } else {
            props.setCardName(nameInput)
            setNameValidation("")
        }
    }

    const handleCardNumber = (e) => {
        let numberInput = e.target.value

        if (numberInput.length === 0) {
            props.setCardNumber("")
            setCardNumberValidation("Card Number is required")
        } else if (/\b\d{16}\b/.test(numberInput)) {
            props.setCardNumber(numberInput)
            setCardNumberValidation("")
        } else {
            props.setCardNumber("")
            setCardNumberValidation("Incorrect format for card number, should be in the format: 1234567890123456")
        }
    }

    const handleExpiry = (e) => {
        let expiryInput = e.target.value

        if (expiryInput.length === 0) {
            props.setExpiry("")
            setExpiryValidation("Expiry date is required")
        } else if (/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(expiryInput)) {
            props.setExpiry(expiryInput)
            setExpiryValidation("")
        } else {
            props.setExpiry("")
            setExpiryValidation("Incorrect format for card number, should be in the format: mm/yy, mmyy or mmyyyy")
        }
    }

    const handleCcv = (e) => {
        let ccvInput = e.target.value

        if (ccvInput.length === 0) {
            props.setCcv("")
            setCcvValidation("CCV is required")
        } else if (/\b\d{3}\b/.test(ccvInput)) {
            props.setCcv(ccvInput)
            setCcvValidation("")
        } else {
            props.setCcv("")
            setCcvValidation("Incorrect format for ccv, should be in the format: 123")
        }
    }

    const handleAccNumber = (e) => {
        let accNumberInput = e.target.value

        if (accNumberInput.length === 0) {
            props.setAccNumber("")
            setAccNumberValidation("Account number is required")
        } else if (/\b\d{8}\b/.test(accNumberInput)) {
            props.setAccNumber(accNumberInput)
            setAccNumberValidation("")
        } else {
            props.setAccNumber("")
            setAccNumberValidation("Incorrect format for account number")
        }
    }

    const handleBsb = (e) => {
        let bsbInput = e.target.value

        if (bsbInput.length === 0) {
            props.setBsb("")
            setBsbValidation("Account number is required")
        } else if (/\b\d{6}\b/.test(bsbInput)) {
            props.setBsb(bsbInput)
            setBsbValidation("")
        } else {
            props.setBsb("")
            setBsbValidation("Incorrect format for account number")
        }
    }

    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader">Payment Details</div>
                <div className="LoginText">If you would like to share your shed with users, Little big shed will need to know your payment and banking details to allow you to send and receive money for Little Big Shed trades.
                </div>

                <div className="LoginText">However if you only want to borrow items from other users, we will only need your card details.</div>

                </div>

                <div className="LoginMain LoginMainNoMarg">
                <div className="LoginHeader">Card Details</div>
                <div className="LoginText">We need these details to make a successful trade between 2 parties.</div>

                <div className="LoginHeader" style={{marginBottom: '0'}}>Name on Card</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='Jane Doe' className="LoginInput" onBlur={(e) => handleName(e)} />
                    <div className={`triangleLeft ${showValidation("name") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={nameValidation} errorHeader='Invalid Card Name' hide={showValidation("name")}/>
                </div>


                <div className="LoginHeader" style={{marginBottom: '0'}}>Number on Card</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='1234 5678 9010 1112' className="LoginInput" onBlur={(e) => handleCardNumber(e)}/>
                    <div className={`triangleLeft ${showValidation("cardNum") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={cardNumberValidation} errorHeader='Invalid Card Number' hide={showValidation("cardNum")}/>
                </div>

                <div className="ExpiryCCVFlex">
                    <div className="LoginHeader">Expiry</div>
                    <div className="LoginHeader">CCV</div>
                </div>
                <div className="LoginInputValidationContainer">
                    <div className="ExpiryCCVFlex">
                        <input type='text' placeholder='MM/YY' className="LoginInput" style={{marginRight: '.5em'}} onBlur={(e) => handleExpiry(e)} />
                        <input type='text' placeholder='000' className="LoginInput" onBlur={(e) => handleCcv(e)}/>
                    </div>
                    <div className={`triangleLeft ${showValidation("expiry") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={expiryValidation} errorHeader='Invalid Expiry Date' hide={showValidation("expiry")}/>
                    <div className={`triangleLeft ${showValidation("ccv") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={ccvValidation} errorHeader='Invalid ccv' hide={showValidation("ccv")}/>
                </div>
                {!props.lender ?
                <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => props.handleNextPage('Terms & Conditions')}>Next</button>
                : ''
                }
                </div>

                {props.lender ?
                <div className="LoginMain LoginMainNoMarg">

                <div className="LoginHeader">Bank Deposit Details</div>
                <div className="LoginText">Bank details will allow you to upgrade to a lender account.</div>

                <div className="LoginHeader" style={{marginBottom: '0'}}>Account Number</div>
                <div className="LoginInputValidationContainer">

                    <input type='text' placeholder='1234 5678' className="LoginInput" onBlur={(e) => handleAccNumber(e)}/>
                    <div className={`triangleLeft ${showValidation("accNum") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={accNumberValidation} errorHeader='Invalid Account Number' hide={showValidation("accNum")}/>
                </div>


                <div className="LoginHeader" style={{marginBottom: '0'}}>BSB</div>
                <div className="LoginInputValidationContainer">

                    <input type='text' placeholder='123-456' className="LoginInput" onBlur={(e) => handleBsb(e)}/>
                    <div className={`triangleLeft ${showValidation("bsb") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={bsbValidation} errorHeader='Invalid BSB' hide={showValidation("bsb")}/>
                </div>
                {/* on this button we need to check the stripe details first, if we're all good then can move to next page */}
                <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => props.handleNextPage('Location Details')}>Next</button>
                </div>
                : ''
                }

            </div>
    )
}

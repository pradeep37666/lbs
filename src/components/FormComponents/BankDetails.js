import React, { useState } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import ValidationPopup from '../ValidationPopup/ValidationPopup';
import { handleCardName, handleCardNumber, handleExpiry, handleCcv, handleAccNumber, handleBsb } from '../../util/UserValidation'

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
                    <input type='text' placeholder='Jane Doe' className="LoginInput" onBlur={(e) => handleCardName(e, props.setCardName, setNameValidation)} />
                    <div className={`triangleLeft ${showValidation("name") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={nameValidation} errorHeader='Invalid Card Name' hide={showValidation("name")}/>
                </div>


                <div className="LoginHeader" style={{marginBottom: '0'}}>Number on Card</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='1234 5678 9010 1112' className="LoginInput" onBlur={(e) => handleCardNumber(e, props.setCardNumber, setCardNumberValidation)}/>
                    <div className={`triangleLeft ${showValidation("cardNum") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={cardNumberValidation} errorHeader='Invalid Card Number' hide={showValidation("cardNum")}/>
                </div>

                <div className="ExpiryCCVFlex">
                    <div className="LoginHeader">Expiry</div>
                    <div className="LoginHeader">CCV</div>
                </div>
                <div className="LoginInputValidationContainer">
                    <div className="ExpiryCCVFlex">
                        <input type='text' placeholder='MM/YY' className="LoginInput" style={{marginRight: '.5em'}} onBlur={(e) => handleExpiry(e, props.setExpiry, setExpiryValidation)} />
                        <input type='text' placeholder='000' className="LoginInput" onBlur={(e) => handleCcv(e, props.setCcv, setCcvValidation)}/>
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

                    <input type='text' placeholder='1234 5678' className="LoginInput" onBlur={(e) => handleAccNumber(e, props.setAccNumber, setAccNumberValidation)}/>
                    <div className={`triangleLeft ${showValidation("accNum") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={accNumberValidation} errorHeader='Invalid Account Number' hide={showValidation("accNum")}/>
                </div>


                <div className="LoginHeader" style={{marginBottom: '0'}}>BSB</div>
                <div className="LoginInputValidationContainer">

                    <input type='text' placeholder='123-456' className="LoginInput" onBlur={(e) => handleBsb(e, props.setBsb, setBsbValidation)}/>
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

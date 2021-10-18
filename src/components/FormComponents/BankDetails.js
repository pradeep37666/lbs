import React, { useEffect, useState } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import ValidationPopup from '../ValidationPopup/ValidationPopup';
import { handleCardName, handleCardNumber, handleExpiry, handleCcv, handleAccNumber, handleBsb } from '../../util/UserValidation'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CircularProgress } from '@material-ui/core';

export default function BankDetails(props) {
    const [nameValidation, setNameValidation] = useState("")
    const [cardNumberValidation, setCardNumberValidation] = useState("")
    const [expiryValidation, setExpiryValidation] = useState("")
    const [ccvValidation, setCcvValidation] = useState("")

    const [accNumberValidation, setAccNumberValidation] = useState("")
    const [bsbValidation, setBsbValidation] = useState("")


    const [isLoading, setIsLoading] = useState(false)
    const [cardNumber, setCardNumber] = useState()
    const [cardExpiry, setCardExpiry] = useState()
    const [cardCvc, setCardCvc] = useState()
    const [cardName, setCardName] = useState()
    const [cardNameError, setCardNameError] = useState(false)

    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        if(!cardName) return
        setCardNameError(false)
    }, [cardName])

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

    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "22px",
            "::placeholder": {
              color: "#aab7c4",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

      const createPaymentMethod = async () => {
        if(!cardName) {
            setCardNameError(true) 
            return
        }
        setIsLoading(true)
        try{
            const cardNumber = elements.getElement(CardNumberElement)
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumber,
                billing_details: {
                    name: cardName
                }
            })
            if(error) return
            setIsLoading(false)
            props.setPaymentMethod(paymentMethod)
            if (props.lender) props.handleNextPage('Location Details')
            else props.handleNextPage('Terms & Conditions')
        } catch(err) {
            setIsLoading(false)
        }
        
        
    }

    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                    <div className="LoginHeader">Payment Details</div>
                    <div className="LoginText">If you would like to share your shed with users, Little big shed will need to know your payment and banking details to allow you to send and receive money for Little Big Shed trades.</div>

                    <div className="LoginText">However if you only want to borrow items from other users, we will only need your card details.</div>

                </div>

                {!props.isUpgrade ? 

                <div className="LoginMain LoginMainNoMarg">
                <div className="LoginHeader">Card Details</div>
                <div className="LoginText">We need these details to make a successful trade between 2 parties.</div>
                <div className="LoginHeader LoginHeader--NoMargin">Name on Card</div>
            <div className="LoginInputValidationContainer">
                <input type='text' placeholder='Name on Card' className="LoginInput" onChange={(e) => setCardName(e.target.value)} />
                <div className={`triangleLeft ${!cardNameError ? '' : 'ValidationTextHide'}`} /> 
                <ValidationPopup errorText={"Please enter a card name"} errorHeader='Invalid Card Name' hide={!cardNameError} />
            </div>


             <div className="LoginHeader LoginHeader--NoMargin">Number on Card</div>
            <div className="LoginInputValidationContainer">
                <CardNumberElement 
                className="LoginInput" 
                onChange={cardNumberObj => setCardNumber(cardNumberObj)} 
                options={CARD_ELEMENT_OPTIONS}
                />
                <div className={`triangleLeft ${!cardNumber?.error ? '' : 'ValidationTextHide'}`} /> 
                <ValidationPopup errorText={cardNumber?.error?.message} errorHeader='Invalid Card Number' hide={!cardNumber?.error} />
            </div>
            <div className="ExpiryCCVFlex">
                <div className="LoginHeader">Expiry</div>
                <div className="LoginHeader">CCV</div>
            </div>
            <div className="LoginInputValidationContainer">
                <div className="ExpiryCCVFlex">
                    <CardExpiryElement
                    className="LoginInput" 
                    onChange={cardExpiryObj => setCardExpiry(cardExpiryObj)} 
                    options={CARD_ELEMENT_OPTIONS}
                    />
                    <CardCvcElement
                    className="LoginInput" 
                    onChange={cardCvcObj => setCardCvc(cardCvcObj)} 
                    options={CARD_ELEMENT_OPTIONS}
                    />
                    
                </div>
                <div className={`triangleLeft ${!cardExpiry?.error ? '' : 'ValidationTextHide'}`} />
                <ValidationPopup errorText={cardExpiry?.error?.message} errorHeader='Invalid Expiry Date' hide={!cardExpiry?.error} />
                <div className={`triangleLeft ${!cardCvc?.error ? '' : 'ValidationTextHide'}`} />
                <ValidationPopup errorText={cardCvc?.error?.message} errorHeader='Invalid CCV' hide={!cardCvc?.error} />

            </div>
                {!props.lender &&
                    isLoading ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={createPaymentMethod}>Next</button>
                    )
                }
                </div>
                
                
                : ''}

                

                {props.lender ?
                <div className="LoginMain LoginMainNoMarg">

                <div className="LoginHeader">Bank Deposit Details</div>
                <div className="LoginText">Bank details will allow you to upgrade to a lender account.</div>

                <div className="LoginHeader LoginHeader--NoMargin">Account Number</div>
                <div className="LoginInputValidationContainer">

                    <input type='text' placeholder='1234 5678' className="LoginInput" onBlur={(e) => handleAccNumber(e, props.setAccNumber, setAccNumberValidation)}/>
                    <div className={`triangleLeft ${showValidation("accNum") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={accNumberValidation} errorHeader='Invalid Account Number' hide={showValidation("accNum")}/>
                </div>


                <div className="LoginHeader LoginHeader--NoMargin">BSB</div>
                <div className="LoginInputValidationContainer">

                    <input type='text' placeholder='123-456' className="LoginInput" onBlur={(e) => handleBsb(e, props.setBsb, setBsbValidation)}/>
                    <div className={`triangleLeft ${showValidation("bsb") ? '' : 'ValidationTextHide'}`} />
                    <ValidationPopup errorText={bsbValidation} errorHeader='Invalid BSB' hide={showValidation("bsb")}/>
                </div>
                {   isLoading ? (
                    <CircularProgress color="inherit" />
                ) : (
                    <button 
                    className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} 
                    disabled={!props.validated} 
                    onClick={() => props.handleNextPage('Location Details')}
                    >
                        Next
                    </button>
                )}
                </div>
                : ''
                }

            </div>
    )
}

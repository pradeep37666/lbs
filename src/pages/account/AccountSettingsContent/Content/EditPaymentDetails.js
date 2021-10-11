import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Instance from '../../../../util/axios';
import { handleCardName, handleCardNumber, handleExpiry, handleCcv, handleAccNumber, handleBsb } from '../../../../util/UserValidation'
import ValidationPopup from '../../../../components/ValidationPopup/ValidationPopup';
import useGlobalState from '../../../../util/useGlobalState';
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CircularProgress } from '@material-ui/core';

export default function EditPaymentDetails() {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const elements = useElements()
    const stripe = useStripe()
    const history = useHistory()

    const [isLoading, setIsLoading] = useState(false)
    const [cardNumber, setCardNumber] = useState()
    const [cardExpiry, setCardExpiry] = useState()
    const [cardCvc, setCardCvc] = useState()
    const [cardName, setCardName] = useState()
    const [cardNameError, setCardNameError] = useState(false)


    const [accNumber, setAccNumber] = useState(user.account_number)
    const [bsb, setBsb] = useState(user.bsb)

    useEffect(async () => {
        const res = await Instance.get('/stripe/getCreditCards')
        console.log(res)
    })
    // const showValidation = (field) => {
    //     switch (field) {
    //         case 'cardName':
    //             return (cardNameValidation.length > 0) ? false : true
    //         case 'cardNum':
    //             return (cardNumberValidation.length > 0 && cardNameValidation.length === 0) ? false : true
    //         case 'expiry':
    //             return (expiryValidation.length > 0 && cardNameValidation.length === 0 && cardNumberValidation.length === 0) ? false : true
    //         case 'ccv':
    //             return (ccvValidation.length > 0 && cardNameValidation.length === 0 && cardNumberValidation.length === 0 && expiryValidation.length === 0) ? false : true
    //         case 'accNum':
    //             return (accNumberValidation.length > 0) ? false : true
    //         case 'bsb':
    //             return (bsbValidation.length > 0 && accNumberValidation.length === 0) ? false : true
    //         default:
    //             return
    //     }
    // }

    // const updateBankDetails = () => {
    //     const stripeData = {
    //         cardName: cardName,
    //         cardNumber: cardNumber,
    //         expiry: expiry,
    //         ccv: ccv
    //     }

    //     // update stripe details
    //     // in stripe update make sure refresh (history.go(0)) if we wont be updating the bank details

    //     if (user.bsb) {
    //         const data = {
    //             account_number: accNumber ? accNumber : user.account_number,
    //             bsb: bsb ? bsb : user.bsb
    //         }

    //         Instance.put('user/update', data)
    //             .then((response) => {
    //                 console.log(response)
    //                 let newData = user
    //                 newData.account_number = data.account_number
    //                 newData.bsb = data.bsb
    //                 dispatch({ type: 'setUser', data: newData })
    //                 history.go(0)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             })
    //     }

    // }

    useEffect(() => {
        if(!cardName) return
        setCardNameError(false)
    }, [cardName])

    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "black",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "20px",
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
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumber,
                billing_details: {
                    name: cardName
                }
            })
            if(error){
                setIsLoading(false)
                return
            }
            const { data, status } = await Instance.post('/stripe/addCreditCard', {
                paymentMethodId: paymentMethod.id
            })
            console.log(data,status)
        } catch(err) {

        }
        setIsLoading(false)
    }


    return (
        <div className="AccountSettings__Container">
            <div className="AccountSettings__Title">Payment Details</div>
            <div className="AccountSettings__UserName">Card Details</div>
            <div className="AccountSettings__BodyText">We need these details to make a successful trade between 2 parties.</div>


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



                    
            
            {/*
            

            {user.bsb ?
                <div>

                    <div className="HL" />

                    <div className="AccountSettings__UserName">Bank Details</div>
                    <div className="AccountSettings__BodyText">Bank details will allow you to upgrade to a lender account.</div>

                    <div className="LoginHeader" style={{ marginBottom: '0' }}>Account Number</div>
                    <div className="LoginInputValidationContainer">

                        <input type='text' placeholder='1234 5678' defaultValue={accNumber} className="LoginInput" onBlur={(e) => handleAccNumber(e, setAccNumber, setAccNumberValidation)} />
                        <div className={`triangleLeft ${showValidation("accNum") ? '' : 'ValidationTextHide'}`} />
                        { !showValidation('accNum') && <ValidationPopup errorText={accNumberValidation} errorHeader='Invalid Account Number' hide={showValidation("accNum")} />}
                    </div>

                    <div className="LoginHeader" style={{ marginBottom: '0' }}>BSB</div>
                    <div className="LoginInputValidationContainer">

                        <input type='text' placeholder='123-456' defaultValue={bsb} className="LoginInput" onBlur={(e) => handleBsb(e, setBsb, setBsbValidation)} />
                        <div className={`triangleLeft ${showValidation("bsb") ? '' : 'ValidationTextHide'}`} />
                        { !showValidation('bsb') && <ValidationPopup errorText={bsbValidation} errorHeader='Invalid BSB' hide={showValidation("bsb")} />}
                    </div>

                </div>

                : ''} */}

            
                <div className="AccountSettings__ButtonFlex">
                    {   isLoading ? (
                        <CircularProgress />
                    ) : (
                        <button className="LoginFormButton AccountSettings__SaveButton" onClick={() => createPaymentMethod()}>Save Changes</button>
                    )}
                </div> 
            

        </div>
    )
}

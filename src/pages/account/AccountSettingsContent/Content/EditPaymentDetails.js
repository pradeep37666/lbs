import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import Instance from '../../../../util/axios';
import ValidationPopup from '../../../../components/ValidationPopup/ValidationPopup';
import useGlobalState from '../../../../util/useGlobalState';
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { CircularProgress, Typography } from '@material-ui/core';
import TrashCan from '../../../../assets/Icons/TrashCan';
import ValidationTextInput from '../../../../components/FormComponents/ValidationTextInput';
import Button from '../../../../components/Button/Button';

export default function EditPaymentDetails() {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const elements = useElements()
    const stripe = useStripe()
    const history = useHistory()
    const [isUpdateAccountLoading, setIsUpdateAccountLoading] = useState(false)
    const [updateAccountError, setUpdateAccountError] = useState()
    const [isCreateCardLoading, setIsCreateCardLoading] = useState(false)
    const [isCardLoading, setIsCardLoading] = useState(true)
    const [cardNumber, setCardNumber] = useState()
    const [cardExpiry, setCardExpiry] = useState()
    const [cardCvc, setCardCvc] = useState()
    const [cardName, setCardName] = useState()
    const [cardNameError, setCardNameError] = useState(false)
    const [userCard, setUserCard] = useState()

    const [accNumber, setAccNumber] = useState(user.account_number)
    const [bsb, setBsb] = useState(user.bsb)

    useEffect(() => {
        getSavedCard()
        getStripeDetails()
    }, [])

    const getSavedCard = async () => {
        try{
            const { data, status } = await Instance.get('/stripe/getCreditCards')
            const userCard = data.data[0]
            setUserCard(userCard)
        } catch(err){
            console.log(err)
        } finally { 
            setIsCardLoading(false)
        }
        
    }

    const getStripeDetails = async () => {
        try{
            const { data, status } = await Instance.get('/stripe/me')
            console.log('stripe me', data)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if(!cardName) return
        setCardNameError(false)
    }, [cardName])

    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            color: "black",
            fontFamily: '"DMSans", sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "18px",
            "::placeholder": {
              color: "rgb(133,133,133)",
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
        setIsCreateCardLoading(true)
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
                setIsCreateCardLoading(false)
                return
            }
            await Instance.post('/stripe/addCreditCard', {
                paymentMethodId: paymentMethod.id
            })
            await getSavedCard()
        } catch(err) {
            console.log(err.response)
        }
        setIsCreateCardLoading(false)
    }

    const deleteCard = async () => {
        setIsCardLoading(true)
        try{
            const { data, status } = await Instance.delete(`/stripe/deleteCreditCard?paymentMethodId=${userCard.id}`)
            console.log(data,status)
            if(status !== 200) return
            setUserCard(null)

        } catch(err){
            console.log(err.response)
        } finally{
            setIsCardLoading(false)
        }
        
    }

    const getAccountDetails = async () => {
        try{
            // const { data, status } = Instan
        } catch(err) {

        }
    }

    const createUpdateAccountToken = async () => {
        setIsUpdateAccountLoading(true)
        try{
            const response = await stripe.createToken('bank_account', {
                country: 'AU',
                currency: 'aud',
                routing_number: bsb,
                account_number: accNumber,
                account_holder_type: 'individual',
                account_holder_name: user.fullName,
            })
            if(response.token){
                setUpdateAccountError('')
                return response.token
            } else {
                setUpdateAccountError('Invalid bsb or account number')
            }
        } catch(err){
            setUpdateAccountError('Something went wrong')
        } finally{
            setIsUpdateAccountLoading(false)
        }
    }

    const updateAccountDetails = async () => {
        const token = await createUpdateAccountToken()
        try{
            // const { data, status } = await Instance.post('/')
        } catch(err){
            console.log(err)
        }
    }
    return (
        <>
            <div className="AccountSettings__Container">
                <div className="AccountSettings__Title">Payment Details</div>
                { isCardLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress color="inherit" />
                    </div>
                    
                ) : (
                    userCard ? (
                        <div>
                            <span>Your preferred payment method. You can update this below</span>
                            <div className="AccountSettings__SavedCard">
                                <div style={{ display: 'flex', flexDirection: 'column'}}>
                                    <span>Card</span>
                                    <span>XXXX XXXX XXXX {userCard.card.last4}</span>
                                </div>
                                <TrashCan 
                                onClick={() => deleteCard()}
                                style={{ position: 'absolute', right: 10, cursor: 'pointer' }}
                                />
                            </div>
                        </div>
                    ) : (
                            <>
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

                            <div className="AccountSettings__ButtonFlex">
                                {   isCreateCardLoading ? (
                                    <CircularProgress color="inherit" />
                                ) : (
                                    <button className="LoginFormButton AccountSettings__SaveButton" onClick={() => createPaymentMethod()}>Save Changes</button>
                                )}
                            </div> 
                        </>
                    )
                    
                )}
            
                

            </div>
            <div className="AccountSettings__Container">

                <div className="AccountSettings__UserName">Bank Details</div>
                <div className="AccountSettings__BodyText">Bank details will allow you to upgrade to a lender account.</div>

                <ValidationTextInput 
                label="Account Number"
                onChange={e => setAccNumber(e.target.value)}
                placeholder="1234 5678"
                />

                <ValidationTextInput 
                label="BSB" 
                onChange={e => setBsb(e.target.value)}
                placeholder="456-789"
                />
                <Button 
                isLoading={isUpdateAccountLoading}
                text="Update" 
                errorMessage={updateAccountError}
                onClick={updateAccountDetails}/>
            </div>
        </>
    )
}

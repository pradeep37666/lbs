import React, { useEffect, useState } from 'react'
import Instance from '../../../../util/axios';
import ValidationPopup from '../../../../components/ValidationPopup/ValidationPopup';
import useGlobalState from '../../../../util/useGlobalState';
import { 
    CardCvcElement, 
    CardExpiryElement, 
    CardNumberElement, 
    useElements, 
    useStripe 
} from '@stripe/react-stripe-js';
import { CircularProgress } from '@material-ui/core';
import TrashCan from '../../../../assets/Icons/TrashCan';
import Button from '../../../../components/Button/Button';
import cardElementOptions from '../../../../constants/cardElementOptions';
import StripeAccountDetails from './StripeAccountDetails';
import useErrorState from '../../../../util/reducers/errorContext';
import { SNACKBAR_BUTTON_TYPES } from '../../../../assets/Data/LBSEnum';

export default function EditPaymentDetails() {
    const { state } = useGlobalState()
    const { user } = state
    const { errorDispatch } = useErrorState()
    const elements = useElements()
    const stripe = useStripe()

    const [isCreateCardLoading, setIsCreateCardLoading] = useState(false)
    const [isCardLoading, setIsCardLoading] = useState(true)
    const [cardNumber, setCardNumber] = useState()
    const [cardExpiry, setCardExpiry] = useState()
    const [cardCvc, setCardCvc] = useState()
    const [cardName, setCardName] = useState()
    const [cardNameError, setCardNameError] = useState(false)
    const [userCard, setUserCard] = useState()

    useEffect(() => {
        getSavedCard()
    }, [])

    const getSavedCard = async () => {
        try{
            const { data, status } = await Instance.get('/stripe/customer/credit-card')
            if (status !== 200) return
            const userCard = data.data[0]
            setUserCard(userCard)
        } catch(err){
            console.log(err)
        } finally { 
            setIsCardLoading(false)
        }
    }

    useEffect(() => {
        if(!cardName) return
        setCardNameError(false)
    }, [cardName])

    const createPaymentMethod = async () => {
        if(!cardName) {
            setCardNameError(true) 
            return
        }
        try{
            setIsCreateCardLoading(true)
            const cardNumber = elements.getElement(CardNumberElement)
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumber,
                billing_details: {
                    name: cardName
                }
            })
            if(error) return
            await Instance.post('/stripe/customer/credit-card', {
                paymentMethodId: paymentMethod.id
            })
            await getSavedCard()
        } catch(error) {
            console.log(error.response)
            if (error?.response?.data?.statusCode === 402) {
                errorDispatch({type: 'openSnackBar', data: {
                    message: `${error?.response?.data?.message} Please check your bank details and try again.`,
                    btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
                    btnFunc: () => errorDispatch({type: 'closeSnackBar'})
                }})
            }
        } finally {
            setIsCreateCardLoading(false)
        }
    }

    const deleteCard = async () => {
        setIsCardLoading(true)
        try{
            const { status } = await Instance.delete(`/stripe/customer/credit-card?paymentMethodId=${userCard.id}`)
            if(status !== 200) return
            setUserCard(null)
        } catch(err){
            console.log(err.response)
        } finally{
            setIsCardLoading(false)
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
                                {cardNameError && (
                                    <ValidationPopup errorText={"Please enter a card name"} errorHeader='Invalid Card Name' hide={!cardNameError} />
                                )}
                            </div>


                            <div className="LoginHeader LoginHeader--NoMargin">Number on Card</div>
                            <div className="LoginInputValidationContainer">
                                <CardNumberElement 
                                className="LoginInput" 
                                onChange={cardNumberObj => setCardNumber(cardNumberObj)} 
                                options={cardElementOptions}
                                />
                                <div className={`triangleLeft ${!cardNumber?.error ? '' : 'ValidationTextHide'}`} /> 
                                {cardNumber?.error?.message && (
                                    <ValidationPopup errorText={cardNumber?.error?.message} errorHeader='Invalid Card Number' hide={!cardNumber?.error} />
                                )}
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
                                    options={cardElementOptions}
                                    />
                                    <CardCvcElement
                                    className="LoginInput" 
                                    onChange={cardCvcObj => setCardCvc(cardCvcObj)} 
                                    options={cardElementOptions}
                                    />
                                    
                                </div>
                                <div className={`triangleLeft ${!cardExpiry?.error ? '' : 'ValidationTextHide'}`} />
                                {cardExpiry?.error?.message && (
                                    <ValidationPopup errorText={cardExpiry?.error?.message} errorHeader='Invalid Expiry Date' hide={!cardExpiry?.error} />
                                )}
                                <div className={`triangleLeft ${!cardCvc?.error ? '' : 'ValidationTextHide'}`} />
                                {cardCvc?.error?.message && (
                                    <ValidationPopup errorText={cardCvc?.error?.message} errorHeader='Invalid CCV' hide={!cardCvc?.error} />
                                )}

                            </div> 

                            <div className="AccountSettings__ButtonFlex" style={{marginTop: '1em'}}>
                                <Button 
                                onClick={createPaymentMethod}
                                text="Save Card" 
                                isLoading={isCreateCardLoading}/>
                            </div> 
                            
                        </>
                    )
                    
                )}
            </div>
            { user.isLender && <StripeAccountDetails />}
        </>
    )
}

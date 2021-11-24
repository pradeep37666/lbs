import React, { useContext, useEffect, useState } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import ValidationPopup from '../ValidationPopup/ValidationPopup';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CircularProgress, createMuiTheme } from '@material-ui/core';
import cardElementOptions from '../../constants/cardElementOptions';
import ValidationTextInput from './ValidationTextInput';
import { FormContext } from '../../pages/account/UpgradeLender/UpgradeLender';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Button from '../Button/Button';
import { ThemeProvider } from '@material-ui/styles';

export default function BankDetails({ context }) {
    const { state, dispatch } = useContext(context)
    let { accountNumber, BSB, isLenderUpgrade, dateOfBirth } = state
    isLenderUpgrade = true
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

            dispatch({ type: 'setPaymentMethod', data: paymentMethod })
            dispatch({ type: 'setCurrentPage', data: isLenderUpgrade ? 'Location Details' : 'Terms & Conditions'})
        } catch(err) {
            setIsLoading(false)
        }
    }

    // const handleNextButtonClick = () => {
    //     const isOverThirteen = checkDateOfBirth()
    //     console.log('over thirteen', isOverThirteen)
    //     if(!isOverThirteen) return 
    //     console.log()
    //     if(props.isUpgrade){
    //         props.handleNextPage('Location Details')
    //         return
    //     }
    //     createPaymentMethod()
    // }

    const datePickerTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#ac172c'
            }
        }
    })
    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                    <div className="LoginHeader">Payment Details</div>
                    <div className="LoginText">If you would like to share your shed with users, Little big shed will need to know your payment and banking details to allow you to send and receive money for Little Big Shed trades.</div>

                    <div className="LoginText">However if you only want to borrow items from other users, we will only need your card details.</div>

                </div>

                { !isLenderUpgrade ? 

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
                        options={cardElementOptions}
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
                            options={cardElementOptions}
                            />
                            <CardCvcElement
                            className="LoginInput" 
                            onChange={cardCvcObj => setCardCvc(cardCvcObj)} 
                            options={cardElementOptions}
                            />
                            
                        </div>
                        <div className={`triangleLeft ${!cardExpiry?.error ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={cardExpiry?.error?.message} errorHeader='Invalid Expiry Date' hide={!cardExpiry?.error} />
                        <div className={`triangleLeft ${!cardCvc?.error ? '' : 'ValidationTextHide'}`} />
                        <ValidationPopup errorText={cardCvc?.error?.message} errorHeader='Invalid CCV' hide={!cardCvc?.error} />

                    </div>
                
            
            </div>
            
            
            : ''}

            { isLenderUpgrade &&
            <div className="LoginMain LoginMainNoMarg">

                <div className="LoginHeader">Date of Birth</div> 
                <ThemeProvider theme={datePickerTheme}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="DD/MM/yyyy"
                        margin='normal'
                        id="date-picker-inline"
                        value={dateOfBirth}
                        disableFuture
                        onChange={(chosenDate) =>  {
                            const newDate = new Date( chosenDate._d ? chosenDate._d : chosenDate )
                            dispatch({ type: 'setDateOfBirth', data: newDate})
                        }}
                        onAccept={() => console.log('a')}
                        style={{ width: '100%', marginBottom: '1rem' }}
                        views={['year', 'month', 'date']}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider>

                <div className="LoginHeader">Bank Deposit Details</div>
                <div className="LoginText">Bank details will allow you to upgrade to a lender account.</div>

                <ValidationTextInput 
                label="Account Number"
                value={accountNumber}
                placeholder="123 456 789"
                onChange={e => dispatch({ type: 'setAccountNumber', data: e.target.value })}
                />
                <ValidationTextInput 
                value={BSB}
                placeholder="123 456"
                onChange={e => dispatch({ type: 'setBSB', data: e.target.value})}
                label="BSB"
                />
                <Button 
                text="Next"
                isDisabled={ !accountNumber || !BSB }
                onClick={() => dispatch({ type: 'setCurrentPage', data: 'Location Details'})}
                />
            </div>
            }

        </div>
    )
}

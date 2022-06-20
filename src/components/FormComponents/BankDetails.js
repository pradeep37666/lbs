import React, { useContext, useEffect, useState } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import ValidationPopup from '../ValidationPopup/ValidationPopup';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createMuiTheme } from '@material-ui/core';
import cardElementOptions from '../../constants/cardElementOptions';
import ValidationTextInput from './ValidationTextInput';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import useGlobalState from '../../util/useGlobalState'
import MomentUtils from '@date-io/moment';
import Button from '../Button/Button';
import { ThemeProvider } from '@material-ui/styles';
import { ReactComponent as CameraIcon } from '../../assets/Icons/CameraIcon.svg'
import { FileService } from '../../services/FileService';
import { async } from 'validate.js';

export default function BankDetails({ context }) {
    const user = useGlobalState().state.user
    const { state, dispatch } = useContext(context)
    const { 
        accountNumber, BSB, mcc, website, idFrontImage, 
        idBackImage, isLenderUpgrade, dateOfBirth 
    } = state
    const [ isLoading, setIsLoading ] = useState(false)
    const [ cardNumber, setCardNumber ] = useState()
    const [ cardExpiry, setCardExpiry ] = useState()
    const [ cardCvc, setCardCvc ] = useState()
    const [ cardName, setCardName ] = useState()
    const [ cardNameError, setCardNameError ] = useState(false)

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
            dispatch({ type: 'setPaymentMethod', data: paymentMethod })
            dispatch({ type: 'setCurrentPage', data: isLenderUpgrade ? 'Location Details' : 'Terms & Conditions'})
        } catch(err) {
            console.log({err})
        } finally {
            setIsLoading(false)
        }
    }

    const datePickerTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#ac172c'
            }
        }
    })

    const getMinDate = () => {
            const today = new Date()
            const minDate = new Date()
            minDate.setFullYear(today.getFullYear() - 13)
            return minDate
    }

    const uploadIdImages = async (e, type) => {
        const file = e.target.files[0]
        if (e.target.files.length === 0) return
        const fileLink = await FileService.uploadIdentityImage(file)
        if (!fileLink) return
        const image = {
            preview: URL.createObjectURL(file),
            raw: file
        }
        if (type === 'front') {
            dispatch({ type: 'setIdFrontImage', data: image })
            dispatch({ type: 'setIdFrontImageLink', data: fileLink.id})
        } else if (type === 'back') {
            dispatch({ type: 'setIdBackImage', data: image })
            dispatch({ type: 'setIdBackImageLink', data: fileLink.id})
        }
    }

    return (
        <div className="RegistrationWrapper">
            { !user && <>
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>
                    <div className="LoginHeader">Payment Details</div>
                    <div className="LoginText">If you would like to share your shed with users, Little big shed will need to know your payment and banking details to allow you to send and receive money for Little Big Shed trades.</div>
                    <div className="LoginText">However if you only want to borrow items from other users, we will only need your card details.</div>
                </div>
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
                    { !isLenderUpgrade && 
                    <Button 
                    isLoading={isLoading}
                    onClick={createPaymentMethod}
                    text="Next"
                    />}
                </div>
            </>}
                

            {isLenderUpgrade &&
            <div className="LoginMain" style={ !user ? { marginTop: 0 } : null}>
                <div className="LoginHeader">Date of Birth</div> 
                <ThemeProvider theme={datePickerTheme}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="DD/MM/yyyy"
                        maxDate={getMinDate()}
                        maxDateMessage="You must be at least 13 years old to create an account"
                        margin='normal'
                        id="date-picker-inline"
                        value={dateOfBirth}
                        disableFuture
                        onChange={(chosenDate) =>  {
                            if(!chosenDate) return 
                            const newDate = new Date( chosenDate._d ? chosenDate._d : chosenDate )
                            dispatch({ type: 'setDateOfBirth', data: newDate})
                        }}
                        onAccept={(newDate) => console.log(newDate)}
                        style={{ width: '100%', marginBottom: '1rem' }}
                        views={['year', 'month', 'date']}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                    </MuiPickersUtilsProvider>
                </ThemeProvider>

                <div className="BankDetailMainTitle">
                    Bank Deposit Details
                </div>
                <div className="BankDetailSubTitle">
                    Bank details will allow you to upgrade to a lender account.
                </div>

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
                <div>
                    <p className='IdProviderMainTitle'>
                    Identity Documents
                    </p>
                    <p className='IdProviderSubTitle'>
                    Attach a front and back image of a valid identity type (e.g. driver’s licence or passport).
                    </p>
                    <div className="LoginHeader">Front Identity Image</div>
                    <div className="IdProvideInputContainer">
                        <div className="IdProvideImageSquare" >
                            {idFrontImage 
                            ?   <img 
                                src={idFrontImage.preview} 
                                alt="id front" 
                                className="IdFrontPicturePreview"
                                />
                            :   <CameraIcon className="CameraIcon"/>
                            }
                        </div>
                        <input 
                            type="file" 
                            id="selectIdFront" 
                            style={{ display: "none" }} 
                            onChange={(e) => uploadIdImages(e, 'front')} 
                        />
                        <button 
                        className="LoginFormButton UploadButton" 
                        onClick={() => document.getElementById('selectIdFront').click()}
                        >
                            Upload
                        </button>
                    </div>

                    <div className="LoginHeader">Back Identity Image</div>
                    <div className="IdProvideInputContainer">
                        <div className="IdProvideImageSquare" >
                            {idBackImage 
                            ?   <img 
                                src={idBackImage.preview} 
                                alt="id back" 
                                className="IdFrontPicturePreview"
                                />
                            :   <CameraIcon className="CameraIcon"/>
                            }
                        </div>
                        <input 
                            type="file" 
                            id="selectIdBack" 
                            style={{ display: "none" }} 
                            onChange={(e) => uploadIdImages(e, 'back')} 
                        />
                        <button 
                        className="LoginFormButton UploadButton" 
                        onClick={() => document.getElementById('selectIdBack').click()}
                        >
                            Upload
                        </button>
                    </div>
                </div>

                <div className="LoginHeader LoginHeader--NoMargin">Website (Social Media)</div>
                <div className="LoginInputValidationContainer">
                    <input type='text' placeholder='Enter your website' className="LoginInput" onChange={(e) => dispatch({ type: 'setWebsite', data: e.target.value})} />
                    {/* <div className={`triangleLeft ${!websiteError ? '' : 'ValidationTextHide'}`} /> 
                    <ValidationPopup errorText={"Please enter your website or social media"} errorHeader='Website is required' hide={!websiteError} /> */}
                </div>
                <Button 
                text="Next"
                isLoading={isLoading}
                isDisabled={ !accountNumber || !BSB || !idFrontImage || !idBackImage}
                onClick={() => user ? dispatch({ type: 'setCurrentPage', data: 'Location Details'}) : createPaymentMethod()}
                />
            </div>
            }
        </div>
    )
}

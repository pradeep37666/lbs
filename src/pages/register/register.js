import React, { useState, useEffect, useReducer, createContext } from 'react';
import './register.css';
import PageWrapper from "../../components/pageWrapper/pageWrapper.js";
import Banner from "../../components/bannerText/bannerText.js";
import BasicDetails from '../../components/FormComponents/BasicDetails';
import Verification from '../../components/FormComponents/Verification';
import BankDetails from '../../components/FormComponents/BankDetails';
import LocationDetails from '../../components/FormComponents/LocationDetails';
import Availability from '../../components/FormComponents/Availability';
import TermsConditions from '../../components/FormComponents/TermsConditions';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import Instance from '../../util/axios';
import { useHistory } from 'react-router-dom';
import useGlobalState from '../../util/useGlobalState';
import { CometChat } from '@cometchat-pro/chat';
import registerReducer from '../../util/reducers/registerReducer';
import parseAddressComponent from '../../util/parseAddressComponent';

const FormContext = createContext()

export default function Register() {
    const [ isRegisterLoading, setIsRegisterLoading ] = useState(false)
    const globalDispatch = useGlobalState().dispatch
    const [ state, dispatch ] = useReducer(registerReducer, { 
        currentPage: 'Basic Details',
        dateOfBirth: new Date(1990, 0, 1),
        isLenderUpgrade: false,
        firstName: '', 
        lastName: '', 
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsChecked: false,
        availability: Array(14).fill(0),
        lenderRating: 0,
        borrowerRating: 0,
    })
    const { 
        firstName, lastName, email, phoneNumber, password, 
        address, currentPage, imageLink, paymentMethod, 
        isLenderUpgrade, dateOfBirth, availability, 
        accountNumber, BSB, website, idFrontImageLink, 
        idBackImageLink, lenderRating, borrowerRating
    } = state

    const history = useHistory()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentPage])

    useEffect(() => {
        globalDispatch({ type: 'setUser', data: ''})
    },[])

    const getUserDetails = () => {
        if(isLenderUpgrade){
            const lenderDetails = {
                lenderDetails: {
                    firstName,
                    lastName,
                    email,
                    avatar: imageLink ? imageLink : '',
                    mobile: phoneNumber,
                    password: password,
                    address: {
                        ...parseAddressComponent(address?.address_components),
                        lat: address.lat,
                        lng: address.lng,
                    },
                    isLender: true,
                    lender_rating: lenderRating,
                    borrower_rating: borrowerRating,
                    available: availability.join('')
                },
                stripeDetails: {
                    day: dateOfBirth.getDate(),
                    month: dateOfBirth.getMonth() + 1,
                    year: dateOfBirth.getFullYear(),
                    bsb: BSB,
                    accountNumber: accountNumber,
                    mcc: '5734',
                    website: website ?? 'https://www.stripe.com/au',
                    documentFrontImage: idFrontImageLink,
                    documentBackImage: idBackImageLink,
                }
            }
            return lenderDetails
        } else {
            const userDetails = {
                firstName,
                lastName,
                email,
                avatar: imageLink ? imageLink : '',
                mobile: phoneNumber,
                password: password,
                isLender: false,
                lender_rating: lenderRating,
                borrower_rating: borrowerRating,
                available: availability.join(''),
            }
            return userDetails
        }
    }

    const registerUser = async () => {
        setIsRegisterLoading(true)
        await setupCometChat()
        const signupDetails = getUserDetails()
        try{
            const { data, status } = await Instance.post(isLenderUpgrade ? '/auth/lenderSignUp' : '/auth/signUp', signupDetails)
            if(status === 201) {
                globalDispatch({ type: 'setUser', data: data.user})
                localStorage.setItem('LBSToken', data.token.accessToken)
                await saveCard()
                await registerCometChat(data.user)
                setIsRegisterLoading(false)
                dispatch({ type: 'setCurrentPage', data: 'Complete!'})
            }
        } catch(e) {
            console.log(e.response)
        } finally {
            setIsRegisterLoading(false)
        }
    }

    const saveCard = async () => {
        try{
            const { data } = await Instance.post('/stripe/addCreditCard', {
                paymentMethodId: paymentMethod.id
            })
            // if (!data) error message here
        } catch(err){
            console.log(err)
        }
        
    }
    
    const setupCometChat = async () => {
        const appId = process.env.REACT_APP_CHAT_APP_ID
        let cometChatSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('us').build();
        await CometChat.init(appId, cometChatSettings)
      }
    const registerCometChat = async (userObj) => {
        const newUser = new CometChat.User(userObj.id)
        newUser.setName(`${userObj.firstName} ${userObj.lastName}` )
        try{
            await CometChat.createUser(newUser, process.env.REACT_APP_CHAT_AUTH_KEY)
            await cometChatLogin(userObj)
        } catch(error) {
            console.log({error})
        }
    }

    const cometChatLogin = async (user) => {
        try{
            await CometChat.login(user.id, process.env.REACT_APP_CHAT_AUTH_KEY)
        } catch(error) {
            console.log({error})
        }
    }

    const getComplete = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '1em'}}/>
                <div className="LoginHeader">Account Created</div>
                <div className="LoginText">You have successfully created your Little Big Shed account and are now ready to start borrowing!</div>
                    <button className="LoginFormButton" onClick={() => history.push({pathname: '/user/account'})}>
                        Continue
                    </button>
                </div>
            </div>
        )
    }

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'Basic Details':
                return <BasicDetails context={FormContext} />
            case 'Verification':
                return <Verification context={FormContext} />
            case 'Bank Details':
                return <BankDetails context={FormContext} />
            case 'Location Details':
                return <LocationDetails context={FormContext} />
            case 'Availability':
                return <Availability context={FormContext} />
            case 'Terms & Conditions':
                return <TermsConditions context={FormContext} registerUser={registerUser} isRegisterLoading={isRegisterLoading} />
            case 'Complete!':
                return getComplete();
            default:
                return '';
        }
    }

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            <PageWrapper>
                <Banner textBold='Account Creation' textNormal={currentPage} />
                {renderCurrentPage()}
            </PageWrapper>
        </FormContext.Provider>
    )
}

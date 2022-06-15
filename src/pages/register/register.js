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
import getSuburb from '../../util/getSuburb';
import { useStripe } from '@stripe/react-stripe-js';
import registerReducer from '../../util/reducers/registerReducer';
import parseAddressComponent from '../../util/parseAddressComponent';

const FormContext = createContext()

export default function Register() {
    const [ isRegisterLoading, setIsRegisterLoading ] = useState(false)
    const globalDispatch = useGlobalState().dispatch
    const stripe = useStripe()
    const [ state, dispatch ] = useReducer(registerReducer, { 
        // currentPage: 'Basic Details',
        currentPage: 'Location Details',
        dateOfBirth: new Date(1990, 0, 1),
        isLenderUpgrade: false,
        firstName: '', 
        lastName: '', 
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsChecked: false,
        availability: Array(14).fill(0)
    })
    const { 
        firstName, lastName, email, phoneNumber, password, 
        address, currentPage, image, paymentMethod, 
        isLenderUpgrade, dateOfBirth, availability, accountNumber, BSB 
    } = state

    const history = useHistory()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [currentPage])

    const getUserDetails = () => {
        const userDetails = {
            email: email,
            firstName,
            lastName,
            avatar: image ? image.raw : '',
            mobile: phoneNumber,
            available: availability.join(''),
            password: password,
        }
        if(isLenderUpgrade){
            const suburb = getSuburb(address.address_components) 

            Object.assign(userDetails, {
                isLender: true,
                day: dateOfBirth.getDate(),
                month: dateOfBirth.getMonth() + 1,
                year: dateOfBirth.getFullYear(),
                bsb: BSB,
                account_number: accountNumber,
                lat: address.lat,
                lng: address.lng,
                // address:  parseAddressComponent(address?.address_components),
                address:  address.formatted_address.split(',')[0],
                line1: address.formatted_address.split(',')[0],
                suburb,
                country: address.address_components[5].short_name,
                state: address.address_components[4].short_name,
                city: address.address_components[3].long_name,
                postal_code: address.address_components[6].long_name,

            })
        }
        return userDetails
    }

    const registerUser = async () => {
        setIsRegisterLoading(true)
        await setupCometChat()
        const userDetails = getUserDetails()
        console.log({userDetails})

        const formData = new FormData()
        Object.keys(userDetails).forEach(key => {
            formData.append(key, userDetails[key])
        })
        try{
            const { data, status } = await Instance.post(isLenderUpgrade ? '/auth/lenderSignUp' : '/auth/signUp', formData)
            if(status === 201) {
                globalDispatch({ type: 'setUser', data: data.user})
                localStorage.setItem('token', data.token.accessToken)
                await saveCard()
                await registerCometChat(data.user)
                setIsRegisterLoading(false)
                dispatch({ type: 'setCurrentPage', data: 'Complete!'})
            }
        } catch(e) {
            setIsRegisterLoading(false)
            console.log(e.response)
            // history.push({pathname: '/login'})
            // alert("an error occurred during registration, please try again")
        }
    }

    const saveCard = async () => {
        try{
            await Instance.post('/stripe/addCreditCard', {
                paymentMethodId: paymentMethod.id
            })
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

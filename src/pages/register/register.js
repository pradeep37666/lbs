import React, { useState, useEffect, useReducer, createContext } from 'react';
import './Register.css';
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

const FormContext = createContext()

export default function Register() {
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const globalDispatch = useGlobalState().dispatch
    const stripe = useStripe()
    const [state, dispatch] = useReducer(registerReducer, { 
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
        availability: Array(14).fill(0)
    })
    const { firstName, lastName, email, phoneNumber, password, address, 
        confirmPassword, currentPage, image, paymentMethod, isLenderUpgrade, dateOfBirth, availability, accountNumber, BSB } = state

    const history = useHistory()

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
                day: dateOfBirth.getDate(),
                month: dateOfBirth.getMonth() + 1,
                year: dateOfBirth.getFullYear(),
                address:  address.formatted_address.split(',')[0],
                line1: address.formatted_address.split(',')[0],
                bsb: BSB,
                account_number: accountNumber,
                isLender: true,
                suburb,
                lat: address.lat,
                lng: address.lng,
                country: address.address_components[5].short_name,
                state: address.address_components[4].short_name,
                city:   address.address_components[3].long_name,
                postal_code: address.address_components[6].long_name,

            })
        }
        return userDetails
    }

    const registerUser = async () => {
        await setupCometChat()
        const userDetails = getUserDetails()
        console.log('address', address)
        console.log('details', userDetails)

        const formData = new FormData()
        Object.keys(userDetails).forEach(key => {
            formData.append(key, userDetails[key])
        })
        try{
            const { data, status } = await Instance.post(isLenderUpgrade ? '/auth/lenderSignUp' : '/auth/signUp', formData)
            console.log('response', data, status)
            if(status === 201) {
                globalDispatch({ type: 'setUser', data: data.user})
                localStorage.setItem('token', data.token.accessToken)
                await saveCard()
                await registerCometChat(data.user)
                dispatch({ type: 'setCurrentPage', data: 'Complete!'})
            }
        } catch(e) {
            console.log(e)
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
            console.log('saved card')
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
            console.log('successfully registered to comet chat', newUser)
            await cometChatLogin(userObj)
        } catch(e) {
            console.log('comet chat register error', e)
        }
        
    }

    const cometChatLogin = async (user) => {
        try{
            const User = await  CometChat.login(user.id, process.env.REACT_APP_CHAT_AUTH_KEY)
            console.log(User, 'logged into comet chat')
        } catch(e) {
            console.log('aaaaaa', e)
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

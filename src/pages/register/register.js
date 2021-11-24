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
import registerReducer from '../../util/registerReducer';

const FormContext = createContext()

export default function Register() {
    
    const { globalDispatch } = useGlobalState().dispatch
    const stripe = useStripe()
    const [state, dispatch] = useReducer(registerReducer, { 
        currentPage: 'Bank Details',
        dateOfBirth: new Date(1990, 0, 1)
    })
    const { firstName, lastName, email, phoneNumber, password, confirmPassword, currentPage, image, paymentMethod } = state


    const history = useHistory()


    // const getUserDetails = () => {
    //     let suburb
    //     address.address_components ? suburb = getSuburb(address.address_components) : suburb = ''

    //     const userDetails = {
    //         email: email,
    //         fullName: `${firstName} ${lastName}`,
    //         firstName,
    //         lastName,
    //         avatar: image ? image.raw : '',
    //         mobile: phoneNumber,
    //         address: address ? address.formatted_address.split(',')[0] : '',
    //         line1: address ? address.formatted_address.split(',')[0] : '',
    //         suburb: suburb,
    //         lat: address ? address.lat : 0,
    //         lng: address ? address.lng : 0,
    //         available: availability,
    //         password: password,
    //     }
    //     if(lender){
    //         Object.assign(userDetails, {
    //             day: dayOfBirth,
    //             month: monthOfBirth,
    //             year: yearOfBirth,
    //             firstName: firstName,
    //             lastName: lastName,
    //             country: address.address_components[5].short_name,
    //             state: address.address_components[4].short_name,
    //             city:   address.address_components[3].long_name,
    //             postal_code: address.address_components[6].long_name,

    //         })
    //     }
    //     return userDetails
    // }

    // const setupCometChat = async () => {
    //     const appId = process.env.REACT_APP_CHAT_APP_ID
    //     let cometChatSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('us').build();
    //     await CometChat.init(appId, cometChatSettings)
    //   }

    // const registerUser = async () => {
    //     await setupCometChat()
    //     const userDetails = getUserDetails()
    //     console.log('address', address)
    //     console.log('details', userDetails)

    //     const formData = new FormData()
    //     Object.keys(userDetails).forEach(key => {
    //         formData.append(key, userDetails[key])
    //     })
    //     try{
    //         const { data, status } = await Instance.post(lender ? '/auth/lenderSignUp' : '/auth/signUp', formData)
    //         console.log('response', data, status)
    //         if(status === 201) {
    //             globalDispatch({ type: 'setUser', data: data.user})
    //             localStorage.setItem('token', data.token.accessToken)
    //             await saveCard()
    //             await registerCometChat(data.user)

    //         }
    //     } catch(e) {
    //         console.log(e.response)
    //         // history.push({pathname: '/login'})
    //         alert("an error occurred during registration, please try again")
    //     }
        
    // }

    // const saveCard = async () => {
    //     try{
    //         await Instance.post('/stripe/addCreditCard', {
    //             paymentMethodId: paymentMethod.id
    //         })
    //         console.log('saved card')
    //     } catch(err){
    //         console.log(err)
    //     }
        
    // }
    
    // const registerCometChat = async (userObj) => {
    //     const newUser = new CometChat.User(userObj.id)
    //     newUser.setName(userObj.fullName)
    //     try{
    //         await CometChat.createUser(newUser, process.env.REACT_APP_CHAT_AUTH_KEY)
    //         console.log('successfully registered to comet chat', newUser)
    //         await cometChatLogin(userObj)
    //     } catch(e) {
    //         console.log('comet chat register error', e)
    //     }
        
    // }

    // const cometChatLogin = async (user) => {
    //     try{
    //         const User = await  CometChat.login(user.id, process.env.REACT_APP_CHAT_AUTH_KEY)
    //         console.log(User, 'logged into comet chat')
    //     } catch(e) {
    //         console.log('aaaaaa', e)
    //     }
    // }


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
                return <TermsConditions context={FormContext} />
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

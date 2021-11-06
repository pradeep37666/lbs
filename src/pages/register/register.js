import React, { useState, useEffect } from 'react';
import './register.css';
import PageWrapper from "./../../components/pageWrapper/pageWrapper.js";
import Banner from "./../../components/bannerText/bannerText.js";
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

export default function Register() {
    const { dispatch } = useGlobalState()
    const stripe = useStripe()
    const [fullName, setFullName] = useState("")
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [lender, setLender] = useState(false)
    const [image, setImage] = useState()
   

    const [paymentMethod, setPaymentMethod] = useState()

    const [accNumber, setAccNumber] = useState("")
    const [bsb, setBsb] = useState("")

    const [dayOfBirth, setDayOfBirth] = useState()

    const [monthOfBirth, setMonthOfBirth] = useState()
    const [yearOfBirth, setYearOfBirth] = useState()

    const [address, setAddress] = useState("")

    const [availability, setAvailability] = useState('00000000000000')

    const [tc, setTC] = useState(false)

    const [page, setPage] = useState('Basic Details')
    // 'Basic Details'

    const [validated, setValidated] = useState(false)

    const history = useHistory()

    const handleNextPage = (newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
    }

    const getUserDetails = () => {
        let suburb
        address.address_components ? suburb = getSuburb(address.address_components) : suburb = ''

        const userDetails = {
            email: email,
            fullName: `${firstName} ${lastName}`,
            avatar: image ? image.raw : '',
            mobile: phoneNumber,
            address: address ? address.formatted_address.split(',')[0] : '',
            line1: address ? address.formatted_address.split(',')[0] : '',
            suburb: suburb,
            lat: address ? address.lat : 0,
            lng: address ? address.lng : 0,
            bsb: bsb ? bsb : '',
            account_number: accNumber ? accNumber + '' : '',
            available: availability,
            password: password,
        }
        if(lender){
            Object.assign(userDetails, {
                day: dayOfBirth,
                month: monthOfBirth,
                year: yearOfBirth,
                firstName: firstName,
                lastName: lastName,
                country: address.address_components[5].short_name,
                state: address.address_components[4].short_name,
                city:   address.address_components[3].long_name,
                postal_code: address.address_components[6].long_name,

            })
        }
        return userDetails
    }

    const setupCometChat = async () => {
        const appId = process.env.REACT_APP_CHAT_APP_ID
        let cometChatSettings = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('us').build();
        await CometChat.init(appId, cometChatSettings)
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
            // const { data, status } = await Instance.post('/auth/signUp', formData)
            const { data, status } = await Instance.post(lender ? '/auth/lenderSignUp' : '/auth/signUp', formData)
            console.log('response', data, status)
            if(status === 201) {
                dispatch({ type: 'setUser', data: data.user})
                localStorage.setItem('token', data.token.accessToken)
                // await createStripeCustomer()
                await saveCard()
                await registerCometChat(data.user)
                handleNextPage('Complete!')
            }
        } catch(e) {
            console.log(e.response)
            // history.push({pathname: '/login'})
            alert("an error occurred during registration, please try again")
        }
        
    }
    
    const createStripeCustomer = async () => {
        try{
            await Instance.get('/stripe/createCustomer')
        } catch(err) {
            console.log(err)
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
    
    const registerCometChat = async (userObj) => {
        const newUser = new CometChat.User(userObj.id)
        newUser.setName(userObj.fullName)
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

    useEffect(() => {
        switch (page) {
            case 'Basic Details':
                if (firstName && lastName && email && phoneNumber && password && password === confirmPassword) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Verification':
                break
            case 'Bank Details':
                if(lender){
                    console.log('in')
                    if(dayOfBirth && monthOfBirth && yearOfBirth && accNumber && bsb){
                        setValidated(true)
                    } else {
                        setValidated(false)
                    }
                }
                break
            case 'Location Details':
                if (address) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Availability':
                if (availability !== '00000000000000') {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Terms & Conditions':
                if (tc) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Complete!':
                break
            default:
                return '';
        }
    }, [page, firstName, lastName, email, phoneNumber, password, confirmPassword, dayOfBirth, monthOfBirth, yearOfBirth, accNumber, bsb,  lender, address, , availability, tc])
    // city, country, state

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

    const renderSwitch = () => {
        switch (page) {
            case 'Basic Details':
                return <BasicDetails 
                validated={validated}
                handleNextPage={handleNextPage}
                setFullName={setFullName}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setEmail={setEmail}
                setPhoneNumber={setPhoneNumber}
                setPassword={setPassword}
                password={password}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                setLender={setLender}
                setValidated={setValidated}
                image={image}
                setImage={setImage}
                />
            case 'Verification':
                return <Verification 
                validated={validated}
                handleNextPage={handleNextPage}
                setValidated={setValidated}
                />
            case 'Bank Details':
                return <BankDetails 
                validated={validated}
                handleNextPage={handleNextPage}
                lender={lender}
                setPaymentMethod={setPaymentMethod}
                setAccNumber={setAccNumber}
                setBsb={setBsb}
                dayOfBirth={dayOfBirth}
                monthOfBirth={monthOfBirth}
                yearOfBirth={yearOfBirth}
                setDayOfBirth={setDayOfBirth}
                setMonthOfBirth={setMonthOfBirth}
                setYearOfBirth={setYearOfBirth}
                setValidated={setValidated}
                isUpgrade={false}
                />
            case 'Location Details':
                return <LocationDetails 
                validated={validated}
                handleNextPage={handleNextPage}
                setAddress={setAddress}
                />
            case 'Availability':
                return <Availability 
                validated={validated}
                handleNextPage={handleNextPage}
                setAvailability={setAvailability}
                />
            case 'Terms & Conditions':
                return <TermsConditions 
                validated={validated}
                handleNextPage={handleNextPage}
                setTC={setTC}
                tc={tc}
                registerUser={registerUser}
                />
            case 'Complete!':
                return getComplete();
            default:
                return '';
        }
    }

    return (
        <PageWrapper>
            <Banner textBold='Account Creation' textNormal={page} />

            {renderSwitch()}
            
        </PageWrapper>
    )
}

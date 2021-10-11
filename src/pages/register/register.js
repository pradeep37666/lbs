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


export default function Register() {
    const { dispatch } = useGlobalState()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [lender, setLender] = useState(false)
    const [image, setImage] = useState()

    const [paymentMethod, setPaymentMethod] = useState()

    const [accNumber, setAccNumber] = useState("")
    const [bsb, setBsb] = useState("")
    
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")

    const [availability, setAvailability] = useState('00000000000000')

    const [tc, setTC] = useState(false)

    const [page, setPage] = useState('Basic Details')

    const [validated, setValidated] = useState(false)

    const history = useHistory()

    const handleNextPage = (newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
    }
    useEffect(() => {
        console.log(image, 'image')
    }, [image])

    const registerUser = async () => {
        const userDetails = {
                fullName: fullName,
                email: email,
                avatar: image ? image.raw : null,
                mobile: phoneNumber,
                address: address,
                city: city,
                country: country,
                state: state,
                bsb: bsb,
                account_number: accNumber,
                available: availability,
                password: password,
            }
        const formData = new FormData()
        Object.keys(userDetails).forEach(key => {
            formData.append(key, userDetails[key])
        })
        // if(image){
        //     formData.append('avatar', image.raw)
        // }
        try{
            const { data, status } = await Instance.post('/auth/signUp', formData)
            if(status === 201) {
                dispatch({ type: 'setUser', data: data.user})
                localStorage.setItem('token', data.token.accessToken)
                await createStripeCustomer()
                await registerCometChat(data.user)
            }
        } catch(e) {
            console.log(e.response.data)
            history.push({pathname: '/login'})
            alert("an error occurred during registration, please try again")
        }
        
    }

    const createStripeCustomer = async () => {
        const { data, status } = await Instance.get('/stripe/createCustomer')
        console.log('create stripe customer', data, status)
    }
    const registerCometChat = async (userObj) => {
        console.log('in comet chat', userObj)
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
            console.log(e)
        }
    }

    useEffect(() => {
        switch (page) {
            case 'Basic Details':
                if (fullName && email && phoneNumber && password && password === confirmPassword) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Verification':
                break
            case 'Bank Details':
                // if (!lender) {
                //     if (cardName && cardNumber && expiry && ccv) {
                //         setValidated(true)
                //     } else setValidated(false)
                // } else {
                //     if (cardName && cardNumber && expiry && ccv && accNumber && bsb) {
                //         setValidated(true)
                //     } else setValidated(false)
                // }
                break
            case 'Location Details':
                if (address && city && country && state) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Availability':
                console.log(availability)
                if (availability !== '00000000000000') {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Terms & Conditions':
                console.log(email, fullName, profilePicture, phoneNumber, address, city, country, state, bsb, accNumber, availability, password)
                if (tc) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Complete!':
                break
            default:
                return '';
        }
    }, [page, fullName, email, phoneNumber, password, confirmPassword,  accNumber, bsb,  lender, address, city, country, state, availability, tc])

    const getComplete = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '1em'}}/>

                <div className="LoginHeader">Account Created</div>
                <div className="LoginText">You have successfully created your Little Big Shed account and are now ready to start borrowing!</div>

                <button className="LoginFormButton" onClick={() => history.push({pathname: '/user/account'})}>Continue</button>

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
                setValidated={setValidated}
                isUpgrade={false}
                />
            case 'Location Details':
                return <LocationDetails 
                validated={validated}
                handleNextPage={handleNextPage}
                setAddress={setAddress}
                setCity={setCity}
                setCountry={setCountry}
                setState={setState}
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

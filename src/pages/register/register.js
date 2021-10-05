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

export default function Register() {
    const { dispatch } = useGlobalState()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [lender, setLender] = useState(false)
    const [image, setImage] = useState()

    // Stripe details
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [ccv, setCcv] = useState("")

    const [accNumber, setAccNumber] = useState("")
    const [bsb, setBsb] = useState("")
    
    const [address, setAddress] = useState("")

    const [availability, setAvailability] = useState('00000000000000')

    const [tc, setTC] = useState(false)

    const [page, setPage] = useState('Basic Details')

    const [validated, setValidated] = useState(false)

    const history = useHistory()

    const handleNextPage = (newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
    }

    const registerUser = async () => {
        const userDetails = {
            fullName: fullName,
            email: email,
            avatar: image ? image.raw : '',
            mobile: phoneNumber,
            address: address ? address.description : '',
            suburb: address.terms ? getSuburb(address.terms) : '',
            lat: address ? address.lat : 0,
            lng: address ? address.lng : 0,
            bsb: bsb ? bsb : '',
            account_number: accNumber ? accNumber : '',
            available: availability,
            password: password,
        }
        const formData = new FormData()
        Object.keys(userDetails).forEach(key => {
            formData.append(key, userDetails[key])
        })
        
        try {
            const response = await Instance.post('/auth/signUp', formData)
            console.log(response)
            if(response.status === 201) {
                dispatch({ type: 'setUser', data: response.data.user})
                registerCometChat(response.data.user)
                localStorage.setItem('token', response.data.token.accessToken)
            }
        } catch(e) {
            console.log(e.response)
            history.push({pathname: '/login'})
            alert("an error occurred during registration, please try again")
        }
        
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
                if (!lender) {
                    if (cardName && cardNumber && expiry && ccv) {
                        setValidated(true)
                    } else setValidated(false)
                } else {
                    if (cardName && cardNumber && expiry && ccv && accNumber && bsb) {
                        setValidated(true)
                    } else setValidated(false)
                }
                break
            case 'Location Details':
                if (address) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Availability':
                console.log(getSuburb(address.terms))
                console.log(address)
                if (availability !== '00000000000000') {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Terms & Conditions':
                console.log(address)
                if (tc) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Complete!':
                break
            default:
                return '';
        }
    }, [page, fullName, email, phoneNumber, password, confirmPassword, cardName, cardNumber, expiry, ccv, accNumber, bsb,  lender, address, availability, tc])

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
                setCardName={setCardName}
                setCardNumber={setCardNumber}
                setExpiry={setExpiry}
                setCcv={setCcv}
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

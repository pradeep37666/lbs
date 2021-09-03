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


export default function Register() {
    const { dispatch } = useGlobalState()

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [profilePicture, setProfilePicture] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [lender, setLender] = useState(false)

    // Stripe details
    const [cardName, setCardName] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [ccv, setCcv] = useState("")

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

    const registerUser = () => {
        Instance.post('/auth/signUp', {
            fullName: fullName,
            email: email,
            avatar: profilePicture,
            mobile: phoneNumber,
            address: address,
            city: city,
            country: country,
            state: state,
            bsb: bsb,
            account_number: accNumber,
            available: availability,
            password: password,
        })
        .then((response) => {
            console.log(response.data)
            console.log(response.data.user)
            console.log(response.data.token)
            if (response.status === 201) {
                dispatch({ type: 'setUser', data: response.data.user})
                localStorage.setItem('token', response.data.token.accessToken)
            } else {
                alert("an error occurred during registration, please try again")
                history.push({pathname: '/login'})
            }
        })
        .catch((error) => {
            console.log(error)
            history.push({pathname: '/login'})
            alert("an error occurred during registration, please try again")
        })
    }

    // const registerCometChat = (user) => {
    //     const user = new CometChat.User(user.id)
    //     user.setName(user.fullName)
    //     CometChat.createUser(user, process.env.REACT_APP_CHAT_AUTH_KEY)
    //     .then(user => console.log("created comet chat user", user))
    //     .catch(err => console.log(err))
    // }

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
    }, [page, fullName, email, phoneNumber, password, confirmPassword, cardName, cardNumber, expiry, ccv, accNumber, bsb,  lender, address, city, country, state, availability, tc])

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

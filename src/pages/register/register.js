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
import { LoginUser, LogoutUser } from '../../util/UserStore';
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

    const [mondayM, setMondayM] = useState(null)
    const [mondayA, setMondayA] = useState(null)
    const [tuesdayM, setTuesdayM] = useState(null)
    const [tuesdayA, setTuesdayA] = useState(null)
    const [wednesdayM, setWednesdayM] = useState(null)
    const [wednesdayA, setWednesdayA] = useState(null)
    const [thursdayM, setThursdayM] = useState(null)
    const [thursdayA, setThursdayA] = useState(null)
    const [fridayM, setFridayM] = useState(null)
    const [fridayA, setFridayA] = useState(null)
    const [saturdayM, setSaturdayM] = useState(null)
    const [saturdayA, setSaturdayA] = useState(null)
    const [sundayM, setSundayM] = useState(null)
    const [sundayA, setSundayA] = useState(null)

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
            email: email,
            password: password,
            mobile: phoneNumber,
            avatar: profilePicture,
            fullName: fullName,
            address: address,
            city: city,
            country: country,
            state: state,
            monday_am: mondayM,
            monday_pm: mondayA,
            tuesday_am: tuesdayM,
            tuesday_pm: tuesdayA,
            wednesday_am: wednesdayM,
            wednesday_pm: wednesdayA,
            thursday_am: thursdayM,
            thursday_pm: thursdayA,
            friday_am: fridayM,
            friday_pm: fridayA,
            saturday_am: saturdayM,
            saturday_pm: saturdayA,
            sunday_am: sundayM,
            sunday_pm: sundayA,
            bsb: bsb,
            account_number: accNumber,
        })
        .then((response) => {
            console.log(response.data)
            console.log(response.data.user)
            console.log(response.data.token)
            if (response.status === 201) {
                dispatch({ type: 'setUser', data: response.data.user})
            } else {
                LogoutUser()
                alert("an error occurred during registration, please try again")
                history.push({pathname: '/login'})
            }
        })
        .catch((error) => {
            history.push({pathname: '/login'})
            alert("an error occurred during registration, please try again")
        })
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
                if (address && city && country && state) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Availability':
                if (mondayM || mondayA || tuesdayM || tuesdayA || wednesdayM || wednesdayA || thursdayM || thursdayA || 
                    fridayM || fridayA || saturdayM || saturdayA || sundayM || sundayA) {
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
    }, [page, fullName, email, phoneNumber, password, confirmPassword, cardName, cardNumber, expiry, ccv, accNumber, bsb,  lender, address, city, country, state, mondayM, mondayA, tuesdayM, tuesdayA, wednesdayM, wednesdayA, thursdayM, thursdayA, fridayM, fridayA, saturdayM, saturdayA, sundayM, sundayA, tc])

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
                setMondayM={setMondayM}
                setMondayA={setMondayA}
                mondayM={mondayM}
                mondayA={mondayA}
                setTuesdayM={setTuesdayM}
                setTuesdayA={setTuesdayA}
                tuesdayM={tuesdayM}
                tuesdayA={tuesdayA}
                setWednesdayM={setWednesdayM}
                setWednesdayA={setWednesdayA}
                wednesdayM={wednesdayM}
                wednesdayA={wednesdayA}
                setThursdayM={setThursdayM}
                setThursdayA={setThursdayA}
                thursdayM={thursdayM}
                thursdayA={thursdayA}
                setFridayM={setFridayM}
                setFridayA={setFridayA}
                fridayM={fridayM}
                fridayA={fridayA}
                setSaturdayM={setSaturdayM}
                setSaturdayA={setSaturdayA}
                saturdayM={saturdayM}
                saturdayA={saturdayA}
                setSundayM={setSundayM}
                setSundayA={setSundayA}
                sundayM={sundayM}
                sundayA={sundayA}
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

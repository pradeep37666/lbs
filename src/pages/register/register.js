import React, { useState, useEffect } from 'react';
import './register.css';
import PageWrapper from "./../../components/pageWrapper/pageWrapper.js";
import Banner from "./../../components/bannerText/bannerText.js";
import LenderSwitch from './../../components/becomeLenderSwitch/becomeLenderSwitch.js';
import ProductSlots from '../../components/productSlots/productSlots';
import BasicDetails from '../../components/FormComponents/BasicDetails';
import Verification from '../../components/FormComponents/Verification';
import BankDetails from '../../components/FormComponents/BankDetails';
import TC from '../../components/tcSection/tcSection';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import {ReactComponent as CameraIcon} from './../../assets/Icons/CameraIcon.svg';
import {ReactComponent as ShowPassword} from './../../assets/Icons/ShowPassword.svg';


export default function Register() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [lender, setLender] = useState(false);

    // Stripe details?
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [ccv, setCcv] = useState("");

    const [accNumber, setAccNumber] = useState("");
    const [bsb, setBsb] = useState("");

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");

    // const [mondayM, setMondayM] = useState();
    // const [mondayA, setMondayA] = useState();
    // const [tuesdayM, setTuesdayM] = useState();
    // const [tuesdayA, setTuesdayA] = useState();
    // const [wednesdayM, setWednesdayM] = useState();
    // const [wednesdayA, setWednesdayA] = useState();
    // const [thursdayM, setThursdayM] = useState();
    // const [thursdayA, setThursdayA] = useState();
    // const [fridayM, setFridayM] = useState();
    // const [fridayA, setFridayA] = useState();
    // const [saturdayM, setSaturdayM] = useState();
    // const [saturdayA, setSaturdayA] = useState();
    // const [sundayM, setSundayM] = useState();
    // const [sundayA, setSundayA] = useState();

    const [tc, setTC] = useState(false);

    const [page, setPage] = useState('Basic Details');

    const [validated, setValidated] = useState(false);

    const handleNextPage = (newPage) => {
        setPage(newPage);
        window.scrollTo(0, 0);
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
                break
            case 'Availability':
                break
            case 'Terms & Conditions':
                break
            case 'Complete!':
                break
            default:
                return '';
        }
    }, [fullName, email, phoneNumber, password, confirmPassword, cardName, cardNumber, expiry, ccv, accNumber, bsb])

    const getLocationDetails = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader">Shed Location</div>
                <div className="LoginText">If you would like to share your shed with users, Little big shed will need to know your location in order for borrowers to find you.</div>
                <div className="LoginText">You can skip this step and create an account just for borrowing use and update later.</div>

                <div className="LoginHeader" style={{marginBottom: '0'}}>Address</div>
                <input type='text' placeholder='43 Brandon Road Runcorn' className="LoginInput" />
                <div className="LoginHeader" style={{marginBottom: '0'}}>City</div>
                <input type='text' placeholder='Brisbane' className="LoginInput" />
                <div className="LoginHeader" style={{marginBottom: '0'}}>Country</div>
                <input type='text' placeholder='Australia' className="LoginInput" />
                <div className="LoginHeader" style={{marginBottom: '0'}}>State</div>
                <input type='text' placeholder='Qld' className="LoginInput" />

                <button className="LoginFormButton" onClick={() => handleNextPage('Availability')}>Next</button>
                {/* ^ will have verification on V go to next step and clear any state set in above inputs */}
                <button className="LoginFormButton LoginFormButtonInverted" onClick={() => handleNextPage('Availability')} style={{marginTop: '1em'}}>Skip This Step</button>

                </div>
            </div>
        )
    }

    const getAvailability = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader">General Product Availability</div>
                <div className="LoginText LoginTextSmall">Little big shed lets you have control over the days you want to lend out your products.</div>
                <div className="LoginText LoginTextSmall">Select the days and enter the times you are available for trades.</div>

                <ProductSlots />
                <div className="SkipNextButtonFlex">
                    <button className="LoginFormButton LoginFormButtonInverted" onClick={() => handleNextPage('Terms & Conditions')} style={{marginRight: '.5em'}}>Skip Step</button>
                    <button className="LoginFormButton" onClick={() => handleNextPage('Terms & Conditions')} style={{marginLeft: '.5em'}}>Next</button>
                </div>

                </div>
            </div>
        )
    }

    const getTC = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '1em'}}/>

                <div className="LoginHeader">Terms {'&'} Conditions</div>
                <div className="LoginText">Little big shed has outlined its terms and conditions below to help not only protect little big shed from fraudulent activity, but protect its users as well.</div>

                <TC setTC={setTC}/>
            {/* This is where we will submit all the form data, if user successfully registered takes us to the complete page */}
                <button className={`LoginFormButton ${tc ? '' : 'ButtonDisabled'}`} disabled={tc ? false : true} onClick={() => handleNextPage('Complete!')}>Next</button> 
                </div>
            </div>
        )
    }

    const getComplete = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '1em'}}/>

                <div className="LoginHeader">Account Created</div>
                <div className="LoginText">You have successfully created your Little Big Shed account and are now ready to start borrowing!</div>

                <button className="LoginFormButton">Continue</button>

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
                />
            case 'Location Details':
                return getLocationDetails();
            case 'Availability':
                return getAvailability();
            case 'Terms & Conditions':
                return getTC();
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

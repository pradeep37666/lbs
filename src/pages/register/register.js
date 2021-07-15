import React, { useState } from 'react';
import './register.css';
import PageWrapper from "./../../components/pageWrapper/pageWrapper.js";
import Banner from "./../../components/bannerText/bannerText.js";
import LenderSwitch from './../../components/becomeLenderSwitch/becomeLenderSwitch.js';
import ProductSlots from '../../components/productSlots/productSlots';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import {ReactComponent as CameraIcon} from './../../assets/Icons/CameraIcon.svg';
import {ReactComponent as ShowPassword} from './../../assets/Icons/ShowPassword.svg';


export default function Register() {

    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState();
    const [lender, setLender] = useState(false);
    const [page, setPage] = useState('Basic Details');
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleNextPage = (newPage, textN) => {
        setPage(newPage);
        window.scrollTo(0, 0);
    }

    const getBasicDetails = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">

                    <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                    <div className="LoginHeader">Basic Details</div>
                    <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>


                    <div className="LoginHeader">Full Name</div>
                    <input type='text' placeholder='Jane Doe' className="LoginInput" value={fullName} onChange={(e) => setFullName(e.target.value)}/>

                    <div className="LoginHeader">Email</div>
                    <input type='text' placeholder='Jane Doe' className="LoginInput" value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <div className="LoginHeader">Phone Number</div>
                    <input type='text' placeholder='+61456789012' className="LoginInput" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>

                    <div className="LoginHeader">Profile Picture</div>
                    {/* upload picture */}
                    <div className="ProfilePictureFlex">
                        <div className="ProfilePictureCircle"><CameraIcon className="CameraIcon"/></div>
                    <button className="LoginFormButton UploadButton">Upload</button>

                    </div>


                    </div>

                    <div className="LoginMain LoginMainNoMarg">
                    <div className="LoginHeader">Password</div>
                    <div className="LoginText">Create a secure password including: at least 8 characters, 2 numbers and a special character.</div>

                    <div className="LoginHeader">Password</div>
                    <div className="PasswordInputContainer">
                        <input type={showPassword ? 'text' : 'password'} placeholder='Jane Doe' className="LoginInput" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <ShowPassword className="ShowPasswordIcon" onClick={() => setShowPassword(!showPassword)}/>
                    </div>
                    

                    <div className="LoginHeader">Confirm Password</div>
                    <div className="PasswordInputContainer">
                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder='+61456789012' className="LoginInput" />
                        <ShowPassword className="ShowPasswordIcon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}/>
                    </div>
                    </div>

                    <div className="LoginMain LoginMainNoMarg">
                    <div className="BecomeLenderFlex">
                        <div className="LoginHeader" style={{width: 'auto'}}>Become Lender</div>
                        <div className="LenderSwitchInfoFlex">
                        <LenderSwitch setLender={setLender}/>
                        <ShowPassword />
                        </div>
                    </div>
                    <div className="LoginText">If you would like to share items on Little Big Shed we need some extra details off you.</div>
                    <div className="LoginText">These details allow us to send you payments for successful lends and help borrowers find your items</div>

                    <button className="LoginFormButton" onClick={() => handleNextPage('Verification')}>Next</button>
                    </div>
            </div>
        );
    }

    const getVerification = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader">Verify Your Identity</div>
                <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>

                <div className="LoginHeader">Verification Code</div>
                <input type='text' placeholder='12345678' className="LoginInput" />

                <button className="LoginFormButton" onClick={() => handleNextPage('Bank Details')}>Next</button>
                </div>
            </div>
        )
    }

    const getBankDetails = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader">Payment Details</div>
                <div className="LoginText">If you would like to share your shed with users, Little big shed will need to know your payment and banking details to allow you to send and receive money for Little Big Shed trades.
                </div>

                <div className="LoginText">However if you only want to borrow items from other users, we will only need your card details.</div>

                </div>

                <div className="LoginMain LoginMainNoMarg">
                <div className="LoginHeader">Card Details</div>
                <div className="LoginText">We need these details to make a successful trade between 2 parties.</div>

                <div className="LoginHeader" style={{marginBottom: '0'}}>Name on Card</div>
                <input type='text' placeholder='12345678' className="LoginInput" />

                <div className="LoginHeader" style={{marginBottom: '0'}}>Number on Card</div>
                <input type='text' placeholder='1234 5678 9010 1112' className="LoginInput" />

                <div className="ExpiryCCVFlex">
                    <div className="LoginHeader">Expiry</div>
                    <div className="LoginHeader">CCV</div>
                </div>

                <div className="ExpiryCCVFlex">
                    <input type='text' placeholder='MM/YY' className="LoginInput" style={{marginRight: '.5em'}} />
                    <input type='text' placeholder='000' className="LoginInput" />
                </div>
                {!lender ?
                <button className="LoginFormButton" onClick={() => handleNextPage('Terms & Conditions')}>Next</button>
                : ''
                }
                </div>

                {lender ?
                <div className="LoginMain LoginMainNoMarg">

                <div className="LoginHeader">Bank Deposit Details</div>
                <div className="LoginText">Bank details will allow you to upgrade to a lender account.</div>

                <div className="LoginHeader" style={{marginBottom: '0'}}>Account Number</div>
                <input type='text' placeholder='1234 5678' className="LoginInput" />

                <div className="LoginHeader" style={{marginBottom: '0'}}>BSB</div>
                <input type='text' placeholder='123-456' className="LoginInput" />
                <button className="LoginFormButton" onClick={() => handleNextPage('Location Details')}>Next</button>
                </div>
                : ''
                }

            </div>
        )
    }

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
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader" style={{marginBottom: '0'}}>Terms {'&'} Conditions</div>
                <div className="LoginText">Little big shed has outlined its terms and conditions below to help not only protect little big shed from fraudulent activity, but protect its users as well.</div>

                <div className="TCScrollDiv">
                    Voluptate cillum dolore veniam ullamco sunt sunt. Enim exercitation enim nostrud in dolore anim elit in ea veniam aliquip qui nostrud. Dolore veniam commodo do excepteur anim fugiat consequat consectetur. Eiusmod non aute aliqua quis nisi magna ut nostrud commodo eu nostrud aliqua labore exercitation. Et labore quis Lorem aliquip sint proident duis ea. Ipsum non duis irure dolore ullamco ut officia esse ad exercitation amet eiusmod velit quis. Excepteur non minim ipsum eiusmod elit occaecat ad consequat dolore enim ut ea veniam.

Elit esse laborum enim non ex ex officia ex mollit eiusmod. Excepteur cupidatat proident culpa sunt esse eiusmod excepteur nostrud eiusmod duis. Excepteur et non nisi dolor non dolore velit non consectetur.

Fugiat velit veniam anim proident do consectetur laborum. Esse labore est cupidatat officia. Dolore dolor id ut pariatur culpa occaecat eu. Anim laborum sit velit cillum irure ea eiusmod nisi. Velit minim veniam qui commodo et aliquip elit ad cupidatat sunt. Dolor exercitation nostrud mollit velit laboris amet reprehenderit officia reprehenderit. Eu pariatur laboris adipisicing ipsum consectetur qui ea cupidatat veniam ipsum.

Pariatur non occaecat ex incididunt dolore proident consequat ea exercitation. Occaecat dolor voluptate duis qui deserunt in dolor nulla ut. Nulla id aliqua occaecat proident occaecat reprehenderit ut laborum ad duis.

Quis nulla sunt non irure. Deserunt in sit qui consequat id aliqua et. Consectetur est nisi nisi sit ullamco proident incididunt et excepteur ex excepteur sit sit Lorem. Et adipisicing labore nulla anim est reprehenderit quis.

Anim cillum aliqua consectetur cillum duis aliqua excepteur culpa id labore tempor qui proident. Consequat aute id quis quis ea elit sit labore duis officia. Voluptate nostrud enim incididunt in Lorem reprehenderit aliquip. Consectetur proident est elit adipisicing commodo non enim eu excepteur ea.

Nulla velit et aliqua incididunt ea incididunt. Enim laborum dolor incididunt veniam sit Lorem fugiat pariatur sint. Dolore aute laborum minim commodo exercitation aliquip do irure ipsum nostrud pariatur fugiat.

Sint aliquip est labore dolore nulla nisi nulla proident dolor qui esse occaecat magna anim. Labore incididunt dolor laboris magna fugiat. Est irure duis dolor tempor id veniam id commodo anim amet.
                </div>

                <input type="checkbox" /> Accepts Terms and Conditions Labore veniam ea nostrud officia non irure enim nisi excepteur id amet.
                <button className="LoginFormButton" onClick={() => handleNextPage('Complete!')}>Next</button>

                </div>
            </div>
        )
    }

    const getComplete = () => {
        return (
            <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader" style={{marginBottom: '0'}}>Account Created</div>
                <div className="LoginText">You have successfully created your Little Big Shed account and are now ready to start borrowing!</div>

                <button className="LoginFormButton">Continue</button>

                </div>
            </div>
        )
    }

    const renderSwitch = () => {
        switch (page) {
            case 'Basic Details':
                return getBasicDetails();
            case 'Verification':
                return getVerification();
            case 'Bank Details':
                return getBankDetails();
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

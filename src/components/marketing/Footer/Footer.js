import React, { useState } from 'react'
import './Footer.css'
import Logo from '../../../assets/Logos/LBS_Logo_Flat_Red.jpg'
import AppleButton from '../../../assets/Images/AppStoreButton.png'
import GooglePlayButton from '../../../assets/Images/GooglePlayButton.png'
import { useHistory } from 'react-router-dom'
import { BsFacebook, BsTwitter } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import { EmailArrowBtn, LBSBlackLogo } from '../../../assets/Images/Marketings/Marketings'

const Footer = () => {
    const [ email, setEmail ] = useState('')
    const history = useHistory()

    const sendSubscribeEmail = () => {
        // send email
    }

    return (
        <div className='footer_container'>
            <div className='footer_header_container'>
                <div className='footer_header_left_section'>
                    <img src={Logo} alt='logo' className='footer_header_logo'/>
                    <div className='footer_header_title_box'>
                        <p className='footer_header_main_title'>
                        Little Big Shed in your pocket!
                        </p>
                        <p className='footer_header_sub_title'>
                        Download our mobile app to borrow and lend, where ever you are!
                        </p>
                    </div>
                </div>
                <div className='footer_header_right_section'>
                    <img src={AppleButton} alt='Apple Store' className="app_button" />
                    <img src={GooglePlayButton} alt='Google Play' className="app_button google_button" />
                </div>
            </div>

            <div className='footer_content_container'>
                <div className='footer_content_box'>
                    <img src={LBSBlackLogo} alt='lbs footer logo' className='footer_middle_logo'/>
                    <p className='footer_first_title'>
                    Share stuff, do good
                    </p>
                    <p className='footer_first_desc'>
                    Buy less, lend and borrow more. Unlock the power of sharing to make, mend, learn and care for your place and our planet together.
                    </p>
                </div>
                <div className='footer_content_box'>
                    <p 
                        className='footer_section_title_main'
                        onClick={() => history.push('/about_us')}    
                    >
                        About Us
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('contact_us')}
                    >
                        Contact Us
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Rental Agreement
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Privacy Policy
                    </p>
                </div>
                <div className='footer_content_box'>
                    <p 
                        className='footer_section_title_main'
                        onClick={() => history.push('/how_it_works')}    
                    >
                        How It Works
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/blog')}
                    >
                        Blog
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/protection')}
                    >
                        Lender Protection
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/faqs')}
                    >
                        Guides &amp; FAQ’s
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/login')}
                    >
                        Sign Up / Login
                    </p>
                </div>
                <div className='footer_content_box'>
                    <p 
                        className='footer_section_title_main'
                        onClick={() => history.push('/')}    
                    >
                        Top Categories
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Tools
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Gardening
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Partyware
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Hobbies
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Applicances
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Browse All
                    </p>
                </div>
                <div className='footer_content_box'>
                    <p className='footer_last_title'>
                    Stay Connected
                    </p>
                    <p className='footer_last_desc'>
                    Subscribe to the Little Big Shed newsletter to keep up to date with our sharing news and new item listings!
                    </p>
                    <div className='subscribe_email_container'>
                        <input 
                            className='subscribe_email_input'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button 
                            className='subscribe_button'
                            onClick={sendSubscribeEmail}
                        >
                            <img 
                                src={EmailArrowBtn} 
                                alt='email button'
                                className='email_arrow_icon'
                            />
                        </button>
                    </div>
                    <p className='footer_last_title margin_top'>
                    Get Social
                    </p>
                    <div className='flex_box'>
                        <BsFacebook className='social_media_icons'/>
                        <FiInstagram className='social_media_icons'/>
                        <BsTwitter className='social_media_icons'/>
                    </div>
                </div>
            </div>
            <div className='footer_bottom_container'>
                <p className='footer_bottom_left'>
                Support Team
                </p>
                <p className='footer_bottom_right'>
                Copyright 2020 Little big shed
                </p>
            </div>
        </div>
    )
}

export default Footer
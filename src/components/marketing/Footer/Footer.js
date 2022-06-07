import React from 'react'
import './Footer.css'
import Logo from '../../../assets/Logos/LBS_Logo_Flat_Red.jpg'
import AppleButton from '../../../assets/Images/AppStoreButton.png'
import GoogleButton from '../../../assets/Images/GooglePlayBorder.png'
import { useHistory } from 'react-router-dom'

const Footer = () => {
    const history = useHistory()
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
                    <img src={GoogleButton} alt='Google Play' className="app_button google_button" />
                </div>
            </div>

            <div className='footer_content_container'>
                <div className='footer_content_box'>

                </div>
                <div className='footer_content_box'>
                    <p 
                        className='footer_section_title_main'
                        onClick={() => history.push('/')}    
                    >
                        About Us
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
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
                        onClick={() => history.push('/')}    
                    >
                        How It Works
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Blog
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Lender Protection
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
                    >
                        Lender Protection
                    </p>
                    <p 
                        className='footer_section_title'
                        onClick={() => history.push('/')}
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
            </div>
            <div className='footer_bottom_container'>
                <p>
                Support Team
                </p>
                <p>
                Copyright 2020 Little big shed
                </p>
            </div>
        </div>
    )
}

export default Footer
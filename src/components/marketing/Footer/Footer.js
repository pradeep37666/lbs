import { useState } from 'react'
import './Footer.css'
import Logo from '../../../assets/Logos/LBS_Logo_Flat_Red.jpg'
import AppleButton from '../../../assets/Images/AppStoreButton.png'
import GooglePlayButton from '../../../assets/Images/GooglePlayButton.png'
import { Link, useHistory } from 'react-router-dom'
import { BsFacebook, BsLinkedin } from 'react-icons/bs'
import { FiInstagram } from 'react-icons/fi'
import {
  EmailArrowBtn,
  LBSBlackLogo,
} from '../../../assets/Images/Marketings/Marketings'

const Footer = () => {
  const [email, setEmail] = useState('')
  const history = useHistory()

  const sendSubscribeEmail = () => {
    // send email
  }
  return (
    <div className='footer_container'>
      <div className='footer_header_container'>
        <div className='footer_header_left_section'>
          <img
            src={Logo}
            alt='logo'
            className='footer_header_logo'
            style={{ marginRight: '1rem' }}
          />
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
          <img src={AppleButton} alt='Apple Store' className='app_button' />
          <img
            src={GooglePlayButton}
            alt='Google Play'
            className='app_button google_button'
          />
        </div>
      </div>

      <div className='footer_content_container'>
        <div className='footer_content_box'>
          <img
            src={LBSBlackLogo}
            alt='lbs footer logo'
            className='footer_middle_logo pb-2'
          />
          <p className='footer_first_title'>Share stuff, do good</p>
          <p className='footer_first_desc'>
            Buy less, lend and borrow more. Unlock the power of sharing to make,
            mend, learn and care for your place and our planet together.
            <br />
            <br />
          </p>
          <p className='footer_first_desc'>hello@littlebigshed.co.nz</p>
        </div>
        <div className='footer_content_box flex flex-col'>
          <p
            className='footer_section_title_main pb-2'
            onClick={() => history.push('/about_us')}
          >
            About Us
          </p>

          <Link className='footer_section_title' to='/privacy_policy'>
            Privacy Policy
          </Link>
          <Link className='footer_section_title' to='/rental_agreement'>
            Rental Agreement
          </Link>
          <Link className='footer_section_title' to='/cancellation_policy'>
            Cancellation Policy
          </Link>
          <Link className='footer_section_title' to='/damages_and_disputes'>
            Damages And Disputes
          </Link>
        </div>
        <div className='footer_content_box flex flex-col'>
          <p
            className='footer_section_title_main pb-2'
            onClick={() => history.push('/how_it_works')}
          >
            How It Works
          </p>
          <p
            className='footer_section_title'
            onClick={() => history.push('/protection')}
          >
            Lender protection (insurance policy)
          </p>
          <p
            className='footer_section_title'
            onClick={() => history.push('/faqs')}
          >
            FAQs for sharing
          </p>
          <p
            className='footer_section_title'
            onClick={() => history.push('/login')}
          >
            Sign Up / Login
          </p>
        </div>
        <div className='footer_content_box flex flex-col'>
          <p
            className='footer_section_title_main pb-2'
            onClick={() => history.push('/')}
          >
            Top Categories
          </p>
          <Link
            className='footer_section_title'
            to={`/search?category=${encodeURIComponent('DIY & Garden')}`}
          >
            Tools & Garden
          </Link>
          <Link
            className='footer_section_title'
            to={`/search?category=${encodeURIComponent('Photography')}`}
          >
            Photography
          </Link>
          <Link
            className='footer_section_title'
            to={`/search?category=${encodeURIComponent('Parties & Events')}`}
          >
            Events & Parties
          </Link>
          <Link
            className='footer_section_title'
            to={'/search/?keyword=&category=Other'}
          >
            Hobbies
          </Link>
          <Link
            className='footer_section_title'
            to={`/search?category=${encodeURIComponent('Outdoor & Sport')}`}
          >
            Outdoor
          </Link>
          <Link
            className='footer_section_title'
            to={`/search?category=${encodeURIComponent('Babies & Kids')}`}
          >
            Kids
          </Link>
          <Link
            className='footer_section_title'
            to={'/search/?keyword=&category=Vehicle'}
          >
            Vehicle
          </Link>
          <Link
            className='footer_section_title'
            to={'/search/?keyword=&category=Closet'}
          >
            Closet
          </Link>
          <Link className='footer_section_title' to={'/search/?keyword='}>
            Browse All
          </Link>
        </div>
        <div className='footer_content_box'>
          <p className='footer_last_title pb-2'>Stay Connected</p>
          <p className='footer_last_desc'>
            Subscribe to the Little Big Shed newsletter to keep up to date with
            our sharing news and new item listings!
          </p>
          <div className='subscribe_email_container'>
            <input
              className='subscribe_email_input'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
            />
            <button className='subscribe_button' onClick={sendSubscribeEmail}>
              <img
                src={EmailArrowBtn}
                alt='email button'
                className='email_arrow_icon'
              />
            </button>
          </div>
          <p className='footer_last_title margin_top'>Get Social</p>
          <div className='flex_box'>
            <a href='https://www.instagram.com/little_big_shed/'>
              <FiInstagram className='social_media_icons' />
            </a>
            <a href='https://www.linkedin.com/company/little-big-shed/'>
              <BsLinkedin className='social_media_icons' />
            </a>
            <a href='https://www.facebook.com/LittleBigShed'>
              <BsFacebook className='social_media_icons' />
            </a>
          </div>
        </div>
      </div>

      <div className='footer_bottom_container pt-2 pb-2'>
        <p className='footer_bottom_left'>Support Team</p>
        <p className='footer_bottom_right'>Copyright 2023 Little big shed</p>
      </div>
    </div>
  )
}

export default Footer

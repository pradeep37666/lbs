import './footer.css'
import Logo from './../../assets/Logos/LBS_Logo_Flat_Red.jpg'
import GoogleButton from '../../assets/Images/GooglePlayButton.png'
import AppleButton from '../../assets/Images/AppStoreButton.png'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='Footer'>
      <div className='FooterBar Advert'>
        <div className='FooterWrapper'>
          <div className='LogoTextContainer'>
            {!isMobile && <img src={Logo} alt='logo' className='FooterLogo' />}
            <div className='TextWrapper'>
              <div className='LargeText'>Little Big Shed in your Pocket!</div>
              <div className='RegularText'>
                Download our mobile app to borrow and lend, where ever you are!
              </div>
            </div>
          </div>
          <div className='AppButtonsSection'>
            <img src={AppleButton} alt='Google Play' className='AppButton' />
            <img src={GoogleButton} alt='Google Play' className='AppButton' />
          </div>
        </div>
      </div>

      <div className='FooterBar Links'>
        <div className='LinkWrapper' style={{ justifyContent: 'space-around' }}>
          <div>
            <div className='LinkHeader'>Account</div>
            <div className='LinkContainer'>
              <Link className='LinkText' to={'/contact_us'}>
                Support Team
              </Link>
              <Link className='LinkText' to={`/user/account`}>
                Settings
              </Link>
              <Link className='LinkText' to={`/user/account`}>
                Availability
              </Link>
              <Link className='LinkText' to={'/user/your_shed'}>
                My Shed
              </Link>
            </div>
          </div>
          <div>
            <div className='LinkHeader'>Conditions</div>
            <div className='flex flex-col'>
              <a
                className='LinkText'
                download='Little Big Shed _ Terms & Conditions.pdf'
                href='/Policies/LBS_Terms&Conditions.pdf'
              >
                Terms and Condtions
              </a>
              <Link
                className='footer_section_title LinkText'
                to='/privacy_policy'
              >
                Privacy Policy
              </Link>
              <a
                className='LinkText'
                download='LBS _ Lender Protection Policy.pdf'
                href='/Policies/LBS_LenderProtectionPolicy.pdf'
              >
                Lender Agreement
              </a>
              <Link
                className='footer_section_title LinkText'
                to='/cancellation_policy'
              >
                Cancellation and Refund Policy
              </Link>
            </div>
          </div>

          <div>
            <div className='LinkHeader'>Discover</div>
            <div className='flex flex-col'>
              <Link className='LinkText' to={'/search/?keyword='}>
                New Items
              </Link>
              <Link className='LinkText' to={'/search/?keyword='}>
                Top Items
              </Link>
              <Link className='LinkText' to={'/search/?keyword='}>
                Search
              </Link>
              <Link className='LinkText' to={'/search/?keyword='}>
                Discover
              </Link>
            </div>
          </div>

          <div>
            <div className='LinkHeader'>Top Categories</div>
            <div className='LinkContainer'>
              <Link
                className='LinkText'
                to={'/search/?keyword=&category=Vehicle'}
              >
                Automative
              </Link>
              <Link
                className='LinkText'
                to={`/search?category=${encodeURIComponent('DIY & Garden')}`}
              >
                Gardening
              </Link>
              <Link
                className='LinkText'
                to={'/search/?keyword=&category=Household'}
              >
                Hand Tools
              </Link>
              <Link
                className='LinkText'
                to={'/search/?keyword=&category=Electronics'}
              >
                Power Tools
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='FooterBar Copyright'>
        <div className='FooterWrapper' style={{ margin: '30px 0' }}>
          <div>Support Team</div>
          <div>Copyright 2023 Little Big Shed</div>
        </div>
      </div>
    </div>
  )
}

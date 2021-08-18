import React from 'react';
import './footer.css';
import Logo from './../../assets/Logos/LBS_Logo_Flat_Red.jpg';
import GoogleButton from '../../assets/Images/GooglePlayButton.png';
import AppleButton from '../../assets/Images/AppStoreButton.png';
import { SvgIcon } from '@material-ui/core';

export default function footer() {
  return (
    <div className="Footer">
      <div className="FooterBar Advert">
        <div className="FooterWrapper">
          <div><img src={Logo} alt="logo" className="FooterLogo" /></div>
          <div className="TextWrapper">
            <div className="LargeText">Little Big Shed in your Pocket!</div>
            <div className="RegularText">Download our mobile app to borrow and lend, where ever you are!</div>
          </div>
          <div className="AppButtonsSection">
            <img src={AppleButton} alt="Google Play" className="AppButton" />
            <img src={GoogleButton} alt="Google Play" className="AppButton" />
          </div>

        </div>
      </div>

      <div className="FooterBar Links">
        <div className="FooterWrapper" style={{ justifyContent: "space-around" }}>
          <div>
            <div className="LinkHeader">Account</div>
            <div className="LinkText">
              <div>Support Team</div>
              <div>Settings</div>
              <div>Availability</div>
              <div>My Shed</div>
            </div>

          </div>
          <div>
            <div className="LinkHeader">Conditions</div>
            <div className="LinkText">
              <div>Terms and Conditions</div>
              <div>Privacy Policy</div>
              <div>Location Policy</div>
              <div>Conditions</div>
            </div>
          </div>

          <div>
            <div className="LinkHeader">Discover</div>
            <div className="LinkText">
              <div>New Items</div>
              <div>Top Items</div>
              <div>Search</div>
              <div>Discover</div>
            </div>
          </div>

          <div>
            <div className="LinkHeader" >Top Categories</div>
            <div className="LinkText">
              <div>Automotive</div>
              <div>Gardening</div>
              <div>Hand Tools</div>
              <div>Power Tools</div>
            </div>
          </div>

        </div>
      </div>

      <div className="FooterBar Copyright">
        <div className="FooterWrapper" style={{ margin: "30px 0" }}>
          <div>Support Team</div>
          <div>Copyright 2020 Little big shed</div>

        </div>
      </div>



    </div>
  )
}

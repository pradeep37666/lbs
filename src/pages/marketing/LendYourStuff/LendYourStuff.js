import React from 'react'
import './LendYourStuff.css'
import { 
  Android, Apple, LYSMowing, LYSPaint, 
  NatalieCliear, SignUpImg, TaneClear
} from '../../../assets/Images/Marketings/Marketings'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import Footer from '../../../components/marketing/Footer/Footer'
import StepCard from '../../../components/marketing/StepCard/StepCard'
import { rentOutProcedures } from '../../../assets/Data/MarketSelections'

const LendYourStuff = () => {
  return (
    <div className='marketing_container'>
      <NavBar selected='lend_your_stuff'/>

      <div className='marketing_img_md_container bg_lend_your_stuff'>
        <div className='main_title_section'>
          <p className='main_title'>
          Rent Out Your Stuff To Earn Cash And Do Good
          </p>
          <div className='flex_box'>
            <MarketingButton 
              bgColor={'#AC172C'}
              textColor={'#FFFFFF'}
              linkTo={'/register'}
            >
            <p className='button_font'>
            Sign Up To Start Sharing
            </p>
            <img src={SignUpImg} className='app_icons' alt='signup icon' />
            </MarketingButton>
          </div>
          <div className='download_app_section'>
            <p className='download_main_title'>
            Download our free app!
            </p>
            <p className='download_sub_title'>
            Download our mobile app to borrow and lend, where ever you are!
            </p>
            <MarketingButton 
              bgColor={'#E9D8B4'}
              textColor={'#33384F'}
            >
            Download Now!
              <img src={Apple} className='app_icons' alt='apple icon'/>
              <img src={Android} className='app_icons' alt='android icon'/>
            </MarketingButton>
          </div>
        </div>
      </div>

      <div className='marketing_img_md_container bg_wall flex_box straight_column'>
        <div className='half_screen_center full_width'>
          <img src={LYSMowing} className='graphic_image responsive_img_size' alt='mowing iamge'/>
        </div>
        <div className='half_screen_center article_section full_width'>
          <p className='marketing_main_title'>
          Share Your Shed On Our Tool Borrowing App
          </p>
          <p className='marketing_main_description'>
          Around the world, the sharing economy is booming. People are sharing their equipment, their homes, their cars and their skills.<br /><br /> 
          This act of sharing has significant social, economic, cultural and environmental benefits. By lending out your stuff on Little Big Shed you’re helping to:
          </p>
          <ul className='description_list'>
            <li className='description_list_text'>
            Create equal opportunities – by making tools, hobby gear and leisure equipment more available and affordable to everyone.
            </li>
            <li className='description_list_text'>
            Build community connection and support – by sharing with your neighbours you get to meet a like-minded local, help them save space and money, and make some extra cash on the side.
            </li>
            <li className='description_list_text'>
            Care for the environment – with less people buying stuff new, demand for products reduces. Sharing helps design waste out of the system before it has the chance to become rubbish.
            </li>
          </ul>
        </div>
      </div>

      <div className='marketing_img_sm_container bg_white flex_box center_items straight_column'>
        <div className='center_text_image full_width'>
          <p className='marketing_main_title text_align'>
          No Service Fees
          </p>
          <div className='marketing_main_description text_align'>
            <p>
            We believe in the power of sharing and want to make it as easy, accessible and beneficial as possible. That’s why Little Big Shed has no platform service fee. We cover the costs for the smooth sailing of our shed so that you can earn more when you do good sharing your stuff.<br /><br /> 
            The only cost of using Little Big Shed is a 2.9%&#60;processing fee&#62;: link to FAQ + 30c transaction fee charged by our third party payment provider deducted from what you get paid.
            </p>
          </div>
        </div>
        <div className='center_text_image full_width'>
          <img src={TaneClear} className='graphic_image no_left_padding disable_guiter' alt='guiter guy image'/>
        </div>
      </div>

      <div className='marketing_img_xsm_container bg_lbs'>
        <p className='lbs_quote_text'>
        A Little Sharing Can Make A Big Difference To Your Pocket, Your Community And The Planet.
        </p>
      </div>

      <div className='marketing_img_sm_container bg_dark flex_box center_items straight_column'>
        <div className='image_half_container full_width'>
          <img src={LYSPaint} className='picture_image no_right_padding' alt='tradie image'/>
        </div>
        <div className='center_text_image full_width'>
          <p className='marketing_main_title text_align dark_mode_text'>
          We’ve Got You Covered If Something Goes Wrong, Up To $2000
          </p>
          <div className='marketing_main_description text_align dark_mode_text'>
            <p>
            Our tool borrowing app means that anything you have in your little shed can easily be shared with your neighbours when not in use. Plus, you can do it all worry-free!<br /><br /> 
            Rest assured that when you share your shed, we have your listed items covered against damage during the lending period if something goes wrong – up to NZ$2000 of cover per item.<br /><br />  
            Check out our full lender protection policy to find out more about sharing with our verified Little Big Shed users.
            </p>
          </div>
        </div>
      </div>

      <div className='marketing_image_fit_container bg_white'>
        <div className='top_info_top_section flex_box'>
          <div className='top_info_smaller_section'>
            <p className='marketing_main_title'>
            Four Simple Steps To Rent Out The Stuff In Your Shed
            </p>
          </div>
          <div className='top_section_smaller_box'>
            <img src={NatalieCliear} className='graphic_image' alt='surf borad lady image'/>
          </div>
        </div>
        <div className='top_grid_section'>
          {rentOutProcedures.map(step => (
            <StepCard step={step} key={step.id}/>
          ))}
        </div>
      </div>

      <div className='marketing_img_sm_container bg_lys_signup'>
        <div className='center_quote_btn'>
          <p className='lbs_quote_lgtext'>
          Ready To Start Earning And Do Good? Sign Up
          </p>
          <MarketingButton 
            bgColor={'#AC172C'}
            textColor={'#FFFFFF'}
            linkTo={'/register'}
          >
            <p className='button_font'>
            Sign Up To Start Sharing
            </p>
            <img src={SignUpImg} className='app_icons' alt='signup icon' />
          </MarketingButton>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default LendYourStuff
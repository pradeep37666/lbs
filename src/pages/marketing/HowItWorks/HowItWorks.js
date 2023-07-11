import React from 'react'
import '../Marketing.css'
import './HowItWorks.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import {
  AdrianClear,
  Android,
  Apple,
  HIWSurf,
  LBS80,
  LBSEconomy,
  LBSModal,
  SignUpImg,
} from '../../../assets/Images/Marketings/Marketings'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import { rentingProcedures } from '../../../assets/Data/MarketSelections'
import StepCard from '../../../components/marketing/StepCard/StepCard'
import Footer from '../../../components/marketing/Footer/Footer'

const HowItWorks = () => {
  return (
    <div className='marketing_container'>
      <NavBar selected='how_it_works' />

      <meta
        title='Hire gear for your next adventure, hobby or DIY project'
        content='Hire gear from our online tool rental app for your next adventure, hobby or DIY project. Sign up to save money, reduce waste, and support locals like you.'
      />
      <div className='marketing_img_md_container bg_how_it_works'>
        <div className='main_title_section wider_section'>
          <p className='main_title'>Hire gear for your next adventure</p>
          <p className='main_title'>or DIY project</p>
          <div className='flex_box'>
            <MarketingButton
              bgColor={'#AC172C'}
              textColor={'#FFFFFF'}
              linkTo={'/register'}
            >
              <p className='button_font'>Sign Up To Start Sharing</p>
              <img src={SignUpImg} className='app_icons' alt='signup icon' />
            </MarketingButton>
          </div>
          <div className='download_app_section'>
            <p className='download_main_title'>Download our free app!</p>
            <p className='download_sub_title'>
              Download our mobile app to borrow and lend, where ever you are!
            </p>
            <MarketingButton bgColor={'#E9D8B4'} textColor={'#33384F'}>
              Download Now!
              <img src={Apple} className='app_icons' alt='apple icon' />
              <img src={Android} className='app_icons' alt='android icon' />
            </MarketingButton>
          </div>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_white flex_box center_items straight_column'>
        <div className='center_text_image full_width'>
          <p className='marketing_main_title text_align'>
            Borrow Items and Save with our Online Tool Rental Platform
          </p>
          <p>
            Starting a DIY project? Want to get creative with a new craft? Keen
            to give a new activity a go? Look no further, our online tool rental
            platform is designed for you. By borrowing stuff on Little Big Shed
            you can:
          </p>
        </div>
        <div
          className='center_text_image full_width'
          style={{ paddingTop: '1rem' }}
        >
          <img
            src={LBS80}
            className='graphic_image no_left_padding disable_guiter'
            style={{ maxHeight: '28em', maxWidth: '28em', padding: '0' }}
            alt='guiter guy image'
          />
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_white flex_box center_items straight_column'>
        <div className='center_text_image full_width' style={{ padding: '0' }}>
          <img
            src={LBSModal}
            className='graphic_image disable_guiter'
            style={{ maxHeight: '35em', maxWidth: '35em', padding: '0' }}
            alt='guiter guy image'
          />
        </div>
        <div className='center_text_image full_width'>
          <ul className='how_it_works_list'>
            <li style={{ fontSize: '1.1em' }}>
              Make, mend and learn – without the hefty costs of buying items new
              or requiring space to store things you hardly use.
            </li>
            <li style={{ fontSize: '1.1em' }}>
              Support your community – borrowing from your neighbours means that
              they get to make some money while you get to save. Plus, it’s a
              great excuse to connect with locals like you and build trust in
              your hood!
            </li>
            <li style={{ fontSize: '1.1em' }}>
              Care for the environment – through buying less and borrowing more,
              demand for products reduces. Sharing helps remove waste out of the
              whole supply chain before it has the chance to do damage.
            </li>
          </ul>
          Our hobby gear, equipment and online tool rental app makes it easy to
          book and borrow items from within your community.
        </div>
      </div>

      <div className='marketing_image_fit_container bg_wall'>
        <div className='top_info_bottom_section' style={{ padding: '2em 0' }}>
          <p
            className='marketing_main_title'
            style={{ textAlign: 'center', marginBottom: '2rem' }}
          >
            Here’s how to hire gear from our shared shed:
          </p>
          <div className='top_grid_section'>
            {rentingProcedures.map(step => (
              <StepCard step={step} key={step.id} />
            ))}
          </div>
        </div>
      </div>

      <div
        className='marketing_img_flexible_container bg_dark'
        style={{ padding: '2em 0' }}
      >
        <div className='center_quote_btn'>
          <p className='lbs_quote_lgtext-borrow'>Ready To Start Borrowing?</p>
          <MarketingButton
            bgColor={'#AC172C'}
            textColor={'#FFFFFF'}
            linkTo={'/register'}
          >
            <p className='button_font'>Sign Up To Start Sharing</p>
            <img src={SignUpImg} className='app_icons' alt='signup icon' />
          </MarketingButton>
        </div>
      </div>

      <div className='marketing_img_sm_container flex_box straight_column'>
        <div className='half_screen_center article_section full_width'>
          <p className='marketing_main_title'>
            The Sharing Economy Is Growing Fast Globally
          </p>
          <p>
            We’re sharing more stuff with each other than ever before,
            peer-to-peer technologies are changing the way we travel, listen to
            music, work, borrow money and access other people’s tools, hobby or
            leisure equipment.
            <br />
            <br />
            In 2013 the sharing economy was worth just NZ$22 billion. It is
            predicted to grow to more that NZ$495 billion by 2025, matching
            traditional hire/rental models.
          </p>
        </div>
        <div
          className='half_screen_center full_width'
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '1rem',
          }}
        >
          <img
            src={LBSEconomy}
            className='how_it_works_images responsive_img_size'
            alt='less than once a month'
          />
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_lbs'>
        <div className='hiw_question_section'>
          <div className='hiw_question_title_box' style={{ padding: '2em 0' }}>
            <p className='hiw_question_title'>Still Have Questions?</p>
            <p className='hiw_question_sub_title'>
              Check out our guide and FAQ’s for more info!
            </p>
          </div>
          <div className='flex_box space_between'>
            <MarketingButton
              bgColor={'#33384F'}
              textColor={'#FFFFFF'}
              linkTo={'/faqs'}
            >
              FAQs for sharing
            </MarketingButton>
          </div>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_grey flex_box center_items straight_column'>
        <div className='half_screen_center full_width'>
          <img
            src={HIWSurf}
            className='how_it_works_images smaller_graphics'
            style={{ maxHeight: '28em', maxWidth: '28em' }}
            alt='2 people standing'
          />
        </div>
        <div className='half_screen_center article_section full_width'>
          <p className='marketing_main_title'>
            Share Your Stuff, Earn Cash And Do Good.
          </p>
          <MarketingButton
            bgColor={'#AC172C'}
            textColor={'#FFFFFF'}
            width='20em'
            linkTo={'/lend_your_stuff'}
          >
            Keen to start sharing your stuff?
          </MarketingButton>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HowItWorks

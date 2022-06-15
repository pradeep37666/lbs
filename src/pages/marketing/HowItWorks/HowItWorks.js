  import React from 'react'
  import '../Marketing.css'
  import './HowItWorks.css'
  import NavBar from '../../../components/marketing/NavBar/NavBar'
  import { 
    AdrianClear, Android, Apple, 
    HIWSurf, LBS80, LBSEconomy, 
    LBSModal, SignUpImg
  } from '../../../assets/Images/Marketings/Marketings'
  import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
  import { rentingProcedures } from '../../../assets/Data/MarketSelections'
  import StepCard from '../../../components/marketing/StepCard/StepCard'
  import Footer from '../../../components/marketing/Footer/Footer'

  const HowItWorks = () => {
    return (
      <div className='marketing_container'>
        <NavBar selected='how_it_works'/>

        <div className='marketing_img_md_container bg_how_it_works'>
          <div className='main_title_section wider_section'>
            <p className='main_title'>
            Hire Gear For Your Next Adventure Or DIY Project
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
                <img src={Android} className='app_icons' alt='android icon' />
              </MarketingButton>
            </div>
          </div>
        </div>

        <div className='marketing_image_fit_container bg_wall'>
          <div className='section_top flex_box text_height_fit'>
            <div className='half_screen_center article_section responsive_text_width'>
              <p className='marketing_main_title'>
              Helping You To Do Your Bit And Earn Extra
              </p>
              <p className='marketing_main_description'>
              Did you know we use 80% of our household items less than once a month? It makes much more sense to share what we’ve already got.<br /><br /> 
              Think about that tool you need, but don’t have the budget for. Or the outfit you’d love to make if only you had access to that overlocker. Maybe you’ve got a big shed full of tools and you want to help your neighbours out. Plus we take no service fee you get more cash in your back pocket.
              </p>
            </div>
            <div className='half_screen_center disable_img'>
              <img src={LBS80} className='how_it_works_images' alt='less than once a month'/>
            </div>
          </div>

          <div className='section_bottom flex_box text_height_fit'>
            <div className='half_screen_center disable_img'>
              <img src={LBSModal} className='how_it_works_images' alt='less than once a month'/>
            </div>
            <div className='half_screen_center article_section responsive_text_width'>
              <p className='marketing_main_title'>
              Helping You To Do Your Bit And Earn Extra
              </p>
              <p className='marketing_main_description'>
              Our Little Big Shed platform is a hub. It brings borrowers and lenders, like you, together to share tools, equipment and knowledge.<br /><br /> 
              We don’t charge a service fee to share on our platform. This means you end up with more cash in your back pocket, and we hope it inspires you to share more! Plus our rating system and verified users make it a trusted, sharing marketplace.
              </p>
            </div>
          </div>
        </div>

        <div className='marketing_image_fit_container bg_white'>
          <div className='top_info_top_section flex_box'>
            <div className='top_info_smaller_section'>
              <p className='marketing_main_title'>
              How It Works
              </p>
              <div className='marketing_main_description'>
                <p>
                Our hobby gear, equipment and online tool rental app makes it easy to book and borrow items from within your community.
                </p>
              </div>
            </div>
            <div className='top_section_smaller_box'>
              <img src={AdrianClear} className='graphic_image responsive_img_sm_size disable_img' alt='lady image'/>
            </div>
          </div>
          <div className='top_info_bottom_section'>
            <div className='top_grid_section'>
              {rentingProcedures.map(step => (
                <StepCard step={step} key={step.id}/>
              ))}
            </div>
          </div>        
        </div>

        <div className='marketing_img_sm_container bg_tradie' >
          <div className='center_quote_btn'>
            <p className='lbs_quote_lgtext'>
            Ready To Start Borrowing?
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

        <div className='marketing_img_sm_container bg_wall flex_box straight_column'>
          <div className='half_screen_center article_section full_width'>
            <p className='marketing_main_title'>
            The Sharing Economy Is Growing Fast Globally
            </p>
            <p className='marketing_main_description'>
            We’re sharing more stuff with each other than ever before, Peer-to-peer technologies are changing the way we travel, listen to music, work, borrow money and access other people’s tools, hobby or leisure equipment.<br /><br /> 
            In 2013 the sharing economy was worth just NZ$22 billion. It is predicted to grow to more that NZ$495 billion by 2025, matching traditional hire/rental modals.
            </p>
          </div>
          <div className='half_screen_center full_width'>
            <img src={LBSEconomy} className='how_it_works_images responsive_img_size' alt='less than once a month'/>
          </div>
        </div>

        <div className='marketing_img_xsm_container bg_lbs'>
          <div className='hiw_question_section'>
            <div className='hiw_question_title_box'>
              <p className='hiw_question_title'>
              Still Have Questions?
              </p>
              <p className='hiw_question_sub_title'>
              Check out our guide and FAQ’s for more info!
              </p>
            </div>
            <div className='flex_box space_between'>
              <MarketingButton 
                bgColor={'#E9D8B4'}
                textColor={'#33384F'}
              >
              User Guides
              </MarketingButton>
              <MarketingButton 
                bgColor={'#33384F'}
                textColor={'#FFFFFF'}
                linkTo={'/faqs'}
              >
              FAQ’s
              </MarketingButton>
            </div>
          </div>
        </div>

        <div className='marketing_img_sm_container bg_grey flex_box center_items straight_column'>
          <div className='half_screen_center full_width'>
            <img src={HIWSurf} className='how_it_works_images smaller_graphics' alt='2 people standing'/>
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
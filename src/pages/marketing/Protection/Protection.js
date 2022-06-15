import React from 'react'
import '../Marketing.css'
import './Protection.css'
import { damagedProcedures } from '../../../assets/Data/MarketSelections'
import { MaryClear } from '../../../assets/Images/Marketings/Marketings'
import Footer from '../../../components/marketing/Footer/Footer'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import StepCard from '../../../components/marketing/StepCard/StepCard'

const Protection = () => {
  return (
    <div className='marketing_container'>
      <NavBar selected='info_hub'/>

      <div className='marketing_img_md_container bg_protection'>
        <div className='main_title_section protection_title_position'>
          <p className='main_title'>
          Need Some More Information? We Have You Covered.
          </p>
          <p className='main_sub_title sub_title_width'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </div>
      </div>

      <div className='marketing_img_md_container bg_wall flex_box straight_column'>
        <div className='half_screen_center article_section no_right_padding full_width'>
          <p className='marketing_main_title'>
          Am I Eligible For Lender Protection?
          </p>
          <p className='marketing_main_description'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
          </p>
          <ul className='description_list'>
            <li>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
            </li>
          </ul>
        </div>
        <div className='half_screen_center full_width'>
          <img src={MaryClear} className='graphic_image no_left_padding responsive_img_sm_size' alt='mowing iamge'/>
        </div>
      </div>

      <div className='marketing_img_md_container bg_white height100p center_member_items'>
        <div className='marketing_main_title margin_bottom'>
          <p className='damaged_steps_title'>
          What To Do If My Item Is Returned Damaged.
          </p>
          <p className='damaged_steps_description'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.
          </p>
        </div>
        <div className='category_card_section no_bottom_padding'>
          {damagedProcedures.map(step => (
            <StepCard step={step} key={step.id}/>
          ))}
        </div>
        <div className='search_items_btn'>
          <MarketingButton
            bgColor='#33384F'
            textColor='#FFFFFF'
            width='23em'
          >
          Read our full lender protection policy here
          </MarketingButton>
        </div>
      </div>

      <div className='marketing_img_sm_container bg_protection_signup'>
        <div className='center_quote_btn'>
          <p className='lbs_quote_lgtext'>
          Got A Question Not Answered Here?
          </p>
          <MarketingButton 
            bgColor={'#E9D8B4'}
            textColor={'#33384F'}
            linkTo={'/contact_us'}
          >
            Ask A Question
          </MarketingButton>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Protection
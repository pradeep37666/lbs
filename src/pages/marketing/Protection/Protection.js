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
          <p className='main_title title_shadow'>
          Lender Protection
          </p>
          <p className='main_sub_title sub_title_width sub_title_shadow'>
          No worries if your item comes back damaged or is stolen – we’ve got you covered!<br/><br/>
          Rest assured that when you share your shed on our platform, we have your listed items covered against damage during the lending period if something goes wrong – up to NZ$2000 of cover per item.
          </p>
        </div>
      </div>

      <div className='marketing_img_xsm_container bg_wall flex_box straight_column'>
        <div className='half_screen_center article_section no_right_padding full_width'>

          <p className='marketing_main_title'>
          Are you eligible? 
          </p>
          <p className='marketing_main_description'>
          To be to claim through our ‘lender protection policy’ you must meet the following criteria:
          </p>

          <p className='protection_sub_title_text'>
          What you need to do before and after the rental
          </p>
          <ul className='protection_sub_list'>
            <li>
              Immediately raise a dispute with the borrower seeking compensation for any damage, loss or theft of your items during the rental period.
            </li>
            <li>
              Immediately raise a dispute with Little Big Shed by contacting support@littlebigshed.com.
            </li>
            <li>
              In the case of theft, report the incident to the police as soon as reasonably possible, and obtain a crime reference number from them.
            </li>
            <li>
              Take clear photos or videos of the item(s) on your mobile phone or camera with a timestamp immediately (and no more than 24 hours) before the rental to prove they were in your possession undamaged at that time.
            </li>
            <li>
              In the case of damage, take clear photos or videos on your mobile phone or camera with a timestamp immediately (and no more than 24 hours) after the rental to prove the damage happened during the rental and not during your own subsequent use.
            </li>
            <li>
              Do not post on social media, online, or make public information about your claim before the claim process has completed.
            </li>
            <li>
            Provide Little Big Shed with the appropriate documentation to support the claim. This is included but not limited to:
              <ul>
                <li>
                An itemised breakdown of all items that have suffered damage, loss or theft;
                </li>
                <li>
                Evidence of the value when you purchased the items;
                </li>
                <li>
                Serial numbers on items.
                </li>
              </ul>
            </li>
          </ul>

          <p className='protection_sub_title_text'>
          What is covered
          </p>
          <ul className='protection_sub_list'>
            <li>
            The cost of repair, replacement or the fair market value of the asset. The value of the asset is determined by the price that you set on as the item’s value and the price the asset would sell for.
            </li>
            <li>
            Insurance of stolen items - the lender will be covered by up to $2,000 if the borrower steals the item. Any item above this value is the lender's liability and you will need to consult your insurance company.
            </li>
          </ul>

          <p className='protection_sub_title_text'>
          What is not covered
          </p>
          <ul className='protection_sub_list'>
            <li>
            Damage caused by a breakdown or mechanical fault
            </li>
            <li>
            Existing defects, such as corrosion
            </li>
            <li>
            General wear and tear, which is minor damage that occurs while using the item
            </li>
            <li>
            Property or person liability. Little Big Shed is not responsible if if any person or property is injured/damaged as a result of your equipment during a Little Big Shed borrow
            </li>
            <li>
            Real estate
            </li>
            <li>
            Campervans and motorhomes
            </li>
            <li>
            People and services 
            </li>
            <li>
            Anything that is classified as a chemical or dangerous weapon 
            </li>
          </ul>

          Check out our full lender protection policy to find out more about sharing with our verified Little Big Shed users.
        </div>
        {/* <div className='half_screen_center full_width'>
          <img src={MaryClear} className='graphic_image no_left_padding responsive_img_sm_size' alt='mowing iamge'/>
        </div> */}
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

      <div className='marketing_img_xsm_container bg_dark'>
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
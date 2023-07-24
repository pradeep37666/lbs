import { useRef } from 'react'
import '../Marketing.css'
import './Protection.css'
import { damagedProcedures } from '../../../assets/Data/MarketSelections'
import Footer from '../../../components/marketing/Footer/Footer'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import StepCard from '../../../components/marketing/StepCard/StepCard'

const Protection = () => {
  const lenderProtectionLinkRef = useRef(null)
  return (
    <div className='marketing_container'>
      <NavBar selected='info_hub' />

      <div className='marketing_img_md_container bg_protection'>
        <div className='main_title_section protection_title_position'>
          <p className='main_title' style={{ color: 'var(--color-dark)' }}>
            Lender protection
          </p>
          <p
            className='main_sub_title sub_title_width'
            style={{ color: 'var(--color-dark)' }}
          >
            No worries if your item comes back damaged or is stolen – we’ve got
            you covered!
            <br />
            <br />
            Rest assured that when you share your shed on our platform, we have
            your listed items covered against damage during the lending period
            if something goes wrong – up to NZ$2000 of cover per item.
          </p>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_wall flex_box straight_column'>
        <div className='half_screen_center article_section eligible no_right_padding full_width pb-7'>
          <p
            className='marketing_main_title pt-7'
            style={{ color: 'var(--color-text)' }}
          >
            Are you eligible?
          </p>
          <p>
            To learn more about our lender protection policy, read this list of
            what is covered and what is not under the policy.
          </p>
          <br />
          <p className='protection_sub_title_text'>What is covered</p>
          <ol class='policy-list'>
            <li>
              The cost of repair, replacement or the fair market value of the
              asset. The value of the asset is determined by the price that you
              set on as the item’s value and the price the asset would sell for.
            </li>
            <li>
              Insurance of stolen items - the lender will be covered by up to
              $2,000 if the borrower steals the item. Any item above this value
              is the lender's liability and you will need to consult your
              insurance company.
            </li>
          </ol>
          <br />
          <p className='protection_sub_title_text'>What is not covered</p>
          <ol class='policy-list'>
            <li>Damage caused by a breakdown or mechanical fault</li>
            <li>Existing defects, such as corrosion</li>
            <li>
              General wear and tear, which is minor damage that occurs while
              using the item
            </li>
            <li>
              Property or person liability. Little Big Shed is not responsible
              if if any person or property is injured/damaged as a result of
              your equipment during a Little Big Shed borrow
            </li>
            <li>Real estate</li>
            <li>Campervans and motorhomes</li>
            <li>People and services</li>
            <li>
              Anything that is classified as a chemical or dangerous weapon
            </li>
          </ol>
          <br />
        </div>
      </div>

      <div className='marketing_img_md_container bg_white height100p center_member_items pt-5'>
        <div className='marketing_main_title margin_bottom'>
          <p className='damaged_steps_title'>
            What To Do If My Item Is Returned Damaged.
          </p>
          <p className='damaged_steps_description pt-3'>
            Now you know what’s covered, learn how to raise a dispute for a
            damaged or stolen item, by following the four easy steps outlined
            below.
          </p>
        </div>
        <div className='category_card_section no_bottom_padding'>
          {damagedProcedures.map(step => (
            <StepCard step={step} key={step.id} />
          ))}
        </div>
        <div className='search_items_btn'>
          <MarketingButton
            bgColor='var(--color-dark)'
            textColor='#FFFFFF'
            onClick={() => lenderProtectionLinkRef.current?.click()}
          >
            Check out our full{'\u00A0'}
            <u> lender protection policy</u>
            {'\u00A0'}here.
          </MarketingButton>
          <a
            href='/Policies/LBS_LenderProtectionPolicy.pdf'
            download='LBS _ Lender Protection Policy.pdf'
            ref={lenderProtectionLinkRef}
          />
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_dark'>
        <div className='center_quote_btn '>
          <p className='lbs_quote_lgtext' style={{ color: 'white' }}>
            Got A Question Not Answered Here?
          </p>
          <div className='mb-12 mt-12'>
            <MarketingButton
              bgColor={'#E9D8B4'}
              textColor={'#33384F'}
              linkTo={'/contact_us'}
            >
              Ask A Question
            </MarketingButton>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Protection

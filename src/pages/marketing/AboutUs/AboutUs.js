import React from 'react'
import '../Marketing.css'
import './AboutUs.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import { 
  Chainsaw, Sarmuhabat, SignUpImg, WashingAndSawing 
} from '../../../assets/Images/Marketings/Marketings'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import { teamMembers } from '../../../assets/Data/MarketSelections'
import MemberCard from '../../../components/marketing/MemberCard/MemberCard'
import Footer from '../../../components/marketing/Footer/Footer'

const AboutUs = () => {
  return (
    <div className='marketing_container'>
      <NavBar selected='about_us'/>

      <meta 
        title='Our mission for zero waste, equality and sustainable living'
        content='The power of sharing can help achieve zero waste and social equality. Learn how our free app connects communities and supports sustainable living.'
      />
      <div className='marketing_img_md_container bg_about_us'>
        <div className='main_title_section position_lower'>
          <p className='main_title title_shadow'>
          A Little Idea, With A Big Impact
          </p>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_grey flex_box center_items straight_column'>
        <div className='center_text_image full_width'>
          <p className='marketing_main_title'>
          A Way We Can All Be Zero Waste
          </p>
          <div >
            <p >
            Our little idea to create a sharing culture among neighbours is a practical way to reduce waste and support each other.<br /><br /> 
            It’s a shocking reality that developed countries such as New Zealand and Australia recycle less than 30% of plastic – with packaging being the single largest contributor to waste . The fact that big box retailers make stuff so cheap and easy to buy doesn’t help the situation.
            </p>
            <p >
            What can we do about it?<br /><br /> 
            Sharing is one of the ways we can all do our bit to help achieve zero waste. Little Big Shed does this by people using stuff only when required. We don’t all need to own the same tools, equipment or hobby gear that spend most of their life sitting in the shed! 
            </p>
          </div>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_wall flex_box center_items straight_column'>
        <div className='image_half_container four_to_six full_width'>
          <img src={WashingAndSawing} className='picture_image no_left_padding' alt='tradie image'/>
        </div>
        <div className='half_screen_center six_to_four column_section align_start text_container_width'>
          <p className='marketing_main_title'>
          Power Of Sharing
          </p>
          <p >
          Through buying less, and lending and borrowing more, we can reimagine supply chains and make a collective effort to support sustainable living. Not only does this put less pressure on our planet’s natural resources but, by sharing within our communities, we can remove barriers of social disparity. <br /><br /> 
          We believe that no one should be restricted from doing a DIY project, cultivating their talents or going on an adventure due to a lack of resources. By lending and borrowing within our community, everyone can afford to make, mend, learn (and earn!). Sharing should be as easy, accessible and beneficial as possible. 
          That’s why we decided to have no platform service fee. We cover the costs for the smooth sailing of our shed so that you can earn more when you do good sharing your stuff.<br /><br />
          Little Big Shed enables people to connect, share, earn and thrive, for the collective purpose of doing good. Read more about the inspiring evolution of Little Big Shed in our Founder’s Story blog.<br /><br />
          A LITTLE sharing really can make a BIG difference – for us, our community and the planet. Are you ready to <a style={{fontWeight: '600'}} href='/#/rent_stuff'>borrow more</a>, buy less, and make some extra cash when you <a style={{fontWeight: '600'}} href='/#/lend_your_stuff'>lend your stuff</a>?
          </p>
          <MarketingButton 
            bgColor={'#AC172C'}
            textColor={'#FFFFFF'}
            linkTo={'/register'}
          >
          <p className='button_font'>
          Sign Up To Start Sharing
          </p>
          </MarketingButton>
        </div>
      </div>

      <div className='marketing_img_sm_container bg_dark flex_box center_items straight_column'>
        <div className='center_text_image full_width'>
          <p className='marketing_main_title text_align dark_mode_text'>
          Sarmuhabat Singh | Founder
          </p>
          <p style={{color: 'white', fontSize: '1.1em'}}>
          Social entrepreneur and business lecturer, Sarmuhabat Singh, believes that one’s success and resources should be shared within the community to help support society as a whole.
          </p>
          <MarketingButton 
            bgColor={'#E9D8B4'}
            textColor={'#33384F'}
          >
          <p className='button_font'>
          Read More: Full Bio
          </p>
          </MarketingButton>
        </div>
        <div className='image_half_container full_width'>
          <img src={Sarmuhabat} className='picture_image' style={{objectFit: 'contain'}} alt='tradie image'/>
        </div>
      </div>

      <div className='marketing_img_md_container bg_white height100p center_member_items'>
        <p className='marketing_main_title margin_bottom'>
        Our Team
        </p>
        <div className='category_card_section'>
          {teamMembers.map(member => (
            <MemberCard member={member} key={member.id}/>
          ))}
        </div>
      </div>

      <div className='marketing_img_sm_container bg_about_us_signup'>
        <div className='center_quote_btn'>
          <p className='lbs_quote_lgtext'>
          Ready To Start Earning And Do Good? Sign Up
          </p>
          <MarketingButton 
            bgColor={'#33384F'}
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
      
      <Footer/>
    </div>
  )
}


export default AboutUs
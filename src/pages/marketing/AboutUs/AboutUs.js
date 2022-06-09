import React from 'react'
import '../Marketing.css'
import './AboutUs.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import { DummyImage } from '../../../assets/Images/Marketings/Marketings'

const AboutUs = () => {
  return (
    <div className='marketing_container'>
      <NavBar selected='about_us'/>

      <div className='marketing_img_md_container bg_about_us'>
        <div className='main_title_section position_lower'>
          <p className='main_title'>
          A Little Idea, With A Big Impact
          </p>
        </div>
      </div>

      <div className='marketing_img_md_container bg_grey flex_box center_items'>
        <div className='half_screen_center smaller_width'>
          <p className='marketing_main_title'>
          A Way We Can All Be Zero Waste
          </p>
          <div className='marketing_main_description'>
            <p className='top_info_left_desc'>
            Our little idea to create a sharing culture among neighbours is a practical way to reduce waste and support each other.<br /><br /> 
            It’s a shocking reality that developed countries such as New Zealand and Australia recycle less than 30% of plastic – with packaging being the single largest contributor to waste . The fact that big box retailers make stuff so cheap and easy to buy doesn’t help the situation.
            </p>
            <p className='top_info_right_desc'>
            What can we do about it?<br /><br /> 
            Sharing is one of the ways we can all do our bit to help achieve zero waste. Little Big Shed does this by people using stuff only when required. We don’t all need to own the same tools, equipment or hobby gear that spend most of their life sitting in the shed!
            </p>
          </div>
        </div>
        <div className='half_screen_center padding_sm'>
          <div className='insert_image_background insert_image_width_height bg_zero_waste'></div>
        </div>
      </div>

    </div>
  )
}


export default AboutUs
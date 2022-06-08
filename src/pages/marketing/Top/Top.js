import React from 'react'
import '../Marketing.css'
import './Top.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import { 
  Android, Apple, TopInfoGraphic, TopMowing,
} from '../../../assets/Images/Marketings/Marketings'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import { dummyCategory, procedures } from '../../../assets/Data/MarketSelections'
import StepCard from '../../../components/marketing/StepCard/StepCard'
import CategoryCard from '../../../components/marketing/CategoryCard/CategoryCard'
import Footer from '../../../components/marketing/Footer/Footer'

const Top = () => {
  return (
    <div className='marketing_container'>
      <NavBar />
      
      <div className='marketing_img_md_container bg_top'>
        <div className='main_title_section'>
          <p className='main_title'>
          Let’s Share Stuff And Do Good
          </p>
          <p className='main_sub_title'>
          Buy less, lend and borrow more. Care for your place and our planet together.
          </p>
          <div className='flex_box'>
            <MarketingButton 
              bgColor={'#33384F'}
              textColor={'#FFFFFF'}
            >
            Want To Rent Stuff?
            </MarketingButton>
            <MarketingButton 
              bgColor={'#AC172C'}
              textColor={'#FFFFFF'}
            >
            Have Stuff To Lend?
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
              <img src={Apple} className='app_icons' alt='apple icon' />
              <img src={Android} className='app_icons' alt='android icon' />
            </MarketingButton>
          </div>
        </div>
      </div>

      <div className='marketing_img_md_container bg_wall flex_box'>
        <div className='half_screen_center'>
          <img src={TopInfoGraphic} className='graphic_image' alt='graphic image'/>
        </div>
        <div className='half_screen_center article_section'>
          <p className='marketing_main_title'>
          Your Local Tool, Hobby Gear And Equipment Rental App.
          </p>
          <div className='marketing_main_description'>
            <p className='top_info_left_desc'>
            A LITTLE sharing makes a BIG difference – for us, our community and the planet. That’s why we created Little Big Shed. It’s an online equipment share platform to help you borrow more, buy less, and make some extra cash when you lend your stuff.<br/><br/> 
            Now all of us can support each other to make, mend and learn by sharing tools, hobby gear, leisure equipment and much more!<br/><br/> 
            Our share things app is based on people using stuff only when required. This stops us needing to buy and own more stuff.
            </p>
            <p className='top_info_right_desc'>
            Otherwise that stuff just spends its time cluttering up the garage and gathering dust.<br/><br/> 
            By pooling our resources, from lawnmowers and power tools to camping gear and pasta makers, we can make a collective neighbourhood effort to reduce waste. This puts less pressure on our planet’s natural resources and gives us some extra coin in our back pockets.<br/><br/> 
            What do you say? Ready to connect with locals like you and help care for your place and our planet together?
            </p>
          </div>
          <MarketingButton
            bgColor='#AC172C'
            textColor='#FFFFFF'
          >
          Sign up to start sharing
          </MarketingButton>
        </div>
      </div>

      <div className='marketing_img_sm_container bg_grey flex_box'>
        <div className='half_screen_center column_section'>
          <p className='marketing_main_title max_width'>
          Share Your Stuff, Earn Cash And Do Good
          </p>
          <p className='marketing_main_description max_width'>
            Our equipment rental app means that anything you have in your ‘little shed’ (whether that’s a garage, a kitchen drawer or a cupboard shelf) can become part of something much bigger — the sharing economy.<br/><br/> Why not lend your stuff to people in your area when not in use and make some extra cash on the side? We’ll take good care of you too so you can lend your items worry-free. Check out our lender protection policy to find out more about sharing with our verified users.
          </p>
          <MarketingButton
            bgColor='#AC172C'
            textColor='#FFFFFF'
          >
          Lend Your Stuff
          </MarketingButton>
        </div>
        <div className='half_screen_center'>
          <img src={TopMowing} className='graphic_image' alt='mowing image'/>
        </div>
      </div>

      <div className='marketing_image_xlg_container bg_white'>
        <div className='top_info_top_section flex_box'>
          <div className='top_info_smaller_section'>
            <p className='marketing_main_title'>
            Borrow Items To Learn, Make And Mend
            </p>
            <div className='marketing_main_description'>
              <p>
              Did you know that 80% of household items we own are used less than once a month? You can do your bit to reduce waste by borrowing instead of buying to kick-start your next DIY project or creative experience.<br/><br/> Just follow these four simple steps:
              </p>
            </div>
          </div>
          <div className='top_section_smaller_box'>
            <img src={TopMowing} className='graphic_image' alt='lady image'/>
          </div>
        </div>
        <div className='top_info_bottom_section'>
          <div className='top_grid_section'>
            {procedures.map(step => (
              <StepCard step={step} key={step.id}/>
            ))}
          </div>
        </div>
        <div className='search_items_btn'>
          <MarketingButton
            bgColor='#33384F'
            textColor='#FFFFFF'
          >
          Search Items
          </MarketingButton>
        </div>
      </div>

      <div className='marketing_image_xlg_container bg_grey height100p'>
        <div className='category_title_section'>
          <p className='category_main_title'>
          Discover Your Next Borrow
          </p>
          <p className='category_sub_title'>
          As our little shed grows into something big, you’ll be able to lend and borrow all sorts of stuff. Some of our popular categories include:
          </p>
        </div>
        <div className='category_card_section'>
            {dummyCategory.map(category => (
              <CategoryCard category={category} key={category.id}/>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Top
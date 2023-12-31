import React, { useState, useEffect } from 'react'
import '../Marketing.css'
import './Top.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import {
  Android,
  Apple,
  Screenshots,
  TopInfoGraphic,
  TopMowing,
} from '../../../assets/Images/Marketings/Marketings'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import { categories, procedures } from '../../../assets/Data/MarketSelections'
import StepCard from '../../../components/marketing/StepCard/StepCard'
import CategoryCard from '../../../components/marketing/CategoryCard/CategoryCard'
import Footer from '../../../components/marketing/Footer/Footer'
import Instance from '../../../util/axios'
import { Link } from 'react-router-dom'

const Top = () => {
  const [itemCountByCategories, setItemCountByCategories] = useState([])

  useEffect(() => {
    getItemCountByCategory()
  }, [])

  const getItemCountByCategory = async () => {
    try {
      const { data } = await Instance.get('/items/count-by-category')
      setItemCountByCategories(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='marketing_container'>
      <NavBar />

      <meta
        title='Your local tool, hobby gear and equipment rental app'
        content='Borrow tools, hobby gear and more on our equipment share platform. Make cash when you lend with locals. Sign up to connect and care for our planet together.'
      />
      <div className='marketing_img_md_container bg_top'>
        <div className='main_title_section'>
          <p className='main_title dark_title'>Let’s share stuff and do good</p>
          <p className='main_sub_title dark_sub_title'>
            Buy less, lend and borrow more. Care for your place and our planet
            together.
          </p>
          <div className='flex_box'>
            <MarketingButton
              bgColor={'#33384F'}
              textColor={'#FFFFFF'}
              linkTo={'/rent_stuff'}
            >
              Want To Rent Stuff?
            </MarketingButton>
            <MarketingButton
              bgColor={'#AC172C'}
              textColor={'#FFFFFF'}
              linkTo={'/lend_your_stuff'}
            >
              Have Stuff To Lend?
            </MarketingButton>
          </div>
          <div className='download_app_section'>
            <p className='download_main_title dark_title '>
              Download our free app!
            </p>
            <p className='download_sub_title dark_sub_title'>
              Download our mobile app to borrow and lend, where ever you are!
            </p>
            <div className='flex_box'>
              <MarketingButton bgColor={'#E9D8B4'} textColor={'#33384F'}>
                Download Now!
                <img src={Apple} className='app_icons' alt='apple icon' />
                <img src={Android} className='app_icons' alt='android icon' />
              </MarketingButton>
            </div>
          </div>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_white flex_box straight_column'>
        <div className='half_screen_center article_section full_width'>
          <p className='marketing_main_title mb-9 pt-9'>
            Your Local Tool, Hobby Gear And Equipment Rental App.
          </p>
          <div className='marketing_main_description'>
            <p className='top_info_left_desc'>
              A LITTLE sharing makes a BIG difference – for us, our community
              and the planet. That’s why we created Little Big Shed. It’s an
              online equipment share platform to help you{' '}
              <Link style={{ fontWeight: '600' }} to={'/rent_stuff'}>
                borrow more
              </Link>
              , buy less, and make some extra cash when you{' '}
              <Link style={{ fontWeight: '600' }} to={'/lend_your_stuff'}>
                lend your stuff
              </Link>
              .<br />
              <br />
              Plus, when you share on our platform, we take no service fee –
              which means more money in your back pocket!
              <br />
              <br />
              We believe that no one should be restricted from doing a DIY
              project, cultivating their talents or going on an adventure due to
              a lack of resources. Through the power of sharing <s />
              <Link
                style={{ fontWeight: '600' }}
                to={`/search?category=${encodeURIComponent('DIY & Garden')}`}
              >
                tools
              </Link>
              , <s />
              <Link style={{ fontWeight: '600' }} to={`/search?category=Other`}>
                hobby gear
              </Link>
              , <s />
              <Link
                style={{ fontWeight: '600' }}
                to={`/search?category=${encodeURIComponent('Outdoor & Sport')}`}
              >
                leisure equipment
              </Link>{' '}
              and more, we can support each other to make, mend, learn (and
              earn!).
            </p>
            <p className='top_info_right_desc'>
              Our share things app is based on people using stuff only when
              required. This stops us needing to buy and own more stuff that
              just ends up cluttering the shed and gathering dust.
              <br />
              <br />
              By pooling our resources, from lawnmowers and power tools to
              camping gear and pasta makers, we can make a collective
              neighbourhood effort to reduce waste and put less pressure on our
              planets natural resources.
              <br />
              <br />
              What do you say? Ready to connect with locals like you and help
              care for your place and our planet together?
              <br />
              <br />
            </p>
          </div>
          <div className='pt-4 pb-8'>
            <MarketingButton
              bgColor='#AC172C'
              textColor='#FFFFFF'
              linkTo={'/register'}
            >
              Sign up to start sharing
            </MarketingButton>
          </div>
        </div>
        <div className='half_screen_center full_width'>
          <img
            src={TopInfoGraphic}
            className='graphic_image responsive_img_size'
            alt='graphic'
          />
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_grey center_items straight_column'>
        <div className='six_four_screen_center full_width'>
          <img
            src={TopMowing}
            className='graphic_image responsive_img_size'
            alt='mowing'
          />
        </div>
        <div className='six_four_screen_center column_section adjusting_box_size full_width'>
          <p className='marketing_main_title max_width'>
            Share Your Stuff, Earn Cash And Do Good
          </p>
          <p className='max_width' style={{ fontSize: '1em' }}>
            Our equipment rental app means that anything you have in your
            ‘little shed’ (whether that’s a garage, a kitchen drawer or a
            cupboard shelf) can become part of something much bigger — the
            sharing economy. Why not{' '}
            <Link style={{ fontWeight: '600' }} to={`/lend_your_stuff`}>
              lend your stuff
            </Link>{' '}
            to locals in your area when not in use and make some extra cash on
            the side? Plus, there’s no platform service fee when you share your
            stuff. We cover the costs for the smooth sailing of our shed so that
            you get more in your back pocket. We’ll take good care of you too so
            you can lend your items worry-free. Check out our{' '}
            <a
              style={{ fontWeight: '600' }}
              href='/Policies/LBS_LenderProtectionPolicy.pdf'
              download='LBS _ Lender Protection Policy.pdf'
            >
              lender protection
            </a>{' '}
            policy to find out more about sharing with our verified users.
          </p>
          <MarketingButton
            bgColor='#AC172C'
            textColor='#FFFFFF'
            linkTo={'/lend_your_stuff'}
          >
            Lend Your Stuff
          </MarketingButton>
        </div>
      </div>

      <div
        className='marketing_img_flexible_container bg_wall marketing_screenshot'
        style={{ flexDirection: 'column' }}
      >
        <div className='top_info_top_section flex_box'>
          <div className='top_info_smaller_section'>
            <p className='marketing_main_title'>
              Borrow Items To Learn, Make And Mend
            </p>
            <p>
              Did you know that 80% of household items we own are used less than
              once a month? &nbsp;
              <a
                target='_blank'
                href='https://circulareconomy.europa.eu/platform/sites/default/files/emaf_ce-in-cities-factsheets-products_all_mar19.pdf'
              >
                [Circular Economy Report].
              </a>
              &nbsp; You can do your bit to reduce waste by borrowing instead of
              buying to kick-start your next DIY project or creative experience.
            </p>
          </div>
          <div
            className='top_section_smaller_box'
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img
              src={Screenshots}
              className='graphic_image responsive_img_sm_size disable_img p-0'
              style={{ padding: '50' }}
              alt='screenshots'
            />
          </div>
        </div>
        <div className='top_info_bottom_section'>
          <div className='top_grid_section'>
            {procedures.map(step => (
              <StepCard step={step} key={step.id} />
            ))}
          </div>
        </div>
        <div
          className='search_items_btn'
          style={{ margin: '0', paddingBottom: '1em' }}
        >
          <MarketingButton
            bgColor='#33384F'
            textColor='#FFFFFF'
            linkTo={'/search/?keyword='}
          >
            Search Items
          </MarketingButton>
        </div>
      </div>

      <div className='marketing_image_xlg_container bg_grey height100p'>
        <div className='category_title_section pt-6'>
          <p className='category_main_title'>Discover Your Next Borrow</p>
          <p className='category_sub_title'>
            As our little shed grows into something big, you’ll be able to lend
            and borrow all sorts of stuff. Some of our popular categories
            include:
          </p>
        </div>
        <div className='category_card_section'>
          {categories.map(category => (
            <CategoryCard
              category={category}
              key={category.id}
              categoryCount={itemCountByCategories.find(
                itemCountByCategory =>
                  itemCountByCategory.category === category.itemCountName
              )}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Top

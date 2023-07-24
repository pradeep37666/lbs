import '../Marketing.css'
import './RentStuff.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import Footer from '../../../components/marketing/Footer/Footer'
import SearchInput from '../../../components/marketing/SearchInput/SearchInput'
import { RSSawing } from '../../../assets/Images/Marketings/Marketings'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import { categories } from '../../../assets/Data/MarketSelections'
import CategoryCard from '../../../components/marketing/CategoryCard/CategoryCard'
import { Link } from 'react-router-dom'

const RentStuff = () => {
  return (
    <div className='marketing_container'>
      <NavBar selected='rent_stuff' />

      <div className='marketing_img_md_find bg_rent_stuff center_items responsive_box_for_search'>
        <div className='search_title_section'>
          <p className='search_title pb-3'>Let’s find your next borrow</p>
          <div className='search_input_wrapper'>
            <SearchInput />
          </div>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_grey flex_box straight_column'>
        <div className='half_screen_center full_width'>
          <img
            src={RSSawing}
            className='graphic_image responsive_img_size'
            style={{ maxHeight: '28em', maxWidth: '28em' }}
            alt='graphic'
          />
        </div>
        <div
          className='eight_two_screen_center article_section full_width'
          style={{ padding: '0.5em' }}
        >
          <p className='marketing_main_title'>
            Get Set For Your Next DIY Project, Hobby Or Adventure!
          </p>
          <div style={{ paddingRight: '20px' }}>
            <p style={{ padding: '0 0.3em' }}>
              If you’re starting a DIY project, want to experiment with a new
              craft, or borrow hobby equipment to give a new activity a go,
              you've come to the right place. There’s no need to splash out on a
              brand new item you barely use or don’t have the space to store –
              it’s time to start borrowing!
            </p>
            <br />
            <p style={{ padding: '0 0.3em' }}>
              Our sharing platform makes it easy to search and book stuff from
              locals nearby. You can explore our listings via keyword, category,
              location, cost, and rating. Learn more about{' '}
              <Link
                class='underline_link'
                style={{ fontWeight: '600' }}
                to={'/how_it_works'}
              >
                how borrowing works
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <div className='marketing_image_xlg_container bg_white height100p'>
        <div className='category_title_section'>
          <p className='marketing_main_title pt-9'>Explore and Find </p>
          <h2 className='get_start_title_light'>
            As our little shed grows into something big, you’ll be able to find
            all sorts of stuff!
          </h2>
          <p className='category_sub_heading pt-7'>
            Checkout Our Categories{' '}
            <span style={{ paddingTop: '10px', fontSize: '18px' }}>▼</span>
          </p>
          <p className='category_sub_heading'></p>
        </div>
        <div
          className='category_card_section'
          style={{ marginBottom: '-30px', marginTop: '-20px' }}
        >
          {categories.map(category => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>
        <div className='get_start_section'>
          <p className='get_start_title'>Ready to borrow stuff?</p>
          <MarketingButton
            bgColor='#33384F'
            textColor='#FFFFFF'
            linkTo={'/register'}
          >
            Get Started
          </MarketingButton>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_grey flex_box center_items straight_column'>
        <div className='center_text_image full_width'>
          <p className='marketing_main_title text_align pt-5 text-center'>
            Want To Share Your Stuff And Earn Some Cash?
          </p>
          <div className='marketing_main_description text_align text-center'>
            <p>
              Anything you have in your ‘little shed’ – whether that’s a garage,
              a kitchen drawer or a cupboard shelf – could be useful for someone
              else. Why not lend your stuff to people in your area whfen not in
              use and make some extra cash on the side? We’ll take good care of
              you too so you can lend your items worry-free.{' '}
              <Link
                class='underline_link'
                style={{ fontWeight: '600' }}
                to={'/how_it_works'}
              >
                Learn more about sharing
              </Link>
              .
            </p>
          </div>
          <div className='pb-6' style={{ alignSelf: 'center' }}>
            <MarketingButton
              bgColor='#AC172C'
              textColor='#FFFFFF'
              linkTo={'/lend_your_stuff'}
            >
              Start Sharing
            </MarketingButton>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default RentStuff

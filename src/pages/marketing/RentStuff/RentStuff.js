import React from 'react'
import '../Marketing.css'
import './RentStuff.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import Footer from '../../../components/marketing/Footer/Footer'
import SearchInput from '../../../components/marketing/SearchInput/SearchInput'
import { CleaningWindow, RSSawing } from '../../../assets/Images/Marketings/Marketings'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import { categories } from '../../../assets/Data/MarketSelections'
import CategoryCard from '../../../components/marketing/CategoryCard/CategoryCard'

const RentStuff = () => {
    return (
        <div className='marketing_container'>
            <NavBar selected='rent_stuff'/>

            <div className='marketing_img_md_container bg_rent_stuff center_items responsive_box_for_search'>
                <div className='search_title_section'>
                    <p className='search_title title_shadow'>
                    Let’s Find Your Next Borrow
                    </p>
                    <div className='search_input_wrapper'>
                        <SearchInput />
                    </div>
                </div>
            </div>

            <div className='marketing_img_flexible_container bg_grey flex_box straight_column'>
                <div className='half_screen_center full_width'>
                    <img src={RSSawing} className='graphic_image responsive_img_size' style={{maxHeight: '28em', maxWidth: '28em'}} alt='graphic image'/>
                </div>
                <div className='half_screen_center article_section full_width' style={{padding: '0.5em'}}>
                    <p className='marketing_main_title'>
                    Get Set For Your next DIY Project, Hobby or Adventure!
                    </p>
                    <div style={{display: 'flex'}}>
                        <p style={{padding: '0 0.3em'}}>
                        If you’re starting a DIY project, want to experiment with a new craft, or borrow hobby equipment to give a new activity a go, you've come to the right place. There’s no need to splash out on a brand new item you barely use or don’t have the space to store – it’s time to start borrowing!
                        </p>
                        <p style={{padding: '0 0.3em'}}>
                        Our sharing platform makes it easy to search and book stuff from locals nearby. You can explore our listings via keyword, category, location, cost, and rating. Learn more about <a style={{fontWeight: '600'}} href='/#/how_it_works'>how borrowing works</a>.
                        </p>
                    </div>
                </div>
            </div>

            <div className='marketing_image_xlg_container bg_white height100p'>
                <div className='category_title_section'>
                    <p className='category_main_title'>
                    Checkout Our Categories
                    </p>
                </div>
                <div className='category_card_section'>
                    {categories.map(category => (
                    <CategoryCard category={category} key={category.id}/>
                    ))}
                </div>
                <div className='get_start_section'>
                    <p className='get_start_title'>
                    Ready to borrow stuff?
                    </p>
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
                    <p className='marketing_main_title text_align'>
                    Want To Share Your Stuff And Earn Some Cash?
                    </p>
                    <div className='marketing_main_description text_align'>
                        <p>
                        Anything you have in your ‘little shed’ – whether that’s a garage, a kitchen drawer or a cupboard shelf – could be useful for someone else.<br/><br/>
                        Why not lend your stuff to people in your area when not in use and make some extra cash on the side?<br/><br/>
                        We’ll take good care of you too so you can lend your items worry-free. <a style={{fontWeight: '600'}} href='/#/how_it_works'>Learn more about sharing</a>.
                        </p>
                    </div>
                    <MarketingButton
                        bgColor='#AC172C'
                        textColor='#FFFFFF'
                        linkTo={'/lend_your_stuff'}
                    >
                        Start Sharing
                    </MarketingButton>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default RentStuff
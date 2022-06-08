import React from 'react'
import '../Marketing.css'
import './RentStuff.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import SearchInput from '../../../components/marketing/SearchInput/SearchInput'
import { DummyImage, TopMowing } from '../../../assets/Images/Marketings/Marketings'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import { dummyCategory } from '../../../assets/Data/MarketSelections'
import CategoryCard from '../../../components/marketing/CategoryCard/CategoryCard'
import Footer from '../../../components/marketing/Footer/Footer'

const RentStuff = () => {
    return (
        <div className='marketing_container'>
            <NavBar selected='rent_stuff'/>

            <div className='marketing_img_md_container bg_rent_stuff center_items'>
                <div className='search_title_section'>
                    <p className='search_title'>
                    Let’s Find Your Next Borrow
                    </p>
                    <div className='search_input_wrapper'>
                        <SearchInput />
                    </div>
                </div>
            </div>

            <div className='marketing_img_md_container bg_grey flex_box'>
                <div className='half_screen_center'>
                    <img src={TopMowing} className='graphic_image' alt='graphic image'/>
                </div>
                <div className='half_screen_center article_section'>
                    <p className='marketing_main_title'>
                    Get Set For Your next DIY Project, Hobby or Adventure!
                    </p>
                    <div className='marketing_main_description'>
                        <p className='top_info_left_desc'>
                        If you’re starting a DIY project, want to experiment with a new craft, or borrow hobby equipment to give a new activity a go, you’ve come to the right place. There’s no need to splash out on a brand new item you barely use or don’t have the space to store – it’s time to start borrowing!
                        </p>
                        <p className='top_info_right_desc'>
                        Our sharing platform makes it easy to search and book stuff from locals nearby. You can explore our listings via keyword, category, location, cost, and rating. Learn more about how borrowing works.
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
                    {dummyCategory.map(category => (
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
                    >
                        Get Started
                    </MarketingButton>
                </div>
            </div>


            <div className='marketing_img_sm_container bg_grey flex_box center_items'>
                <div className='center_text_image add_padding_right'>
                    <p className='marketing_main_title text_align'>
                    Want To Share Your Stuff And Earn Some Cash?
                    </p>
                    <div className='marketing_main_description text_align'>
                        <p>
                        Anything you have in your ‘little shed’ – whether that’s a garage, a kitchen drawer or a cupboard shelf – could be useful for someone else.<br /><br /> 
                        Why not lend your stuff to people in your area when not in use and make some extra cash on the side? We’ll take good care of you too so you can lend your items worry-free. Learn more about sharing
                        </p>
                    </div>
                    <MarketingButton
                        bgColor='#AC172C'
                        textColor='#FFFFFF'
                    >
                        Start Sharing
                    </MarketingButton>
                </div>
                <div className='image_half_container'>
                    <img src={DummyImage} className='picture_image no_left_padding' alt='tradie image'/>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default RentStuff
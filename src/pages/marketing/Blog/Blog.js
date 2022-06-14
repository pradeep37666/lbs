import React, { useEffect, useState } from 'react'
import '../Marketing.css'
import './Blog.css'
import { SawingGuiter, TopMowing } from '../../../assets/Images/Marketings/Marketings'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import { categories, dummyBlog, dummyCategory, howItWorksProcedures } from '../../../assets/Data/MarketSelections'
import BlogCard from '../../../components/marketing/BlogCard/BlogCard'
import LBSStepCard from '../../../components/marketing/LBSStepCard/LBSStepCard'
import CategoryCard from '../../../components/marketing/CategoryCard/CategoryCard'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import Footer from '../../../components/marketing/Footer/Footer'

const Blog = () => {
  const [ clickedBlogId, setClickedBlogId ] = useState('')
  const [ selectedArticle, setSelectedArticle ] = useState('')

  useEffect(() => { 
    if (clickedBlogId === '') return
    const blogContent = dummyBlog.find(blog => blog.id === clickedBlogId)
    setSelectedArticle(blogContent)
  },[clickedBlogId])

  return (
    <div className='marketing_container'>
      <NavBar selected='info_hub'/>

      {clickedBlogId === '' &&
      <>
        <div className='marketing_img_md_container bg_blog'>
          <div className='main_title_section position_lower'>
            <p className='main_title'>
            Little Big Ideas
            </p>
          </div>
        </div>

        <div className='marketing_img_md_container bg_grey flex_box straight_column'>
          <div className='half_screen_center full_width'>
              <img src={SawingGuiter} className='graphic_image responsive_img_sm_size' alt='graphic image'/>
          </div>
          <div className='half_screen_center article_section full_width'>
              <p className='marketing_main_title'>
              Discover The Power Of Sharing
              </p>
              <div className='marketing_main_description'>
                  <p>
                  In our blog of Little Big Ideas, you can be sure to find tips for your next DIY project or hobby, insights into reducing waste, guides on creating opportunities in our neighbourhoods, plus stories and interviews from our community of sharers and carers.
                  </p>
              </div>
          </div>
        </div>

        <div className='marketing_image_fit_container bg_white'>
          <div className='blog_card_flex_box'>
          {dummyBlog.map(blog => (
            <BlogCard 
              blog={blog} 
              key={blog.id}
              setClickedBlogId={setClickedBlogId}
            />
          ))}
          </div>
        </div>
      </>
      }
      {selectedArticle !== '' &&
      <>
        <div 
          className='marketing_img_md_container'
          style={{backgroundImage: `url(${selectedArticle.image})`}}
        >
          <div className='main_title_section blog_title_position'>
            <p className='main_title'>
            {selectedArticle.title}
            </p>
          </div>
        </div>

        <div className='blog_article_container bg_white'>
          <p className='blog_article_title'>
            {selectedArticle.contentTitle}
          </p>
          <p className='blog_article_body' dangerouslySetInnerHTML={{__html: selectedArticle.contentBody}}>
            {/* {selectedArticle.contentBody} */}
          </p>
        </div>

        <div className='blog_instraction_sections bg_white'>
          <p className='blog_instraction_title'>
          How does Little Big Shed work?
          </p>
          <p className='blog_instraction_desc'>
          If you’re starting a DIY project power tools, want to experiment with a new craft creative/hobbies, or borrow hobby equipment sporting to give a new activity a go but don’t want to create waste by buying new, this platform is for you. It’ll help you save money by not buying something that will hardly get used or that you don’t have the storage space for.
          </p>
          <div className='blog_instraction_flex_box'>
          {howItWorksProcedures.map(step => (
            <LBSStepCard step={step} key={step.id}/>
          ))}
          </div>
          <p className='blog_instraction_desc'>
          Plus, we’ve got you covered if something goes wrong, so no worries if your item comes back damaged or is stolen. Check out our lender protection policy to find out more about how you can lend worry-free with our verified Little Big Shed users.
          </p>
        </div>

        <div className='marketing_image_xlg_container height100p bg_white'>
          <div className='category_title_section'>
            <p className='category_main_title'>
            What can you lend and borrow?
            </p>
            <p className='category_sub_title'>
            As our little shed grows into something big, you’ll be able to lend and borrow all sorts of stuff! Our categories will include listings for:
            </p>
          </div>
          <p className='blog_instraction_desc'>
          </p>
          <div className='category_card_section'>
            {categories.map(category => (
              <CategoryCard category={category} key={category.id}/>
            ))}
          </div>
          <p className='blog_instraction_desc'>
          What you have in your little shed can become part of something big – the sharing economy.<br /><br /> 
          By making a collective effort to buy less and lend and borrow more, we put less pressure on our planet’s natural resources meaning we can all contribute to protecting the planet.<br /><br />  
          Go on, connect and share with locals like you so we can all care for our place and our planet together!
          </p>
        </div>

        <div className='marketing_img_sm_container bg_blog_signup'>
          <div className='center_quote_btn'>
            <p className='lbs_quote_lgtext'>
            Ready To Start Borrowing?
            </p>
            <MarketingButton 
              bgColor={'#AC172C'}
              textColor={'#FFFFFF'}
            >
              Sign Up To Start Sharing
            </MarketingButton>
          </div>
        </div>        
      </>
      }

      <Footer />
    </div>
  )
}

export default Blog
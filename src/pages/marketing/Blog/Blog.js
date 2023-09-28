import { useEffect, useState } from 'react'
import '../Marketing.css'
import './Blog.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import {
  categories,
  howItWorksProcedures,
} from '../../../assets/Data/MarketSelections'
import BlogCard from '../../../components/marketing/BlogCard/BlogCard'
import LBSStepCard from '../../../components/marketing/LBSStepCard/LBSStepCard'
import CategoryCard from '../../../components/marketing/CategoryCard/CategoryCard'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import Footer from '../../../components/marketing/Footer/Footer'
import moment from 'moment'
import BlogService from '../../../services/blog'
import parser from "html-react-parser";
import getImage from '../../../util/getImage'
const blogService = new BlogService()

const Blog = () => {
  const [clickedBlogId, setClickedBlogId] = useState('')
  const [selectedArticle, setSelectedArticle] = useState('')
  const [blogData,setBlogData] = useState([])
 

  useEffect(() => {
    if (clickedBlogId === '') return
    const blogContent = blogData.find(blog => blog.id === clickedBlogId)
    setSelectedArticle(blogContent)
  }, [clickedBlogId])
  useEffect(()=>{
    (async ()=>{
      const data = await blogService.getBlogs()
      setBlogData(data.data)
    })()
  },[])

  return (
    <div className='marketing_container'>
      <NavBar selected='info_hub' />

      {clickedBlogId === '' && (
        <>
          <div className='marketing_img_md_container bg_blog'>
            <div className='main_title_section position_lower'>
              <p className='main_title'>Little big ideas</p>
              <p className='main_sub_title'>
                In our blog of Little Big Ideas, you can be sure to find tips
                for your next DIY project or hobby, insights into reducing
                waste, guides on creating opportunities in our neighbourhoods,
                plus stories and interviews from our community of sharers and
                carers.
              </p>
            </div>
          </div>

          <div className='marketing_image_fit_container bg_white blog_scroller'>
            <div className='blog_card_flex_box'>
              {blogData.length > 0 &&  blogData.map(blog => (
                <BlogCard
                  blog={blog}
                  key={blog.id}
                  setClickedBlogId={setClickedBlogId}
                />
              ))}
            </div>
          </div>
        </>
      )}
      {selectedArticle !== '' && (
        <>
          <div className='blog_title_container'>
            <div className='blog_banner_image_container'>
              <img
                className='blog_banner_image'
                src={getImage(selectedArticle.image)}
                alt='article'
              />
            </div>
            <div className='main_title_section blog_title_position'>
              <p className='main_title title_shadow'>
                {selectedArticle.bannerTitle}
              </p>
            </div>
          </div>

          <div className='blog_article_container bg_white'>
            <p className='blog_article_title'>{selectedArticle.contentTitle}</p>
            <p className='blog_article_body'>{parser(selectedArticle.contentBody)}</p>
          </div>

          {selectedArticle.id === 1 && (
            <div className='blog_instraction_sections bg_white'>
              <p className='blog_instraction_title'>
                How does Little Big Shed work?
              </p>
              <p className='blog_instraction_desc'>
                If you’re starting a DIY project power tools, want to experiment
                with a new craft creative/hobbies, or borrow hobby equipment
                sporting to give a new activity a go but don’t want to create
                waste by buying new, this platform is for you. It’ll help you
                save money by not buying something that will hardly get used or
                that you don’t have the storage space for.
              </p>
              <div className='blog_instraction_flex_box'>
                {howItWorksProcedures.map(step => (
                  <LBSStepCard step={step} key={step.id} />
                ))}
              </div>
              <p className='blog_instraction_desc'>
                Plus, we’ve got you covered if something goes wrong, so no
                worries if your item comes back damaged or is stolen. Check out
                our{' '}
                <a style={{ fontWeight: '600' }} href='/#/protection'>
                  lender protection
                </a>{' '}
                policy to find out more about how you can lend worry-free with
                our verified Little Big Shed users.
              </p>
            </div>
          )}

          <div className='marketing_image_xlg_container height100p bg_white'>
            <div className='category_title_section'>
              <p className='category_main_title'>
                What can you lend and borrow?
              </p>
              <p className='category_sub_title'>
                As our little shed grows into something big, you’ll be able to
                lend and borrow all sorts of stuff! Our categories will include
                listings for:
              </p>
            </div>
            <div className='category_card_section'>
              {categories.map(category => (
                <CategoryCard category={category} key={category.id} />
              ))}
            </div>
            <p className='blog_instraction_desc_bottom'>
              What you have in your little shed can become part of something big
              – the sharing economy. <br />
              <br />
              By making a collective effort to buy less and lend and borrow
              more, we put less pressure on our planet’s natural resources
              meaning we can all contribute to protecting the planet. <br />
              <br />
              Go on, connect and share with locals like you so we can all care
              for our place and our planet together!
            </p>
          </div>

          <div className='marketing_img_flexible_container bg_dark'>
            <div className='center_quote_btn'>
              <p className='lbs_quote_lgtext'>Ready To Start Borrowing?</p>
              <MarketingButton bgColor={'#AC172C'} textColor={'#FFFFFF'}>
                Sign Up To Start Sharing
              </MarketingButton>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

export default Blog

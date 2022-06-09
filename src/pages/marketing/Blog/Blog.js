import React from 'react'
import '../Marketing.css'
import './Blog.css'
import { TopMowing } from '../../../assets/Images/Marketings/Marketings'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import { dummyBlog } from '../../../assets/Data/MarketSelections'
import BlogCard from '../../../components/marketing/BlogCard/BlogCard'

const Blog = () => {
  return (
    <div className='marketing_container'>
      <NavBar selected='info_hub'/>

      <div className='marketing_img_md_container bg_about_us'>
        <div className='main_title_section position_lower'>
          <p className='main_title'>
          Little Big Ideas
          </p>
        </div>
      </div>

      <div className='marketing_img_md_container bg_grey flex_box'>
        <div className='half_screen_center'>
            <img src={TopMowing} className='graphic_image' alt='graphic image'/>
        </div>
        <div className='half_screen_center article_section'>
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
          <BlogCard blog={blog} key={blog.id}/>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
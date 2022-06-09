import React, { useEffect, useState } from 'react'
import '../Marketing.css'
import './Blog.css'
import { TopMowing } from '../../../assets/Images/Marketings/Marketings'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import { dummyBlog, howItWorksProcedures } from '../../../assets/Data/MarketSelections'
import BlogCard from '../../../components/marketing/BlogCard/BlogCard'
import LBSStepCard from '../../../components/marketing/LBSStepCard/LBSStepCard'

const Blog = () => {
  const [ clickedBlogId, setClickedBlogId ] = useState(1)
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
        </div>
      </>
      }
    </div>
  )
}

export default Blog
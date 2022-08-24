import React from 'react'
import './BlogCard.css'

const BlogCard = ({ blog, setClickedBlogId }) => {

    return (
        <div 
            className='blog_card_container'
            onClick={() => setClickedBlogId(blog.id)}
        >
            <img 
                src={blog.image} alt='blog top' 
                className='blog_card_image'
            />
            <p className='blog_card_title'>
                {blog.metaTitle}
            </p>
            <p className='blog_card_category'>
                {blog.category.join(' / ')}
            </p>
            <p className='blog_card_content'>
                {blog.metaDesc}
            </p>
            <p className='blog_card_postedDate'>
                {blog.publishDate}
            </p>
        </div>
    )
}

export default BlogCard
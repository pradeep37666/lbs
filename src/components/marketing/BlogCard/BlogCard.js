import React from 'react'
import './BlogCard.css'

const BlogCard = ({ blog }) => {

    return (
        <div 
            className='blog_card_container'
            
        >
            <img 
                src={blog.image} alt='blog top' 
                className='blog_card_image'
            />
            <p className='blog_card_title'>
                {blog.title}
            </p>
            <p className='blog_card_category'>
                {blog.category.join(' / ')}
            </p>
            <p className='blog_card_content'>
                {blog.content}
            </p>
            <p className='blog_card_postedDate'>
                {blog.postedDate}
            </p>
        </div>
    )
}

export default BlogCard
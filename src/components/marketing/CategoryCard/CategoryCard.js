import React from 'react'
import './CategoryCard.css'
import { useHistory } from 'react-router-dom'

const CategoryCard = ({ category }) => {
    const history = useHistory()

    const searchByCategory = () => {
        history.push(`/search/?keyword=&category=${category?.category}`)
    }

    return (
        <div 
            className='category_card_container' 
            key={category.id}
            style={{backgroundImage: `url(${category.image})`}}
            onClick={searchByCategory}
        >
            <div className='category_card_title_container'>
                <p className='category_card_title'>
                    {category.category}
                </p>
                <p className='category_card_items'>
                    {category.items} items
                </p>
            </div>
        </div>
    )
}

export default CategoryCard
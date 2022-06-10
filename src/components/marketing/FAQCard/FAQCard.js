import React from 'react'
import './FAQCard.css'

const FAQCard = ({ question }) => {
  return (
    <div className='faq_card_container'>
      <p className='faq_card_main_title'>
        {question.title}
      </p>
      <p className='faq_card_sub_title'>
        {question.content}
      </p>
    </div>
  )
}

export default FAQCard
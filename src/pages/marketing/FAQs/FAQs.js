import React, { useEffect, useState } from 'react'
import '../Marketing.css'
import './FAQs.css'
import FAQCard from '../../../components/marketing/FAQCard/FAQCard'
import FAQTabBar from '../../../components/marketing/FAQTabBar/FAQTabBar'
import Footer from '../../../components/marketing/Footer/Footer'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import { FQA_TABS } from '../../../assets/Data/LBSEnum'
import {
  dummyQuestions,
  FAQ_Borrower_Data,
  FAQ_General_Data,
  FAQ_Lender_Data,
} from '../../../assets/Data/MarketSelections'

const FAQs = () => {
  const [selectedTab, setSelectedTab] = useState(FQA_TABS.GENERAL)
  // const [ selectedQuestions, setSelectedQuestions ] = useState([])

  // useEffect(() => {
  //   // requestion question data and store into selectedQuestions
  // },[selectedTab])

  const renderFAQs = () => {
    switch (selectedTab) {
      case FQA_TABS.GENERAL:
        return FAQ_General_Data
      case FQA_TABS.LENDER:
        return FAQ_Lender_Data
      case FQA_TABS.BORROWER:
        return FAQ_Borrower_Data
      default:
        return
    }
  }

  return (
    <div className='marketing_container'>
      <NavBar selected='info_hub' />

      <div className='marketing_img_md_container bg_faqs'>
        <div className='main_title_section protection_title_position'>
          <p className='main_title title_shadow'>FAQs for sharing</p>
          <p className='main_sub_title sub_title_width sub_title_shadow'>
            Have a question or after more info on lending and borrowing on
            Little Big Shed? You’ve come to the right place! <br />
            <br />
            If what you’re looking for isn’t answered below, feel free to{' '}
            <a href='/#/contact_us'>Ask a Question</a>
          </p>
        </div>
      </div>

      <div className='marketing_image_fit_container bg_dark'>
        <div className='faqs_title_container'>
          <p className='faqs_main_title'>
            Protecting our Little Big Shed Users
          </p>
          <p className='faqs_sub_title'>
            Your safety and security when using our sharing platform is of high
            importance. We want to make sure that you feel comfortable and
            protected when lending and borrowing via our shed. Check out the
            policies below:
          </p>
        </div>
        <div className='faqs_question_container'>
          <FAQTabBar
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div className='faqs_question_list_container'>
            {renderFAQs().map(question => (
              <FAQCard question={question} key={question.id} />
            ))}
          </div>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_dark'>
        <div className='center_quote_btn'>
          <p className='lbs_quote_lgtext' style={{ color: 'white' }}>
            Got A Question Not Answered Here?
          </p>
          <MarketingButton
            bgColor={'#E9D8B4'}
            textColor={'#33384F'}
            linkTo={'/contact_us'}
          >
            Ask A Question
          </MarketingButton>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default FAQs

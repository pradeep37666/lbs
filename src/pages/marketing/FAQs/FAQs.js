import React, { useEffect, useState } from 'react'
import '../Marketing.css'
import './FAQs.css'
import FAQCard from '../../../components/marketing/FAQCard/FAQCard'
import FAQTabBar from '../../../components/marketing/FAQTabBar/FAQTabBar'
import Footer from '../../../components/marketing/Footer/Footer'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import { FQA_TABS } from '../../../assets/Data/LBSEnum'
import { dummyQuestions } from '../../../assets/Data/MarketSelections'

const FAQs = () => {
  const [ selectedTab, setSelectedTab ] = useState(FQA_TABS.GENERAL)
  // const [ selectedQuestions, setSelectedQuestions ] = useState([])

  // useEffect(() => {
  //   // requestion question data and store into selectedQuestions
  // },[selectedTab])

  return (
    <div className='marketing_container'>
      <NavBar selected='info_hub' />

      <div className='marketing_img_md_container bg_faqs'>
        <div className='main_title_section protection_title_position'>
          <p className='main_title'>
          No Worries If Your Item Comes Back Damaged Or Is Stolen – We’ve Got You Covered!
          </p>
          <p className='main_sub_title sub_title_width'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </div>
      </div>

      <div className='marketing_image_fit_container bg_dark'>
        <div className='faqs_title_container'>
          <p className='faqs_main_title'>
          Guides And Answer From Little Big Shed
          </p>
          <p className='faqs_sub_title'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.
          </p>
        </div>
        <div className='faqs_question_container'>
          <FAQTabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
          <div className='faqs_question_list_container'>
            {dummyQuestions.map(question => (
              <FAQCard question={question} key={question.id}/>
            ))}
          </div>
        </div>
      </div>

      <div className='marketing_img_sm_container bg_faqs_signup'>
        <div className='center_quote_btn'>
          <p className='lbs_quote_lgtext'>
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
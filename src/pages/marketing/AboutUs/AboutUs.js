import React, { useState } from 'react'
import '../Marketing.css'
import './AboutUs.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import {
  Sarmuhabat,
  SignUpImg,
  WashingAndSawing,
} from '../../../assets/Images/Marketings/Marketings'
import MarketingButton from '../../../components/marketing/MarketingButton/MarketingButton'
import { teamMembers } from '../../../assets/Data/MarketSelections'
import MemberCard from '../../../components/marketing/MemberCard/MemberCard'
import Footer from '../../../components/marketing/Footer/Footer'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  const [isBioOpen, setIsBioOpen] = useState(false)

  return (
    <div className='marketing_container'>
      <NavBar selected='about_us' />

      <meta
        title='Our mission for zero waste, equality and sustainable living'
        content='The power of sharing can help achieve zero waste and social equality. Learn how our free app connects communities and supports sustainable living.'
      />

      {isBioOpen ? (
        <>
          <div className='blog_title_container mt-2 '>
            <div className='blog_banner_image_container'>
              <img
                className='blog_banner_image'
                src={Sarmuhabat}
                alt={'profile'}
              />
            </div>
          </div>
          <div className='blog_article_container bg_white'>
            <p className='blog_article_title'>Sarmuhabat Singh | Founder</p>
            <p className='blog_article_body'>
              Social entrepreneur and business lecturer, Sarmuhabat Singh,
              believes that one's success and resources should be shared within
              the community to help support society as a whole. He’s currently
              looking to borrow a pair of hedge clippers to take care of a few
              jobs in the garden.
            </p>
            <p className='blog_article_body'>
              With roots descending from a long line of Punjab farmers,
              Sarmuhabat learnt the importance of cultivating land, growing
              vegetables, and doing things by hand from a young age. Although
              academia never came naturally to him, Sarmuhabat discovered his
              strength and purpose in business and entrepreneurship after moving
              to Australia as an international student.
              <br />
              <br />
              During his Executive MBA research project with RMIT Melbourne,
              Sarmuhabat uncovered the heartbreaking statistics of Australia's
              recycling crises. Research showed that developed countries are
              recycling less than 30% of plastic with only 56% of all packaging
              being recovered and recycled.
              <br />
              <br />
              There must be something he could do to help.
              <br />
              <br />
              While unpacking a new lawnmower, an idea came to mind. He thought,
              ‘If we all need to take care of our place, why should we all
              purchase several tools that spend most of their time sitting in
              the shed?’ “The a-ha moment for me came when I realised how many
              of my neighbours were doing the same thing. There are some tools
              you may only need once, and not everyone has the means to buy
              every tool. Many people, including myself, hesitate to ask their
              neighbours if we can share things and help each other out.”
              <br />
              <br />
              The solution to our waste crisis is not about bettering our
              recycling system but finding ways to move to zero waste. One way
              is to revitalise the power of sharing.
              <br />
              <br />
              And so Little Big Shed was born – an online platform to share
              tools, equipment, hobby gear and more between neighbours. A
              platform intended to eliminate barriers and enable people to
              connect, share, earn and thrive. Read more about our Little Big
              Shed evolution and global mission in our Founder’s Story blog.
              <br />
              <br />
              Sarmuhabat is currently pursuing his Doctorate in Business
              Administration from the University of Technology Sydney in
              collaboration with the Business Science Institute, Luxembourg and
              Lyon University, France. His research explores the most effective
              government policies required in Victoria to achieve the targeted
              50% new car sales to be zero-emission vehicles by 2030.
              <br />
              <br />
              With dedication, courage and integrity, Sarmuhabat has proved his
              abilities in business, management, and leadership levels. His
              diverse business portfolio consists of retail, e-commerce,
              pre-delivery services for automotive retailers and a
              not-for-profit venture that produces and publishes audiobooks in
              the Punjabi language.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className='marketing_img_md_container bg_about_us'>
            <div className='main_title_section position_lower'>
              <p className='main_title title_shadow'>
                A little idea, with a big impact
              </p>
            </div>
          </div>

          <div className='marketing_img_flexible_container bg_grey flex_box center_items straight_column'>
            <div className='center_text_image full_width pb-9'>
              <p className='marketing_main_title pt-8'>
                A Way We Can All Be Zero Waste
              </p>
              <div>
                <p>
                  Our little idea to create a sharing culture among neighbours
                  is a practical way to reduce waste and support each other.
                  <br />
                  <br />
                  It’s a shocking reality that developed countries such as New
                  Zealand and Australia recycle less than 30% of plastic – with
                  packaging being the single largest contributor to waste. The
                  fact that big box retailers make stuff so cheap and easy to
                  buy doesn’t help the situation.
                </p>
                <br />
                <p>
                  What can we do about it?
                  <br />
                  <br />
                  Sharing is one of the ways we can all do our bit to help
                  achieve zero waste. Little Big Shed does this by people using
                  stuff only when required. We don’t all need to own the same
                  tools, equipment or hobby gear that spend most of their life
                  sitting in the shed!
                </p>
              </div>
            </div>
          </div>

          <div className='marketing_img_flexible_container bg_wall flex_box center_items straight_column'>
            <div className='image_half_container four_to_six full_width'>
              <img
                src={WashingAndSawing}
                className='picture_image no_left_padding'
                alt='tradie'
              />
            </div>
            <div className='half_screen_center six_to_four column_section align_start text_container_width'>
              <p className='marketing_main_title'>The Power Of Sharing</p>
              <p>
                Through buying less, and lending and borrowing more, we can
                reimagine supply chains and make a collective effort to support
                sustainable living. Not only does this put less pressure on our
                planet’s natural resources but, by sharing within our
                communities, we can remove barriers of social disparity. <br />
                <br />
                We believe that no one should be restricted from doing a DIY
                project, cultivating their talents or going on an adventure due
                to a lack of resources. By lending and borrowing within our
                community, everyone can afford to make, mend, learn (and earn!).
                Sharing should be as easy, accessible and beneficial as
                possible. That’s why we decided to have no platform service fee.
                We cover the costs for the smooth sailing of our shed so that
                you can earn more when you do good sharing your stuff.
                <br />
                <br />
                Little Big Shed enables people to connect, share, earn and
                thrive, for the collective purpose of doing good. Read more
                about the inspiring evolution of Little Big Shed in our
                Founder’s Story blog.
                <br />
                <br />A LITTLE sharing really can make a BIG difference – for
                us, our community and the planet. Are you ready to{' '}
                <Link
                  class='underline_link'
                  style={{ fontWeight: '600' }}
                  to={'/rent_stuff'}
                >
                  borrow more
                </Link>
                , buy less, and make some extra cash when you{' '}
                <Link
                  class='underline_link'
                  style={{ fontWeight: '600' }}
                  to={'/lend_your_stuff'}
                >
                  lend your stuff
                </Link>
                ?
              </p>
              <div className='pt-4'>
                <MarketingButton
                  bgColor={'#AC172C'}
                  textColor={'#FFFFFF'}
                  linkTo={'/register'}
                >
                  <p className='button_font'>Sign Up To Start Sharing</p>
                </MarketingButton>
              </div>
            </div>
          </div>

          <div className='marketing_img_sm_container bg_dark flex_box center_items straight_column'>
            <div className='center_text_image full_width'>
              <p className='marketing_main_title text_align dark_mode_text'>
                Sarmuhabat Singh | Founder
              </p>
              <p style={{ color: 'white', fontSize: '1.1em' }}>
                Social entrepreneur and business lecturer, Sarmuhabat Singh,
                believes that one’s success and resources should be shared
                within the community to help support society as a whole.
              </p>
              <div className='pt-4'>
                <button
                  className='marketing_btn_container'
                  style={{ background: '#E9D8B4', color: '#33384F' }}
                  onClick={() => {
                    window.scrollTo(0, 0)
                    setIsBioOpen(true)
                  }}
                >
                  <p className='button_font'>Read More: Full Bio</p>
                </button>
              </div>
            </div>
            <div className='image_half_container full_width'>
              <img
                src={Sarmuhabat}
                className='picture_image'
                style={{ objectFit: 'contain' }}
                alt='tradie'
              />
            </div>
          </div>

          <div className='marketing_img_md_container bg_white height100p center_member_items'>
            <p className='marketing_main_title margin_bottom pt-3'>Our Team</p>
            <div className='category_card_section'>
              {teamMembers.map(member => (
                <MemberCard member={member} key={member.id} />
              ))}
            </div>
          </div>

          <div className='marketing_img_sm_banner'>
            <div className='center_quote_btn'>
              <p className='lbs_quote_lgtext pt-1'>
                Ready To Start Earning And Do Good?
              </p>
              <MarketingButton
                bgColor={'#33384F'}
                textColor={'#FFFFFF'}
                linkTo={'/register'}
              >
                <p className='button_font about_us_cta'>
                  Sign Up To Start Sharing
                </p>
                <img src={SignUpImg} className='app_icons' alt='signup icon' />
              </MarketingButton>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  )
}

export default AboutUs

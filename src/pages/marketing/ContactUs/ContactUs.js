import React, { useState } from 'react'
import '../Marketing.css'
import './ContactUs.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import ContactTextInput from '../../../components/marketing/ContactTextInput/ContactTextInput'
import Footer from '../../../components/marketing/Footer/Footer'

const ContactUs = () => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ isChecked, setIsChecked ] = useState(false)

  const handleSubmit = () => {
    // submit message here
  }

  return (
    <div className='marketing_container'>
      <NavBar />

      <div className='marketing_img_md_container bg_contact_us'>
        <div className='main_title_section protection_title_position'>
          <p className='main_title'>
          Get In Touch
          </p>
        </div>
      </div>

      <div className='marketing_img_flexible_container bg_grey flex_box center_items straight_column'>
        <p className='contact_detail_title' style={{maxWidth: '70%', padding: '0', paddingTop: '1rem'}}>
        We’re here to help! If you haven’t found what you’re looking for in our Guides and FAQs or Blog feel free to fill out the form below with your query and we’ll get back to you soon.
        </p>
      </div>

      <div className='marketing_img_md_container bg_grey flex_box center_items responsive_contact_container'>
        <div className='image_half_container contact_img_bg'></div>
        <div className='contact_input_container'>
          <div className='contact_input_box'>
            <div className='flex_box contact_box_responsive'>
              <div className='input_fields_left'>
                <ContactTextInput 
                  label='First Name'
                  inputValue={firstName}
                  setInput={setFirstName}
                />
                <ContactTextInput 
                  label='Last Name'
                  inputValue={lastName}
                  setInput={setLastName}
                />
                <ContactTextInput 
                  label='Email'
                  inputValue={email}
                  setInput={setEmail}
                />
                <ContactTextInput 
                  label='Phone Number'
                  inputValue={number}
                  setInput={setNumber}
                />
              </div>
              <div className='input_fields_right'>
                <ContactTextInput 
                  label='Your Message'
                  inputValue={message}
                  setInput={setMessage}
                />
                <div className='news_letter_box'>
                  <div className='news_title_box'>
                    <p className='news_main_title'>
                    Subscribe To News Letters
                    </p>
                    <p className='news_sub_title'>
                    Subscribe to our Little Big Shed email updates.
                    </p>
                  </div>
                  <div className='news_checkbox_container'>
                    <input 
                      type='checkbox' 
                      className='news_checkbox_input' 
                      checked={isChecked}
                      onClick={() => setIsChecked(!isChecked)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='submit_btn_container'>
              <button
                className='submit_message_btn'
                onClick={handleSubmit}
              >
              Send Message
              </button>
            </div>
          </div>
          <div className='contact_details_box'>
            <div className='contact_number_box'>
              <p className='contact_detail_title'>
              Call Our Help Line
              </p>
              <p className='contact_detail_content'>
              0800 1234
              </p>
            </div>
            <div className='contact_email_box'>
              <p className='contact_detail_title'>
              Email Our Support Center
              </p>
              <p className='contact_detail_content'>
              support@littlebigshe.co.nz
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactUs
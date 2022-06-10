import React, { useState } from 'react'
import '../Marketing.css'
import './ContactUs.css'
import NavBar from '../../../components/marketing/NavBar/NavBar'
import ContactTextInput from '../../../components/marketing/ContactTextInput/ContactTextInput'

const ContactUs = () => {
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ number, setNumber ] = useState('')
  const [ message, setMessage ] = useState('')

  const handleSubmit = () => {
    // submit message here
  }

  return (
    <div className='marketing_container'>
      <NavBar />

      <div className='marketing_img_md_container bg_faqs'>
        <div className='main_title_section protection_title_position'>
          <p className='main_title'>
          Get In Touch
          </p>
          <p className='main_sub_title sub_title_width'>
          We’re here to help! If you haven’t found what you’re looking for in our Guides and FAQs or Blog feel free to fill out the form below with your query and we’ll get back to you soon.
          </p>
        </div>
      </div>

      <div className='marketing_img_md_container bg_grey flex_box center_items'>
        <div className='image_half_container contact_img_bg'></div>
        <div className='contact_input_container'>
          <div className='contact_input_box'>
            <div className='flex_box'>
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
                  <div>
                    <p>
                    Subscribe To News Letters
                    </p>
                    <p>
                    Subscribe to our Little Big Shed email updates.
                    </p>
                  </div>
                  {/* checkbox */}
                </div>
              </div>
            </div>
            <div className='submit_btn_container'>
              <button
                className='submit_message_btn'
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
    </div>
  )
}

export default ContactUs
import React from 'react'
import './ContactTextInput.css'

const ContactTextInput = ({ label, inputValue, setInput }) => {
    return (
        <div className='contact_text_input_container'>
            <p className='contact_text_label'>
                {label}
            </p>
            {label !== 'Your Message'
            ?
            <input 
                type='text'
                className='contact_text_input_field'
                value={inputValue}
                onChange={e => setInput(e.target.value)}
            />
            :
            <textarea 
                type='text'
                className='contact_textarea_input_field'
                value={inputValue}
                onChange={e => setInput(e.target.value)}
            />
            }
        </div>
    )
}

export default ContactTextInput
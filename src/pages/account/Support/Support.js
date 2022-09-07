import React, { useState } from 'react'
import Button from '../../../components/Button/Button'
import './Support.css'

const Support = () => {
    const [ reason, setReason ] = useState('')
    const [ experience, setExperience ] = useState('')

    const handleSubmit = () => {
        console.log('this is called')
        console.log({reason})
        console.log({experience})
    }

    return (
        <div className='Support_Container'>
            <div className='Support_Header'>
                Reason for support
            </div>
            <div className='Suppor_Description'>
                Tell us the reason why you are contacting support.
                This will help us understand your problem better.
            </div>
            <input 
                type='text' 
                className='Support_Input_Field'
                placeholder='Your Reason...'
                onChange={(e) => setReason(e.target.value)}
            />

            <div className='Support_Header'>
                What are you experiencing?
            </div>
            <div className='Suppor_Description'>
                Let us know as much detail as possible the problem you are experiencing.
            </div>
            <textarea 
                rows='10'
                className='Support_Textarea'
                placeholder='Tell us about your experience...'
                onChange={(e) => setExperience(e.target.value)}
            />

            <Button 
                text='Submit'
                onClick={handleSubmit}
            />
        </div>
    )
}

export default Support
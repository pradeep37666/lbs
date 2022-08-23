import React from 'react'
import './StepCard.css'

const StepCard = ({ step }) => {
    return (
        <div className='step_card_container' key={step.id}>
            <div className='step_card_image_box'>
                <img 
                    src={step.icon}
                    className='step_card_icon'
                />
            </div>
            <p className='step_card_title'>{step.title}</p>
            <p className='step_card_description'>{step.description}</p>
            <div className='step_card_long_description'>
                {step.procedureDesc}
            </div>
        </div>
    )
}

export default StepCard
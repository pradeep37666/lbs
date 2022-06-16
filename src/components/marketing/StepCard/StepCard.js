import React from 'react'
import './StepCard.css'

const StepCard = ({ step }) => {
    return (
        <div className='step_card_container' key={step.id}>
            <img 
                src={step.icon}
                className='step_card_icon'
            />
            <p className='step_card_title'>{step.title}</p>
            <p className='step_card_description'>{step.description}</p>
            <p className='step_card_long_description'>{step.description1}</p>
            <p className='step_card_long_description'>{step.description2}</p>
        </div>
    )
}

export default StepCard
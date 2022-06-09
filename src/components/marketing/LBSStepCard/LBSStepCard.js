import React from 'react'
import './LBSStepCard.css'

const LBSStepCard = ({ step }) => {
    return (
        <div className='lbs_step_card_container'>
            <img 
                src={step.icon}
                className='lbs_step_card_icon'
            />
            <p className='lbs_step_card_title'>
                {step.title}
            </p>
            <p className='lbs_step_card_description'>
                {step.description}
            </p>
        </div>
    )
}

export default LBSStepCard
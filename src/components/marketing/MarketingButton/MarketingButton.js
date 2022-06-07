import React from 'react'
import './MarketingButton.css'

const MarketingButton = ({ bgColor, textColor, children }) => {
  return (
    <div className='marketing_btn_container' style={{background: bgColor, color: textColor}}>
        {children}
    </div>
  )
}

export default MarketingButton
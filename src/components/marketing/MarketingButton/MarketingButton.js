import React from 'react'
import './MarketingButton.css'

const MarketingButton = ({ bgColor, textColor, width, children }) => {
  return (
    <div 
      className='marketing_btn_container' 
      style={{background: bgColor, color: textColor, width: width}}
    >
        {children}
    </div>
  )
}

export default MarketingButton
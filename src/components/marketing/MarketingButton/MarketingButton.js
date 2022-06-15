import React from 'react'
import { Link } from 'react-router-dom'
import './MarketingButton.css'

const MarketingButton = ({ bgColor, textColor, width, linkTo, children }) => {
  return (
    <Link 
      className='marketing_btn_container' 
      style={{background: bgColor, color: textColor, width: width}}
      to={linkTo}
    >
        {children}
    </Link>
  )
}

export default MarketingButton
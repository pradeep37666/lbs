import React from 'react'
import { Link } from 'react-router-dom'
import './MarketingButton.css'

const MarketingButton = ({
  bgColor,
  textColor,
  width,
  linkTo,
  children,
  onClick,
}) => {
  return (
    <Link
      className='marketing_btn_container'
      style={{ background: bgColor, color: textColor, width: width }}
      to={linkTo ?? ''}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export default MarketingButton

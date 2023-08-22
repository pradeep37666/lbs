import React from 'react'
import './cancelborrow.css'
import { ReactComponent as Logo } from './../../assets/Logos/LogoRed.svg'

function CancelBorrow(props) {
  return (
    <div className='LoginMain centeredContent '>
      <Logo />
      <div className='LoginHeader '>
        Are you sure you want to cancel your borrow?
      </div>
      <div className='LoginText'>
        By cancelling this borrow you will forfeit the time slot that has been
        allocated to your borrow.
      </div>
      <div className='LoginText'>
        You will also only be refunded 80% of your initial borrow deposit to
        account for our handling fees.
      </div>
      <button
        className='LoginFormButton'
        style={{ marginBottom: '2%' }}
        onClick={() => {
          null
        }}
      >
        <div className='ItemButtonFlex'>Confirm Cancel</div>
      </button>
      <button
        className='LoginFormButton LoginFormButtonInverted'
        onClick={() => {
          null
        }}
      >
        Go Back
      </button>
    </div>
  )
}

export default CancelBorrow

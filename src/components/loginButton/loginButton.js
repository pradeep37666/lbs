import React from 'react';
import './loginButton.css';
import Icon from './../../assets/Icons/ProfileIcon.png';


const loginButton = () => {
  return (
    <button className="LoginButton">
      <div className="LoginFlex">
      <img src={Icon} alt="login button" className="LoginIcon"/>
      
      <div>Login</div>
      </div>

      
      </button>
  )
}

export default loginButton;
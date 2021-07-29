import React from 'react';
import './loginButton.css';
import {ReactComponent as Icon} from './../../assets/Icons/UserOutlineWhite.svg';

const loginButton = () => {
  return (
    <button className="LoginButton">
      <Icon className="LoginIcon"/>
      
      <div>Login</div>

      </button>
  )
}

export default loginButton;
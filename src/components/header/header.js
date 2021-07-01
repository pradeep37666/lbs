import React from 'react';
import './header.css';
import Logo from './../../assets/Logos/LBS_Logo_Flat_White.png';
import Input from './../textInput/textInput.js';
import Search from './../searchButton/searchButton.js';
import Login from './../loginButton/loginButton.js';

export default function header() {
  return (
    <div className="HeaderBar">

      <img src={Logo} alt="Logo" className="HeaderLogo"/>

      <div className="SearchWrapper">
        <Input placeholder="Search for stuff" fontSize="16px" margin="0 25px 0 0" width="100%" />
        <Search height="16px"/>
        
      </div>

      <div className="LoginWrapper">
        <Login />
      </div>
      

      
    </div>
  )
}

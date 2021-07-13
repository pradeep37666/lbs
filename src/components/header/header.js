import React, { useEffect, useState } from 'react';
import './header.css';
import Logo from './../../assets/Logos/LBS_Logo_Flat_White.png';
import Input from './../textInput/textInput.js';
import Search from './../searchButton/searchButton.js';
import Login from './../loginButton/loginButton.js';
import { Link } from 'react-router-dom';

export default function Header() {

  const [HeaderSticky, setHeaderSticky] = useState(false);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setHeaderSticky(scrollY > lastScrollY ? false : true);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [HeaderSticky]);

  return (
    <div className={`HeaderBar ${HeaderSticky ? 'HeaderBarSticky' : ''}`}>
      <Link to="/"><img src={Logo} alt="Logo" className="HeaderLogo"/></Link>
      

      <div className="SearchWrapper">
        <Input placeholder="Search for stuff" fontSize="16px" margin="0 25px 0 0" width="100%" padding="1em 0.6em" />
        <Search height="16px"/>
        
      </div>

      <div className="LoginWrapper">
        <Link to="/login" style={{width: '100%'}}>
        <Login />
        </Link>
      </div>
      

      
    </div>
  )
}

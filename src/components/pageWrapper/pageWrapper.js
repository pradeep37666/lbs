import React from 'react';
import './pageWrapper.css';
import Header from './../header/header.js';
import Footer from '../footer/Footer.js';

const pageWrapper = (props) => {
  return (
    <div className="PageWrapper">
      <Header />

      {props.children}

      <Footer />
      
    </div>
  )
}

export default pageWrapper;

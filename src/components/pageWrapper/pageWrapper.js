import React from 'react';
import './pageWrapper.css';
import Header from './../header/header.js';
<<<<<<< HEAD
import Footer from '../footer/footer'
=======
import Footer from '../footer/footer.js'
>>>>>>> trades

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

import React from 'react';
import './searchButton.css';
import Icon from './../../assets/Icons/SearchIcon.svg';
import { Link } from 'react-router-dom';

export default function SearchButton(props) {
  return (
    // <Link to={`/search/${props.keywords}`}>
    <button className="SearchButton">
      <div className="SearchButtonFlex">
      
        <img src={Icon} alt="search button" />
        <div>{props.buttonText}</div>
      </div>
      </button>
    // {/* </Link> */}
  )
}
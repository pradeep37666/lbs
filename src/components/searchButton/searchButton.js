import React from 'react';
import './searchButton.css';
import Icon from './../../assets/Icons/SearchIcon.svg';

export default function SearchButton(props) {
  return (
    <button className="SearchButton">
      <div className="SearchButtonFlex">
      <img src={Icon} alt="search button" />
        <div>{props.buttonText}</div>
      </div>

      </button>
  )
}
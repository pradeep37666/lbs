import React from 'react';
import './searchButton.css';
import {ReactComponent as Icon} from './../../assets/Icons/SearchIcon.svg';

export default function SearchButton(props) {
  return (
    <button className="SearchButton">
      <div className="SearchButtonFlex">
        <Icon />
        <div>{props.buttonText}</div>
      </div>

      </button>
  )
}
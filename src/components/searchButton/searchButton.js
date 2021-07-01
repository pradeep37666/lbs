import React from 'react';
import './searchButton.css';
import Icon from './../../assets/Icons/SearchIcon.png';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  searchIcon: props => ({
    height: props.iconHeight,
  })
})

export default function SearchButton(props) {
  const classes = useStyles(props);
  return (
    <button className="SearchButton">
      <div className="SearchButtonFlex">
        <img src={Icon} alt="search button" className={`SearchIcon ${classes.searchIcon}`}/>
        <div>{props.buttonText}</div>
      </div>

      </button>
  )
}
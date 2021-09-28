import { React, useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import './categorySelect.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import ArrowDown from '@material-ui/icons/ExpandMore';
import {ReactComponent as CarIcon} from './../../assets/Icons/AutomotiveIcon.svg';
import {ReactComponent as BBQIcon} from './../../assets/Icons/BBQIcon.svg';
import {ReactComponent as CleaningIcon} from './../../assets/Icons/CleaningIcon.svg';
import {ReactComponent as CreativeIcon} from './../../assets/Icons/CreativeIcon.svg';
import {ReactComponent as DrillIcon} from './../../assets/Icons/DrillIcon.svg';
import {ReactComponent as HammerIcon} from './../../assets/Icons/HammerIcon.svg';
import {ReactComponent as OfficeIcon} from './../../assets/Icons/OfficeIcon.svg';
import {ReactComponent as PaintingIcon} from './../../assets/Icons/PaintingIcon.svg';
import {ReactComponent as SportingIcon} from './../../assets/Icons/SportingIcon.svg';
import {ReactComponent as MowingIcon} from './../../assets/Icons/MowingIcon.svg';


const BootstrapInput = withStyles((theme) => ({
  input: {
    textAlign: 'left',
    fontFamily: ['DMSans, sans-serif'].join(','),
    '&:focus': {
      backgroundColor: '#FFFFFF',
      borderRadius: '15px',
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  inputDiv: props => ({
    width: props.width,
    position: 'relative',
    margin: props.margin,
    maxHeight: '74px',
  }),
  inputLabel: props => ({
    display: (props.label === '') ? 'none' : 'block',
    position: 'absolute',
    top: '10px', 
    left: '20px',
    fontWeight: 'bold',
    color: '#bcbcbc',
    fontSize: '10px',
    zIndex: 10,
  }),
  dropDown: props => ({
    border: props.thinBorder ? '1px solid #95272f' : '2px solid #95272f',
    borderRadius: '15px',
    boxSizing: 'content-box',
    "& .MuiMenuItem-root": {
      fontFamily: 'DMSans, sans-serif',
      fontSize: '14px',
    }
  }),
  select: props => ({
    border: props.thinBorder ? '1px solid #95272f' : '2px solid #95272f',
    fontSize: props.thinBorder ? '18px' : '20px',
    fontWeight: props.thinBorder ? 'bold' : 'normal',
    "& .MuiSvgIcon-root": {
      color: "#95272f",
    },
  }) 
})


export default function CategorySelect(props) {
 
  const classes = useStyles(props)
  const [category, setCategory] = useState("")
  
  const handleChange = (event) => {
    setCategory(event.target.value)
    props.setCategory(event.target.value)
  }
  //used while editing the item to preselect the category and then change it according to the user

  const defaultValue = props.value ? props.value : "Imran Ali";

  
  return (
    <div className={`${classes.inputDiv}`}>
      <label className={`${classes.inputLabel}`}>{props.label}</label>
      <Select 
      onChange={handleChange} 
      input={<BootstrapInput />} className={`SelectInput ${props.thinBorder ? 'SelectInput--Thin' : ''} ${classes.select}`}
      IconComponent={ArrowDown}
      value={category === '' ? defaultValue : category}
      MenuProps={{
        anchorOrigin: {
          vertical: -22,
          horizontal: -2
        },
        transformOrigin: {
          vertical: 0,
          horizontal: 0
        },
        getContentAnchorEl: null,
        classes: {
          paper: classes.dropDown
        },
      }}
      >
      <label className={`${classes.inputLabel}`}>{props.label}</label>
      <div className="DropDownTitle">{category}</div>
      <hr className="hl"/>
     
      <MenuItem value={props.value ? defaultValue : ''}><div className="CatIconContainer"></div>{props.value ? defaultValue :''}</MenuItem> 
      <MenuItem value="Painting"><div className="CatIconContainer"><PaintingIcon  className="CategoryDDIcon"/></div>Painting</MenuItem>
      <MenuItem value="Office"><div className="CatIconContainer"><OfficeIcon className="CategoryDDIcon"/></div>Office</MenuItem>
      <MenuItem value="Tools"><div className="CatIconContainer"><HammerIcon fill='#ac172c' className="CategoryDDIcon"/></div>Tools</MenuItem>
      <MenuItem value="BBQ"><div className="CatIconContainer"><BBQIcon className="CategoryDDIcon"/></div>BBQ</MenuItem>
      <MenuItem value="Automotive"><div className="CatIconContainer"><CarIcon fill='#ac172c' className="CategoryDDIcon" style={{height: '16px'}}/></div>Automotive</MenuItem>
      <MenuItem value="Power Tools"><div className="CatIconContainer"><DrillIcon fill='#ac172c' className="CategoryDDIcon"/></div>Power Tools</MenuItem>
      <MenuItem value="Creative"><div className="CatIconContainer"><CreativeIcon className="CategoryDDIcon"/></div>Creative</MenuItem>
      <MenuItem value="Mowing"><div className="CatIconContainer"><MowingIcon className="CategoryDDIcon" style={{height: '25px'}}/></div>Mowing</MenuItem>
      <MenuItem value="Cleaning"><div className="CatIconContainer"><CleaningIcon className="CategoryDDIcon"/></div>Cleaning</MenuItem>
      <MenuItem value="Sporting"><div className="CatIconContainer"><SportingIcon className="CategoryDDIcon"/></div>Sporting</MenuItem>
      </Select>
    </div>
  )
}

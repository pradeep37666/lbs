import { React, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import './categorySelect.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import ArrowDown from '@material-ui/icons/ExpandMore';
import CarIcon from './../../assets/Icons/CarIcon_Red.png';
import BBQIcon from './../../assets/Icons/BBQIcon.png';
import CleaningIcon from './../../assets/Icons/CleaningIcon.png';
import CreativeIcon from './../../assets/Icons/CreativeIcon.png';
import DrillIcon from './../../assets/Icons/DrillIcon_Red.png';
import HammerIcon from './../../assets/Icons/HammerIcon_Red.png';
import OfficeIcon from './../../assets/Icons/OfficeIcon.png';
import PaintingIcon from './../../assets/Icons/PaintingIcon.png';
import SportingIcon from './../../assets/Icons/SportingIcon.png';
import MowingIcon from './../../assets/Icons/MowingIcon.png';


const BootstrapInput = withStyles((theme) => ({
  input: {
    paddingLeft: '1em',
    textAlign: 'left',
    fontSize: '20px',
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
    border: '2px solid #95272f',
    borderRadius: '0 0 15px 15px',
    overflowY: 'scroll',
    borderTop: 'none',
    "& .MuiMenuItem-root": {
      fontFamily: 'DMSans, sans-serif',
      fontSize: '14px',
    }
  }),
  select: props => ({
    border: '2px solid #95272f',
    "& .MuiSvgIcon-root": {
      color: "#95272f",
    }
  }) 
})

export default function CategorySelect(props) {
  const classes = useStyles(props);
  const [category, setCategory] = useState("Automotive");

  const handleChange = (event) => {
    setCategory(event.target.value);
  }

  return (
    <div className={`${classes.inputDiv}`}>
      <label className={`${classes.inputLabel}`}>{props.label}</label>
      <Select 
      onChange={handleChange} 
      input={<BootstrapInput />} className={`SelectInput ${classes.select}`}
      IconComponent={ArrowDown}
      value={category}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        getContentAnchorEl: null,
        classes: {
          paper: classes.dropDown
        }
      }}
      >
      <hr className="hl"/>
      <MenuItem value="Painting"><div className="CatIconContainer"><img src={PaintingIcon} alt="" className="CategoryDDIcon"/></div>Painting</MenuItem>
      <MenuItem value="Office"><div className="CatIconContainer"><img src={OfficeIcon} alt="" className="CategoryDDIcon"/></div>Office</MenuItem>
      <MenuItem value="Tools"><div className="CatIconContainer"><img src={HammerIcon} alt="" className="CategoryDDIcon"/></div>Tools</MenuItem>
      <MenuItem value="BBQ"><div className="CatIconContainer"><img src={BBQIcon} alt="" className="CategoryDDIcon"/></div>BBQ</MenuItem>
      <MenuItem value="Automotive"><div className="CatIconContainer"><img src={CarIcon} alt="" className="CategoryDDIcon" style={{height: '16px'}}/></div>Automotive</MenuItem>
      <MenuItem value="Power Tools"><div className="CatIconContainer"><img src={DrillIcon} alt="" className="CategoryDDIcon"/></div>Power Tools</MenuItem>
      <MenuItem value="Creative"><div className="CatIconContainer"><img src={CreativeIcon} alt="" className="CategoryDDIcon"/></div>Creative</MenuItem>
      <MenuItem value="Mowing"><div className="CatIconContainer"><img src={MowingIcon} alt="" className="CategoryDDIcon"/></div>Mowing</MenuItem>
      <MenuItem value="Cleaning"><div className="CatIconContainer"><img src={CleaningIcon} alt="" className="CategoryDDIcon"/></div>Cleaning</MenuItem>
      <MenuItem value="Sporting"><div className="CatIconContainer"><img src={SportingIcon} alt="" className="CategoryDDIcon"/></div>Sporting</MenuItem>
      </Select>
    </div>
  )
}

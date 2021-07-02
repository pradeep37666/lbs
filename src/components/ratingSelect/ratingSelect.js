import { React, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';
import './ratingSelect.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import ArrowDown from '@material-ui/icons/ExpandMore';
import StarOutline from './../../assets/Icons/StarOutline.png';
import StarFilled from './../../assets/Icons/StarFilled.png';


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

export default function RatingSelect(props) {
  const classes = useStyles(props);
  const [rating, setRating] = useState("Automotive");

  const handleChange = (event) => {
    setRating(event.target.value);
  }

  return (
    <div className={`${classes.inputDiv}`}>
      <label className={`${classes.inputLabel}`}>{props.label}</label>
      <Select 
      onChange={handleChange} 
      input={<BootstrapInput />} className={`SelectInput ${classes.select}`}
      IconComponent={ArrowDown}
      value={rating}
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

      {/* Each star is a menuItem, sends its value back to state, need to push them onto one line, display filled star based on current state (i.e. if rating is 3 items 1-3 will be filled, rest empty easy ternary for img src) style the stars, remove stars from the main box (can use display: none like for categories) but need to add the representative number 1-5 rating  */}
      <MenuItem value="1">
      <img src={StarOutline} alt="" className="starIcon"/>
      </MenuItem>
      <MenuItem value="2">
      <img src={StarOutline} alt="" className="starIcon"/>
      </MenuItem>
      <MenuItem value="3">
      <img src={StarOutline} alt="" className="starIcon"/>
      </MenuItem>
      <MenuItem value="4">
      <img src={StarOutline} alt="" className="starIcon"/>
      </MenuItem>
      <MenuItem value="5">
      <img src={StarOutline} alt="" className="starIcon"/>
      </MenuItem>
      </Select>
    </div>
  )
}

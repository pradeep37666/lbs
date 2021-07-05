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
      padding: '2px',
    },
    "& .MuiMenuItem-root:hover, .MuiMenuItem-root:focus": {
      backgroundColor: '#FFFFFF',
    }
  }),
  select: props => ({
    border: '2px solid #95272f',
    "& .MuiSvgIcon-root": {
      color: "#95272f",
    }
  }),
  option: props => ({
    display: 'inline',
    backgroundColor: 'none',
    ".MuiListItem-root.Mui-selected:hover": {
      height: '100px',
    }
  })
})

export default function RatingSelect(props) {
  const classes = useStyles(props);
  const [rating, setRating] = useState(4);

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
          vertical: 110,
          horizontal: "left"
        },
        transformOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        getContentAnchorEl: null,
        classes: {
          paper: classes.dropDown
        }
      }}
      >
      <hr className="hl"/>
      <MenuItem value="1" className={`${classes.option}`} style={{marginLeft: '15px'}}>
      <img src={StarFilled} alt="" className="StarIcon"/><div className="RatingText">{rating} star</div>
      </MenuItem>
      <MenuItem value="2" className={`${classes.option}`}>
      <img src={rating >= 2 ? StarFilled : StarOutline} alt="" className="StarIcon"/><div className="RatingText">{rating} star</div>
      </MenuItem>
      <MenuItem value="3" className={`${classes.option}`}>
      <img src={rating >= 3 ? StarFilled : StarOutline} alt="" className="StarIcon"/><div className="RatingText">{rating} star</div>
      </MenuItem>
      <MenuItem value="4" className={`${classes.option}`}>
      <img src={rating >= 4 ? StarFilled : StarOutline} alt="" className="StarIcon"/><div className="RatingText">{rating} star</div>
      </MenuItem>
      <MenuItem value="5" className={`${classes.option}`}>
      <img src={rating >= 5 ? StarFilled : StarOutline} alt="" className="StarIcon"/><div className="RatingText">{rating} star</div>
      </MenuItem>
      {/* </div> */}
      </Select>
    </div>
  )
}

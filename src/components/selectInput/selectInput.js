import { React, useState } from 'react';
import './selectInput.css';
import { makeStyles, withStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import ArrowDown from '@material-ui/icons/ExpandMore';

const BootstrapInput = withStyles((theme) => ({
  input: {
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
    maxHeight: '13px',
    overflow: 'hidden',
  }),
  dropDown: props => ({
    border: '2px solid #95272f',
    borderRadius: '15px',
    boxSizing: 'content-box',
    "& .MuiMenuItem-root": {
      fontFamily: 'DMSans, sans-serif',
    }
  }),
  select: props => ({
    border: props.borders ? '2px solid #95272f' : 'none',
    "& .MuiSvgIcon-root": {
      color: "#95272f",
    }
  }) 
})

export default function SelectInput(props) {
  const classes = useStyles(props);
  const [name, setName] = useState(props.options[0]);

  const handleChange = (event) => {
    setName(event.target.value);
  }
  return (
    <div className={`${classes.inputDiv}`}>
      <label className={`${classes.inputLabel}`}>{props.label}</label>
      <Select 
      onChange={handleChange} 
      input={<BootstrapInput />} className={`SelectInput ${classes.select}`}
      IconComponent={ArrowDown}
      value={name}
      MenuProps={{
        anchorOrigin: {
          vertical: -22,
          horizontal: -2
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
      <label className={`${classes.inputLabel}`}>{props.label}</label>
      <div className="DropDownTitle">{name}</div>
      <hr className="hl"/>
      {props.options.map((name, index) => 
      <MenuItem value={name} key={index}>{name}</MenuItem>
      )}
      </Select>
    </div>
  )
}

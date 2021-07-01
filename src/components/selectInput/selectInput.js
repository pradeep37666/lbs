import React from 'react';
import './selectInput.css';
import { makeStyles } from '@material-ui/styles';

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
  })
})

export default function SelectInput(props) {
  const classes = useStyles(props);
  return (
    <div className={`${classes.inputDiv}`}>
      <label className={`${classes.inputLabel}`}>{props.label}</label>
      <select className="TextInput SelectInput">  
      {props.options.map((name, index) => 
      <option value={name} key={index}>{name}</option>
      )}
      </select>
    </div>
  )
}

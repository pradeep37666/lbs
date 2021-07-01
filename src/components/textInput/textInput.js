import React from 'react';
import './textInput.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  textInput: props => ({
    fontSize: props.fontSize,
  }),
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

export default function TextInput(props) {
  const classes = useStyles(props);
  return (
    <div className={`${classes.inputDiv}`}>
    <label className={`${classes.inputLabel}`}>{props.label}</label>
    <input type='text' placeholder={props.placeholder} className={`TextInput ${classes.textInput}`} ></input>
    </div>
    
  )
}

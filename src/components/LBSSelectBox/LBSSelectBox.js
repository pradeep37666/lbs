import React from 'react'
import { makeStyles, withStyles } from '@material-ui/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import ArrowDown from '@material-ui/icons/ExpandMore'


const BootstrapInput = withStyles((theme) => ({
    input: {
      color: '#000000',
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

const LBSSelectBox = (props) => {
    const classes = useStyles(props)
    return (
        <div className={`${classes.inputDiv}`}>
            <Select 
            onChange={(e) => props.onChange(e.target.value)} 
            input={<BootstrapInput />} 
            className={`SelectInput ${props.thinBorder ? 'SelectInput--Thin' : ''} ${classes.select}`}
            IconComponent={ArrowDown}
            value={props.value ?? ''}
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
            <div className="DropDownTitle">{props.value}</div>
            <hr className="hl"/>
            
            <MenuItem value={props.value ?? ''}>
            <div className="CatIconContainer"></div>
            {props.value ??''}
            </MenuItem> 

            {props.selectOption.map((option, index) => (
            <MenuItem value={option} key={index}>
                {option}
            </MenuItem>
            ))}
            </Select>
        </div>
    )
}

export default LBSSelectBox
import { React, useState} from 'react'
import './categorySelect.css'
import { makeStyles, withStyles } from '@material-ui/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import ArrowDown from '@material-ui/icons/ExpandMore'
import { ITEM_CATEGORIES } from '../../assets/Data/LBSSelectOptions'

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

export default function CategorySelect(props) {
  const classes = useStyles(props)
  const [ category, setCategory ] = useState("")
  
  const handleChange = ({ target }) => {
    const category = target.value
    setCategory(category.name)
    props.setCategory(category.name)
  }

  const defaultValue = props.value ? props.value : '';

  return (
    <div className={`${classes.inputDiv}`}>
      <label className={`${classes.inputLabel}`}>{props.label}</label>
      <Select 
      onChange={handleChange} 
      input={<BootstrapInput />} 
      className={`SelectInput ${props.thinBorder ? 'SelectInput--Thin' : ''} ${classes.select}`}
      IconComponent={ArrowDown}
      value={props.value === '' ? defaultValue : category}
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
     
      <MenuItem value={props.value ? defaultValue : ''}>
        <div className="CatIconContainer"></div>
        {props.value ? defaultValue :''}
      </MenuItem> 

      {ITEM_CATEGORIES.map((category, index) => (
        <MenuItem value={category} key={index}>
          <div className="CatIconContainer">
            {category.icon}
          </div>
          {category.name}
        </MenuItem>
      ))}
      </Select>
    </div>
  )
}

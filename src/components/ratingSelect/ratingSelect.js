import { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/styles'
import './ratingSelect.css'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import ArrowDown from '@material-ui/icons/ExpandMore'
import { ReactComponent as StarOutline } from './../../assets/Icons/StarOutline.svg'
import { ReactComponent as StarFilled } from './../../assets/Icons/StarFilled.svg'

const BootstrapInput = withStyles(theme => ({
  input: {
    textAlign: 'left',
    fontSize: '20px',
    fontFamily: ['DMSans, sans-serif'].join(','),
    '&:focus': {
      backgroundColor: '#FFFFFF',
      borderRadius: '15px',
    },
  },
}))(InputBase)

const useStyles = makeStyles({
  inputDiv: props => ({
    width: props.width,
    position: 'relative',
    margin: props.margin,
    maxHeight: '74px',
  }),
  inputLabel: props => ({
    display: props.label === '' ? 'none' : 'block',
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
    borderRadius: '15px',
    marginLeft: '-15px',
    marginTop: '-20px',
    width: '158px',
    boxSizing: 'content-box',
    '& .MuiMenuItem-root': {
      fontFamily: 'DMSans, sans-serif',
      fontSize: '14px',
      padding: '2px',
    },
    '& .MuiMenuItem-root:hover, .MuiMenuItem-root:focus': {
      backgroundColor: '#FFFFFF',
    },
  }),
  select: props => ({
    border: '2px solid #95272f',
    '& .MuiSvgIcon-root': {
      color: '#95272f',
      marginRight: '6px',
    },
  }),
  option: props => ({
    display: 'inline-flex',
    backgroundColor: 'none',
    '.MuiListItem-root.Mui-selected:hover': {
      height: '100px',
    },
  }),
})

export default function RatingSelect(props) {
  const classes = useStyles(props)
  const [rating, setRating] = useState()

  const handleChange = event => {
    setRating(event.target.value)
    props.onChange(event)
  }

  return (
    <div className={`${classes.inputDiv}`}>
      <label className={`${classes.inputLabel}`}>{props.label}</label>
      <Select
        onChange={handleChange}
        input={<BootstrapInput />}
        className={`SelectInput ${classes.select}`}
        IconComponent={ArrowDown}
        value={rating}
        MenuProps={{
          anchorOrigin: {
            vertical: 96,
            horizontal: -2,
          },
          transformOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          classes: {
            paper: classes.dropDown,
          },
        }}
      >
        <MenuItem value='' className={`${classes.option}`}></MenuItem>
        <MenuItem value='1' className={`${classes.option}`}>
          <StarFilled fill='#E9D8B4' className='StarIcon' />
          <div className='RatingText'>{rating} star</div>
        </MenuItem>
        <MenuItem value='2' className={`${classes.option}`}>
          {rating >= 2 ? (
            <StarFilled fill='#E9D8B4' className='StarIcon' />
          ) : (
            <StarOutline className='StarIcon' />
          )}
          <div className='RatingText'>{rating} star</div>
        </MenuItem>
        <MenuItem value='3' className={`${classes.option}`}>
          {rating >= 3 ? (
            <StarFilled fill='#E9D8B4' className='StarIcon' />
          ) : (
            <StarOutline className='StarIcon' />
          )}
          <div className='RatingText'>{rating} star</div>
        </MenuItem>
        <MenuItem value='4' className={`${classes.option}`}>
          {rating >= 4 ? (
            <StarFilled fill='#E9D8B4' className='StarIcon' />
          ) : (
            <StarOutline className='StarIcon' />
          )}
          <div className='RatingText'>{rating} star</div>
        </MenuItem>
        <MenuItem value='5' className={`${classes.option}`}>
          {rating >= 5 ? (
            <StarFilled fill='#E9D8B4' className='StarIcon' />
          ) : (
            <StarOutline className='StarIcon' />
          )}
          <div className='RatingText'>{rating} star</div>
        </MenuItem>
        {/* </div> */}
      </Select>
    </div>
  )
}

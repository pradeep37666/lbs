import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './LBSSwitch.css';

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 54,
    height: 26,
    padding: 0,
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(28px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#ac172c',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#ac172c',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function LBSSwitch({isChecked, onClick, text}) {

  return (
    <FormGroup className="SwitchContainer">
      <FormControlLabel
        control={<IOSSwitch checked={isChecked} onChange={() => onClick()} name="checkedB" />}
      />
      {isChecked && <div className="LenderSwitchLabel">{text}</div> }
    </FormGroup>
  );
}
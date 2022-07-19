import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import './tcSection.css';

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 3,
    width: 20,
    height: 20,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#ac172c',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#ac172c',
    },
  },
});

export default function CustomizedCheckbox({ onClick, termsChecked }) {
    const classes = useStyles();

    return (
      <div>
        <div className="TCScrollDiv">
                    Voluptate cillum dolore veniam ullamco sunt sunt. Enim exercitation enim nostrud in dolore anim elit in ea veniam aliquip qui nostrud. Dolore veniam commodo do excepteur anim fugiat consequat consectetur. Eiusmod non aute aliqua quis nisi magna ut nostrud commodo eu nostrud aliqua labore exercitation. Et labore quis Lorem aliquip sint proident duis ea. Ipsum non duis irure dolore ullamco ut officia esse ad exercitation amet eiusmod velit quis. Excepteur non minim ipsum eiusmod elit occaecat ad consequat dolore enim ut ea veniam.

Elit esse laborum enim non ex ex officia ex mollit eiusmod. Excepteur cupidatat proident culpa sunt esse eiusmod excepteur nostrud eiusmod duis. Excepteur et non nisi dolor non dolore velit non consectetur.

Fugiat velit veniam anim proident do consectetur laborum. Esse labore est cupidatat officia. Dolore dolor id ut pariatur culpa occaecat eu. Anim laborum sit velit cillum irure ea eiusmod nisi. Velit minim veniam qui commodo et aliquip elit ad cupidatat sunt. Dolor exercitation nostrud mollit velit laboris amet reprehenderit officia reprehenderit. Eu pariatur laboris adipisicing ipsum consectetur qui ea cupidatat veniam ipsum.

Pariatur non occaecat ex incididunt dolore proident consequat ea exercitation. Occaecat dolor voluptate duis qui deserunt in dolor nulla ut. Nulla id aliqua occaecat proident occaecat reprehenderit ut laborum ad duis.

Quis nulla sunt non irure. Deserunt in sit qui consequat id aliqua et. Consectetur est nisi nisi sit ullamco proident incididunt et excepteur ex excepteur sit sit Lorem. Et adipisicing labore nulla anim est reprehenderit quis.

Anim cillum aliqua consectetur cillum duis aliqua excepteur culpa id labore tempor qui proident. Consequat aute id quis quis ea elit sit labore duis officia. Voluptate nostrud enim incididunt in Lorem reprehenderit aliquip. Consectetur proident est elit adipisicing commodo non enim eu excepteur ea.

Nulla velit et aliqua incididunt ea incididunt. Enim laborum dolor incididunt veniam sit Lorem fugiat pariatur sint. Dolore aute laborum minim commodo exercitation aliquip do irure ipsum nostrud pariatur fugiat.

Sint aliquip est labore dolore nulla nisi nulla proident dolor qui esse occaecat magna anim. Labore incididunt dolor laboris magna fugiat. Est irure duis dolor tempor id veniam id commodo anim amet.
                </div>

                <div className="TCCheckboxFlex">
                <Checkbox
                    className={classes.root}
                    disableRipple
                    color="default"
                    checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
                    onChange={onClick}
                    icon={<span className={classes.icon} />}
                    inputProps={{ 'aria-label': 'decorative checkbox' }}
                    checked={termsChecked}
                />
                    <div>Sit in cillum quis consequat magna aute sint veniam deserunt nulla pariatur.</div>
                </div>
      </div>
      
            
  );
}
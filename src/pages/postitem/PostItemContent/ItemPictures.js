import React from 'react'
import {ReactComponent as Logo} from '../../../assets/Logos/LogoRed.svg';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    button: {
      width: 80,
      height: 80,
      backgroundColor: '#B43B4C',
      '&:hover': {
        backgroundColor: '#cf3247'
      }
    },
    icon: {
        fontSize: 40,
        color: '#FFF'
    }
    
  })

  

export default function ItemPictures(props) {

    const classes = useStyles()

    const handleChange = (e) => {
        if (e.target.files.length) {
        let newPictures = props.pictures
        newPictures.push({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })
        props.setPictures(newPictures)
        }
    }

    return (
        <div className="RegistrationWrapper">
            <div className="LoginMain">

                <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

                <div className="LoginHeader">Item Pictures</div>
                <div className="LoginText">Please provide us with as many photos you can of your item.</div>

                <div className="PostItem__ItemPictures__Container">
                    {props.pictures.map((picture) => {
                        return (
                            <div className="PostItem__ItemPictures__Preview">
                                {/* abs button */}
                                {/* <IconButton aria-label="delete" className={classes.button} onClick={() => document.getElementById('selectFile').click()}>
                                    <AddIcon className={classes.icon} />
                                </IconButton> */}
                                <img src={picture.preview} alt="" className="ProfilePicturePreview"/>
                            </div>
                        )
                    })}

                </div>
                <input type="file" id="selectFile" style={{ display: "none" }} onChange={(e) => handleChange(e)} />


                <div className="PostItem__ItemPictures__Add__Container">
                    <IconButton aria-label="delete" className={classes.button} onClick={() => document.getElementById('selectFile').click()}>
                        <AddIcon className={classes.icon}/>
                    </IconButton>
                </div>

                <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => props.handleNextPage('Advanced Details')}>Next</button>

            </div>

        </div>
    )
}

import React, { useContext, useState } from "react";
import { ReactComponent as Logo } from "../../../assets/Logos/LogoRed.svg";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/styles";
import Button from "../../../components/Button/Button";
import { FileService } from "../../../services/FileService";
import { v4 as uuidv4 } from 'uuid'
import { CircularProgress } from "@material-ui/core";
import { POST_ITEM_PAGE } from "../../../assets/Data/LBSEnum";

const useStyles = makeStyles({
  button: {
    width: 80,
    height: 80,
    backgroundColor: "#B43B4C",
    "&:hover": {
      backgroundColor: "#cf3247",
    },
  },
  icon: {
    fontSize: 40,
    color: "#FFF",
  },
  buttonDelete: {
    position: "absolute",
    top: -20,
    right: -20,
    width: 40,
    height: 40,
    backgroundColor: "#B43B4C",
    "&:hover": {
      backgroundColor: "#cf3247",
    },
  },
});

export default function ItemPictures({ context }) {
  const [ isUploading, setIsUploading ] = useState(false)
  const { state, dispatch } = useContext(context)
  const { pictures } = state
  const classes = useStyles()

  const handleChange = async ({ target }) => {
    try {
      setIsUploading(true)
      const files = target.files
      if (!files.length) return
      const fileLinks = await FileService.uploadMultipleImages(files)
      if (!fileLinks) return
      let newPictures = pictures.map((picture) => picture)
      for (let i = 0; i < files.length; i++) {
        newPictures.push({
          preview: URL.createObjectURL(files[i]),
          raw: files[i],
          id: uuidv4(),
        })
      }
      dispatch({ type: 'setPictures', data: newPictures })
      dispatch({ type: 'setPictureLinks', data: fileLinks })
    } catch (error) {
      console.log(error.response)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = (id) => {
    const newPictures = pictures.filter(picture => picture.id !== id)
    dispatch({ type: 'setPictures', data: newPictures })
  }

  return (
    <div className="RegistrationWrapper">
      <div className="LoginMain">
        <Logo height="50px" width="50px" style={{ marginBottom: ".5em" }} />

        <div className="LoginHeader">Item Pictures</div>
        <div className="LoginText">
          Please provide us with as many photos you can of your item. Your first
          image will be used as your main product image. Recommended image size
          is at least 300 x 300 pixels.
        </div>

        <div className="PostItem__ItemPictures__Container">
          {pictures.map((picture, index) => {
            return (
              <div 
                className="PostItem__ItemPictures__Preview" 
                key={index}
              >
                <IconButton
                  aria-label="delete"
                  className={classes.buttonDelete}
                  onClick={() => handleDelete(picture.id)}
                >
                  <RemoveIcon className={classes.icon} />
                </IconButton>
                  <img
                    src={picture.preview}
                    alt="posting item"
                    className="ProfilePicturePreview"
                    loading="lazy"
                  />
              </div>
            )
          })}
          {isUploading && (
            <div 
              className="PostItem__ItemPictures__Preview"
              style={{ display: 'flex', justifyContent: 'center'}}
            >
              <CircularProgress color="inherit" />
            </div>
          )}
        </div>
        <input
          type="file"
          id="selectFile"
          accept='image/*'
          multiple
          style={{ display: "none" }}
          onChange={handleChange}
        />

        <div className="PostItem__ItemPictures__Add__Container">
          <IconButton
            aria-label="delete"
            className={classes.button}
            onClick={() => document.getElementById("selectFile").click()}
          >
            <AddIcon className={classes.icon} />
          </IconButton>
        </div>
        <Button 
        text="Next"
        onClick={() => dispatch({ type: 'setCurrentPage', data: POST_ITEM_PAGE.ADVANCE})}
        isDisabled={pictures.length === 0}
        />
      </div>
    </div>
  );
}

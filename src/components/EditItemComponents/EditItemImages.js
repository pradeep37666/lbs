import React, { useState } from 'react'
import { IconButton } from '@material-ui/core'
import RemoveIcon from "@material-ui/icons/Remove"
import { makeStyles } from '@material-ui/core'
import AddIcon from "@material-ui/icons/Add"
import getImage from '../../util/getImage'
import { FileService } from '../../services/FileService'
import { v4 as uuidv4 } from 'uuid'

export default function EditItemImages({ state, dispatch }) {
    const { images, newImages, newImageLinks, deletedImages } = state
    const [ isUploading, setIsUploading ] = useState(false)
    const classes = useStyles()

    const handleImageUpload = async ({ target }) => {
      try {
        setIsUploading(true)
        const files = target.files
        if (!files.length) return
        const fileLinks = await FileService.uploadMultipleImages(files)
        if (!fileLinks) return
        let newPictures = newImages.map(img => img)
        for (let i = 0; i < newImages.length; i++) {
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

    const renderItemImages = (images) => {
      return images.map((image, index) => (
        <div className="PostItem__ItemPictures__Preview" key={index}>
          <IconButton 
            aria-label="delete" 
            className={classes.buttonDelete} 
            onClick={() => removeImage(image.id)}
          >
            <RemoveIcon className={classes.icon} />
          </IconButton>
          <img
            src={getImage(image.imageKey)}
            alt=""
            className="ProfilePicturePreview"
          />
        </div>
      ))
    }

    const removeImage = (id) => {
      const removedImage = images.find(img => img.id === id)
      console.log({removedImage})
      const updatedDisplayImages = images.filter(img => img.id !== id)
      dispatch({ type: 'setImages', data: updatedDisplayImages})
      if(removedImage.imageKey)
        dispatch({type: 'setDeletedImages', data: [...deletedImages, removedImage.url]})
      else 
        dispatch({ type: 'setNewImages', data: newImages.filter(img => img.id !== id)})
      
      // for (var i = 0; i < images.length; i++) {
      //   var pic = images[i];
  
      //   if (pic.id !== id) {
      //     newimages.push(pic);
      //   } else {
      //     if (pic.url) setDeletedImages(deletedImages => [...deletedImages, pic.url])
      //     else setNewImages(newImages.filter(({id}) => id !== pic.id))
      //   }
      // }
      // setimages(newimages);
    }

    return (
      <div className="LoginMain" style={{ width: "100%", marginTop: "0.5%" }}>
        <div className="LoginHeader">Item images</div>
        <div className="PostItem__Itemimages__Container">
          { renderItemImages(images) }
          { renderItemImages(newImages)}
        </div>
        <input
        type="file"
        id="selectFile"
        style={{ display: "none" }}
        onChange={handleImageUpload}
        />
        <div className="PostItem__Itemimages__Add__Container" style={{ marginBottom: "-15%" }}>
          <IconButton
            aria-label="delete"
            className={classes.button}
            onClick={() => document.getElementById("selectFile").click()}
          >
            <AddIcon className={classes.icon} />
          </IconButton>
        </div>
      </div>
    )
}

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
})
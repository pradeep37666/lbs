import React from 'react'
import { IconButton } from '@material-ui/core';
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add"
import getImage from '../../util/getImage';

export default function EditItemImages({ state, dispatch }) {
    const { images, newImages, deletedImages } = state

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
  
  const classes = useStyles();
    const renderItemimages = () => {
        return images.map(( image, index) => {
            return (
                <div className="PostItem__ItemPictures__Preview" key={index}>
                    <IconButton 
                    aria-label="delete" 
                    className={classes.buttonDelete} 
                    onClick={() => removeImage(image.id)}
                    >
                        <RemoveIcon className={classes.icon} />
                    </IconButton>
                    <img
                      src={image.preview ? image.preview : getImage(image.url)}
                      alt=""
                      className="ProfilePicturePreview"
                    />
                </div>
              )
        })
    }

    const removeImage = (id) => {
      const removedImage = images.find(img => img.id === id)
      const updatedDisplayImages = images.filter(img => img.id !== id)
      dispatch({ type: 'setImages', data: updatedDisplayImages})

      if(removedImage.url){
        dispatch({type: 'setDeletedImages', data: [...deletedImages, removedImage.url]})
      } else {
        dispatch({ type: 'setNewImages', data: newImages.filter(img => img.id !== id)})
      }
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
      };

      const handleImageUpload = (e) => {
        if (e.target.files.length === 0) return
        const updatedImages = [...images,
          {
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
            id: getNextID(),
          },
        ]
        const updatedNewImages = [...newImages, {
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
            id: getNextID(),
        }]
        dispatch({ type: 'setNewImages', data: updatedNewImages})
        dispatch({ type: 'setImages', data: updatedImages})
        
      };

      const getNextID = () => {
        const lastImage = images[images.length - 1]
        return lastImage.id + 1
      };
    
    console.log('images', images)
    return (
        <div className="LoginMain" style={{ width: "100%", marginTop: "0.5%" }}>
            <div className="LoginHeader">Item images</div>
            <div className="PostItem__Itemimages__Container">
                { renderItemimages() }
            </div>

            <input
            type="file"
            id="selectFile"
            style={{ display: "none" }}
            onClick={(e) => {
                e.target.value = null;
            }}
            onChange={(e) => handleImageUpload(e)}
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

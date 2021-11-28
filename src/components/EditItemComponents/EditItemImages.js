import React from 'react'
import { IconButton } from '@material-ui/core';
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add"
import getImage from '../../util/getImage';

export default function EditItemImages({ state, dispatch }) {
    const { images } = state

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
                    // onClick={() => removeImage(image.id)}
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

    // const removeImage = (id) => {
    //     var newimages = [];
    //     for (var i = 0; i < images.length; i++) {
    //       var pic = images[i];
    
    //       if (pic.id !== id) {
    //         newimages.push(pic);
    //       } else {
    //         if (pic.url) setDeletedImages(deletedImages => [...deletedImages, pic.url])
    //         else setNewImages(newImages.filter(({id}) => id !== pic.id))
    //       }
    //     }
    //     setimages(newimages);
    //   };

    //   const handleChange = (e) => {
    //     if (e.target.files.length) {
    //       let updatedPictures = [
    //         ...pictures,
    //         {
    //           preview: URL.createObjectURL(e.target.files[0]),
    //           raw: e.target.files[0],
    //           id: findNextID(),
    //         },
    //       ]
    //       setNewImages(newImages => [...newImages, {
    //           preview: URL.createObjectURL(e.target.files[0]),
    //           raw: e.target.files[0],
    //           id: findNextID(),
    //       }])
    //       setPictures(updatedPictures);
    //     }
    //   };

    //   const findNextID = () => {
    //     var indices = [];
    //     images.forEach((image) => {
    //       indices[image["id"]] = true;
    //     });
    //     for (var i = 1, l = indices.length; i < l; i++) {
    //       if (indices[i] === undefined) {
    //         break;
    //       }
    //     }
    //     return i;
    //   };
    
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
            // onChange={(e) => handleChange(e)}
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

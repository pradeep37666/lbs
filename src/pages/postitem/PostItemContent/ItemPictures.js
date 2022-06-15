import React, { useContext } from "react";
import { ReactComponent as Logo } from "../../../assets/Logos/LogoRed.svg";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/styles";
import Button from "../../../components/Button/Button";

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
  const { state, dispatch } = useContext(context)
  const { pictures } = state
  const classes = useStyles();

  //finds the next unused id in the pictures array
  const findNextID = () => {
    var indices = [];
    pictures.forEach((picture) => {
      indices[picture["id"]] = true;
    });
    for (var i = 1, l = indices.length; i < l; i++) {
      if (indices[i] === undefined) {
        break;
      }
    }
    return i;
  };

  const handleChange = (e) => {
    if (e.target.files.length) {
      let newPictures = pictures.map((picture) => picture);
      newPictures.push({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        id: findNextID(),
      });
      // const imageKey = FileService.uploadImageToS3(e)
      dispatch({ type: 'setPictures', data: newPictures })
    }
  };

  const handleDelete = (id) => {
    var newPictures = [];
    for (var i = 0; i < pictures.length; i++) {
      var pic = pictures[i];

      if (pic.id !== id) {
        newPictures.push(pic);
      }
    }
    dispatch({ type: 'setPictures', data: newPictures })
  };

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
              <div className="PostItem__ItemPictures__Preview" key={index}>
                <IconButton
                  aria-label="delete"
                  className={classes.buttonDelete}
                  onClick={() => handleDelete(picture.id)}
                >
                  <RemoveIcon className={classes.icon} />
                </IconButton>

                <img
                  src={picture.preview}
                  alt=""
                  className="ProfilePicturePreview"
                />
              </div>
            );
          })}
        </div>
        <input
          type="file"
          id="selectFile"
          style={{ display: "none" }}
          onClick={(e) => {
            e.target.value = null;
          }}
          onChange={(e) => handleChange(e)}
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
        onClick={() => dispatch({ type: 'setCurrentPage', data: 'Advanced Details'})}
        isDisabled={pictures.length === 0}
        />
      </div>
    </div>
  );
}

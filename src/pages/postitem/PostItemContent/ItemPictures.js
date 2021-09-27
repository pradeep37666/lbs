import React from "react";
import { ReactComponent as Logo } from "../../../assets/Logos/LogoRed.svg";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/styles";

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

export default function ItemPictures(props) {
  const classes = useStyles();

  //finds the next unused id in the pictures array
  const findNextID = () => {
    var indices = [];
    props.pictures.forEach((picture) => {
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
      let newPictures = props.pictures.map((picture) => picture);
      newPictures.push({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        id: findNextID(),
      });
      props.setPictures(newPictures);
    }
  };

  const handleDelete = (id) => {
    var newPictures = [];
    for (var i = 0; i < props.pictures.length; i++) {
      var pic = props.pictures[i];

      if (pic.id !== id) {
        newPictures.push(pic);
      }
    }
    props.setPictures(newPictures);
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
          {props.pictures.map((picture) => {
            return (
              <div className="PostItem__ItemPictures__Preview">
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

        <button
          className={`LoginFormButton ${
            !props.validated ? "ButtonDisabled" : ""
          }`}
          disabled={!props.validated}
          onClick={() => props.handleNextPage("Advanced Details")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

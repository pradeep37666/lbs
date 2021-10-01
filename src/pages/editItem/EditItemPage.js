import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Banner from "../../components/bannerText/bannerText";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import Instance from "../../util/axios";
import {
  handleAddress,
  handleCity,
  handleCountry,
  handleState,
} from "../../util/UserValidation";
import ValidationPopup from "../../components/ValidationPopup/ValidationPopup";
import CategorySelect from "../../components/categorySelect/categorySelect";
import "./editItem.css";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/styles";
import getImage from "../../util/getImage.js";
import LBSSwitch from "../../components/LBSSwitch/LBSSwitch";
import { Fade } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import Availability from "../../components/FormComponents/Availability";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import BorrowerRater from "../../components/rateBorrower/BorrowerRater";
import LenderRater from "../../components/rateLender/rateLender";
import BorrowFailed from "../../components/BorrowFailed/BorrowFailed";
import LendingFailed from "../../components/LendingFailed/LendingFailed";

function EditItemPage(props) {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [titleText, setTitleText] = useState();
  //declaration for all the infromation we get from the server
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [pictures, setPictures] = useState([]);
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const [discount, setDiscount] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState();
  const [available, setAvailable] = useState();

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [isDeleted, setIsDeleted] = useState();
  const [created, setCreated] = useState();
  const [updated, setUpdated] = useState();
  const [isDiscount, setIsDiscount] = useState(false);

  //--------modal for displaying the edit button dialogue-------//
  const [open, setOpen] = useState(false);
  const [editAvailabilityOpen, setEditAvailabilityOpen] = useState(false);

  const handleOpenEditAvailability = () => {
    setEditAvailabilityOpen(true);
  };
  const handleCloseEditAvailability = () => {
    setEditAvailabilityOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //--------------------------------------------------------------//

  let [newImage, setNewImage] = useState([]);
  let [updatedImage, setUpdatedImage] = useState([]);

  //-----------------Location-------------------------------------//

  const [addressValidation, setAddressValidation] = useState("");
  const [cityValidation, setCityValidation] = useState("");
  const [countryValidation, setCountryValidation] = useState("");
  const [stateValidation, setStateValidation] = useState("");

  //validation for Location entry like the city, street and state
  const showValidation = (field) => {
    switch (field) {
      case "address":
        return addressValidation.length > 0 ? false : true;
      case "city":
        return cityValidation.length > 0 && addressValidation.length === 0
          ? false
          : true;
      case "country":
        return countryValidation.length > 0 &&
          addressValidation.length === 0 &&
          cityValidation.length === 0
          ? false
          : true;
      case "state":
        return stateValidation.length > 0 &&
          addressValidation.length === 0 &&
          cityValidation.length === 0 &&
          countryValidation.length === 0
          ? false
          : true;
      default:
        return;
    }
  };

  //--------------------------------------------------------------//

  const queryString = require("query-string");
  const params = useParams();
  let newPictures = [];
  //seperating the userid and the item id from the parameters using the query string function
  const parsed = queryString.parse(params.itemId);
  let itemId = parsed.i_id;
  let userId = parsed.u_id;

  useEffect(() => {
    //returning data from the server
    Instance.get(`/items/findByIid/?i_id=${itemId}&u_id=${userId}`)
      .then((response) => {
        console.log("data => ", response.data.item);
        setTitleText(response.data.item.title);

        setTitle(response.data.item.title);
        setCategory(response.data.item.category);
        setDescription(response.data.item.description);
        setPrice(response.data.item.price);
        setDeliveryPrice(response.data.item.deliveryPrice);
        setDiscount(response.data.item.discount);
        setAddress(response.data.item.address);
        setCity(response.data.item.city);
        setCountry(response.data.item.country);
        setState(response.data.item.state);
        setLat(response.data.item.lat);
        setLng(response.data.item.lng);
        setAvailable(response.data.item.available);

        setUpdatedImage(response.data.item.pictures.split(","));
        setPictures(structurePictures(response.data.item.pictures.split(",")));

        setLoading(false);
        console.log(pictures);
      })
      .catch((error) => {
        console.log(error);
      });
    // dbImageConverter();
  }, [params, open]);

  //checking the values received from the server
  useEffect(() => {
    console.log("Availability => ", available);
    console.log("address : >", address, city, country, state);
    console.log("Pictures :> ", pictures);
    console.log("New Availability :", available);
  }, [pictures, available, address]);

  //-------------------------Deleting Items from Database-------------//
  const handleItemDeletion = () => {
    // alert(
    //   `Item ${title}, having id : ${itemId} removed from YourShed successfully!`
    // );
    try {
      Instance.delete(`/items/delete?i_id=${itemId}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Error : ", error);
        });
      history.push(`/user/your_shed`);
    } catch (error) {
      console.log("Error while Deleting : ", error);
    }
  };

  //------------------------------------------------------------------//
  //----------------------Picture Container Functionality------------------//
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
      let updatedPictures = [
        ...pictures,
        {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
          id: findNextID(),
        },
      ];
      setPictures(updatedPictures);
    }
  };

  const structurePictures = (dbPictures) => {
    const newPictures = dbPictures.map((picture, i) => {
      return {
        url: picture,
        id: i + 1,
      };
    });
    return newPictures;
  };

  const handleDelete = (id) => {
    //handling the deletion of images received from the server
    var newPictures = [];
    for (var i = 0; i < pictures.length; i++) {
      var pic = pictures[i];

      if (pic.id !== id) {
        newPictures.push(pic);
      }
    }
    setPictures(newPictures);
  };
  //handling the deletion of images received from add button

  //-------------------------------------------------------------------------//
  const applyChanges = () => {
    alert(
      `Here is the list of al the changes made! 
      
      Title -> ${title},
      Category -> ${category}, 
      Description -> ${description}, 
      Item's Price -> $${price}, 
      Discount -> ${discount}%, 
      Delivery or Pickup Cost -> $${deliveryPrice},
      !!!`
    );
  };
  return (
    <PageWrapper>
      <Banner
        textBold="Editing Item"
        textNormal={titleText}
        button={"Apply Changes"}
        buttonClick={() => applyChanges()}
      />
      <div className="ItemMainWrapper">
        <div className="ItemInfoWrapper">
          {/* Testing for Borrower Rating */}
          <LendingFailed />

          <LenderRater />

          {/* Div for Item Details */}
          <div className="RegistrationWrapper">
            <div
              className="LoginMain"
              style={{ width: "100%", marginTop: "0.5%" }}
            >
              {/* Item Name  */}
              <div className="LoginHeader">Basic Item Details</div>
              <div className="LoginHeader">Title</div>
              <input
                type="text"
                className="LoginInput"
                defaultValue={title}
                onBlur={(e) => setTitle(e.target.value)}
              />
              {/* Item Category */}
              <div className="LoginHeader">Category</div>
              <CategorySelect
                width="100%"
                label="Category"
                setCategory={setCategory}
                value={category}
              />
              {/* Item Description */}
              <div className="LoginHeader">Description</div>
              <textarea
                rows="10"
                maxLength="254"
                defaultValue={description}
                className="LoginInput PostItem__TextArea"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* Item Price + Discount */}
            <div
              className="LoginMain LoginMainNoMarg"
              style={{ width: "100%" }}
            >
              <div className="LoginHeader">Item Price</div>
              <div className="LoginText">
                Select a paid per option and price based on what you want from
                this item.
              </div>

              <div className="LoginHeader">Price ($)</div>
              <input
                type="number"
                min="1"
                step="any"
                defaultValue={price}
                className="LoginInput"
                onBlur={(e) => setPrice(parseInt(e.target.value))}
              />

              <div className="BecomeLenderFlex">
                <div className="LoginHeader" style={{ width: "auto" }}>
                  Off Peak Discount
                </div>
                <div className="LenderSwitchInfoFlex">
                  <LBSSwitch set={setIsDiscount} text="Yes" />
                </div>
              </div>
              <Fade in={isDiscount} timeout={300} mountOnEnter unmountOnExit>
                <div>
                  <div className="LoginText">
                    Allow borrowers to receive an off peak time discount to
                    incentivise mid week trading
                  </div>
                  <div>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          width: "20%",
                          display: "flex",
                          flex: 2,
                          marginRight: "10%",
                        }}
                      >
                        <input
                          type="number"
                          min="1"
                          step="any"
                          defaultValue={discount}
                          className="LoginInput"
                          onBlur={(e) => setDiscount(parseInt(e.target.value))}
                        />
                      </div>
                      <div
                        className="LoginText"
                        style={{
                          marginTop: "3%",
                          flex: 3,
                        }}
                      >
                        Off Peak Discount Rate
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
            {/* Item Location commented out for further changes */}
            {/* <div className="AccountSettings__Container">
              <div className="AccountSettings__Title">Item Location</div>

              <div className="LoginHeader LoginHeader--NoMargin">Address</div>
              <div className="LoginInputValidationContainer">
                <input
                  type="text"
                  placeholder={address}
                  className="LoginInput"
                  onBlur={(e) =>
                    handleAddress(e, setAddress, setAddressValidation)
                  }
                />
                <div
                  className={`triangleLeft ${
                    showValidation("address") ? "" : "ValidationTextHide"
                  }`}
                />
                <ValidationPopup
                  errorText={addressValidation}
                  errorHeader="Invalid Address"
                  hide={showValidation("address")}
                />
              </div>
              <div className="LoginHeader LoginHeader--NoMargin">City</div>
              <div className="LoginInputValidationContainer">
                <input
                  type="text"
                  placeholder={city}
                  className="LoginInput"
                  onBlur={(e) => handleCity(e, setCity, setCityValidation)}
                />
                <div
                  className={`triangleLeft ${
                    showValidation("city") ? "" : "ValidationTextHide"
                  }`}
                />
                <ValidationPopup
                  errorText={cityValidation}
                  errorHeader="Invalid City"
                  hide={showValidation("city")}
                />
              </div>
              <div className="LoginHeader LoginHeader--NoMargin">Country</div>
              <div className="LoginInputValidationContainer">
                <input
                  type="text"
                  placeholder={country}
                  className="LoginInput"
                  onBlur={(e) =>
                    handleCountry(e, setCountry, setCountryValidation)
                  }
                />
                <div
                  className={`triangleLeft ${
                    showValidation("country") ? "" : "ValidationTextHide"
                  }`}
                />
                <ValidationPopup
                  errorText={countryValidation}
                  errorHeader="Invalid Country"
                  hide={showValidation("country")}
                />
              </div>
              <div className="LoginHeader LoginHeader--NoMargin">State</div>
              <div className="LoginInputValidationContainer">
                <input
                  type="text"
                  placeholder={state}
                  className="LoginInput"
                  onBlur={(e) => handleState(e, setState, setStateValidation)}
                />
                <div
                  className={`triangleLeft ${
                    showValidation("state") ? "" : "ValidationTextHide"
                  }`}
                />
                <ValidationPopup
                  errorText={stateValidation}
                  errorHeader="Invalid State"
                  hide={showValidation("state")}
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className="ItemPicturesWrapper">
          <BorrowFailed />
          <BorrowerRater />
          {/* Div for Pictures from the database */}
          <div
            className="LoginMain"
            style={{ width: "100%", marginTop: "0.5%" }}
          >
            <div className="LoginHeader">Item Pictures</div>
            <div className="PostItem__ItemPictures__Container">
              {pictures.map((picture) => {
                return (
                  <div className="PostItem__ItemPictures__Preview">
                    <IconButton
                      aria-label="delete"
                      className={classes.buttonDelete}
                      onClick={() => handleDelete(picture.id)}
                    >
                      <RemoveIcon className={classes.icon} />
                    </IconButton>

                    {picture.preview ? (
                      <img
                        src={picture.preview}
                        alt=""
                        className="ProfilePicturePreview"
                      />
                    ) : (
                      <img
                        src={getImage(picture.url)}
                        alt=""
                        className="ProfilePicturePreview"
                      />
                    )}
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
          </div>
          {/* Div for Item Delivery and Pickup */}
          <div className="LoginMain LoginMainNoMarg" style={{ width: "100%" }}>
            <div className="LoginHeader">Item Delivery & Pickup</div>
            <div className="LoginText">
              You can provide an optional delivery service of your item to help
              your borrowers out.
            </div>

            <div className="LoginHeader">Price ($)</div>
            <input
              type="number"
              min="1"
              step="any"
              defaultValue={deliveryPrice}
              className="LoginInput"
              onChange={(e) => setDeliveryPrice(parseInt(e.target.value))}
            />
          </div>
          {/* Div for Availability Option and Deletion of Item */}
          <div className="LoginMain LoginMainNoMarg" style={{ width: "100%" }}>
            <div className="LoginHeader">Other Options</div>
            <div className="ItemButtons">
              <button
                className="ButtonAvailability"
                onClick={handleOpenEditAvailability}
                style={{ width: "57%" }}
              >
                <div className="ItemButtonFlex">Edit Item Availability</div>
              </button>
              <Dialog
                open={editAvailabilityOpen}
                onClose={handleCloseEditAvailability}
              >
                <DialogTitle>Update {title} Availability</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Availability
                      setAvailability={setAvailable}
                      addEditButtons
                      getAvailability={available}
                      handleDiscardChanges={() => handleCloseEditAvailability()}
                    />
                  </DialogContentText>
                </DialogContent>
              </Dialog>
              <button
                className="SearchButtonLarge"
                onClick={handleClickOpen}
                style={{ width: "57%" }}
              >
                <div className="ItemButtonFlex">Delete Item</div>
              </button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete {title}?</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to remove {title} from YourShed?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      handleClose();
                      handleItemDeletion();
                    }}
                    color="secondary"
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default EditItemPage;

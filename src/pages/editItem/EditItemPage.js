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
import useGlobalState from "../../util/useGlobalState";
import "./editItem.css";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/styles";
import getImage from "../../util/getImage.js";
import LBSSwitch from "../../components/LBSSwitch/LBSSwitch";
import { Fade } from "@material-ui/core";

function EditItemPage(props) {
  const [item, setItem] = useState();
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

  let [newImage, setNewImage] = useState([]);
  let [updatedImage, setUpdatedImage] = useState([]);

  //---------------------------------Location-------------------------------------//

  const [addressValidation, setAddressValidation] = useState("");
  const [cityValidation, setCityValidation] = useState("");
  const [countryValidation, setCountryValidation] = useState("");
  const [stateValidation, setStateValidation] = useState("");

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

  //----------------------------------------------------------------------------------------------------------//

  const queryString = require("query-string");
  const params = useParams();
  let newPictures = [];
  //seperating the userid and the item id from the parameters using the query string function
  const parsed = queryString.parse(params.itemId);
  let itemId = parsed.i_id;
  let userId = parsed.u_id;

  //used this method to add preview to the images received from the server
  const dbImageConverter = () => {
    newPictures = pictures.map((picture, i) => {
      if (picture.preview) {
        console.log("Modified data on Pictures ", JSON.stringify(newPictures));
        return;
      } else {
        newPictures.push({
          preview: picture,
          raw: picture,
          id: i + 1,
        });
        setPictures(newPictures);
      }
    });
  };
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

        setUpdatedImage(response.data.item.pictures.split(","));
        setPictures(response.data.item.pictures.split(","));

        setItem(response.data.item);
        console.log("address : >", address, city, country, state);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    dbImageConverter();
  }, [params]);

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

  const findNewPictureID = () => {
    var indices = [];
    newImage.forEach((picture) => {
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
    //setting the array to get new images added to the database images as well
    // this image array is used to update the image field on the server
    dbImageConverter();
    //setting the array for new image adding to show in the image section
    if (e.target.files.length) {
      let newPictures = newImage.map((picture) => picture);
      newPictures.push({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
        id: findNewPictureID(),
      });
      setNewImage(newPictures);
      setUpdatedImage([...updatedImage, newPictures]);
      console.log("Images to be uploaded : ", JSON.stringify(updatedImage));
    }
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
  const newPictureHandleDelete = (id) => {
    var newPictures = [];
    for (var i = 0; i < newImage.length; i++) {
      var pic = newImage[i];

      if (pic.id !== id) {
        newPictures.push(pic);
      }
    }
    setNewImage(newPictures);
    setUpdatedImage("");
    setUpdatedImage([...updatedImage, pictures]);
    setUpdatedImage([...updatedImage, newImage]);
    console.log(
      "to be uploaded after deletion : ",
      JSON.stringify(updatedImage)
    );
  };
  //-------------------------------------------------------------------------//

  return (
    <PageWrapper>
      <Banner textBold="Editing Item" textNormal={titleText} />
      <div className="ItemMainWrapper">
        <div className="ItemInfoWrapper">
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
                placeholder={title}
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
                placeholder={description}
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
                placeholder={price}
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
                          placeholder={discount}
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
            {/* Item Location */}
            <div className="AccountSettings__Container">
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
            </div>
          </div>
        </div>

        <div className="ItemPicturesWrapper">
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

                    <img
                      src={getImage(picture.preview)}
                      alt=""
                      className="ProfilePicturePreview"
                    />
                  </div>
                );
              })}
              {newImage.map((picture) => {
                return (
                  <div className="PostItem__ItemPictures__Preview">
                    <IconButton
                      aria-label="delete"
                      className={classes.buttonDelete}
                      onClick={() => newPictureHandleDelete(picture.id)}
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
              placeholder={deliveryPrice}
              className="LoginInput"
              onChange={(e) => setDeliveryPrice(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default EditItemPage;

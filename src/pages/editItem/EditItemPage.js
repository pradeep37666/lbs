import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Banner from "../../components/bannerText/bannerText";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import Instance from "../../util/axios";
import CategorySelect from "../../components/categorySelect/categorySelect";
import "./editItem.css";
import MapsAutocomplete from "../../components/mapsAutocomplete/MapsAutocomplete";
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
import { useHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";
import getSuburb from "../../util/getSuburb";
import queryString from 'query-string'


function EditItemPage(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [titleText, setTitleText] = useState();
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();

  const [discount, setDiscount] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState();
  const [available, setAvailable] = useState();

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [address, setAddress] = useState();
  const [suburb, setSuburb] = useState();

  const [isDiscount, setIsDiscount] = useState(false);

  //--------modal for displaying the edit button dialogue-------//
  const [open, setOpen] = useState(false);
  const [editAvailabilityOpen, setEditAvailabilityOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const [pictures, setPictures] = useState([]);
  const [deletedImages, setDeletedImages] = useState([])
  const [newImages, setNewImages] = useState([])

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


  const params = useParams();
  const parsed = queryString.parse(params.itemId);
  let itemId = parsed.i_id;

  useEffect(() => {
    setLoading(true);
    Instance.get(`/items/findByIid/?i_id=${itemId}`)
      .then((response) => {
        setTitleText(response.data.item.title);

        setTitle(response.data.item.title);
        setCategory(response.data.item.category);
        setDescription(response.data.item.description);
        setPrice(response.data.item.price);
        setDeliveryPrice(response.data.item.deliveryPrice);
        setDiscount(response.data.item.discount);
        setAddress(response.data.item.address);
        setSuburb(response.data.item.suburb);
        setLat(response.data.item.lat);
        setLng(response.data.item.lng);
        setAvailable(response.data.item.available);

        // setUpdatedImage(response.data.item.pictures.split(","));
        setPictures(structurePictures(response.data.item.pictures.split(",")));

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  const handleItemDeletion = () => {
    Instance.delete(`/items/delete?i_id=${itemId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
    history.push(`/user/your_shed`);
  };

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
      ]
      setNewImages(newImages => [...newImages, {
          preview: URL.createObjectURL(e.target.files[0]),
          raw: e.target.files[0],
          id: findNextID(),
      }])
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
      } else {
        if (pic.url) setDeletedImages(deletedImages => [...deletedImages, pic.url])
        else setNewImages(newImages.filter(({id}) => id !== pic.id))
      }
    }
    setPictures(newPictures);
  };

  const applyChanges = async () => {
    let newSuburb
    address.address_components ? newSuburb = getSuburb(address.address_components) : newSuburb = suburb

    const newItemDetails = {
      i_id: itemId,
      title: title,
      category: category,
      description: description,
      newImages: newImages,
      deletedImages: deletedImages.join(),
      price: price,
      deliveryPrice: deliveryPrice,
      discount: discount,
      available: available,
      lat: address.lat ? address.lat : lat,
      lng: address.lng ? address.lng : lng,
      address: address.formatted_address ? address.formatted_address : address,
      suburb: newSuburb,
    }

    const formData = new FormData()
    for (let key in newItemDetails) {
      if (key === 'newImages') {
        newImages.forEach((item) => formData.append('newImages', item.raw))
        continue
      }
      formData.append(key, newItemDetails[key])
    }
    setIsLoading(true)
    try{
      const { data, status } = await Instance.put('/items/update', formData)
      
    } catch(err) {
      console.log(err)
    } finally{
      setIsLoading(false)
      history.push(`/item/${itemId}`)
    }
  }


  return (
    <PageWrapper>
      <Banner
        textBold="Editing Item"
        textNormal={titleText}
        button={"Apply Changes"}
        buttonClick={() => applyChanges()}
        buttonLoading={isLoading}
      />
      {loading ? (
        <div className="ItemPage__Loading__Container">
          <CircularProgress size={75} color="inherit" />
        </div>
      ) : (
        <div className="EditItemMainWrapper">
          <div className="EditItemInfoWrapper">
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
                  thinBorder
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
                            onBlur={(e) =>
                              setDiscount(parseInt(e.target.value))
                            }
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
              <div
                className="LoginMain LoginMainNoMarg"
                style={{ width: "100%" }}
              >
                <MapsAutocomplete
                  setAddress={setAddress}
                  defaultLocation={address}
                  defaultLat={lat}
                  defaultLng={lng}
                />
              </div>
            </div>
          </div>

          <div className="EditItemPicturesWrapper">
            <div
              className="LoginMain"
              style={{ width: "100%", marginTop: "0.5%" }}
            >
              <div className="LoginHeader">Item Pictures</div>
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
              <div
                className="PostItem__ItemPictures__Add__Container"
                style={{ marginBottom: "-15%" }}
              >
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
            <div
              className="LoginMain LoginMainNoMarg"
              style={{ width: "100%" }}
            >
              <div className="LoginHeader">Item Delivery & Pickup</div>
              <div className="LoginText">
                You can provide an optional delivery service of your item to
                help your borrowers out.
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
            <div
              className="LoginMain LoginMainNoMarg"
              style={{ width: "100%" }}
            >
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
                  <DialogContent>
                    <Availability
                      style={{ width: '100%', marginTop: '1rem', }}
                      setAvailability={setAvailable}
                      addEditButtons
                      getAvailability={available}
                      handleDiscardChanges={() => handleCloseEditAvailability()}
                    />
                  </DialogContent>
                </Dialog>
                <button
                  className="SearchButtonLarge"
                  onClick={handleClickOpen}
                  style={{ width: "57%" }}
                >
                  <div>Delete Item</div>
                </button>
                <Dialog 
                open={open} 
                onClose={handleClose}>
                  <DialogContent className="DeleteModalContainer">
                    <div className="DeleteModalTextContainer">
                      <div className="DeleteModalHeading">Are you sure you want to delete this item?</div>
                      
                      <div className="DeleteModalText">This item will be permanently deleted from the Little Big Shed platform.</div>
                      <div className="DeleteModalText">Are you sure you want to do this?</div>
                    </div>
                    <div className="ItemButtons" style={{ justifyContent: 'center', justifySelf: 'flex-end', height: '3.5rem' }}>
                      <button
                      className="ButtonAvailability"
                      style={{ width: '25%'}}
                      onClick={handleClose}
                      >
                        <div className="ItemButtonFlex">No, go back</div>
                      </button>
                      <button
                      style={{ width: '25%'}}
                      className="SearchButtonLarge"
                      onClick={() => {
                        handleClose();
                        handleItemDeletion();
                      }}>
                      Yes, Delete
                      </button>
                    </div>
                      
                  </DialogContent >
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

export default EditItemPage;

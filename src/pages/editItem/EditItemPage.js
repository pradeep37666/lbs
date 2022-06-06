import React, { createContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import Banner from "../../components/bannerText/bannerText";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import Instance from "../../util/axios";
import "./editItem.css";
import MapsAutocomplete from "../../components/mapsAutocomplete/MapsAutocomplete";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Availability from "../../components/FormComponents/Availability";
import { useHistory } from "react-router";
import { CircularProgress } from "@material-ui/core";
import getSuburb from "../../util/getSuburb";
import queryString from 'query-string'
import editItemReducer from "../../util/reducers/editItemReducer";
import EditBasicDetails from "../../components/EditItemComponents/EditBasicDetails";
import EditPriceDetails from "../../components/EditItemComponents/EditPriceDetails";
import EditItemPictures from "../../components/EditItemComponents/EditItemImages";
import DeleteItemModal from "../../components/modals/DeleteItemModal/DeleteItemModal";

const EditItemContext = createContext()
function EditItemPage() {
  const [state, dispatch] = useReducer(editItemReducer, { 
    availability: [],
    isDiscount: false,
    newImages: [],
    images: [],
    deletedImages: []
  })
  const { title, category, description, price, deliveryPrice, discount, address, availability, lat, lng, suburb, images, titleText, deletedImages, newImages } = state

  const history = useHistory();
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editAvailabilityOpen, setEditAvailabilityOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams();
  const parsed = queryString.parse(params.itemId);
  let itemId = parsed.i_id;

  useEffect(() => {
    getItem()
  }, [params]);

  const getItem = async () => {
    setLoading(true)
    try {
      const { data } = await Instance.get(`/items/findByIid/?i_id=${itemId}`)
      dispatch({ type: 'setInitialState', data: data.item })
      setLoading(false)
    } catch(err){
      setLoading(false)
      console.log(err.response)
    }

  }

  const deleteItem = async () => {
    try{
      await Instance.delete(`/items/delete?i_id=${itemId}`)
      history.push(`/user/your_shed`);
    } catch(err){
      console.log(err.response)
    }
  };

  console.log(images)
  
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
      available: availability.join(''),
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

  console.log(availability)
  return (
    <EditItemContext.Provider value={{ state, dispatch }}>
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
            <EditBasicDetails state={state} dispatch={dispatch} />
            <EditPriceDetails state={state} dispatch={dispatch} />
              
              <div className="LoginMain LoginMainNoMarg" style={{ width: "100%" }} >
                <MapsAutocomplete
                  setAddress={newAddress => dispatch({ type: 'setAddress', data: newAddress })}
                  defaultLocation={address}
                  defaultLat={lat}
                  defaultLng={lng}
                />
              </div>
          </div>

          <div className="EditItemPicturesWrapper">
            <EditItemPictures state={state} dispatch={dispatch} />

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
                onChange={(e) => dispatch({ type: 'setDeliveryPrice', data: e.target.value})}
              />
            </div>
            <div
              className="LoginMain LoginMainNoMarg"
              style={{ width: "100%" }}
            >
              <div className="LoginHeader">Other Options</div>
              <div className="ItemButtons">
                <button
                  className="ButtonAvailability"
                  onClick={() => setEditAvailabilityOpen(!editAvailabilityOpen)}
                  style={{ width: "57%" }}
                >
                  <div className="ItemButtonFlex">Edit Item Availability</div>
                </button>
                <Dialog
                  open={editAvailabilityOpen}
                  onClose={() => setEditAvailabilityOpen(!editAvailabilityOpen)}
                >
                  <DialogContent>
                    <Availability
                      style={{ width: '100%', marginTop: '1rem', }}
                      // setAvailability={setAvailable}
                      isEditItem
                      context={EditItemContext}
                      onCancel={() => setEditAvailabilityOpen(!editAvailabilityOpen)}

                    />
                  </DialogContent>
                </Dialog>
                <button
                  className="SearchButtonLarge"
                  onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                  style={{ width: "57%" }}
                >
                  <div>Delete Item</div>
                </button>
                <DeleteItemModal 
                isDeleteModalOpen={isDeleteModalOpen} 
                setIsDeleteModalOpen={setIsDeleteModalOpen} 
                deleteItem={deleteItem} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
    </EditItemContext.Provider>
  );
}

export default EditItemPage;

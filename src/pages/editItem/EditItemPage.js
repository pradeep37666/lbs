import React, { createContext, useEffect, useReducer, useState } from "react"
import "./editItem.css"
import { useParams } from "react-router"
import Banner from "../../components/bannerText/bannerText"
import PageWrapper from "../../components/pageWrapper/pageWrapper"
import Instance from "../../util/axios"
import MapsAutocomplete from "../../components/mapsAutocomplete/MapsAutocomplete"
import DialogContent from "@material-ui/core/DialogContent"
import Dialog from "@material-ui/core/Dialog"
import Availability from "../../components/FormComponents/Availability"
import { useHistory } from "react-router"
import { CircularProgress } from "@material-ui/core"
import editItemReducer from "../../util/reducers/editItemReducer"
import EditBasicDetails from "../../components/EditItemComponents/EditBasicDetails"
import EditPriceDetails from "../../components/EditItemComponents/EditPriceDetails"
import EditItemPictures from "../../components/EditItemComponents/EditItemImages"
import DeleteItemModal from "../../components/modals/DeleteItemModal/DeleteItemModal"
import LBSSelectBox from "../../components/LBSSelectBox/LBSSelectBox"
import { DELIVERY_OPTIONS } from "../../assets/Data/LBSSelectOptions"
import ValidationTextInput from "../../components/FormComponents/ValidationTextInput"

const EditItemContext = createContext()
function EditItemPage() {
  const [ state, dispatch ] = useReducer(editItemReducer, { 
    availability: [],
    isDiscount: false,
    newImages: [],
    images: [],
    deletedImages: []
  })
  const { 
    title, category, description, 
    price, deliveryPrice, discount, 
    address, availability, titleText,
    newImageLinks, deletedImages,
    deliveryOption, pickupPrice
  } = state

  const params = useParams()
  const history = useHistory()
  const [ loading, setLoading ] = useState(true)

  const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false)
  const [ editAvailabilityOpen, setEditAvailabilityOpen ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    getItem()
  }, [params])

  const getItem = async () => {
    try {
      setLoading(true)
      const { data } = await Instance.get(`/items/${params.itemId}`)
      if (!data) return
      dispatch({ type: 'setInitialState', data: data })
    } catch(error){
      console.log(error.response)
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async () => {
    try{
      const { status } = await Instance.delete(`/items/${params.itemId}`)
      if (status !== 200) return
      history.push(`/user/your_shed`)
    } catch(error){
      console.log(error.response)
    }
  }
  
  const applyChanges = async () => {
    const newItemDetails = {
      title,
      category,
      description,
      price,
      discount,
      weekly_availability: availability.join(''),
      address,
      images: newImageLinks ?? [],
      imagesToDelete: deletedImages ?? [],
      deliveryOption,
      deliveryPrice: deliveryOption === 'NONE' ? 0 : deliveryPrice,
      pickupPrice: deliveryOption === 'NONE' ? 0 : pickupPrice,
    }
    try{
      setIsLoading(true)
      const { status } = await Instance.patch(`/items/${params.itemId}`, newItemDetails)
      if (status !== 200) return
      history.push(`/item/${params.itemId}`)
    } catch(error) {
      console.log(error.response)
    } finally{
      setIsLoading(false)
    }
  }

  const setAddress = (addressObj) => {
    dispatch({ type: 'setAddress', data: addressObj})
  }

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
                {address &&
                <MapsAutocomplete
                  setAddress={setAddress}
                  defaultAddress={address}
                  defaultLocation={address.fullAddress}
                  defaultLat={parseFloat(address.lat)}
                  defaultLng={parseFloat(address.lng)}
                />}
              </div>
            </div>

            <div className="EditItemPicturesWrapper">
              <EditItemPictures state={state} dispatch={dispatch} />

              <div
                className="LoginMain LoginMainNoMarg"
                style={{ width: "100%" }}
              >
                <div className="LoginHeader">Item Delivery &amp; Pickup</div>
                <div className="LoginText">
                  You can provide an optional delivery service of your item to
                  help your borrowers out.
                </div>
                <LBSSelectBox 
                  selectOption={DELIVERY_OPTIONS}
                  width='100%'
                  fontSize='18px'
                  margin='0 0 2em 0'
                  thinBorder
                  value={deliveryOption ?? ''}
                  onChange={option => dispatch({type: 'setDeliveryOption', data: option})}
                />
                {((deliveryOption === 'DELIVERY') ||
                 (deliveryOption === 'BOTH')) && (
                  <>
                    <div className="LoginHeader">Delivery Fee ($)</div>
                    <ValidationTextInput 
                      inputType="number"
                      value={deliveryPrice}
                      onChange={(e) => dispatch({ type: 'setDeliveryPrice', data: e.target.value })}
                      placeholder="$10"
                    />
                  </>
                )}
                {((deliveryOption === 'PICKUP') ||
                 (deliveryOption === 'BOTH')) && (
                  <>
                    <div className="LoginHeader">Pickup Fee ($)</div>
                    <ValidationTextInput 
                      inputType="number"
                      value={pickupPrice}
                      onChange={(e) => dispatch({ type: 'setPickupPrice', data: e.target.value })}
                      placeholder="$10"
                    />
                  </>
                )}
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
  )
}

export default EditItemPage;

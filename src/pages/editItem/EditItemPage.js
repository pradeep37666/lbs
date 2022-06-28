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

const EditItemContext = createContext()
function EditItemPage() {
  const [state, dispatch] = useReducer(editItemReducer, { 
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
    newImageLinks, deletedImages, newImages
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

  useEffect(() => {
    console.log({newImages})
    console.log({deletedImages})
  },[newImages, deletedImages])

  const getItem = async () => {
    try {
      setLoading(true)
      const { data } = await Instance.get(`/items/${params.itemId}`)
      if (!data.item) return
      dispatch({ type: 'setInitialState', data: data.item })
    } catch(error){
      console.log(error.response)
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async () => {
    // try{
    //   await Instance.delete(`/items/delete?i_id=${itemId}`)
    //   history.push(`/user/your_shed`);
    // } catch(err){
    //   console.log(err.response)
    // }
  }
  
  const applyChanges = async () => {
    const newItemDetails = {
      title,
      category,
      description,
      price,
      deliveryPrice,
      discount,
      weekly_availability: availability.join(''),
      address,
      images: newImageLinks,
      imagesToDelete: deletedImages
    }

    // const formData = new FormData()
    // for (let key in newItemDetails) {
    //   if (key === 'images') {
    //     newImages.forEach((item) => formData.append('imageKey', item.imageKey))
    //     continue
    //   }
    //   formData.append(key, newItemDetails[key])
    // }
    try{
      setIsLoading(true)
      const { data, status } = await Instance.patch(`/items/${params.itemId}`, newItemDetails)
      console.log({status})
      console.log({data})
      if (status !== 200) return
      history.push(`/item/${params.itemId}`)
    } catch(err) {
      console.log(err)
    } finally{
      setIsLoading(false)
    }
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
                  <MapsAutocomplete
                    setAddress={newAddress => dispatch({ type: 'setAddress', data: newAddress })}
                    defaultLocation={address.fullAddress}
                    defaultLat={address.lat}
                    defaultLng={address.lng}
                  />
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

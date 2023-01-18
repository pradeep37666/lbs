import { createContext, useEffect, useReducer, useState } from 'react'
import './editItem.css'
import { useParams } from 'react-router'
import Banner from '../../components/bannerText/bannerText'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import Instance from '../../util/axios'
import MapsAutocomplete from '../../components/mapsAutocomplete/MapsAutocomplete'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Availability from '../../components/FormComponents/Availability'
import { useHistory } from 'react-router'
import { CircularProgress } from '@material-ui/core'
import editItemReducer, {
  InitialEditItemState,
} from '../../util/reducers/editItemReducer'
import EditBasicDetails from '../../components/EditItemComponents/EditBasicDetails'
import EditPriceDetails from '../../components/EditItemComponents/EditPriceDetails'
import EditItemPictures from '../../components/EditItemComponents/EditItemImages'
import DeleteItemModal from '../../components/modals/DeleteItemModal/DeleteItemModal'
import LBSSelectBox from '../../components/LBSSelectBox/LBSSelectBox'
import { DELIVERY_OPTIONS } from '../../assets/Data/LBSSelectOptions'
import ValidationTextInput from '../../components/FormComponents/ValidationTextInput'
import ItemService from '../../services/item'
import useErrorState from '../../util/reducers/errorContext'
import { SNACKBAR_BUTTON_TYPES } from '../../assets/Data/LBSEnum'

const EditItemContext = createContext()
const EditItemPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editAvailabilityOpen, setEditAvailabilityOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const history = useHistory()
  const { errorDispatch } = useErrorState()
  const [state, dispatch] = useReducer(editItemReducer, InitialEditItemState)
  const {
    deletedImages,
    newImageLinks,
    editItemTitle,
    editItemCategory,
    editItemDescription,
    editItemPrice,
    editItemDeliveryPrice,
    editItemDiscount,
    editItemAddress,
    editItemDeliveryOption,
    editItemPickupPrice,
  } = state
  const itemService = new ItemService()
  const [address, setAddress] = useState(editItemAddress)

  useEffect(() => {
    getItem()
  }, [params])

  const getItem = async () => {
    try {
      setLoading(true)
      const data = await itemService.getItem(params.itemId)
      if (!data) return
      dispatch({ type: 'setItemDetails', data })
    } catch (error) {
      console.log(error.response)
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async () => {
    try {
      const { status } = await Instance.delete(`/items/${params.itemId}`)
      if (status !== 200) return
      history.push(`/user/your_shed`)
    } catch (error) {
      console.log(error.response)
    }
  }

  const getItemData = () => {
    const itemData = {
      id: params.itemId,
      title: editItemTitle,
      category: editItemCategory,
      description: editItemDescription,
      price: editItemPrice,
      deliveryOption: editItemDeliveryOption,
      pickupPrice:
        editItemDeliveryOption === 'BOTH' || editItemDeliveryOption === 'PICKUP'
          ? editItemPickupPrice
          : 0,
      deliveryPrice:
        editItemDeliveryOption === 'BOTH' ||
        editItemDeliveryOption === 'DELIVERY'
          ? editItemDeliveryPrice
          : 0,
      discount: editItemDiscount,
      imagesToDelete: deletedImages ?? [],
      images: newImageLinks ?? [],
      address: {
        suburb: address.suburb,
        lat: address.lat,
        lng: address.lng,
        country: address.country,
        state: address.state,
        city: address.city,
        postCode: address.postCode,
        streetNumber: address.streetNumber,
        fullAddress: address.fullAddress,
        streetName: address.streetName,
      },
    }
    return itemData
  }

  const applyChanges = async () => {
    const newItemDetails = getItemData()
    try {
      setIsLoading(true)
      const data = await itemService.updateItemDetails(
        params.itemId,
        newItemDetails
      )
      if (!data) throw Error
      history.push(`/item/${params.itemId}`)
    } catch (error) {
      errorDispatch({
        type: 'openSnackBar',
        data: {
          message:
            'Failed to update the item. Please check your details and try again later.',
          btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
          btnFunc: () => {
            errorDispatch({ type: 'closeSnackBar' })
          },
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <EditItemContext.Provider value={{ state, dispatch }}>
      <PageWrapper>
        <Banner
          textBold='Editing Item'
          textNormal={editItemTitle}
          button={'Apply Changes'}
          buttonClick={() => applyChanges()}
          buttonLoading={isLoading}
        />
        {loading ? (
          <div className='ItemPage__Loading__Container'>
            <CircularProgress size={75} color='inherit' />
          </div>
        ) : (
          <div className='EditItemMainWrapper'>
            <div className='EditItemInfoWrapper'>
              <EditBasicDetails state={state} dispatch={dispatch} />
              <EditPriceDetails state={state} dispatch={dispatch} />
              <div
                className='LoginMain LoginMainNoMarg'
                style={{ width: '100%' }}
              >
                <MapsAutocomplete
                  setAddress={setAddress}
                  defaultAddress={editItemAddress}
                  defaultLocation={editItemAddress.fullAddress}
                  defaultLat={parseFloat(editItemAddress.lat)}
                  defaultLng={parseFloat(editItemAddress.lng)}
                />
                {/* {defaultAddress ? (
                  <MapsAutocomplete
                    setAddress={address =>
                      dispatch({ type: 'setEditItemAddress', data: address })
                    }
                    defaultAddress={defaultAddress}
                    defaultLocation={defaultAddress.fullAddress}
                    defaultLat={parseFloat(defaultAddress.lat)}
                    defaultLng={parseFloat(defaultAddress.lng)}
                  />
                ) : (
                  <MapsAutocomplete
                    setAddress={address =>
                      dispatch({ type: 'setEditItemAddress', data: address })
                    }
                  />
                )} */}
              </div>
            </div>

            <div className='EditItemPicturesWrapper'>
              <EditItemPictures state={state} dispatch={dispatch} />

              <div
                className='LoginMain LoginMainNoMarg'
                style={{ width: '100%' }}
              >
                <div className='LoginHeader'>Item Delivery &amp; Pickup</div>
                <div className='LoginText'>
                  You can provide an optional delivery service of your item to
                  help your borrowers out.
                </div>
                <LBSSelectBox
                  selectOption={DELIVERY_OPTIONS}
                  width='100%'
                  fontSize='18px'
                  margin='0 0 2em 0'
                  thinBorder
                  value={editItemDeliveryOption ?? ''}
                  onChange={option =>
                    dispatch({
                      type: 'setEditItemDeliveryOption',
                      data: option,
                    })
                  }
                />
                {(editItemDeliveryOption === 'DELIVERY' ||
                  editItemDeliveryOption === 'BOTH') && (
                  <>
                    <div className='LoginHeader'>Delivery Fee ($)</div>
                    <ValidationTextInput
                      inputType='number'
                      value={editItemDeliveryPrice}
                      onChange={e =>
                        dispatch({
                          type: 'setEditItemDeliveryPrice',
                          data: e.target.value,
                        })
                      }
                      placeholder='$10'
                    />
                  </>
                )}
                {(editItemDeliveryOption === 'PICKUP' ||
                  editItemDeliveryOption === 'BOTH') && (
                  <>
                    <div className='LoginHeader'>Pickup Fee ($)</div>
                    <ValidationTextInput
                      inputType='number'
                      value={editItemPickupPrice}
                      onChange={e =>
                        dispatch({
                          type: 'setEditItemPickupPrice',
                          data: e.target.value,
                        })
                      }
                      placeholder='$10'
                    />
                  </>
                )}
              </div>
              <div
                className='LoginMain LoginMainNoMarg'
                style={{ width: '100%' }}
              >
                <div className='LoginHeader'>Other Options</div>
                <div className='ItemButtons'>
                  <button
                    className='ButtonAvailability'
                    onClick={() =>
                      setEditAvailabilityOpen(!editAvailabilityOpen)
                    }
                    style={{ width: '57%' }}
                  >
                    <div className='ItemButtonFlex'>Edit Item Availability</div>
                  </button>
                  <Dialog
                    open={editAvailabilityOpen}
                    onClose={() =>
                      setEditAvailabilityOpen(!editAvailabilityOpen)
                    }
                  >
                    <DialogContent>
                      <Availability
                        context={EditItemContext}
                        style={{ width: '100%', marginTop: '1rem' }}
                        isEditItem
                        onCancel={() =>
                          setEditAvailabilityOpen(!editAvailabilityOpen)
                        }
                      />
                    </DialogContent>
                  </Dialog>
                  <button
                    className='SearchButtonLarge'
                    onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                    style={{ width: '57%' }}
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

export default EditItemPage

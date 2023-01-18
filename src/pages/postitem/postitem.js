import { useState, useEffect, createContext, useReducer } from 'react'
import './postitem.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import Banner from '../../components/bannerText/bannerText'
import BasicDetails from './PostItemContent/BasicDetails'
import ItemPictures from './PostItemContent/ItemPictures'
import AdvancedDetails from './PostItemContent/AdvancedDetails'
import LocationDetails from '../../components/FormComponents/LocationDetails'
import Availability from './PostItemContent/Availability'
import Complete from './PostItemContent/Complete'
import useGlobalState from '../../util/useGlobalState'
import postItemReducer, {
  InitialPostItemState,
} from '../../util/reducers/postItemReducer'
import {
  POST_ITEM_PAGE,
  SNACKBAR_BUTTON_TYPES,
} from '../../assets/Data/LBSEnum'
import { getPrevPostItemPage } from '../../util/getPrevPage'
import { useHistory } from 'react-router-dom'
import useErrorState from '../../util/reducers/errorContext'
import AgreementModal from '../../components/modals/AgreementModal/AgreementModal'
import {
  BlockedAvailabilityToNumber,
  BlockedAvailabilityToString,
} from '../../types/User'
import ItemService from '../../services/item'

const FormContext = createContext()

export default function PostItem() {
  const [isCreateItemLoading, setIsCreateItemLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [itemID, setItemID] = useState(null)
  const { user } = useGlobalState().state
  const history = useHistory()
  const { errorDispatch } = useErrorState()
  const blockedAvailabilities = user.userBlockedAvailability.map(
    availability => {
      return {
        weekDay: BlockedAvailabilityToString(
          availability.blockedAvailability.weekDay
        ),
        startTime: availability.blockedAvailability.startTime,
        endTime: availability.blockedAvailability.endTime,
      }
    }
  )
  const [state, dispatch] = useReducer(postItemReducer, {
    ...InitialPostItemState,
    postItemBlockedAvailabilities: blockedAvailabilities,
  })
  const itemService = new ItemService()

  const {
    postItemTitle,
    postItemCategory,
    postItemImages,
    postItemImageLinks,
    postItemDescription,
    postItemPrice,
    postItemDiscount,
    postItemDeliveryPrice,
    postItemPickupPrice,
    postItemDeliveryOption,
    postItemAddress,
    postItemBlockedAvailabilities,
    currentPage,
  } = state

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const getItemData = () => {
    const itemData = {
      title: postItemTitle,
      category: postItemCategory,
      description: postItemDescription,
      price: postItemPrice,
      deliveryPrice: postItemDeliveryPrice ?? 0,
      pickupPrice: postItemPickupPrice,
      deliveryOption: postItemDeliveryOption ?? 'NONE',
      rating: 5,
      discount: postItemDiscount ?? 0,
      is_deleted: false,
      images: postItemImageLinks,
      address: {
        streetNumber: postItemAddress?.streetNumber ?? '',
        streetName: postItemAddress?.streetName ?? '',
        city: postItemAddress?.city ?? '',
        suburb: postItemAddress?.suburb ?? '',
        state: postItemAddress?.state ?? '',
        postCode: postItemAddress?.postCode ?? '',
        country: postItemAddress?.country ?? '',
        fullAddress: postItemAddress?.fullAddress ?? '',
        lat: postItemAddress?.lat ?? 0,
        lng: postItemAddress?.lng ?? 0,
      },
    }
    return itemData
  }

  const createItem = async () => {
    const itemData = getItemData()
    const itemBlockedAvailabilitiesNumberFormat =
      postItemBlockedAvailabilities.map(availability => {
        return {
          weekDay: BlockedAvailabilityToNumber(availability.weekDay),
          startTime: availability.startTime,
          endTime: availability.endTime,
        }
      })
    try {
      setIsCreateItemLoading(true)
      const { item } = await itemService.createNewItem(
        itemData,
        itemBlockedAvailabilitiesNumberFormat
      )
      setItemID(item.id)
      dispatch({ type: 'setCreatedItem', data: item })
      dispatch({ type: 'setCurrentPage', data: POST_ITEM_PAGE.COMPLETE })
    } catch (error) {
      errorDispatch({
        type: 'openSnackBar',
        data: {
          message:
            'Failed to post a new item. Please check your details and try again.',
          btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
          btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
        },
      })
    } finally {
      setIsCreateItemLoading(false)
      setIsModalVisible(false)
    }
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case POST_ITEM_PAGE.BASIC:
        return <BasicDetails context={FormContext} />
      case POST_ITEM_PAGE.PICTURES:
        return <ItemPictures context={FormContext} />
      case POST_ITEM_PAGE.ADVANCE:
        return <AdvancedDetails context={FormContext} />
      case POST_ITEM_PAGE.LOCATION:
        return <LocationDetails context={FormContext} />
      case POST_ITEM_PAGE.AVAILABILITY:
        return (
          <Availability
            context={FormContext}
            openModal={() => setIsModalVisible(true)}
          />
        )
      case POST_ITEM_PAGE.COMPLETE:
        return (
          <Complete
            title={postItemTitle}
            picture={postItemImages[0]}
            price={postItemPrice}
            city={postItemAddress?.suburb}
            category={postItemCategory}
            deliveryPrice={postItemDeliveryPrice}
            pickupPrice={postItemPickupPrice}
            deliveryOption={postItemDeliveryOption}
            itemID={itemID}
          />
        )
    }
  }

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <PageWrapper>
        <Banner
          textBold='Post Item'
          textNormal={currentPage}
          prevPage={() => getPrevPostItemPage(currentPage, dispatch, history)}
        />
        {renderCurrentPage()}
        {isModalVisible && (
          <AgreementModal
            title={'Lenders Agreement'}
            content={
              "Be sure to read over your lender's rights (Found on our website) and that you have the right licencing and permissions to operate this item. By tapping the Yes button you agree that you understand these terms."
            }
            isLoading={isCreateItemLoading}
            open={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onClick={createItem}
          />
        )}
      </PageWrapper>
    </FormContext.Provider>
  )
}

import React, { useState, useEffect, createContext, useReducer} from 'react'
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
import Instance from '../../util/axios'
import postItemReducer from '../../util/reducers/postItemReducer'
import parseAddressComponent from '../../util/parseAddressComponent'
import { POST_ITEM_PAGE, SNACKBAR_BUTTON_TYPES } from '../../assets/Data/LBSEnum'
import { getPrevPostItemPage } from '../../util/getPrevPage'
import { useHistory } from 'react-router-dom'
import useErrorState from '../../util/reducers/errorContext'
import AgreementModal from '../../components/modals/AgreementModal/AgreementModal'
 
const FormContext = createContext()

export default function PostItem() {
    const [ isCreateItemLoading, setIsCreateItemLoading ] = useState(false)
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const { user } = useGlobalState().state
    const history = useHistory()
    const { errorDispatch } = useErrorState()
    const [ state, dispatch ] = useReducer(postItemReducer, { 
        currentPage: POST_ITEM_PAGE.BASIC,
        availability: user.available.split('').map(str => parseInt(str)),
        address: user.address,
        pictures: []
    })

    const { 
        title, category, pictureLinks, pictures,
        deliveryPrice, pickupPrice, deliveryOption,
        address, availability, description, price, 
        discount, currentPage,
    } = state

    const [itemID, setItemID] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    },[currentPage])

    const getItemDetails = () => {
        const formattedAddress = address?.address_components 
            ? parseAddressComponent(address.address_components)
            : address
        const itemDetails = {
            title,
            category,
            images: pictureLinks,
            description,
            price,
            deliveryPrice: deliveryPrice ?? 0,
            pickupPrice: pickupPrice ?? 0,
            deliveryOption,
            discount: discount ?? 0,
            address: {
                ...formattedAddress,
                lat: address.lat,
                lng: address.lng,
            },
            weekly_availability: availability.join(''),
            is_deleted: false,
        }
        return itemDetails
    }

    const createItem = async () => {
        const itemDetails = getItemDetails()
        try {
            setIsCreateItemLoading(true)
            const { data, status } = await Instance.post('/items', itemDetails)
            if (status !== 201) return
            setItemID(data.id)
            dispatch({ type: 'setCurrentPage', data: POST_ITEM_PAGE.COMPLETE})
        } catch (error) {
            console.log(error.response)
            errorDispatch({type: 'openSnackBar', data: {
                message: 'Failed to create a new item. Please check the details and try again.',
                btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
                btnFunc: () => errorDispatch({type: 'closeSnackBar'})
            }})
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
                return <Availability 
                context={FormContext}
                openModal={() => setIsModalVisible(true)}
                />
            case POST_ITEM_PAGE.COMPLETE:
                return <Complete 
                title={title}
                picture={pictures[0]}
                price={price}
                city={address.suburb}
                category={category} 
                deliveryPrice={deliveryPrice}
                pickupPrice={pickupPrice}
                deliveryOption={deliveryOption}
                itemID={itemID}             
                />
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
                    content={"Be sure to read over your lender's rights (Found on our website) and that you have the right licencing and permissions to operate this item. By tapping the Yes button you agree that you understand these terms."}
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

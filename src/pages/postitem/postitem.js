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
import getSuburb from '../../util/getSuburb'
import postItemReducer from '../../util/reducers/postItemReducer'
import parseAddressComponent from '../../util/parseAddressComponent'
 
const FormContext = createContext()

export default function PostItem() {
    const [isCreateItemLoading, setIsCreateItemLoading] = useState(false)
    const { user } = useGlobalState().state

    const [ state, dispatch ] = useReducer(postItemReducer, { 
        currentPage: 'Advanced Details',
        availability: user.available.split('').map(str => parseInt(str)),
        address: user.address,
        pictures: []
    })

    const { 
        title, category, pictureLinks, pictures,
        deliveryPrice, pickupPrice, deliveryOption,
        address, availability, description, price, 
        discount, delivery, currentPage,
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
            deliveryPrice: delivery ? delivery : 0,
            discount: discount ? discount : 0,
            address: {
                ...formattedAddress,
                lat: address.lat,
                lng: address.lng,
            },
            rating: 0,
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
            dispatch({ type: 'setCurrentPage', data: 'Complete!'})
        } catch (error) {
            console.log(error.response)
        } finally {
            setIsCreateItemLoading(false)
        }
    }

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'Basic Details':
                return <BasicDetails context={FormContext} />
            case 'Item Pictures':
                return <ItemPictures context={FormContext} />
            case 'Advanced Details':
                return <AdvancedDetails context={FormContext} />
            case 'Item Location':
                return <LocationDetails context={FormContext} />
            case 'Availability':
                return <Availability 
                context={FormContext}
                createItem={createItem}
                isCreateItemLoading={isCreateItemLoading}
                />
            case 'Complete!':
                return <Complete 
                title={title}
                picture={pictures[0]}
                price={price}
                city={address.terms ? getSuburb(address.terms) : user.suburb}
                category={category} 
                delivery={delivery}
                itemID={itemID}             
                />
        }
    }

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            <PageWrapper>
                <Banner textBold='Post Item' textNormal={currentPage} />
                {renderCurrentPage()}
            </PageWrapper>
        </FormContext.Provider>
    )
}

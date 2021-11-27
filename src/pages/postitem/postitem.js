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

const FormContext = createContext()

export default function PostItem() {
    const [isCreateItemLoading, setIsCreateItemLoading] = useState(false)
    const { user } = useGlobalState().state

    const [state, dispatch] = useReducer(postItemReducer, { 
        currentPage: 'Basic Details',
        availability: user.available.split('').map(str => parseInt(str)),
        address: user.address,
        pictures: []
    
    })

    const { currentPage, address, availability, title, category, pictures, description, price, discount, delivery } = state

    const [itemID, setItemID] = useState(null)

    useEffect(() => {
        window.scrollTo(0, 0)
    },[currentPage])

    const getItemDetails = () => {
        // let suburb
        // address.address_components ? suburb = getSuburb(address.address_components) : suburb = user.suburb
        const suburb = address.address_components ? getSuburb(address.address_components) : user.suburb
        const itemDetails = {
            title: title,
            category: category,
            files: pictures,
            description: description,
            price: price,
            deliveryPrice: delivery,
            discount: discount ? discount : 5,
            available: availability.join(''),
            lat: address.lat ? address.lat : user.lat,
            lng: address.lng ? address.lng : user.lng,
            address: address.formatted_address ? address.formatted_address : user.address,
            suburb: suburb
        }
        return itemDetails
    }

    const createItem = async () => {
       
        const itemDetails = getItemDetails()
        console.log(itemDetails)
        const formData = new FormData()
        for (let key in itemDetails) {
            if (key === 'files') {
                pictures.forEach((item) => formData.append('files', item.raw))
                continue
            }
            formData.append(key, itemDetails[key])
        }
        setIsCreateItemLoading(true)
        try {
            const { data, status } = await Instance.post('/items/save', formData)
            console.log(data, status)

            uploadImages()
            setItemID(data.i_id)
            dispatch({ type: 'setCurrentPage', data: 'Complete!'})

        } catch (e) {
            alert("an error occurred creating your item, please try again")
            console.log(e.response)
        } finally{
            setIsCreateItemLoading(false)
        }
    }



    const uploadImages = async () => {        
        const formData = new FormData()
        pictures.forEach((item) => formData.append('files', item.raw))
        try{
            const res = await Instance.post('/file-upload/uploadManyToS3', formData)
            console.log(res)
        } catch(e) {
            console.log('image upload error', e)
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

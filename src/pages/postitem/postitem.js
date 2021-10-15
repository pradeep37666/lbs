import React, { useState, useEffect} from 'react'
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
import { useHistory } from 'react-router'
import getSuburb from '../../util/getSuburb'

export default function PostItem() {
    const { state } = useGlobalState()
    const { user } = state
    const history = useHistory()
    
    const [page, setPage] = useState('Basic Details') 
    const [validated, setValidated] = useState(false)

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Automotive')

    const [pictures, setPictures] = useState([])

    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState(0)
    const [delivery, setDelivery] = useState(0)

    const [address, setAddress] = useState(user.address)

    const [availability, setAvailability] = useState(user.available)

    const [itemID, setItemID] = useState(null)

    const handleNextPage = (newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
    }

    const createItem = async () => {
        // api call to post the images to the server, should return a key for each image and then we'll use that key in the items/save api
        let suburb
        address.address_components ? suburb = getSuburb(address.address_components) : suburb = user.suburb

        const itemDetails = {
            title: title,
            category: category,
            files: pictures,
            description: description,
            price: price,
            deliveryPrice: delivery,
            discount: discount,
            available: availability,
            lat: address.lat ? address.lat : user.lat,
            lng: address.lng ? address.lng : user.lng,
            address: address.formatted_address ? address.formatted_address : user.address,
            suburb: suburb
        }
        console.log(itemDetails)
        const formData = new FormData()
        for (let key in itemDetails) {
            if (key === 'files') {
                pictures.forEach((item) => formData.append('files', item.raw))
                continue
            }
            formData.append(key, itemDetails[key])
        }
        try {
            const response = await Instance.post('/items/save', formData)
            console.log(response.data)
            if (response.status === 201) {
                uploadImages()
                setItemID(response.data.i_id)
            } else {
                alert("an error occurred creating your item, please try again")
                // history.go(0)
            }
        } catch (e) {
            console.log(e.response)
        }
    }

    const uploadImages = async () => {        
        //console.log('posting', file)
        const formData = new FormData()
        pictures.forEach((item) => formData.append('files', item.raw))
        
        // console.log('files',files)
        try{
            const res = await Instance.post('/file-upload/uploadManyToS3', formData)
            console.log(res)
        } catch(e) {
            console.log('image upload error', e)
        }
    }

    const renderSwitch = () => {
        switch (page) {
            case 'Basic Details':
                return <BasicDetails 
                validated={validated}
                handleNextPage={handleNextPage}
                setTitle={setTitle}
                setCategory={setCategory} />
            case 'Item Pictures':
                return <ItemPictures 
                validated={validated}
                handleNextPage={handleNextPage}
                setPictures={setPictures}
                pictures={pictures}
                />
            case 'Advanced Details':
                return <AdvancedDetails 
                validated={validated}
                handleNextPage={handleNextPage}
                setDescription={setDescription}
                setPrice={setPrice}
                setDiscount={setDiscount}
                setDelivery={setDelivery}                
                />
            case 'Item Location':
                return <LocationDetails 
                validated={validated}
                handleNextPage={handleNextPage}
                setAddress={setAddress} 
                />
            case 'Availability':
                return <Availability 
                validated={validated}
                handleNextPage={handleNextPage}
                setAvailability={setAvailability}
                createItem={createItem}
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
            default:
                return <BasicDetails 
                validated={validated}
                handleNextPage={handleNextPage}
                setTitle={setTitle}
                setCategory={setCategory} />
        }
    }

    useEffect(() => {
        switch (page) {
            case 'Basic Details':
                if (title && category) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Item Pictures':
                if (pictures.length > 0) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Advanced Details':
                if (description && price) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Item Location':
                if (address) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Availability':
                if (availability !== '00000000000000') {
                    setValidated(true)
                    console.log(title, category, description, price, delivery, discount, address, availability)
                } else setValidated(false)
                break
            case 'Complete!':
                break
            default:
                return '';
        }
    }, [page, title, category, pictures, description, price, delivery, discount, address, availability])

    return (
        <PageWrapper>
            <Banner textBold='Post Item' textNormal={page} />

            {renderSwitch()}
        </PageWrapper>
    )
}

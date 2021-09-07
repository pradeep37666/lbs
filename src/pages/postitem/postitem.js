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
import Geocode from 'react-geocode'

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
    const [city, setCity] = useState(user.city)
    const [country, setCountry] = useState(user.country)
    const [stateL, setStateL] = useState(user.state)

    const [availability, setAvailability] = useState(user.available)

    const [itemID, setItemID] = useState(null)

    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    const handleNextPage = (newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
    }

    const checkCoords = async () => {
        Geocode.setApiKey('AIzaSyB98s0INvtxhs22OxCOEIjE_--kb54qhlQ')
        Geocode.setLanguage('en')
        Geocode.setRegion('au')
        Geocode.setLocationType('ROOFTOP')
        Geocode.enableDebug(false)

        Geocode.fromAddress(address + ' ' + city + ' ' + stateL + ' ' + country)
        .then((response) => {
            if (response.results[0].address_components.length >= 6) {
                const locLat = response.results[0].geometry.location.lat
                const locLng = response.results[0].geometry.location.lng
                setLat(locLat)
                setLng(locLng)
                handleNextPage('Availability')
            } else {
                alert('There was an issue processing this address, please make sure you have correct details in all fields')
            }
        })
        .catch((error) => {
            console.log(error)
            alert('There was an issue processing this address, please make sure you have correct details in all fields')
        })
    }

    const createItem = async () => {
        // api call to post the images to the server, should return a key for each image and then we'll use that key in the items/save api
        const itemDetails = {
            title: title,
            category: category,
            files: pictures,
            description: description,
            price: price,
            deliveryPrice: delivery,
            discount: discount,
            available: availability,
            lat: 5.5,
            lng: 12.3,
            address: address,
            city: city,
            country: country,
            state: stateL
        }
        const formData = new FormData()
        for(let key in itemDetails){
            if(key === 'files'){
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
        }catch (e) {
            console.log(e.response)
            console.log(e.response.error.message)
        }
        // Instance.post('/items/save', {
        //     title: title,
        //     category: category,
        //     // pictures: pictures,
        //     description: description,
        //     price: price,
        //     deliveryPrice: delivery,
        //     discount: discount,
        //     available: availability,
        //     lat: lat,
        //     lng: lng,
        //     address: address,
        //     city: city,
        //     country: country,
        //     state: stateL
        // })
        // .then((response) => {
        //     console.log(response.data)
        //     if (response.status === 201) {
        //         uploadImages()
        //         setItemID(response.data.i_id)
        //     } else {
        //         alert("an error occurred creating your item, please try again")
        //         // history.go(0)
        //     }
        // })
        // .catch((error) => {
        //     console.log(error.response)
        //     console.log(error.message)
        //     console.log(error.data)
        //     // history.go(0)
        //     alert("an error occurred creating your item, please try again")
        // })
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
                setCity={setCity}
                setCountry={setCountry}
                setState={setStateL}
                checkCoords={checkCoords}       
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
                city={city}
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
                if (address && city && country && stateL) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Availability':
                if (availability !== '00000000000000') {
                    setValidated(true)
                    console.log(title, category, description, price, delivery, discount, address, city, country, stateL, availability, lat, lng)
                } else setValidated(false)
                break
            case 'Complete!':
                break
            default:
                return '';
        }
    }, [page, title, category, pictures, description, price, delivery, discount, address, city, country, stateL, availability, lat, lng])

    return (
        <PageWrapper>
            <Banner textBold='Post Item' textNormal={page} />

            {renderSwitch()}
        </PageWrapper>
    )
}

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

    const [lat, setLat] = useState()
    const [lng, setLng] = useState()

    const handleNextPage = (newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
    }

    const checkCoords = () => {
        
    }

    // lat and long from geocode api
    // return item id on save for use on see item button

    const createItem = () => {
        Instance.post('/items/save', {
            title: title,
            category: category,
            pictures: pictures,
            description: description,
            price: price,
            deliveryPrice: delivery,
            // extra: discount, ???
            available: availability,
            lat: lat,
            lng: lng,
            address: address,
            city: city,
            country: country,
            state: state
        })
        .then((response) => {
            console.log(response.data)
            if (response.status === 201) {
                console.log('nice we made the item')
                // idk do something here
            } else {
                alert("an error occurred creating your item, please try again")
                history.push({pathname: '/postitem'})
            }
        })
        .catch((error) => {
            console.log(error)
            history.push({pathname: '/postitem'})
            alert("an error occurred creating your item, please try again")
        })
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
                    console.log(title, category)
                } else setValidated(false)
                break
            case 'Item Pictures':
                if (pictures.length > 0) {
                    setValidated(true)
                    console.log(pictures)
                } else setValidated(false)
                break
            case 'Advanced Details':
                if (description && price) {
                    setValidated(true)
                    console.log(description, price, discount, delivery)
                } else setValidated(false)
                break
            case 'Item Location':
                if (address && city && country && stateL) {
                    setValidated(true)
                    console.log(address, city, country, stateL)
                } else setValidated(false)
                break
            case 'Availability':
                if (availability !== '00000000000000') {
                    setValidated(true)
                    console.log(availability)
                } else setValidated(false)
                break
            case 'Complete!':
                break
            default:
                return '';
        }
    }, [page, title, category, pictures, description, price, delivery, discount, address, city, country, stateL, availability])

    return (
        <PageWrapper>
            <Banner textBold='Post Item' textNormal={page} />

            {renderSwitch()}
        </PageWrapper>
    )
}

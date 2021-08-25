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

export default function PostItem() {
    const { state } = useGlobalState()
    const { user } = state
    
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

    //set these default to the users default availability

    const [availability, setAvailability] = useState(user.available)

    const handleNextPage = (newPage) => {
        setPage(newPage)
        window.scrollTo(0, 0)
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
                />
            case 'Availability':
                return <Availability 
                validated={validated}
                handleNextPage={handleNextPage}
                setAvailability={setAvailability}
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
                return 'yes barhjsic'
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

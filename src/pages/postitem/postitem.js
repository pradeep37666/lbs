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
import { GetUser } from '../../util/UserStore'

export default function PostItem() {

    const user = GetUser()
    
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
    const [state, setState] = useState(user.state)

    //set these default to the users default availability

    const [mondayM, setMondayM] = useState(null)
    const [mondayA, setMondayA] = useState(null)
    const [tuesdayM, setTuesdayM] = useState(null)
    const [tuesdayA, setTuesdayA] = useState(null)
    const [wednesdayM, setWednesdayM] = useState(null)
    const [wednesdayA, setWednesdayA] = useState(null)
    const [thursdayM, setThursdayM] = useState(null)
    const [thursdayA, setThursdayA] = useState(null)
    const [fridayM, setFridayM] = useState(null)
    const [fridayA, setFridayA] = useState(null)
    const [saturdayM, setSaturdayM] = useState(null)
    const [saturdayA, setSaturdayA] = useState(null)
    const [sundayM, setSundayM] = useState(null)
    const [sundayA, setSundayA] = useState(null)


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
                setState={setState}                
                />
            case 'Availability':
                return <Availability 
                validated={validated}
                handleNextPage={handleNextPage}
                setMondayM={setMondayM}
                setMondayA={setMondayA}
                mondayM={mondayM}
                mondayA={mondayA}
                setTuesdayM={setTuesdayM}
                setTuesdayA={setTuesdayA}
                tuesdayM={tuesdayM}
                tuesdayA={tuesdayA}
                setWednesdayM={setWednesdayM}
                setWednesdayA={setWednesdayA}
                wednesdayM={wednesdayM}
                wednesdayA={wednesdayA}
                setThursdayM={setThursdayM}
                setThursdayA={setThursdayA}
                thursdayM={thursdayM}
                thursdayA={thursdayA}
                setFridayM={setFridayM}
                setFridayA={setFridayA}
                fridayM={fridayM}
                fridayA={fridayA}
                setSaturdayM={setSaturdayM}
                setSaturdayA={setSaturdayA}
                saturdayM={saturdayM}
                saturdayA={saturdayA}
                setSundayM={setSundayM}
                setSundayA={setSundayA}
                sundayM={sundayM}
                sundayA={sundayA}
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
                if (address && city && country && state) {
                    setValidated(true)
                    console.log(address, city, country, state)
                } else setValidated(false)
                break
            case 'Availability':
                if (mondayM || mondayA || tuesdayM || tuesdayA || wednesdayM || wednesdayA || thursdayM || thursdayA || 
                    fridayM || fridayA || saturdayM || saturdayA || sundayM || sundayA) {
                    setValidated(true)
                    console.log(mondayM, mondayA, tuesdayM, tuesdayA, wednesdayM, wednesdayA, thursdayM, thursdayA, fridayM, fridayA, saturdayM, saturdayA, sundayM,sundayA)
                } else setValidated(false)
                break
            case 'Complete!':
                break
            default:
                return '';
        }
    }, [page, title, category, pictures, description, price, delivery, discount, address, city, country, state, mondayM, mondayA, tuesdayM, tuesdayA, wednesdayM, wednesdayA, thursdayM, thursdayA, fridayM, fridayA, saturdayM, saturdayA, sundayM, sundayA])

    return (
        <PageWrapper>
            <Banner textBold='Post Item' textNormal={page} />

            {renderSwitch()}
        </PageWrapper>
    )
}

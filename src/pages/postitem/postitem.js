import React, { useState, useEffect} from 'react'
import './postitem.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import Banner from '../../components/bannerText/bannerText'
import BasicDetails from './PostItemContent/BasicDetails'
import ItemPictures from './PostItemContent/ItemPictures'

export default function PostItem() {
    
    const [page, setPage] = useState('Item Pictures') 
    const [validated, setValidated] = useState(false)

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Automotive')

    const [pictures, setPictures] = useState([])

    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [delivery, setDelivery] = useState(0)

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")

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
                return 'yes advanced'
            case 'Item Location':
                return 'yes advanced'
            case 'Availability':
                return 'yes advanced'
            case 'Complete!':
                return 'yes advanced'
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
                if (description && price && discount) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Item Location':
                if (address && city && country && state) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Availability':
                if (mondayM || mondayA || tuesdayM || tuesdayA || wednesdayM || wednesdayA || thursdayM || thursdayA || 
                    fridayM || fridayA || saturdayM || saturdayA || sundayM || sundayA) {
                    setValidated(true)
                } else setValidated(false)
                break
            case 'Complete!':
                break
            default:
                return '';
        }
    }, [page, title, category, address, city, country, state, mondayM, mondayA, tuesdayM, tuesdayA, wednesdayM, wednesdayA, thursdayM, thursdayA, fridayM, fridayA, saturdayM, saturdayA, sundayM, sundayA])

    return (
        <PageWrapper>
            <Banner textBold='Post Item' textNormal={page} />

            {renderSwitch()}
        </PageWrapper>
    )
}

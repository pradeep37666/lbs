import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import ApplicationHeader from '../../components/application/ApplicationHeader'
import ItemAvailability from '../../components/application/ItemAvailability'
import ItemOptions from '../../components/application/ItemOptions'
import ItemOverview from '../../components/application/ItemOverview'
import AvailabilityCalendar from '../../components/availabilityCalendar/AvailabilityCalendar'
import Header from '../../components/header/header'
import instance from '../../util/axios'
import './application.css'

export const ApplicationContext = React.createContext()

export default function Application() {
    const [page, setPage] = useState('ItemAvailability')
    const [item, setItem] = useState(null)

    const [selectedStart, setSelectedStart] = useState(5)
    const [selectedEnd, setSelectedEnd] = useState()
    const [ focused, setFocused] = useState()

    const { itemId } = useParams()
    useEffect(() => {
        const getItem = async () => {
            const { data, status } = await instance.get(`/items/findByIid?i_id=${itemId}`)
            console.log(data)
            if(status !== 200) return
            setItem(data)
        }
        getItem()
    },[])
    
    const renderApplicaiton = () => {
        switch(page){
            case 'ItemAvailability' : {
                return <ItemAvailability handleNextPage={handleNextPage}/>    
            }
            case 'ItemOptions' : {
                return <ItemOptions handleNextPage={handleNextPage}/>    
            }
            case 'ItemOverview' : {
                return <ItemOverview />
            }
        }
    }

    const handleNextPage = (newPage) => {
        console.log(newPage)
        setPage(newPage)
        window.scrollTo(0, 0)
    }

    return (
        <ApplicationContext.Provider value={{ selectedStart, setSelectedStart, focused, setFocused }}>
            <div>
                <Header />
                <ApplicationHeader 
                item={item ? item : null}
                page={page} 
                />
                <div >
                    { renderApplicaiton() }
                </div>
            </div>  
        </ApplicationContext.Provider>
        
    )
}

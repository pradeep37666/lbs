import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import ApplicationHeader from '../../components/application/ApplicationHeader'
import ItemAvailability from '../../components/application/ItemAvailability'
import ItemOptions from '../../components/application/ItemOptions'
import ItemOverview from '../../components/application/ItemOverview'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import instance from '../../util/axios'
import ApplicationFooter from '../../components/application/ApplicationFooter'
import './application.css'

export const ApplicationContext = React.createContext()

export default function Application() {
    const [page, setPage] = useState('ItemAvailability')
    const [item, setItem] = useState(null)
    const [yearAvailability, setYearAvailability] = useState(null)
    const [itemAvailability, setItemAvailability] = useState(null)

    const [selected, setSelected] = useState(null)
    const [confirmedStart, setConfirmedStart] = useState(null)
    const [confirmedEnd, setConfirmedEnd] = useState(null)

    const { itemId } = useParams()

    const today = new Date()
    const currentDate = today.getDate()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()

    useEffect(() => {
        const getItem = async () => {
            const { data, status } = await instance.get(`/items/findByIid?i_id=${itemId}`)
            console.log(data)
            // {name}
            // {item:{name},
            // yearAa: string}

            if(status !== 200) return
            setItem(data.item)
            setItemAvailability(data.item.available)
            setYearAvailability(data.yearAvailability)
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
        setPage(newPage)
        window.scrollTo(0, 0)
    }

    return (
        <ApplicationContext.Provider value={{ item, selected, setSelected, currentDate, currentMonth, currentYear, confirmedStart, confirmedEnd, setConfirmedStart, setConfirmedEnd, handleNextPage, yearAvailability, itemAvailability }}>
            <PageWrapper>
                <ApplicationHeader 
                item={item ? item : null}
                page={page} 
                />
                <div >
                    { renderApplicaiton() }
                </div>
            { confirmedStart && <ApplicationFooter />}    
            </PageWrapper>
            
        </ApplicationContext.Provider>
        
    )
}

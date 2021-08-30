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

    const [selected, setSelected] = useState(null)
    const [confirmedStart, setConfirmedStart] = useState(null)
    const [selectedEnd, setSelectedEnd] = useState(null)
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
        setPage(newPage)
        window.scrollTo(0, 0)
    }

    return (
        <ApplicationContext.Provider value={{ selected, setSelected, currentDate, currentMonth, currentYear, confirmedStart, confirmedEnd, setConfirmedStart, setConfirmedEnd, handleNextPage }}>
            <PageWrapper>
                <ApplicationHeader 
                item={item ? item : null}
                page={page} 
                />
                <div >
                    { renderApplicaiton() }
                </div>
            </PageWrapper>
            { confirmedStart && <ApplicationFooter />}
        </ApplicationContext.Provider>
        
    )
}

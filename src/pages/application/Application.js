import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import ApplicationHeader from '../../components/application/ApplicationHeader'
import ItemAvailability from '../../components/application/ItemAvailability'
import ItemOptions from '../../components/application/ItemOptions'
import ItemOverview from '../../components/application/ItemOverview'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import instance from '../../util/axios'
import ApplicationFooter from '../../components/application/ApplicationFooter'
import applicationReducer from '../../util/applicationReducer'
import './application.css'
import BookingPriceCalculator from '../../util/BookingPriceCalculator'

export const ApplicationContext = React.createContext()

const initialState = {
    page: 'ItemAvailability',
    item: null,
    yearAvailability: null,
    itemAvailability: null,
    selected: null,
    confirmedStart: null,
    confirmedEnd: null,
    deliverySelected: false,
    pickupSelected: false
}
export default function Application() {
    const [state, dispatch] = useReducer(applicationReducer, initialState)
    const { page, item, confirmedStart, confirmedEnd, bookingPriceCalculator } = state
    const { itemId } = useParams()

    useEffect(() => {
        if(!confirmedStart || !confirmedEnd) return
        dispatch({ 
            type: 'setBookingPriceCalculator', 
            data: new BookingPriceCalculator(item.price, item.discount, item.deliveryPrice, confirmedStart, confirmedEnd)
        })
    }, [confirmedStart, confirmedEnd])
    console.log(bookingPriceCalculator)
    useEffect(() => {
        const getItem = async () => {
            const { data, status } = await instance.get(`/items/findByIid?i_id=${itemId}`)

            if(status !== 200) return
            dispatch({ type: 'setItem', data: data.item})
            dispatch({ type: 'setItemAvailability', data: data.item.available})
            dispatch({ type: 'setYearAvailability', data: data.yearAvailability})
            console.log(data.yearAvailability)
        }
        getItem()

        const today = new Date()
        const currentDate = today.getDate()
        const currentMonth = today.getMonth()
        const currentYear = today.getFullYear()
        dispatch({ type: 'setCurrentDate', data: currentDate})
        dispatch({ type: 'setCurrentMonth', data: currentMonth})
        dispatch({ type: 'setCurrentYear', data: currentYear})
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
        dispatch({ type: 'setPage', data: newPage})
        window.scrollTo(0, 0)
    }

    return (
        <ApplicationContext.Provider value={{ state, dispatch, handleNextPage}}>
            <div onClick={(e) => {dispatch({ type: 'setSelected', data: null })}}>
               <PageWrapper>
                <ApplicationHeader 
                item={item ? item : null}
                page={page} 
                />
                <div className="ApplicationContainer">
                    { renderApplicaiton() }
                </div>
            { confirmedStart && page !== 'ItemOverview' ? <ApplicationFooter /> : null }    
            </PageWrapper> 
            </div>
            
            
        </ApplicationContext.Provider>
        
    )
}

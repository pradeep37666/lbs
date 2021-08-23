import React, { useEffect, useState } from 'react'
import ItemAvailability from '../../components/application/ItemAvailability'
import ItemOptions from '../../components/application/ItemOptions'
import ItemOverview from '../../components/application/ItemOverview'
import AvailabilityCalendar from '../../components/availabilityCalendar/AvailabilityCalendar'
import Header from '../../components/header/header'

export default function Application() {
    const [page, setPage] = useState('ItemAvailability')

    const renderApplicaiton = () => {
        switch(page){
            case 'ItemAvailability' : {
                return <ItemAvailability handleNextPage={handleNextPage}/>
                break
            }
            case 'ItemOptions' : {
                return <ItemOptions handleNextPage={handleNextPage}/>
                break
            }
            case 'ItemOverview' : {
                return <ItemOverview />
                break
            }
        }
    }

    const handleNextPage = (newPage) => {
        console.log(newPage)
        setPage(newPage)
        window.scrollTo(0, 0)
    }

    return (
        <div>
            <Header />
            { renderApplicaiton() }
            <AvailabilityCalendar />
        </div>
    )
}

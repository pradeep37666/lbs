import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function ItemAvailability({ handleNextPage }) {
    return (
        <div>
            {/* <Calendar 
            localizer={localizer}
            /> */}
            Item availability

            <button onClick={() => handleNextPage('ItemOptions')}>next</button>
        </div>
    )
}

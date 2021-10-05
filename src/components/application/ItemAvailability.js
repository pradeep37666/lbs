import React, { useContext } from 'react'
import AvailabilityCalendar from '../availabilityCalendar/AvailabilityCalendar'
import './ItemAvailability.css'
import { ApplicationContext } from '../../pages/application/Application'
import { CircularProgress } from '@material-ui/core'

export default function ItemAvailability({ handleNextPage }) {
    const { state } = useContext(ApplicationContext)
    const { item, currentDay, currentMonth, currentYear } = state
    

    const renderMonths = () => {
        const months = Array(3).fill(null)
        return months.map((item, index) => {
            return (
            <AvailabilityCalendar 
            key={index}
            month={currentMonth + index} 
            year={currentYear}
            />
        )})
    }
    return (
        <div>            
            <div className="AvailabilityContainer">
                {item ? renderMonths() : <CircularProgress size={30} color="#000" />}
            </div>
            
        </div>
    )
}
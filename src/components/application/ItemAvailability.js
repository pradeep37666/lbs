import React, { useContext } from 'react'
import AvailabilityCalendar from '../availabilityCalendar/AvailabilityCalendar'
import './ItemAvailability.css'
import { ApplicationContext } from '../../pages/application/Application'

export default function ItemAvailability({ handleNextPage }) {
    const { currentDay, currentMonth, currentYear } = useContext(ApplicationContext)
    

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
        <div >            
            <div className="AvailabilityContainer">
            {renderMonths()}
            </div>
            
        </div>
    )
}

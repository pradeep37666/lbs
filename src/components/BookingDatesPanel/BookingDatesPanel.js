import React from 'react'
import Arrow from '../../assets/Icons/Arrow'
import getDateSuffix from '../../util/dateUtils/getDateSuffix'

export default function BookingDatesPanel({ startDate, endDate }) {
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]
    const monthArray = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"]

    return (
             
        <div className="ApplicationFooterDetailsContainer">
            <div className="ApplicationFooterDetails">
                <span className="ApplicationFooterDetailsHeader">Collect</span>
                <div style={{ textAlign: 'center'}}>
                    <span className="ApplicationFooterTime">{startDate?.timeslot === 'morning' ? '8:00am' : '1:00pm'} </span>
                    <span className="ApplicationFooterDay">{dayArray[startDate.dateObj.getDay()]}</span>
                </div>
                <div>
                    <span>{getDateSuffix(startDate.dateObj)} </span>
                    <span>{ monthArray[startDate.dateObj.getMonth()]}</span>
                </div>
            </div>
            <div className="ApplicationFooterArrowContainer">
                <Arrow />
            </div>
            <div className="ApplicationFooterDetails">
                <span className="ApplicationFooterDetailsHeader">Return</span>
                <div style={{ textAlign: 'center' }}>
                    <span className="ApplicationFooterTime">{endDate?.timeslot === 'morning' ? '12:00pm' : '5:00pm'} </span>
                    <span className="ApplicationFooterDay">{dayArray[endDate.dateObj.getDay()]}</span>
                </div>
                <div>
                    <span>{getDateSuffix(endDate.dateObj)} </span>
                    <span>{ monthArray[endDate.dateObj.getMonth()]}</span>
                </div>
            </div>
        </div>
    )
}

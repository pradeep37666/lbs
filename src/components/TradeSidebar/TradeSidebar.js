import React, {useEffect, useState} from 'react'
import Instance from '../../util/axios'
import getDateObject from '../../util/getDateObject'
import ApplicationItemCard from '../application/ApplicationItemCard'
import Arrow from '../../assets/Icons/Arrow.js'
import getDateSuffix from '../../util/getDateSuffix'
import './TradeSidebar.css'
import { CircularProgress } from '@material-ui/core'

export default function TradeSidebar({ booking }) {
    const [item, setItem] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        const getItemDetails = async () => {
            try{
               const { data, status } = await Instance.get(`items/findByIid?i_id=${booking.i_id}&u_id=${booking.u_id}`)
                if(status !== 200) return 
                setItem(data.item) 
            } catch(e) {
                console.log(e)
            }
            setIsLoading(false)
        }
        getItemDetails()
    },[booking])

    console.log(booking)
    console.log(item)


    const beginDate = getDateObject(booking.start_date)
    const endDate = getDateObject(booking.end_date)
    console.log(beginDate, endDate)
    const dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]
    const monthArray = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <div className="TradeSidebarContainer">

            { isLoading ? (
                <CircularProgress color="#000" />
            ) : (
            <>
                <div className="TradeSidebarSection">
                    <span className="TradeSidebarHeading">Trade Details</span>
                </div>
                <div className="TradeSidebarSection">
                    <span className="TradeSidebarSubHeading">Item</span>
                    <ApplicationItemCard 
                    price={item.price}
                    item={item}/>
                </div>
                <div className="TradeSidebarSection">
                    <span className="TradeSidebarSubHeading">Itemised Costs</span>
                    <div className="TradeSidebarCostFlex">
                        <span>Cost for Item </span>
                        <span>${ item.price * ((booking.end_date - booking.start_date) + 1)}</span>
                    </div>
                    <div className="TradeSidebarCostFlex">
                        <span>Item Delivery </span>
                        <span>${item.deliveryPrice}</span>
                    </div>
                </div>
                <div className="TradeSidebarSection">
                    <span className="TradeSidebarHeading">Collect</span>
                    <div className="ApplicationFooterDetailsContainer">
                        <div className="ApplicationFooterDetails">
                            <span className="ApplicationFooterDetailsHeader">Collect</span>
                            <div>
                                <span className="ApplicationFooterTime">{beginDate?.morning ? '8:00am' : '1:00pm'} </span>
                                <span className="ApplicationFooterDay">{dayArray[beginDate.date.getDay()]}</span>
                            </div>
                            <div>
                                <span>{getDateSuffix(beginDate.date)} </span>
                                <span>{ monthArray[beginDate.date.getMonth()]}</span>
                            </div>
                        </div>
                        <div className="ApplicationFooterArrowContainer">
                            <Arrow />
                        </div>
                        <div className="ApplicationFooterDetails">
                            <span className="ApplicationFooterDetailsHeader">Return</span>
                            <div>
                                <span className="ApplicationFooterTime">{endDate?.morning ? '12:00pm' : '5:00pm'} </span>
                                <span className="ApplicationFooterDay">{dayArray[endDate.date.getDay()]}</span>
                            </div>
                            <div>
                                <span>{getDateSuffix(endDate.date)} </span>
                                <span>{ monthArray[endDate.date.getMonth()]}</span>
                            </div>
                        </div>
                    </div>

                </div>
            
            </>)}
        </div>
    )
}

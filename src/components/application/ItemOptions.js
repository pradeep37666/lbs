import React, { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import { CircularProgress } from '@material-ui/core'
import instance from '../../util/axios'
import CheckBox from '../checkBox/CheckBox'
import ApplicationItemCard from './ApplicationItemCard'
import getDateIndex from '../../util/getDateIndex'
import './ItemOptions.css'

export default function ItemOptions({ handleNextPage }) {
    const { state, dispatch } = useContext(ApplicationContext)
    const [isLoading, setIsLoading] = useState(false)
    const [userItems, setUserItems] = useState(['a'])
    const { item, deliverySelected, confirmedStart, confirmedEnd, pickupSelected, currentYear } = state

    // Code for getting related items
    // useEffect(() => {
    //     getRelatedItems()
    // }, [])

    // const getRelatedItems = async () => {
    //     setIsLoading(true)
    //     const startIndex = (getDateIndex(confirmedStart.day) * 2) + (confirmedStart.day?.am ? 2 : 1)
    //     const endIndex = (getDateIndex(confirmedEnd.day) * 2) + (confirmedEnd.day?.am ? 2 : 1)
        
    //     try{
    //         const { data, status } = await instance.get(`/items/findSameOwnerItem?i_id=${item.i_id}&u_id=${item.u_id}&start=${startIndex}&end=${endIndex}&year=${currentYear}` )
    //         if(status !== 200){
    //             setIsLoading(false)
    //             return
    //         }
    //         setUserItems(data)
    //         setIsLoading(false)

    //     } catch(e) {
    //         console.log(e)
    //         setIsLoading(false)
    //     }
    // }
    // const renderItems = () => {
    //     return userItems.map((item, index) => {
    //         return <ApplicationItemCard key={index} item={item} extra/>
    //     })
    // }

    return (
        <div className="OptionsContainer">
            <div className="OptionsItemHeaderContainer">
                <span className="OptionsItemHeader">Borrow Extras</span><br></br>
                <span>Options to help you borrow better</span>
            </div>
            <div className="DeliveryOptionsContainer">
                <div className="OptionsItemContainer">
                    <div>
                        <span className="OptionsItemHeader">Delivery <span className="OptionsPrice">${item.deliveryPrice}</span></span>
                        <p>Have your item delivered to you</p>
                    </div>
                    <CheckBox 
                    checked={deliverySelected} 
                    onClick={() => dispatch({type: 'setDeliverySelected', data: !deliverySelected})}
                    /> 
                </div>
                <div className="OptionsItemContainer">
                <div >
                        <span className="OptionsItemHeader"> Pickup <span className="OptionsPrice">${item.deliveryPrice}</span></span>
                        <p>Have your item picked up from you</p>
                    </div>
                    <CheckBox 
                    checked={pickupSelected} 
                    onClick={() => dispatch({type: 'setPickupSelected', data: !pickupSelected})}
                    />  
                </div> 
            </div>
            
            {/* <div className="AdditionalItemsMainContainer">
               <div>
                    <span className="AdditionalItemsHeader">Need another item?</span><br></br>
                    <span className="AdditionalItemsText">Select another item this lender has available in these time slots</span>
                </div> 
                <div className="AdditionalItemsContainer">
                    { isLoading ? (
                        <CircularProgress size={30} color="#33384f"/>
                    ) : (
                        renderItems()
                    )}  
                </div>
                
            </div>
             */}
        </div>
    )
}

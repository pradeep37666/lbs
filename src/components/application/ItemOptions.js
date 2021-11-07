import React, { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import { CircularProgress } from '@material-ui/core'
import instance from '../../util/axios'
import CheckBox from '../checkBox/CheckBox'
import ApplicationItemCard from './ApplicationItemCard'
import getDateIndex from '../../util/getDateIndex'
import './ItemOptions.css'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'
import useGlobalState from '../../util/useGlobalState'

export default function ItemOptions() {
    const { state, dispatch } = useContext(ApplicationContext)
    const globalState = useGlobalState().state
    const { user } = globalState
    const { item, address, bookingPriceCalculator, deliverySelected, pickupSelected } = state

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

    const setAddress = (addressObj) => {
        dispatch({ type: 'setAddress', data: addressObj.formatted_address})
    }
    const getMap = () => {
        if (user.address && (deliverySelected || pickupSelected)) return <MapsAutocomplete setAddress={setAddress} defaultLocation={user.address} defaultLat={user.lat} defaultLng={user.lng}/>
        if (deliverySelected || pickupSelected) return <MapsAutocomplete setAddress={setAddress}/>
        else return
    }

    const handleDeliveryBoxClick = () => {
        dispatch({ type: 'setDeliverySelected', data: !deliverySelected})
        bookingPriceCalculator.setDeliverySelected(!deliverySelected)
    }

    const handlePickupBoxClick = () => {
        dispatch({ type: 'setPickupSelected', data: !pickupSelected})
        bookingPriceCalculator.setPickupSelected(!pickupSelected)
    }

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
                    onClick={handleDeliveryBoxClick}
                    /> 
                </div>
                <div className="OptionsItemContainer">
                <div >
                        <span className="OptionsItemHeader"> Pickup <span className="OptionsPrice">${item.deliveryPrice}</span></span>
                        <p>Have your item picked up from you</p>
                    </div>
                    <CheckBox 
                    checked={pickupSelected} 
                    onClick={handlePickupBoxClick}
                    />  
                </div> 
            </div>

            {getMap()}

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

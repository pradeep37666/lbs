import React, { useContext } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import CheckBox from '../checkBox/CheckBox'
import './ItemOptions.css'

export default function ItemOptions({ handleNextPage }) {
    const { state, dispatch } = useContext(ApplicationContext)
    const { item, deliverySelected, setDeliverySelected, pickupSelected, setPickupSelected } = state
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
            
            <div className="OptionsItemContainer">
               <div>
                    <span className="AdditionalItemsHeader">Need another item?</span><br></br>
                    <span className="AdditionalItemsText">Select another item this lender has available in these time slots</span>
                </div> 
            </div>
            
        </div>
    )
}

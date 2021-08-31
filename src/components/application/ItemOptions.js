import React, { useContext } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import CheckBox from '../checkBox/CheckBox'
import './ItemOptions.css'

export default function ItemOptions({ handleNextPage }) {
    const { state, dispatch } = useContext(ApplicationContext)
    const { item, deliverySelected, setDeliverySelected, pickupSelected, setPickupSelected } = state
    return (
        <div className="OptionsContainer">
            <div>
                <h3>Borrow Extras</h3>
                <p>Options to help you borrow better</p>
            </div>
            <div className="OptionsItemContainer">
               <div>
                    <p>Delivery <span className="OptionsPrice">${item.deliveryPrice}</span></p>
                    <p>Have your item delivered to you</p>
                </div>
                <CheckBox 
                checked={deliverySelected} 
                onClick={() => dispatch({type: 'setDeliverySelected', data: !deliverySelected})}
                /> 
            </div>
            <div className="OptionsItemContainer">
              <div >
                    <p>Pickup <span className="OptionsPrice">${item.deliveryPrice}</span></p>
                    <p>Have your item picked up from you</p>
                </div>
                <CheckBox 
                checked={pickupSelected} 
                onClick={() => dispatch({type: 'setPickupSelected', data: !pickupSelected})}
                />  
            </div>
            <div className="OptionsItemContainer">
               <div >
                    <p>Need another item?</p>
                    <p>Select another item this lender has available in these time slots</p>
                </div> 
                <CheckBox />
            </div>
            
        </div>
    )
}

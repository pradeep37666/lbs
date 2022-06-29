import React, { useContext, useEffect, useMemo } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import CheckBox from '../checkBox/CheckBox'
import './ItemOptions.css'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'
import useGlobalState from '../../util/useGlobalState'

export default function ItemOptions() {
    const { state, dispatch } = useContext(ApplicationContext)
    const globalState = useGlobalState().state
    const { user } = globalState
    const { 
        item, bookingPriceCalculator, 
        deliverySelected, pickupSelected 
    } = state

    useEffect(() => {
        console.log({item})
    },[item])

    const setAddress = (addressObj) => {
        dispatch({ type: 'setAddress', data: addressObj.formatted_address})
    }

    const getMap = () => {
        if (user.address && (deliverySelected || pickupSelected)) {
            return <MapsAutocomplete 
                setAddress={setAddress} 
                defaultLocation={user.address.fullAddress} 
                defaultLat={user.address.lat} 
                defaultLng={user.address.lng}
                />
        } else {
            return <MapsAutocomplete setAddress={setAddress}/>
        }
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
                {item.deliveryOption === 'BOTH' &&
                <>
                    <div className="OptionsItemContainer">
                        <div>
                            <span className="OptionsItemHeader">
                                Delivery <span className="OptionsPrice">${item.deliveryPrice}</span>
                            </span>
                            <p>Have your item delivered to you</p>
                        </div>
                        <CheckBox 
                        checked={deliverySelected} 
                        onClick={handleDeliveryBoxClick}
                        /> 
                    </div>
                    <div className="OptionsItemContainer">
                        <div >
                            <span className="OptionsItemHeader"> 
                                Pickup <span className="OptionsPrice">${item.pickupPrice}</span>
                            </span>
                            <p>Have your item picked up from you</p>
                        </div>
                        <CheckBox 
                        checked={pickupSelected} 
                        onClick={handlePickupBoxClick}
                        />  
                    </div> 
                </>
                }
                {item.deliveryOption === 'DELIVERY' &&
                    <div className="OptionsItemContainer">
                        <div>
                            <span className="OptionsItemHeader">
                                Delivery <span className="OptionsPrice">${item.deliveryPrice}</span>
                            </span>
                            <p>Have your item delivered to you</p>
                        </div>
                        <CheckBox 
                        checked={deliverySelected} 
                        onClick={handleDeliveryBoxClick}
                        /> 
                    </div>
                }
                {item.deliveryOption === 'PICKUP' &&
                    <div className="OptionsItemContainer">
                        <div >
                            <span className="OptionsItemHeader"> 
                                Pickup <span className="OptionsPrice">${item.pickupPrice}</span>
                            </span>
                            <p>Have your item picked up from you</p>
                        </div>
                        <CheckBox 
                        checked={pickupSelected} 
                        onClick={handlePickupBoxClick}
                        />  
                    </div> 
                }
            </div>
            {(deliverySelected || pickupSelected) &&
                getMap()
            }
        </div>
    )
}

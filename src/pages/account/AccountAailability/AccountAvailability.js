import React, { useState } from 'react'
import ProductSlots from '../../../components/productSlots/productSlots'
import './AccountAvailability.css'
import Instance from '../../../util/axios'
import { useHistory } from 'react-router'
import useGlobalState from '../../../util/useGlobalState'
import Button from '../../../components/Button/Button'

export default function Availability({ setAccountContent }) {
    const [isLoading, setIsLoading] = useState(false)
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [availability, setAvailability] = useState(user.available.split('').map(str => parseInt(str)) )
    
    const updateAvailability = async () => {
        setIsLoading(true)
        try{
            const { data, status} = await Instance.patch('user/update', { 
                available: availability.join('')
            })
            dispatch({ type: 'setUser', data })
            console.log(data, status)

        } catch(err){
            console.log(err.response)
        }
    }

    return (
        <div className="Availability__Container">
            <div className="LoginHeader">General Product Availability</div>
            <div className="LoginText LoginTextSmall">Little big shed lets you have control over the days you want to lend out your products.</div>
            <div className="LoginText LoginTextSmall">Select the days and enter the times you are available for trades.</div>
            <ProductSlots 
            availability={availability} 
            onAvailabilityChange={newAvailability => setAvailability(newAvailability)}           
            />
            <Button 
            text="Save"
            isLoading={isLoading}
            style={{ marginBottom: '1em' }}
            onClick={updateAvailability}
            />
            <Button 
            text="Cancel Changes"
            isLoading={isLoading}
            invertedColors
            onClick={() => setAccountContent("Account")}
            />
        </div>
    )
}

import React, { useState } from 'react'
import './AccountAvailability.css'
import ProductSlots from '../../../components/productSlots/productSlots'
import Instance from '../../../util/axios'
import useGlobalState from '../../../util/useGlobalState'
import Button from '../../../components/Button/Button'

export default function Availability({ setAccountContent }) {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const [ availability, setAvailability ] = useState(user.available.split('').map(str => parseInt(str)))
    const [ isLoading, setIsLoading ] = useState(false)
    
    const updateAvailability = async () => {
        try{
            setIsLoading(true)
            const { data, status} = await Instance.patch('/users', { 
                available: availability.join('')
            })
            if (status !== 200) return
            dispatch({ type: 'setUser', data })
        } catch(error){
            console.log(error.response)
        } finally {
            setIsLoading(false)
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

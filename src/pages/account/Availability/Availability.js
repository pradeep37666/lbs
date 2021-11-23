import React, { useState } from 'react'
import ProductSlots from '../../../components/productSlots/ProductSlots'
import './Availability.css'
import Instance from '../../../util/axios'
import { useHistory } from 'react-router'
import useGlobalState from '../../../util/useGlobalState'

export default function Availability(props) {
    const { state, dispatch } = useGlobalState()
    const { user } = state
    const history = useHistory()

    const [mondayM, setMondayM] = useState(user.available.charAt(0) === '1' ? true : false)
    const [mondayA, setMondayA] = useState(user.available.charAt(1) === '1' ? true : false)
    const [tuesdayM, setTuesdayM] = useState(user.available.charAt(2) === '1' ? true : false)
    const [tuesdayA, setTuesdayA] = useState(user.available.charAt(3) === '1' ? true : false)
    const [wednesdayM, setWednesdayM] = useState(user.available.charAt(4) === '1' ? true : false)
    const [wednesdayA, setWednesdayA] = useState(user.available.charAt(5) === '1' ? true : false)
    const [thursdayM, setThursdayM] = useState(user.available.charAt(6) === '1' ? true : false)
    const [thursdayA, setThursdayA] = useState(user.available.charAt(7) === '1' ? true : false)
    const [fridayM, setFridayM] = useState(user.available.charAt(8) === '1' ? true : false)
    const [fridayA, setFridayA] = useState(user.available.charAt(9) === '1' ? true : false)
    const [saturdayM, setSaturdayM] = useState(user.available.charAt(10) === '1' ? true : false)
    const [saturdayA, setSaturdayA] = useState(user.available.charAt(11) === '1' ? true : false)
    const [sundayM, setSundayM] = useState(user.available.charAt(12) === '1' ? true : false)
    const [sundayA, setSundayA] = useState(user.available.charAt(13) === '1' ? true : false)

    const formatAvailability = () => {
        var string = ''

        string = string.concat(mondayM ? '1' : '0')
        string = string.concat(mondayA ? '1' : '0')
        string = string.concat(tuesdayM ? '1' : '0')
        string = string.concat(tuesdayA ? '1' : '0')
        string = string.concat(wednesdayM ? '1' : '0')
        string = string.concat(wednesdayA ? '1' : '0')
        string = string.concat(thursdayM ? '1' : '0')
        string = string.concat(thursdayA ? '1' : '0')
        string = string.concat(fridayM ? '1' : '0')
        string = string.concat(fridayA ? '1' : '0')
        string = string.concat(saturdayM ? '1' : '0')
        string = string.concat(saturdayA ? '1' : '0')
        string = string.concat(sundayM ? '1' : '0')
        string = string.concat(sundayA ? '1' : '0')

        return string
    }

    const updateAvailability = () => {

        const data = {
            available: formatAvailability()
        }
        Instance.put('user/update', data)
            .then((response) => {
                console.log(response)
                let newData = user
                newData.available = data.available
                dispatch({ type: 'setUser', data: newData })
                history.go(0)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="Availability__Container">
            <div className="LoginHeader">General Product Availability</div>
            <div className="LoginText LoginTextSmall">Little big shed lets you have control over the days you want to lend out your products.</div>
            <div className="LoginText LoginTextSmall">Select the days and enter the times you are available for trades.</div>

            <ProductSlots
                setMondayM={setMondayM}
                setMondayA={setMondayA}
                mondayM={mondayM}
                mondayA={mondayA}
                setTuesdayM={setTuesdayM}
                setTuesdayA={setTuesdayA}
                tuesdayM={tuesdayM}
                tuesdayA={tuesdayA}
                setWednesdayM={setWednesdayM}
                setWednesdayA={setWednesdayA}
                wednesdayM={wednesdayM}
                wednesdayA={wednesdayA}
                setThursdayM={setThursdayM}
                setThursdayA={setThursdayA}
                thursdayM={thursdayM}
                thursdayA={thursdayA}
                setFridayM={setFridayM}
                setFridayA={setFridayA}
                fridayM={fridayM}
                fridayA={fridayA}
                setSaturdayM={setSaturdayM}
                setSaturdayA={setSaturdayA}
                saturdayM={saturdayM}
                saturdayA={saturdayA}
                setSundayM={setSundayM}
                setSundayA={setSundayA}
                sundayM={sundayM}
                sundayA={sundayA}
            />

            <button className='LoginFormButton' style={{ marginBottom: '1em' }} onClick={() => updateAvailability()}>Save</button>
            <button className='LoginFormButton LoginFormButtonInverted' onClick={props.return}>Cancel Changes</button>
        </div>
    )
}

import React, { useState } from 'react'
import ProductSlots from '../../../components/productSlots/productSlots'
import './Availability.css'
import Instance from '../../../util/axios'
import { GetUser, GetToken } from '../../../util/UserStore'
import { useHistory } from 'react-router'

export default function Availability(props) {

    const history = useHistory()
    const user = GetUser()

    const [mondayM, setMondayM] = useState(null)
    const [mondayA, setMondayA] = useState(null)
    const [tuesdayM, setTuesdayM] = useState(null)
    const [tuesdayA, setTuesdayA] = useState(null)
    const [wednesdayM, setWednesdayM] = useState(null)
    const [wednesdayA, setWednesdayA] = useState(null)
    const [thursdayM, setThursdayM] = useState(null)
    const [thursdayA, setThursdayA] = useState(null)
    const [fridayM, setFridayM] = useState(null)
    const [fridayA, setFridayA] = useState(null)
    const [saturdayM, setSaturdayM] = useState(null)
    const [saturdayA, setSaturdayA] = useState(null)
    const [sundayM, setSundayM] = useState(null)
    const [sundayA, setSundayA] = useState(null)

    const updateAvailability = () => {

        const data = {
            monday_am: mondayM,
            monday_pm: mondayA,
            tuesday_am: tuesdayM,
            tuesday_pm: tuesdayA,
            wednesday_am: wednesdayM,
            wednesday_pm: wednesdayA,
            thursday_am: thursdayM,
            thursday_pm: thursdayA,
            friday_am: fridayM,
            friday_pm: fridayA,
            saturday_am: saturdayM,
            saturday_pm: saturdayA,
            sunday_am: sundayM,
            sunday_pm: sundayA,
        }

        Instance.put('user/update', data, { headers: { Authorization: `Bearer ${GetToken()}` } })
        .then((response) => {
            console.log(response)
            let newData = user
            newData.monday_am = data.monday_am
            newData.monday_pm = data.monday_pm
            newData.tuesday_am = data.tuesday_am
            newData.tuesday_pm = data.tuesday_pm
            newData.wednesday_am = data.wednesday_am
            newData.wednesday_pm = data.wednesday_pm
            newData.thursday_am = data.thursday_am
            newData.thursday_pm = data.thursday_pm
            newData.friday_am = data.friday_am
            newData.friday_pm = data.friday_pm
            newData.saturday_am = data.saturday_am
            newData.saturday_pm = data.saturday_pm
            newData.sunday_am = data.sunday_am
            newData.sunday_pm = data.sunday_pm
            localStorage.setItem('user', JSON.stringify(newData))
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

                <button className='LoginFormButton' style={{marginBottom: '1em'}} onClick={() => updateAvailability()}>Save</button>
                <button className='LoginFormButton LoginFormButtonInverted' onClick={props.return}>Cancel Changes</button>
        </div>
    )
}

import React, { useState } from 'react'
import ProductSlots from '../../../components/productSlots/productSlots'
import './Availability.css'
import Instance from '../../../util/axios'
import { GetUser, GetToken } from '../../../util/UserStore'
import { useHistory } from 'react-router'

export default function Availability(props) {

    const history = useHistory()
    const user = GetUser()

    const [mondayM, setMondayM] = useState(user.monday_am)
    const [mondayA, setMondayA] = useState(user.monday_pm)
    const [tuesdayM, setTuesdayM] = useState(user.tuesday_am)
    const [tuesdayA, setTuesdayA] = useState(user.tuesday_pm)
    const [wednesdayM, setWednesdayM] = useState(user.wednesday_am)
    const [wednesdayA, setWednesdayA] = useState(user.wednesday_pm)
    const [thursdayM, setThursdayM] = useState(user.thursday_am)
    const [thursdayA, setThursdayA] = useState(user.thursday_pm)
    const [fridayM, setFridayM] = useState(user.friday_am)
    const [fridayA, setFridayA] = useState(user.friday_pm)
    const [saturdayM, setSaturdayM] = useState(user.saturday_am)
    const [saturdayA, setSaturdayA] = useState(user.saturday_pm)
    const [sundayM, setSundayM] = useState(user.sunday_am)
    const [sundayA, setSundayA] = useState(user.sunday_pm)

    const updateAvailability = () => {

        const data = {
            monday_am: mondayM ? mondayM : user.monday_am,
            monday_pm: mondayA ? mondayA : user.monday_pm,
            tuesday_am: tuesdayM ? tuesdayM : user.tuesday_am,
            tuesday_pm: tuesdayA ? tuesdayA : user.tuesday_pm,
            wednesday_am: wednesdayM ? wednesdayM : user.wednesday_am,
            wednesday_pm: wednesdayA ? wednesdayA : user.wednesday_pm,
            thursday_am: thursdayM ? thursdayM : user.thursday_am,
            thursday_pm: thursdayA ? thursdayA : user.thursday_pm,
            friday_am: fridayM ? fridayM : user.friday_am,
            friday_pm: fridayA ? fridayA : user.friday_pm,
            saturday_am: saturdayM ? saturdayM : user.saturday_am,
            saturday_pm: saturdayA ? saturdayA : user.saturday_pm,
            sunday_am: sundayM ? sundayM : user.sunday_am,
            sunday_pm: sundayA ? sundayA : user.sunday_pm,
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

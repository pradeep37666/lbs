import React, { useState, useEffect } from 'react';
import ProductSlots from '../productSlots/productSlots';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';


export default function Availability(props) {

    const wipeState = () => {
        props.setAvailability('00000000000000')
    }

    const [mondayM, setMondayM] = useState(false);
    const [mondayA, setMondayA] = useState(false);
    const [tuesdayM, setTuesdayM] = useState(false);
    const [tuesdayA, setTuesdayA] = useState(false);
    const [wednesdayM, setWednesdayM] = useState(false);
    const [wednesdayA, setWednesdayA] = useState(false);
    const [thursdayM, setThursdayM] = useState(false);
    const [thursdayA, setThursdayA] = useState(false);
    const [fridayM, setFridayM] = useState(false);
    const [fridayA, setFridayA] = useState(false);
    const [saturdayM, setSaturdayM] = useState(false);
    const [saturdayA, setSaturdayA] = useState(false);
    const [sundayM, setSundayM] = useState(false);
    const [sundayA, setSundayA] = useState(false);

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

    useEffect(() => {
        var availabilityString = formatAvailability()

        props.setAvailability(availabilityString)


    }, [mondayM, mondayA, tuesdayM, tuesdayA, wednesdayM, wednesdayA, thursdayM, thursdayA, fridayM, fridayA, saturdayM, saturdayA, sundayM, sundayA])

    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

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
                <div className="SkipNextButtonFlex">
                    <button className="LoginFormButton LoginFormButtonInverted" onClick={() => {
                        wipeState()
                        if (props.isUpgrade) {
                            props.submitUpgrade()
                            props.handleNextPage('Complete!')
                        } else {
                            props.handleNextPage('Terms & Conditions')
                        }
                    }} style={{marginRight: '.5em'}}>Skip Step</button>
                    <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => {
                        if (props.isUpgrade) {
                            props.submitUpgrade()
                            props.handleNextPage('Complete!')
                        } else {
                            props.handleNextPage('Terms & Conditions')
                        }
                        }}>Next</button>
                </div>

                </div>
            </div>
    )
}

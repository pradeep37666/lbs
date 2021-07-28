import React from 'react';
import ProductSlots from '../productSlots/productSlots';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';


export default function Availability(props) {

    const wipeState = () => {
        props.setMondayM(null)
        props.setMondayA(null)
        props.setTuesdayM(null)
        props.setTuesdayA(null)
        props.setWednesdayM(null)
        props.setWednesdayA(null)
        props.setThursdayM(null)
        props.setThursdayA(null)
        props.setFridayM(null)
        props.setFridayA(null)
        props.setSaturdayM(null)
        props.setSaturdayA(null)
        props.setSundayM(null)
        props.setSundayA(null)
    }

    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader">General Product Availability</div>
                <div className="LoginText LoginTextSmall">Little big shed lets you have control over the days you want to lend out your products.</div>
                <div className="LoginText LoginTextSmall">Select the days and enter the times you are available for trades.</div>

                <ProductSlots 
                setMondayM={props.setMondayM}
                setMondayA={props.setMondayA}
                mondayM={props.mondayM}
                mondayA={props.mondayA}
                setTuesdayM={props.setTuesdayM}
                setTuesdayA={props.setTuesdayA}
                tuesdayM={props.tuesdayM}
                tuesdayA={props.tuesdayA}
                setWednesdayM={props.setWednesdayM}
                setWednesdayA={props.setWednesdayA}
                wednesdayM={props.wednesdayM}
                wednesdayA={props.wednesdayA}
                setThursdayM={props.setThursdayM}
                setThursdayA={props.setThursdayA}
                thursdayM={props.thursdayM}
                thursdayA={props.thursdayA}
                setFridayM={props.setFridayM}
                setFridayA={props.setFridayA}
                fridayM={props.fridayM}
                fridayA={props.fridayA}
                setSaturdayM={props.setSaturdayM}
                setSaturdayA={props.setSaturdayA}
                saturdayM={props.saturdayM}
                saturdayA={props.saturdayA}
                setSundayM={props.setSundayM}
                setSundayA={props.setSundayA}
                sundayM={props.sundayM}
                sundayA={props.sundayA}
                />
                <div className="SkipNextButtonFlex">
                    <button className="LoginFormButton LoginFormButtonInverted" onClick={() => {
                        wipeState()
                        props.handleNextPage('Terms & Conditions')
                    }} style={{marginRight: '.5em'}}>Skip Step</button>
                    <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => props.handleNextPage('Terms & Conditions')}>Next</button>
                </div>

                </div>
            </div>
    )
}

import React, { useState } from 'react'
import {ReactComponent as Logo} from '../../../assets/Logos/LogoRed.svg';
import ProductSlots from '../../../components/productSlots/productSlots';

export default function Availability(props) {

    const [keepTimes, setKeepTimes] = useState(true)

    return (
        <div className="RegistrationWrapper">


                {keepTimes ?

                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

                    <div className="LoginHeader">General Product Availability</div>
                    <div className="LoginText LoginTextSmall">Little big shed lets you have control over the days you want to lend out your products.</div>
                    <div className="LoginText LoginTextSmall">You can keep the dates you set up on creation of your Little Big Shed Lender Account, or create a custom set of dates and times for this item.</div>

                    <button className="LoginFormButton" onClick={() => {
                        //handle post item with time slots from user account
                        props.handleNextPage("Complete!")
                    }} style={{marginBottom: '1em'}}>Keep Set Times</button>
                    <button className="LoginFormButton LoginFormButtonInverted" onClick={() => {
                        // takes us to the slot picker, prefilled with the users default times, able to change from there
                        setKeepTimes(false)
                    }}>Set Custom Times</button>
                    

                </div>
                
                
                : 
                <div className="LoginMain">
                    <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

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
                        <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => {
                            // handle post the item
                            props.handleNextPage('Complete!')
                        }}>Next</button>
                    </div>

                </div>
                
                }

                
            </div>
    )
}

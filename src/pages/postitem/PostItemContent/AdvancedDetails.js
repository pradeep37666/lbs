import React, { useState } from 'react'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg';
import LBSSwitch from '../../../components/LBSSwitch/LBSSwitch';
import { Fade } from '@material-ui/core';

export default function AdvancedDetails(props) {

    const [isDiscount, setIsDiscount] = useState(false)

    return (
        <>
        {/* Main Info Box */}
            <div className="LoginMain">

                <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

                <div className="LoginHeader">Advanced Details</div>
                <div className="LoginText" style={{ padding: 0 }}>

                    <p>These details are needed to tell Little Big Shed borrowers finer details on items.</p>
                    <p>Please include as much detail as you can when filling this out as borrowers will be more likely to borrow from you if there is a great amount of detail.</p>

                </div>

            </div>

            {/* Item Description */}
            <div className="LoginMain LoginMainNoMarg">

                <div className="LoginHeader">Item Description</div>
                <div className="LoginText">

                    Be as in-depth and detail orientated as you can be, users like reading great description on products.

                </div>

                <div className="LoginHeader">Description</div>
                <textarea rows='10' maxLength='254' placeholder='Describe your item!' className="LoginInput PostItem__TextArea" onChange={(e) => props.setDescription(e.target.value)} />

            </div>

            {/* Item Price + Discount */}
            <div className="LoginMain LoginMainNoMarg">

                <div className="LoginHeader">Item Price</div>
                <div className="LoginText">

                    Define a price you would like you item to be charged out at on a per slot basis. Slots are 4 hours long.

                </div>

                <div className="LoginHeader">Price ($)</div>
                <input type='number' min="1" step="any" placeholder='10' className="LoginInput" onBlur={(e) => props.setPrice(parseInt(e.target.value))}/>

                <div className="BecomeLenderFlex">
                        <div className="LoginHeader" style={{width: 'auto'}}>Off Peak Discount</div>
                        <div className="LenderSwitchInfoFlex">
                        <LBSSwitch set={setIsDiscount} text='Yes'/>
                        </div>
                </div>
                    <Fade in={isDiscount} timeout={300} mountOnEnter unmountOnExit>
                        <div>
                        <div className="LoginText">

                            Give borrowers the ability to borrow an item at a cheaper price in off peak times. The off peak discount is a 5% discount by default.

                        </div>
                        <input type='number' min="1" step="any" placeholder='5% discount' className="LoginInput" onBlur={(e) => props.setDiscount(parseInt(e.target.value))} />
                        </div>
                    </Fade>

            </div>

            {/* Item Delivery */}
            <div className="LoginMain LoginMainNoMarg">

                <div className="LoginHeader">Item Delivery & Pickup</div>
                <div className="LoginText">

                    Enter the price you would like to charge out pick up and delivery. If you don’t want to offer this service, leave this empty.

                </div>

                <div className="LoginHeader">Price ($)</div>
                <input type='number' min="1" step="any" placeholder='' className="LoginInput" onChange={(e) => props.setDelivery(parseInt(e.target.value))}/>

                <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => props.handleNextPage('Item Location')}>Next</button>

            </div>

        </>

    )
}

import React, { useContext, useState } from 'react'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg';
import LBSSwitch from '../../../components/LBSSwitch/LBSSwitch';
import { Fade } from '@material-ui/core';
import Button from '../../../components/Button/Button';
import ValidationTextInput from '../../../components/FormComponents/ValidationTextInput';

export default function AdvancedDetails({ context }) {
    const { state, dispatch } = useContext(context)
    const { description, price, discount, delivery } = state
    const [isDiscount, setIsDiscount] = useState(false)

    return (
        <div className="RegistrationWrapper">
            <div className="LoginMain">

                <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

                <div className="LoginHeader">Advanced Details</div>
                <div className="LoginText" style={{ padding: 0 }}>

                    <p>These details are needed to tell Little Big Shed borrowers finer details on items.</p>
                    <p>Please include as much detail as you can when filling this out as borrowers will be more likely to borrow from you if there is a great amount of detail.</p>

                </div>

            </div>
            <div className="LoginMain LoginMainNoMarg">
                <div className="LoginHeader">Item Description</div>
                <div className="LoginText">
                    Be as in-depth and detail orientated as you can be, users like reading great description on products.
                </div>

                <div className="LoginHeader">Description</div>
                <textarea 
                rows='10' 
                maxLength='254'
                value={description} 
                placeholder='Describe your item!' 
                className="LoginInput PostItem__TextArea" 
                onChange={(e) => dispatch({ type: 'setDescription', data: e.target.value })} 
                />

            </div>

            <div className="LoginMain LoginMainNoMarg">
                <div className="LoginHeader">Item Price</div>
                <div className="LoginText">
                    Define a price you would like your item to be charged out at on a per slot basis. Slots are 4 hours long.
                </div>

                <ValidationTextInput 
                label="Price ($)"
                onChange={(e) => dispatch({ type: 'setPrice', data: parseInt(e.target.value) })}
                inputType='number'
                placeholder="$20"
                />

                <div className="BecomeLenderFlex">
                        <div className="LoginHeader" style={{width: 'auto'}}>Off Peak Discount</div>
                        <div className="LenderSwitchInfoFlex">
                            <LBSSwitch 
                            onClick={() => setIsDiscount(!isDiscount)} 
                            isChecked={isDiscount} 
                            text='Yes'/>
                        </div>
                </div>
                    <Fade in={isDiscount} timeout={300} mountOnEnter unmountOnExit>
                        <div>
                            <div className="LoginText">

                                Give borrowers the ability to borrow an item at a cheaper price in off peak times. The off peak discount is a 5% discount by default.

                            </div>
                            <ValidationTextInput 
                            inputType="number"
                            value={discount}
                            onChange={(e) => dispatch({ type: 'setDiscount', data: parseInt(e.target.value)})}
                            placeholder="10%"
                            />
                        </div>
                    </Fade>

            </div>

            <div className="LoginMain LoginMainNoMarg">

                <div className="LoginHeader">Item Delivery &amp; Pickup</div>
                <div className="LoginText">
                    Enter the price you would like to charge out pick up and delivery. If you don’t want to offer this service, leave this empty.
                </div>

                <div className="LoginHeader">Price ($)</div>
                <ValidationTextInput 
                inputType="number"
                value={delivery}
                onChange={(e) => dispatch({ type: 'setDelivery', data: e.target.value })}
                placeholder="$10"
                />
                <Button 
                text="Next"
                onClick={() => dispatch({ type: 'setCurrentPage', data: 'Item Location'})}
                isDisabled={!description || !price }
                />
            </div>

        </div>

    )
}

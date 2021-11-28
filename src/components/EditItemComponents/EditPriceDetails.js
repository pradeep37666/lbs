import React from 'react'
import ValidationTextInput from '../FormComponents/ValidationTextInput'
import LBSSwitch from '../LBSSwitch/LBSSwitch'
import { Fade } from '@material-ui/core'

export default function EditPriceDetails({ state, dispatch }) {
    const { isDiscount, price, discount } = state

    console.log(isDiscount)
    return (
        <div className="LoginMain LoginMainNoMarg" style={{ width: "100%" }}>
            <div className="LoginHeader">Item Price</div>
            <div className="LoginText">
                Select a paid per option and price based on what you want from
                this item.
            </div>

            <ValidationTextInput 
            label="Price ($)"
            value={price}
            onChange={e => dispatch({ type: 'setPrice', data: parseInt(e.target.value)})}
            inputType="number"
            />

            <div className="BecomeLenderFlex">
                <div className="LoginHeader" style={{ width: "auto" }}>
                    Off Peak Discount
                </div>
                <div className="LenderSwitchInfoFlex">
                    <LBSSwitch 
                    onClick={() => dispatch({ type: 'setIsDiscount', data: !isDiscount})} 
                    isChecked={isDiscount} 
                    text="Yes" 
                    />
                </div>
            </div>
            <Fade in={isDiscount} timeout={300} mountOnEnter unmountOnExit>
                <div>
                    <div className="LoginText">
                        Allow borrowers to receive an off peak time discount to
                        incentivise mid week trading
                    </div>
                    {/* <div style={{ width: "20%", display: "flex", flex: 2, marginRight: "10%" }}> */}
                    <ValidationTextInput 
                    onChange={e => dispatch({ type: 'setDiscount', data: e.target.value })}
                    inputType="number"
                    value={discount}
                    />
                    {/* </div> */}
                    <div className="LoginText" style={{ marginTop: "3%", flex: 3, }} >
                        Off Peak Discount Rate
                    </div>
                </div>
            </Fade>
        </div>
    )
}

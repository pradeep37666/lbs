import React from 'react'
import './CheckBox.css'
import Check from '../../assets/Icons/Check'
export default function CheckBox({ checked, onClick}) {
    
    return (
        <div onClick={() => {
            onClick()
        }}
        className={` CheckBox ${checked ? "CheckBoxActive" : "CheckBoxInactive"}`}>
            {checked && <Check />}
        </div>
    )
}

import React from 'react'
import './CheckBox.css'
export default function CheckBox({ checked, onClick}) {
    return (
        <div className={` CheckBox ${checked ? "CheckBoxActive" : "CheckBoxInactive"}`}>
            
        </div>
    )
}

import React from 'react'
import './CheckBox.css'
export default function CheckBox({ checked, onClick}) {
    
    return (
        <div onClick={() => {
            console.log('a')
            onClick()
        }}
        className={` CheckBox ${checked ? "CheckBoxActive" : "CheckBoxInactive"}`}>
            
        </div>
    )
}

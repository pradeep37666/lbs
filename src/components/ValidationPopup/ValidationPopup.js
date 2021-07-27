import React from 'react';
import './ValidationPopup.css';

export default function ValidationPopup(props) {
    return (
        <div className={`VerificationText__Main ${props.hide ? '' : 'ValidationTextHide'}`}>
                <div className="ValidationPopup__Header">{props.errorHeader}</div>
                <div>{props.errorText}</div>
        </div>
    )
}

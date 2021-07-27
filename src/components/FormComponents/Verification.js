import React from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';

export default function Verification(props) {
    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '.5em'}}/>

                <div className="LoginHeader">Verify Your Identity</div>
                <div className="LoginText">Log in or create an account to start sharing and borrowing from Little Big Shed.</div>

                <div className="LoginHeader">Verification Code</div>
                <input type='text' placeholder='12345678' className="LoginInput" />

                <button className="LoginFormButton" onClick={() => {
                    props.setValidated(false)
                    props.handleNextPage('Bank Details')
                    }}>Next</button>
                </div>
            </div>
    )
}

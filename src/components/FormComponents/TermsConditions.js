import React from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import TC from '../../components/tcSection/tcSection';

export default function TermsConditions(props) {
    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '1em'}}/>

                <div className="LoginHeader">Terms {'&'} Conditions</div>
                <div className="LoginText">Little big shed has outlined its terms and conditions below to help not only protect little big shed from fraudulent activity, but protect its users as well.</div>

                <TC setTC={props.setTC}/>
            {/* This is where we will submit all the form data, if user successfully registered takes us to the complete page */}
            <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => {
                props.registerUser()
                props.handleNextPage('Complete!')
            }}>Next</button>
                </div>
            </div>
    )
}
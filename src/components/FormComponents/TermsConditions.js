import React, { useState } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import TC from '../../components/tcSection/tcSection';
import { CircularProgress } from '@material-ui/core';

export default function TermsConditions(props) {

    const [isLoading, setIsLoading] = useState(false)
    
    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '1em'}}/>

                <div className="LoginHeader">Terms {'&'} Conditions</div>
                <div className="LoginText">Little big shed has outlined its terms and conditions below to help not only protect little big shed from fraudulent activity, but protect its users as well.</div>

                <TC setTC={props.setTC}/>
                {!isLoading ? <button className={`LoginFormButton ${!props.validated ? 'ButtonDisabled' : ''}`} disabled={!props.validated} onClick={() => {
                    setIsLoading(false)
                    props.registerUser()
                }}>Next</button> : <CircularProgress size={30} />
                }
            

                </div>
        </div>
    )
}

import React, { useContext } from 'react';
import {ReactComponent as Logo} from './../../assets/Logos/LogoRed.svg';
import TC from '../../components/tcSection/tcSection';
import Button from '../Button/Button';

export default function TermsConditions({ context, registerUser, isRegisterLoading }) {
    const { state, dispatch } = useContext(context)
    const { termsChecked } = state

    return (
        <div className="RegistrationWrapper">
                <div className="LoginMain">
                <Logo height='50px' width='50px' style={{marginBottom: '1em'}}/>

                <div className="LoginHeader">{`Terms & Conditions`}</div>
                <div className="LoginText">Little big shed has outlined its terms and conditions below to help not only protect little big shed from fraudulent activity, but protect its users as well.</div>

                <TC 
                    onClick={() => dispatch({ type: 'setTermsChecked', data: !termsChecked})}
                    termsChecked={termsChecked}
                />

                <Button
                text="Next"
                isDisabled={!termsChecked}
                isLoading={isRegisterLoading}
                onClick={registerUser}
                />
                </div>
        </div>
    )
}

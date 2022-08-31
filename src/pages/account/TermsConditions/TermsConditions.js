import React from 'react'
import TnC from '../../../components/tcSection/TnC'
import './TermsConditions.css'

export default function TermsConditions() {
    return (
        <div className="TermsConditions__Container">
            <div className="LoginHeader">Terms {'&'} Conditions</div>
            <div className="LoginText">Little big shed has outlined its terms and conditions below to help not only protect little big shed from fraudulent activity, but protect its users as well.</div>

            <div className="TermsConditionsScroll">
                <TnC />
            </div>
        </div>
    )
}

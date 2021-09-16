import { Slide } from '@material-ui/core'
import React from 'react'
import Check from '../../assets/Icons/Check'
import ApplicationItemCard from '../application/ApplicationItemCard'
import './ApplicationModal.css'

export default function ApplicationModal({ onClick, item }) {
    return (
        <div className="ApplicationModalWrapper" onClick={onClick}>
            
                <Slide in={true} mountOnEnter unmountOnExit direction="down" timeout={500}>
                    <div className="ApplicationModalMain" onClick={(e) => e.stopPropagation() }>
                        <div className="AppicationModalCheck">
                            <Check />
                        </div>
                        <span className="ApplicationModalTitle">Application sent</span><br></br>
                        <span className="ApplicationModalText">Good work! The lender now has 24 hours to check the item's availability and approve.</span>
                        <ApplicationItemCard item={item}/>  
                        <div className="ApplicationModalButton" onClick={onClick}>
                            <span className="ApplicationModalButtonText">Continue</span>
                        </div>
                    </div>
                </Slide>
           
        </div>
    )
}

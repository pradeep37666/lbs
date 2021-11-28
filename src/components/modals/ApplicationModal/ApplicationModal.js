import { Dialog, DialogContent, Slide } from '@material-ui/core'
import React from 'react'
import Check from '../../assets/Icons/Check'
import ApplicationItemCard from '../application/ApplicationItemCard'
import './ApplicationModal.css'

export default function ApplicationModal({ onClick, item, open }) {
    return (
            <Dialog
            open={open}
            onClose={onClick}
            >
                <DialogContent className="BorrowerMain" >
                    <div className="AppicationModalCheck">
                        <Check />
                    </div>
                    <span className="ApplicationModalTitle">Application sent</span><br></br>
                    <span className="ApplicationModalText">Good work! The lender now has 24 hours to check the item's availability and approve.</span>
                    <ApplicationItemCard item={item}/>  
                    <div className="ApplicationModalButton" onClick={onClick} style={{ margin: '1rem 0'}}>
                        <span className="ApplicationModalButtonText">Continue</span>
                    </div>
                </DialogContent>
            </Dialog>
    )
}

import React from 'react'
import './DisputeBookingModal.css'
import { Dialog, DialogContent } from '@material-ui/core'
import StatusButton from '../../tradeCalendar/tradeCalendarStatusPanel/StatusButton'
import { BOOKING_STATUSES } from '../../../assets/Data/LBSEnum'

const DisputeBookingModal = ({ open, onClick, updateBookingStatus }) => {
    return (
        <Dialog
            open={open}
            onClose={onClick}
        >
            <DialogContent className='DisputeModalContainer'>
                <p className='DisputeBookingModalTitle'>
                    Are you sure you want to dispute this trade?
                </p>
                <p className='DisputeBookingModalContent'>
                    By disputing this trade you will effectively cancel this trade, the remaining efforts will be handled solely by the Little Big Shed support team.
                </p>
                <div className='DisputeBookingModalOptions'>
                    <StatusButton 
                        text='No, Go back'
                        type='white'
                        onClick={onClick}
                    />
                    <StatusButton 
                        text='Yes, Dipute'
                        type='red'
                        onClick={() => updateBookingStatus(BOOKING_STATUSES.DISPUTED)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DisputeBookingModal
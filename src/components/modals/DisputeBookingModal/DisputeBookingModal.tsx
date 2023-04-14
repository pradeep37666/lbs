import React from 'react'
import './DisputeBookingModal.css'
import { Dialog, DialogContent } from '@material-ui/core'
import StatusButton from '../../tradeCalendar/tradeCalendarStatusPanel/StatusButton'
import { BookingAction } from '../../../types/Booking'

type Props = {
  isOpen: boolean
  onClose: () => void
  handleBookingAction: (action: BookingAction) => Promise<void>
  isLoading: boolean
}

const DisputeBookingModal = ({
  isOpen,
  onClose,
  handleBookingAction,
  isLoading,
}: Props) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className='DisputeModalContainer'>
        <p className='DisputeBookingModalTitle'>
          Are you sure you want to dispute this trade?
        </p>
        <p className='DisputeBookingModalContent'>
          By disputing this trade you will effectively cancel this trade, the
          remaining efforts will be handled solely by the Little Big Shed
          support team.
        </p>
        <div className='DisputeBookingModalOptions'>
          <StatusButton text='No, Go back' type='white' onClick={onClose} />
          <StatusButton
            text='Yes, Dipute'
            type='red'
            isLoading={isLoading}
            onClick={() => {
              handleBookingAction('DISPUTE')
              onClose()
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DisputeBookingModal

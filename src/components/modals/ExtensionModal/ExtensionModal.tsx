import { Dialog, DialogContent, Slide } from '@material-ui/core'
import React from 'react'
import Check from '../../../assets/Icons/Check'
import './ExtensionModal.css'

type Props = {
  onClose: () => void
  isOpen: boolean
  price: number
}

export default function ExtensionModal({ onClose, isOpen }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className='BorrowerMain'>
        <div className='ExtensionModalCheck'>
          <Check />
        </div>
        <span className='ExtensionModalTitle'>Extension Application sent</span>
        <br></br>
        <span className='ExtensionModalText'>
          Good work! All that is left is for the lender to accept your borrow
          extension.
        </span>

        <button
          className='ExtensionModalButton'
          onClick={onClose}
          style={{ margin: '1rem 0' }}
        >
          <span className='ExtensionModalButtonText'>Continue</span>
        </button>
      </DialogContent>
    </Dialog>
  )
}

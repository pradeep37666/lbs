import { useState } from 'react'
import Button from '../../../components/Button/Button'
import './Support.css'
import AccountService from '../../../services/account'
import useErrorState from '../../../util/reducers/errorContext'
import { SNACKBAR_BUTTON_TYPES } from '../../../assets/Data/LBSEnum'

const Support = ({ setAccountContent }) => {
  const [reason, setReason] = useState('')
  const [experience, setExperience] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { errorDispatch } = useErrorState()
  const accountService = new AccountService()

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const data = await accountService.createSupport({
        subject: reason,
        message: experience,
      })
      if (!data) throw Error
      setAccountContent('Account')
    } catch (error) {
      errorDispatch({
        type: 'openSnackBar',
        data: {
          message:
            'Failed to submit a support request. Please check your details and try again.',
          btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
          btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='Support_Container'>
      <div className='Support_Header'>Reason for support</div>
      <div className='Suppor_Description'>
        Tell us the reason why you are contacting support. This will help us
        understand your problem better.
      </div>
      <input
        type='text'
        className='Support_Input_Field'
        placeholder='Your Reason...'
        onChange={e => setReason(e.target.value)}
      />

      <div className='Support_Header'>What are you experiencing?</div>
      <div className='Suppor_Description'>
        Let us know as much detail as possible the problem you are experiencing.
      </div>
      <textarea
        rows='10'
        className='Support_Textarea'
        placeholder='Tell us about your experience...'
        onChange={e => setExperience(e.target.value)}
      />
      <Button
        text='Submit'
        onClick={handleSubmit}
        isLoading={isLoading}
        isDisabled={isLoading}
      />
    </div>
  )
}

export default Support

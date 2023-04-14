import React, { useState } from 'react'
import './ReviewBorrower.css'
import {
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { ReactComponent as StarOutline } from './../../../assets/Icons/StarOutline.svg'
import { ReactComponent as StarFilled } from './../../../assets/Icons/StarFilled.svg'
import Instance from '../../../util/axios'
import Button from '../../Button/Button'
import { Booking, RateBorrowerInfo } from '../../../types/Booking'
import BookingService from '../../../services/booking'

type Props = {
  onClose: () => void
  booking: Booking | null
  isOpen: boolean
  getBookings: () => Promise<void>
}

function ReviewBorrower({ onClose, booking, isOpen, getBookings }: Props) {
  const [borrowerRating, setBorrowerRating] = useState(5)
  const [isLoading, setIsLoading] = useState(false)

  const useStyles = makeStyles({
    button: {
      backgroundColor: '#B43B4C',
      '&:hover': {
        backgroundColor: '#cf3247',
      },
    },
    icon: {
      color: '#FFF',
    },
    buttonDelete: {
      position: 'absolute',
      top: -20,
      right: -20,
      width: 40,
      height: 40,
      backgroundColor: '#B43B4C',
      '&:hover': {
        backgroundColor: '#cf3247',
      },
    },
  })

  const classes = useStyles()

  const reviewBorrower = async () => {
    try {
      if (!booking) return
      setIsLoading(true)
      const ratingInfo: RateBorrowerInfo = {
        rating: borrowerRating,
        borrowerId: booking.borrowerId,
        lenderId: booking.item.userId,
      }
      await BookingService.rateBorrower(booking.id, ratingInfo)
      getBookings()
      onClose()
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogContent className='BorrowerMain'>
        <div className='BorrowerHeaderContent'>
          <div className='BorrowerHeader' style={{ justifyContent: 'center' }}>
            Rate Borrower
          </div>

          <div onClick={onClose}>
            <IconButton aria-label='delete' className={classes.button}>
              <Close className={classes.icon} />
            </IconButton>
          </div>
        </div>
        <div className='BorrowerHeader'>
          Borrower Rating :&nbsp;
          <div className='RatingFilterHeader'>
            {borrowerRating} Star{borrowerRating === 1 ? '' : 's'}
          </div>
        </div>
        <div className='BorrowerStarsFlex'>
          <StarFilled
            className='BorrowerStarIcon StarClick'
            fill='#E9D8B4'
            onClick={() => setBorrowerRating(1)}
          />
          {borrowerRating >= 2 ? (
            <StarFilled
              className='BorrowerStarIcon StarClick'
              fill='#E9D8B4'
              onClick={() => setBorrowerRating(2)}
            />
          ) : (
            <StarOutline
              className='BorrowerStarIcon StarClick'
              onClick={() => setBorrowerRating(2)}
            />
          )}
          {borrowerRating >= 3 ? (
            <StarFilled
              className='BorrowerStarIcon StarClick'
              fill='#E9D8B4'
              onClick={() => setBorrowerRating(3)}
            />
          ) : (
            <StarOutline
              className='BorrowerStarIcon StarClick'
              onClick={() => setBorrowerRating(3)}
            />
          )}
          {borrowerRating >= 4 ? (
            <StarFilled
              className='BorrowerStarIcon StarClick'
              fill='#E9D8B4'
              onClick={() => setBorrowerRating(4)}
            />
          ) : (
            <StarOutline
              className='BorrowerStarIcon StarClick'
              onClick={() => setBorrowerRating(4)}
            />
          )}
          {borrowerRating >= 5 ? (
            <StarFilled
              className='BorrowerStarIcon StarClick'
              fill='#E9D8B4'
              onClick={() => setBorrowerRating(5)}
            />
          ) : (
            <StarOutline
              className='BorrowerStarIcon StarClick'
              onClick={() => setBorrowerRating(5)}
            />
          )}
        </div>
        <div style={{ width: '100%' }}>
          <span className='BorrowerRatingText '>
            &nbsp;Click Your Desired Rating
          </span>
        </div>
        <div
          className='ItemButtons'
          style={{
            justifyContent: 'center',
            minHeight: '4rem',
            marginTop: '1em',
          }}
        >
          {isLoading ? (
            <CircularProgress color='inherit' />
          ) : (
            <Button text='Submit Rating' onClick={reviewBorrower} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewBorrower

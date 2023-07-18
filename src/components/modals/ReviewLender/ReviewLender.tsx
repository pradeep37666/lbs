import { useState } from 'react'
import { CircularProgress, DialogContent, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { ReactComponent as StarOutline } from './../../../assets/Icons/StarOutline.svg'
import { ReactComponent as StarFilled } from './../../../assets/Icons/StarFilled.svg'
import { Dialog } from '@material-ui/core'
import Button from '../../Button/Button'
import axios from 'axios'
import { Booking, RateLenderInfo } from '../../../types/Booking'
import BookingService from '../../../services/booking'

type Props = {
  booking: Booking | null
  isOpen: boolean
  onClose: () => void
  getBookings: () => Promise<void>
}

function ReviewLender({ onClose, booking, isOpen, getBookings }: Props) {
  const [comment, setComment] = useState('')
  const [lenderRating, setLenderRating] = useState(5)
  const [productRating, setProductRating] = useState(5)
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

  const submitReview = async () => {
    try {
      if (!booking) return
      setIsLoading(true)
      const ratingInfo: RateLenderInfo = {
        lenderRating: {
          lenderId: booking.item.userId,
          borrowerId: booking.borrowerId,
          rating: lenderRating,
        },
        itemRating: {
          itemId: booking.itemId,
          comment: comment,
          rating: productRating,
          userId: booking.borrowerId,
          bookingId: booking.id,
        },
      }
      await BookingService.rateLender(booking.id, ratingInfo)
      getBookings()
      onClose()
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data)
      }
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const renderLenderStars = () => {
    const starArray = new Array(5).fill(null)
    return starArray.map((_, index) => {
      if (index + 1 <= lenderRating) {
        return (
          <StarFilled
            className='BorrowerStarIcon StarClick'
            fill='#E9D8B4'
            onClick={() => setLenderRating(index + 1)}
            key={index}
          />
        )
      } else {
        return (
          <StarOutline
            className='BorrowerStarIcon StarClick'
            fill='#E9D8B4'
            onClick={() => setLenderRating(index + 1)}
            key={index}
          />
        )
      }
    })
  }

  const renderProductStars = () => {
    const starArray = new Array(5).fill(null)
    return starArray.map((_, index) => {
      if (index + 1 <= productRating) {
        return (
          <StarFilled
            className='BorrowerStarIcon StarClick'
            fill='#E9D8B4'
            onClick={() => setProductRating(index + 1)}
            key={index}
          />
        )
      } else {
        return (
          <StarOutline
            className='BorrowerStarIcon StarClick'
            fill='#E9D8B4'
            onClick={() => setProductRating(index + 1)}
            key={index}
          />
        )
      }
    })
  }

  const classes = useStyles()

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className='BorrowerMain'>
        <div className='BorrowerHeaderContent'>
          <div className='BorrowerHeader' style={{ justifyContent: 'center' }}>
            Trade Complete
          </div>
          <IconButton
            aria-label='delete'
            className={classes.button}
            onClick={onClose}
          >
            <Close className={classes.icon} />
          </IconButton>
        </div>
        <div className='BorrowerHeader'>Lender Rating</div>
        <div className='BorrowerStarsFlex' style={{ paddingTop: 15 }}>
          {renderLenderStars()}
        </div>
        <div className='BorrowerHeader'>Product Rating</div>
        <div className='BorrowerStarsFlex' style={{ paddingTop: 15 }}>
          {renderProductStars()}
        </div>
        <div className='BorrowerHeader'>Product Comments</div>
        <textarea
          rows={10}
          maxLength={254}
          placeholder={`Your comments on the item.`}
          value={comment}
          className='LoginInput PostItem__TextArea'
          onChange={e => setComment(e.target.value)}
        />
        <div
          className='ItemButtons'
          style={{ justifyContent: 'center', minHeight: 70, marginTop: 20 }}
        >
          {isLoading ? (
            <CircularProgress color='inherit' />
          ) : (
            <Button
              text='Submit Review'
              onClick={submitReview}
              isDisabled={!comment}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewLender

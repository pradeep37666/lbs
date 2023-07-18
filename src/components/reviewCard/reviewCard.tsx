import './reviewCard.css'
import getImage from '../../util/getImage'
import { Avatar } from '@material-ui/core'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'
import RatingFiller from '../ratingFiller/ratingFiller'
import { Rating } from '../../types/Rating'

type Props = {
  review: Rating
  isOnlyOne: boolean
}

export default function ReviewCard({ review, isOnlyOne }: Props) {
  return (
    <div className={isOnlyOne ? 'OnlyOneCard' : 'ReviewCard'}>
      <div className='RatingLenderFlex'>
        <Avatar
          src={
            review?.user.avatar ? getImage(review.user.avatar) : MissingProfile
          }
          className='ProfileIconSmall'
        />
        <div className='ReviewSmallText'>
          <div className='RatingHeader'>
            {review.user.firstName}&nbsp;
            {review.user.lastName}
          </div>
          <div className='ReviewRatingTitle'>
            {review.rating}/5
            <RatingFiller rating={review.rating} />
          </div>
        </div>
      </div>
      <div className='ReviewText'>{review.comment}</div>
    </div>
  )
}

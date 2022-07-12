import React from 'react'
import './reviewCard.css'
import {ReactComponent as StarFilled} from './../../assets/Icons/StarFilled.svg'
import getImage from '../../util/getImage'
import { Avatar } from '@material-ui/core'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'

export default function ReviewCard({ review }) {
    return (
        <div className="ReviewCard">
            <div className="RatingLenderFlex">
                <Avatar src={review?.user.avatar ? getImage(review.user.avatar) : MissingProfile}  className="ProfileIconSmall" />
                <div className="ReviewSmallText">
                    <div className="RatingHeader">
                        {review.user.firstName}&nbsp;
                        {review.user.lastName}
                    </div>
                    <div className="RatingStarFlex">
                        {review.rating}/5 
                        <StarFilled fill='#e9d8b4' className="StarIconRatingSmall" />
                    </div>
                </div>
            </div>
            <div className="ReviewText">
                {review.content}
            </div>
        </div>
    )
}

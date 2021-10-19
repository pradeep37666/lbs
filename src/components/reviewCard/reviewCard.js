import React from 'react';
import './reviewCard.css';
import {ReactComponent as StarFilled} from './../../assets/Icons/StarFilled.svg';
import Jake from './../../assets/Images/JakeFriend.png';
import getImage from '../../util/getImage';
import { Avatar } from '@material-ui/core';
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'

export default function ReviewCard({ review }) {
    console.log(review)
    return (
        <div className="ReviewCard">
            <div className="RatingLenderFlex">
                <Avatar src={review?.avatar ? getImage(review.avatar) : MissingProfile}  className="ProfileIconSmall" />
                
                <div className="ReviewSmallText">
                    <div className="RatingHeader">{review.fullName}</div>
                    <div className="RatingStarFlex">{review.rating}/5 <StarFilled fill='#e9d8b4' className="StarIconRatingSmall" /></div>
                </div>
            </div>
            <div className="ReviewText">
                {review.content}
            </div>
        </div>
    )
}

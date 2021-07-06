import React from 'react';
import './reviewCard.css';
import Star from './../../assets/Icons/StarFilled.png';
import Jake from './../../assets/Images/JakeFriend.png';

export default function reviewCard(props) {
    return (
        <div className="ReviewCard">
            <div className="RatingLenderFlex">
                <img src={Jake} alt="" className="ProfileIconSmall" />
                <div className="ReviewSmallText">
                    <div className="RatingHeader">{props.posterName}</div>
                    <div className="RatingStarFlex">{props.rating}/5 <img src={Star} alt="" className="StarIconRatingSmall" /></div>
                </div>
            </div>
            <div className="ReviewText">
                {props.reviewText}
            </div>
        </div>
    )
}

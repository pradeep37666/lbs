import React from 'react';
import './reviewCard.css';
import {ReactComponent as StarFilled} from './../../assets/Icons/StarFilled.svg';
import Jake from './../../assets/Images/JakeFriend.png';

export default function reviewCard(props) {
    return (
        <div className="ReviewCard">
            <div className="RatingLenderFlex">
                <img src={Jake} alt="" className="ProfileIconSmall" />
                <div className="ReviewSmallText">
                    <div className="RatingHeader">{props.posterName}</div>
                    <div className="RatingStarFlex">{props.rating}/5 <StarFilled fill='#e9d8b4' className="StarIconRatingSmall" /></div>
                </div>
            </div>
            <div className="ReviewText">
                {props.reviewText}
            </div>
        </div>
    )
}

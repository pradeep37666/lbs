import React from 'react';
import './ratingFiller.css';
import {ReactComponent as StarOutline} from './../../assets/Icons/StarOutline.svg';
import {ReactComponent as StarFilled} from './../../assets/Icons/StarFilled.svg';

export default function ratingFiller(props) {
    return (
        <div className="RatingStars">
          <StarFilled fill='#E9D8B4' className="StarIcon"/>
          {props.rating >= 2 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
          {props.rating >= 3 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
          {props.rating >= 4 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
          {props.rating >= 5 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
        </div>
    )
}

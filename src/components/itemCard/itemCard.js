import React from 'react';
import './itemCard.css';
import PreviewImage from './../../assets/Images/ATVMower.png';
import LocationIcon from './../../assets/Icons/LocationIcon.png';
import DeliveryIcon from './../../assets/Icons/TruckIcon.png';
import StarOutline from './../../assets/Icons/StarOutline.png';
import StarFilled from './../../assets/Icons/StarFilled.png';


export default function itemCard(props) {
  const rating = props.rating;
  return (
    <div className="ItemCard">
      {/* new prop for image link to go here later */}
      <img src={PreviewImage} alt={props.itemName} className="PreviewImage"/>
      <div className="ItemNameText">{props.itemName}</div>
      <div className="ItemPriceText">${props.price} <span className="ItemRateText">per {props.rate}</span></div>

      <div className="StatusLocationSection">
        <div className="StatusLocationSection" style={{paddingRight: '30px'}}>
          <img src={DeliveryIcon} alt={props.location} className="ItemCardIcon"/>
          {props.availability ? 'Available' : 'Unavailable'}
        </div>

        <div className="StatusLocationSection">
          <img src={LocationIcon} alt={props.location} className="ItemCardIcon"/>
          {props.location}
        </div>
      </div>

      <div className="RatingSection">
        {rating}/5 <div className="RatingStars">
          <img src={StarFilled} alt="" className="StarIcon"/>
          <img src={rating >= 2 ? StarFilled : StarOutline} alt="" className="StarIcon" />
          <img src={rating >= 3 ? StarFilled : StarOutline} alt="" className="StarIcon"/>
          <img src={rating >= 4 ? StarFilled : StarOutline} alt="" className="StarIcon"/>
          <img src={rating >= 5 ? StarFilled : StarOutline} alt="" className="StarIcon"/>
          
          </div>
      </div>

    </div>
  )
}

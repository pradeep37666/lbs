import React from 'react';
import './itemCard.css';
import PreviewImage from './../../assets/Images/ATVMower.png';
import LocationIcon from './../../assets/Icons/LocationIcon.png';
import DeliveryIcon from './../../assets/Icons/TruckIcon.png';


export default function itemCard(props) {
  return (
    <div className="ItemCard">
      {/* new prop for image link to go here later */}
      <img src={PreviewImage} alt={props.itemName} />
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
        {props.rating}/5 *stars coming soon tm
      </div>

    </div>
  )
}

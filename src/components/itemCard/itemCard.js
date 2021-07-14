import React from 'react';
import './itemCard.css';
import PreviewImage from './../../assets/Images/ATVMower.png';
import LocationIcon from './../../assets/Icons/LocationIcon.svg';
import DeliveryIcon from './../../assets/Icons/DeliveryIcon.svg';
import {ReactComponent as StarOutline} from './../../assets/Icons/StarOutline.svg';
import {ReactComponent as StarFilled} from './../../assets/Icons/StarFilled.svg';
import { Link } from 'react-router-dom';


export default function itemCard(props) {
  const item = props.item;
  return (
    <div className="ItemCard">
      {/* new prop for image link to go here later */}
      <Link to={`/item/${item.i_id}`} item={item}>
        <img src={PreviewImage} alt={item.title} className="PreviewImage"/>
      </Link>
      <div className="ItemNameText">{item.title}</div>
      {/* <div className="ItemPriceText">${item.price} <span className="ItemRateText">per {item.rate}</span></div> */}

      <div className="StatusLocationSection">
        <div className="StatusLocationSection" style={{paddingRight: '30px'}}>
          <img src={DeliveryIcon} alt={item.city} className="ItemCardIcon"/>
          {item.deliveryOption === 'delivery' ? 'Available' : 'Unavailable'}
        </div>

        <div className="StatusLocationSection">
          <img src={LocationIcon} alt={item.city} className="ItemCardIcon"/>
          {item.city}
        </div>
      </div>

      <div className="RatingSection">
        {item.rating}/5 <div className="RatingStars">
          <StarFilled fill='#E9D8B4' className="StarIcon"/>
          {item.rating >= 2 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
          {item.rating >= 3 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
          {item.rating >= 4 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
          {item.rating >= 5 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
          </div>
      </div>
    </div>
  )
}

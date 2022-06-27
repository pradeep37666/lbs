import React, { useEffect, useState } from 'react';
import './itemCard.css'
import NoContentImage from '../../assets/Images/NoContent.png'
import LocationIcon from './../../assets/Icons/LocationIcon.svg';
import DeliveryIcon from './../../assets/Icons/DeliveryIcon.svg';
import {ReactComponent as StarOutline} from './../../assets/Icons/StarOutline.svg';
import {ReactComponent as StarFilled} from './../../assets/Icons/StarFilled.svg';
import { Link } from 'react-router-dom';
import getImage from '../../util/getImage';

export default function ItemCard({ item, favourited, userId }) {
  const [ itemImage, setItemImage ] = useState('')
  const [ itemSuburb, setItemSuburb] = useState('')
  
  useEffect(() => {
    if (item.images.length > 0) {
      setItemImage(item.images[0]?.imageKey)
    }
    if (item.address?.suburb) {
      setItemSuburb(item.address?.suburb)
    }
  },[item])

  return (
    <div className="ItemCard">
      <Link 
        to={`/item/${item.id}`} 
        style={{position:"relative"}}
      >
        <img 
          src={itemImage 
            ? getImage(itemImage) 
            : NoContentImage
          } 
          alt={item.title} 
          className="PreviewImage"
        />
      { favourited &&
        <div className="favouriteStar">
          <StarFilled/>
        </div> 
      }
      </Link>
      <div className="ItemDetailsContainer">
        <div className="ItemNameText">{item.title}</div>
        <div className="ItemPriceText">${item.price}</div>

        <div className="StatusLocationSection" >
          <div className="ItemCardIconContainer">
            <img src={DeliveryIcon} alt='' className="ItemCardIcon"/>
          </div>
          {item.deliveryPrice > 0 ? 'Available' : 'Unavailable'}
        </div>

        <div className="StatusLocationSection">
          <div className="ItemCardIconContainer" style={{ paddingLeft: 7 }}>
            <img src={LocationIcon} alt={itemSuburb} className="ItemCardIcon"/>
          </div>
          <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
            {itemSuburb}
          </div>
        </div>

        <div className="RatingSection">
          <span className="ItemRateText">{item.rating}/5</span>
          <div className="RatingStars" style={{ marginLeft: 0 }}>
            <StarFilled fill='#E9D8B4' className="StarIcon"/>
            {item.rating >= 2 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
            {item.rating >= 3 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
            {item.rating >= 4 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
            {item.rating >= 5 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
            </div>
        </div>
      </div>
    </div>
  )
}

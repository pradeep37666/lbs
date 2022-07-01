import React from 'react'
import RatingFiller from '../ratingFiller/ratingFiller'
import './ApplicationItemCard.css'
import CheckBox from '../checkBox/CheckBox'
import getImage from '../../util/getImage'
import EmptyImage from '../../assets/Logos/LBS_Logo_Flat_FullColour.png'

export default function ApplicationItemCard({ item, onClick, extra, price }) {
    const mainItemImage = item.images.length !== 0 
    ? getImage(item.images[0].imageKey) 
    : EmptyImage

    return (
        <div className="ApplicationItemCardContainer">
            <img 
                placeholder="item image" 
                src={mainItemImage} 
                className="ApplicationItemImage" 
            />
            <div className="ApplicationItemDetailsContainer">
                <span className="ApplicationItemCardHeader">{item.title}</span>
                { price && 
                <div>
                   <span className="ApplicationItemPrice">${item.price} </span> 
                   
                </div>}
                <div className="ApplicationItemRatingContainer">
                    <span className="ApplicationItemRating">{item.rating}/5</span>
                    <RatingFiller rating={item.rating}/>
                </div>
            </div>
            { extra &&
            <div className="ApplicationItemCheckContainer">
                <CheckBox onClick={() => null} />
            </div>}
        </div>
    )
}

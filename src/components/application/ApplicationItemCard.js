import React, { useState } from 'react'
import RatingFiller from '../ratingFiller/ratingFiller'
import './ApplicationItemCard.css'
import CheckBox from '../checkBox/CheckBox'

export default function ApplicationItemCard({ item, onClick, extra }) {
    const [selected, setSelected] = useState()

    return (
        <div className="ApplicationItemCardContainer">
            <img placeholder="item image" style={{ height: 70, width: 70, marginRight: 15}}></img>
            <div className="ApplicationItemDetailsContainer">
                <span className="ApplicationItemCardHeader">{item.title}</span>
                { extra && 
                <div>
                   <span className="ApplicationItemPrice">${item.price} </span> 
                   <span className="ApplicationItemExtra">extra</span>
                </div>}
                <div className="ApplicationItemRatingContainer">
                    <span className="ApplicationItemRating">{item.rating}/5</span>
                    <RatingFiller rating={item.rating}/>
                </div>
            </div>
            { extra &&
            <div className="ApplicationItemCheckContainer">
                <CheckBox />
            </div>}
        </div>
    )
}

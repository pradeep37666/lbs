import React, { useState } from 'react'
import RatingFiller from '../ratingFiller/ratingFiller'
import './ApplicationItemCard.css'
import CheckBox from '../checkBox/CheckBox'
import getImage from '../../util/getImage'

export default function ApplicationItemCard({ item, onClick, extra, price }) {
    const [selected, setSelected] = useState()
    const pictures = item.pictures.split(',')

    return (
        <div className="ApplicationItemCardContainer">
            <img placeholder="item image" src={getImage(pictures[0])} className="ApplicationItemImage"></img>
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
                <CheckBox onClick={() => null } />
            </div>}
        </div>
    )
}

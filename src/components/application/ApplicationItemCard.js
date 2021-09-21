import React, { useState } from 'react'
import RatingFiller from '../ratingFiller/ratingFiller'
import './ApplicationItemCard.css'
import CheckBox from '../checkBox/CheckBox'
import getImage from '../../util/getImage'

export default function ApplicationItemCard({ item, onClick, extra }) {
    const [selected, setSelected] = useState()
    console.log('item', item)
    const pictures = item.pictures.split(',')
    // console.log('item', item)
    // console.log(pictures[0])
    return (
        <div className="ApplicationItemCardContainer">
            <img placeholder="item image" src={getImage(pictures[0])} style={{ height: 70, width: 70, marginRight: 15}}></img>
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
                <CheckBox onClick={() => null } />
            </div>}
        </div>
    )
}

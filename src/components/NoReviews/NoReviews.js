import React from 'react'
import './NoReviews.css'
import NoContent2 from '../../assets/Images/NoContent2.png'

export default function NoReviews() {
    return (
        <div className="NoReviewsContainer">
            <div className="NoReviewsHeader">Reviews</div>
            <div className="NoReviewsText">Looks like there aren't any reviews for this item yet</div>
            <img src={NoContent2} style={{ width: '100%'}}/>
        </div>
    )
}

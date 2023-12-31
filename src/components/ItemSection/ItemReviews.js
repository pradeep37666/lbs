import React, { useState } from 'react'
import NoReviews from '../NoReviews/NoReviews'
import ReviewCard from '../reviewCard/reviewCard'

const ItemReviews = ({ reviews, openReviewModal }) => {
    const [ reviewPage, setReviewPage ] = useState(0)

    const renderReviews = () => {
        const visibleReviews = reviews.slice(reviewPage * 2, (reviewPage * 2) + 2)
        if(visibleReviews.length === 0){
            return <NoReviews />
        }
        return visibleReviews.map((review, index) => {
            if (visibleReviews.length === 1) {
                return <ReviewCard review={review} key={index} isOnlyOne={true}/>
            } else {
                return <ReviewCard review={review} key={index} />
            }
        })
    }

    const NumReviewPages = Math.ceil(reviews.length / 2)

    const handleReviewPageClick = (direction) => {
        if (direction === 'forward') {
            (reviewPage === NumReviewPages - 1) 
            ? setReviewPage(0) 
            : setReviewPage(reviewPage + 1)
        } else {
            (reviewPage === 0) 
            ? setReviewPage(NumReviewPages - 1) 
            : setReviewPage(reviewPage - 1)
        }
    }

    const getReviewPages = () => {
        let content = []
        for (let i = 0; i < NumReviewPages; i++) {
            content.push(<div className={(reviewPage === i) 
                    ? "ReviewPageActive" 
                    : "ReviewPageInactive"
                } key={i} />
            )
        }
        return content
    }

    return (
        <>
            <div className="ReviewCardSection">
                { renderReviews() }
            </div>
            {reviews.length > 0 &&
            <>
                <div className="ReviewCarousel">
                    <div 
                        className="ReviewPageActive ReviewButtonFlex" 
                        onClick={() => handleReviewPageClick("backward")}
                    >
                        {"<"}
                    </div>
                    {getReviewPages()}
                    <div 
                        className="ReviewPageActive ReviewButtonFlex" 
                        onClick={() => handleReviewPageClick("forward")}
                    >
                        {">"}
                    </div>
                </div>
                <button 
                    className="ViewReviewsButton" 
                    onClick={openReviewModal}
                >
                    View all Reviews
                </button>
            </>
            }
        </>
    )
}

export default ItemReviews
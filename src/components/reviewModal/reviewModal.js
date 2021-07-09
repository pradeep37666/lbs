import React, { useEffect } from 'react';
import './reviewModal.css';
import Star from './../../assets/Icons/StarFilled.png';
import Jake from './../../assets/Images/JakeFriend.png';

export default function ReviewModal(props) {

    const closeModal = () => {
        props.setModal(false);
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return function releaseScroll() {
            document.body.style.overflow = 'unset';
        }
    });

    return (
        <div className="ModalWrapperMain" onClick={ () => {
            closeModal();
        }}>
            <div className="ReviewModalFlex">
                <div className="ReviewModalMain" onClick={(e) => e.stopPropagation()}>
                    <div className="ReviewTitle">All Ratings</div>
                    <div className="ReviewModalColumns">
                        <div className="MainReviewColumn">
                            <div className="RatingLenderFlex">
                                <img src={Jake} alt="" className="ProfileIcon" />
                                <div>
                                    <div className="RatingHeader">Jake Friend</div>
                                    <div className="RatingStarFlex">5/5 <img src={Star} alt="" className="StarIconRating"/></div>
                                </div>
                            </div>
                        </div>



                        <div className="vlReviews" />
                        <div className="MainReviewColumn">reviews</div>

                    </div>
                </div>
            </div>
            

        </div>
    )
}

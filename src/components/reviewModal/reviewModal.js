import React, { useEffect, useState } from 'react';
import './reviewModal.css';
import Jake from './../../assets/Images/JakeFriend.png';
import {ReactComponent as StarOutline} from './../../assets/Icons/StarOutline.svg';
import {ReactComponent as StarFilled} from './../../assets/Icons/StarFilled.svg';
import ItemImage from './../../assets/Images/search_section_bg.jpg';
import CloseIcon from '@material-ui/icons/Close';

export default function ReviewModal(props) {

    const [LenderRating, setLenderRating] = useState(4);
    const Reviews = props.reviews;

    const closeModal = () => {
        props.setModal(false);
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return function releaseScroll() {
            document.body.style.overflow = 'unset';
        }
    });

    const getLenderItemCard = (name, rating) => {
        let content = [];
        content.push(
        <div className="LenderItemFlex" key={rating}>
            <div><img src={ItemImage} alt="" className="LenderItemImage"/></div>
            <div className="LenderItemRatingFlex">
                <div className="LenderItemName">{name}</div>
                <div className="LenderRatingText">{rating}/5
                <div className="LenderItemStars">
                    <img src={rating >= 1 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                    <img src={rating >= 2 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                    <img src={rating >= 3 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                    <img src={rating >= 4 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                    <img src={rating >= 5 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                </div>
                </div>
            </div>
        </div>
        )
        return content;
    }

    const getReviewCards = () => {
        let content = [];
        let hr = <hr className="hl" />;
        for (let i = 0; i < Reviews.length; i++) {
            if (i === Reviews.length -1) hr = '';
            content.push(
                <div key={i}>
                    <div className="RatingLenderFlex">
                        <img src={Jake} alt="" className="ProfileIcon" />
                        <div>
                            <div className="RatingHeader">{Reviews[i][0]}</div>
                            <div className="RatingStarFlex">{Reviews[i][1]}/5 <StarFilled fill='#E9D8B4' className="StarIconRating" /></div>
                        </div>
                    </div>
                    <div className="ReviewText">
                        {Reviews[i][2]}
                    </div>
                {hr}
                {/* add close button */}

                </div>
                
                )
        }
        
        return content;
    }

    return (
        <div className="ModalWrapperMain" onClick={ () => {
            closeModal();
        }}>
            <div className="ReviewModalFlex">
                <div className="ReviewModalMain" onClick={(e) => e.stopPropagation()}>
                    <button className="CloseModalButton ReviewModalClose" onClick={() => closeModal()}><CloseIcon/></button>
                    <div className="ReviewTitle">All Ratings</div>
                    <div className="ReviewModalColumns">
                        <div className="MainLenderColumn">
                            <div className="RatingLenderFlex">
                                <img src={Jake} alt="" className="ProfileIconReview" />
                                <div>
                                    <div className="RatingHeaderReview">Jake Friend</div>
                                    <div className="RatingLenderReview">{LenderRating}/5 </div>
                                </div>
                            </div>
                            <div className="StarsLenderReview">
                            {LenderRating >= 1 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
                            {LenderRating >= 2 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
                            {LenderRating >= 3 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
                            {LenderRating >= 4 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
                            {LenderRating >= 5 ? <StarFilled fill='#E9D8B4' className="StarIcon"/> : <StarOutline className="StarIcon"/>}
                            </div>
                            <div>
                                <div className="LenderItemsHeader">Lender Items</div>
                                {getLenderItemCard('Pull along ATV mower attachment with multiple modes', 4)}
                                <hr className="hl" />
                                {getLenderItemCard('Heavy Duty 1800kg hand pump car jack', 5)}
                            </div>
                        </div>



                        <div className="vl" />
                        <div className="MainReviewColumn">
                            {/* on loop add hr only if not last item */}
                            {getReviewCards()}
                        </div>

                    </div>
                </div>
            </div>
            

        </div>
    )
}

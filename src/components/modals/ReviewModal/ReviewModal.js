import React, { useEffect, useState } from 'react';
import './ReviewModal.css';
import Jake from './../../../assets/Images/JakeFriend.png';
import {ReactComponent as StarOutline} from './../../../assets/Icons/StarOutline.svg';
import {ReactComponent as StarFilled} from './../../../assets/Icons/StarFilled.svg';
import ItemImage from './../../../assets/Images/search_section_bg.jpg';
import CloseIcon from '@material-ui/icons/Close';
import { Avatar, CircularProgress, Slide } from '@material-ui/core';
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import getImage from '../../../util/getImage';
import Instance from '../../../util/axios';
import { CastForEducationSharp } from '@material-ui/icons';
import useGlobalState from '../../../util/useGlobalState';
import { useHistory } from 'react-router';

export default function ReviewModal({ setReviewModalOpen, modalOpen, reviews, item, itemOwner, isUserItem }) {
    const [lenderItems, setLenderItems] = useState([])
    const [lenderItemsLoading, setLenderItemsLoading] = useState(true)
    const { state } = useGlobalState()
    const { user } = state
    const history = useHistory()

    useEffect(() => {
        getLenderItems()
    },[ ])

    const getLenderItems = async () => {
        try{
            const {data, status} = await Instance.get(`/items/findByUid?u_id=${item.u_id}`)
            setLenderItems(data)
        } catch(err) {
            console.log(err)
        } finally{
            setLenderItemsLoading(false)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return function releaseScroll() {
            document.body.style.overflow = 'unset';
        }
    });

    const renderLenderItems = () => {
        return lenderItems.map(( item, index ) => {
            return (
            <div className="LenderItemFlex" key={index} onClick={() => history.push(`/item/${item.i_id}`)}>
                <div><img src={getImage(item.pictures.split(',')[0])} alt="" className="LenderItemImage"/></div>
                <div className="LenderItemRatingFlex">
                    <div className="LenderItemName">{item.title}</div>
                    <div className="LenderRatingText">{item.rating}/5
                    <div className="LenderItemStars">
                        <img src={item.rating >= 1 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                        {item.rating >= 1 ? <StarFilled /> : <StarOutline />}
                        <img src={item.rating >= 2 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                        <img src={item.rating >= 3 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                        <img src={item.rating >= 4 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                        <img src={item.rating >= 5 ? StarFilled : StarOutline} alt="" className="StarIcon" />
                    </div>
                    </div>
                </div>
            </div>)
        })
    }

    const renderReviews = () => {
        return reviews.map((review, index) => {
            console.log(review)
            return (
                <div 
                className="ReviewModalReviewCard"
                key={index} 
                style={{ borderBottom: (index < reviews.length -1) ? '1px solid rgba(51, 56, 79, 0.3)' : null, marginTop: index !== 0 ? '1rem' : 0 }}>
                    <div className="RatingLenderFlex">
                        <Avatar src={review?.avatar ? getImage(review.avatar) : MissingProfile} alt="" className="ProfileIcon" />
                        <div>
                            <div className="RatingHeader">{review.fullName}</div>
                            <div className="RatingStarFlex">{review.rating}/5 <StarFilled fill='#E9D8B4' className="StarIconRating" /></div>
                        </div>
                    </div>
                    <div className="ReviewText">
                        {review.content}
                    </div>
                </div>
            )
        })
    }
    
    const getOwnerImage = () => {
        if (isUserItem && user?.avatar) {
            return getImage(user.avatar)
        }
        if (itemOwner?.avatar) {
            return getImage(itemOwner.avatar)
        }
        return MissingProfile
    }

    const lenderRating = isUserItem ? user.lender_rating : itemOwner.rating
    return (
        <div className="ModalWrapperMain" onClick={() => setReviewModalOpen(false)}>
            <div className="ReviewModalFlex">
                <Slide in={modalOpen} mountOnEnter unmountOnExit direction="down" timeout={500}>
                    <div className="ReviewModalMain" onClick={(e) => e.stopPropagation()}>
                        <button className="CloseModalButton ReviewModalClose" onClick={() => setReviewModalOpen(false)}><CloseIcon /></button>
                        <div className="ReviewTitle">Ratings for: {item.title}</div>
                        <div className="ReviewModalColumns">
                            <div className="MainLenderColumn">
                                <div className="RatingLenderFlex">
                                    <Avatar style={{ height: 60, width: 60 }} src={getOwnerImage()} alt="" className="ProfileIconReview" />
                                    <div>
                                        <div className="RatingHeaderReview">{isUserItem ? `${user.firstName} ${user.lastName}` : `${itemOwner.firstName} ${itemOwner.lastName}`}</div>
                                        <div className="RatingLenderReview">{lenderRating}/5 </div>
                                    </div>
                                </div>
                                <div className="StarsLenderReview">
                                    {lenderRating >= 1 ? <StarFilled fill='#E9D8B4' className="StarIcon" /> : <StarOutline className="StarIcon" />}
                                    {lenderRating >= 2 ? <StarFilled fill='#E9D8B4' className="StarIcon" /> : <StarOutline className="StarIcon" />}
                                    {lenderRating >= 3 ? <StarFilled fill='#E9D8B4' className="StarIcon" /> : <StarOutline className="StarIcon" />}
                                    {lenderRating >= 4 ? <StarFilled fill='#E9D8B4' className="StarIcon" /> : <StarOutline className="StarIcon" />}
                                    {lenderRating >= 5 ? <StarFilled fill='#E9D8B4' className="StarIcon" /> : <StarOutline className="StarIcon" />}
                                </div>
                                <div>
                                    <div className="LenderItemsHeader">Lender Items</div>
                                    { lenderItemsLoading ? (
                                        <CircularProgress color="inherit" />
                                    ) : (
                                        renderLenderItems()
                                    )}
                                </div>
                            </div>



                            <div className="vl" />
                            <div className="MainReviewColumn">
                                { renderReviews()}
                            </div>

                        </div>
                    </div>
                </Slide>
            </div>
            

        </div>
    )
}

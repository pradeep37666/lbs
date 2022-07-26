import React, { useEffect, useState } from 'react'
import './ReviewModal.css'
import CloseIcon from '@material-ui/icons/Close'
import { Avatar, CircularProgress, Slide } from '@material-ui/core'
import MissingProfile from '../../../assets/Icons/MissingProfileIcon.png'
import getImage from '../../../util/getImage'
import Instance from '../../../util/axios'
import useGlobalState from '../../../util/useGlobalState'
import { useHistory } from 'react-router'
import RatingFiller from '../../../components/ratingFiller/ratingFiller'

export default function ReviewModal({ 
    setReviewModalOpen, 
    modalOpen, 
    reviews, 
    item, 
    itemOwner, 
    isUserItem 
}) {
    const [ lenderItems, setLenderItems ] = useState([])
    const [ lenderItemsLoading, setLenderItemsLoading ] = useState(true)
    const { state } = useGlobalState()
    const { user } = state
    const history = useHistory()

    useEffect(() => {
        getLenderItems()
    },[ ])

    const getLenderItems = async () => {
        try{
            const {data, status} = await Instance.get(`/users/${user.id}/items`)
            if (status !== 200) return
            setLenderItems(data)
        } catch(err) {
            console.log(err)
        } finally{
            setLenderItemsLoading(false)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return function releaseScroll() {
            document.body.style.overflow = 'unset'
        }
    },[])

    const renderLenderItems = () => {
        return lenderItems?.map(( item, index ) => {
            return (
                <div 
                    className="LenderItemFlex" 
                    key={index} 
                    onClick={() => {
                        history.push(`/item/${item.id}`)
                        setReviewModalOpen(false)
                    }}
                >
                    <div>
                        <img 
                            src={getImage(item.images[0].imageKey)} 
                            alt="" 
                            className="LenderItemImage"
                        />
                    </div>
                    <div className="LenderItemRatingFlex">
                        <div className="LenderItemName">{item.title}</div>
                        <div className="LenderRatingText">
                            {item.rating}/5
                            <RatingFiller rating={item.rating}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const renderReviews = () => {
        return reviews?.map((review, index) => {
            return (
                <div 
                    className="ReviewModalReviewCard"
                    key={index} 
                    style={{ borderBottom: (index < reviews.length -1) ? '1px solid rgba(51, 56, 79, 0.3)' : null, marginTop: index !== 0 ? '1rem' : 0 }}
                >
                    <div className="RatingLenderFlex">
                        <img 
                            src={review?.user?.avatar ? getImage(review.user.avatar) : MissingProfile} 
                            alt="" 
                            className="ProductIcon" 
                        />
                        <div className='RatingDetailContainer'>
                            <div className="RatingHeader">
                                {review?.user?.firstName} {review?.user?.lastName}
                            </div>
                            <div className="ItemLenderRating">
                                {review.rating}/5 
                                <RatingFiller rating={review.rating} />
                            </div>
                        </div>
                    </div>
                    <div className="ReviewText">
                        {review.comment}
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
                                            <div className="ReviewRatingTitle">
                                                {lenderRating}/5 
                                                <RatingFiller rating={lenderRating}/>
                                            </div>
                                        </div>
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
                                { renderReviews() }
                            </div>
                        </div>
                    </div>
                </Slide>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/pageWrapper/pageWrapper.js';
import ReviewCard from '../../components/reviewCard/reviewCard.js';
import ItemImageModal from '../../components/itemImagesModal/imagesModal.js';
import ItemReviewModal from '../../components/reviewModal/reviewModal.js';
import './item.css';
import Location from './../../assets/Icons/LocationIcon.svg';
import Delivery from './../../assets/Icons/DeliveryIcon.svg';
import Category from './../../assets/Icons/CategoriesIcon.svg';
import { ReactComponent as Profile } from './../../assets/Icons/UserCircle.svg';
import Calendar from './../../assets/Icons/HangingCalendar.svg';
import Geocode from 'react-geocode'

import { ReactComponent as StarFilled } from './../../assets/Icons/StarFilled.svg';
import { Link } from 'react-router-dom';
import { StarOutline } from '@material-ui/icons';

import GoogleMapReact from 'google-map-react';
import Instance from '../../util/axios';
import { useParams, useLocation, useHistory } from 'react-router';
import useGlobalState from "../../util/useGlobalState"
import CircularProgress from '@material-ui/core/CircularProgress';
import ApplicationModal from '../../components/applicationModal/ApplicationModal'
import getImage from '../../util/getImage.js';

import { Avatar } from '@material-ui/core';
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'

import { isMobile } from 'react-device-detect'

export default function Item() {
    const { state } = useGlobalState()
    const { user } = state
    // Pass in number of reviews from backend for use in review carousel + modal
    const params = useParams();
    const location = useLocation()
    const [modalVisible, setModalVisible] = useState()
    const [item, setItem] = useState();
    const [itemPictures, setItemPictures] = useState([])
    const [favourited, setFavourited] = useState(false)
    const [isUserItem, setIsUserItem] = useState(false)
    const [itemOwner, setItemOwner] = useState(null)
    const [loading, setLoading] = useState(true);
    const [approx, setApprox] = useState(null)
    const history = useHistory()

    const reviewSamples = [
        ['Blake Dude', '4', 'Cillum nulla cupidatat aute pariatur ad sit tempor consectetur amet culpa labore deserunt sunt. Veniam eiusmod sunt incididunt ullamco fugiat reprehenderit labore. Ipsum irure culpa veniam velit. Elit dolore cillum nulla nulla do nulla Lorem ullamco.'],
        ['Jake Friend', '3', 'Id sunt laboris ad adipisicing ullamco id elit deserunt deserunt ullamco aute enim tempor tempor.'],
        ['Angela Owen', '4', 'Dolor ea consectetur eiusmod id pariatur nisi magna minim nostrud et est exercitation ipsum laboris.'],
        ['Lara Nichols', '5', 'Ex aute do adipisicing proident adipisicing occaecat officia.'],
        ['Sam Stuart', '1', 'Et proident consectetur mollit laborum ut aliquip voluptate laborum nostrud reprehenderit quis. Ad ex minim aliquip amet irure nostrud labore anim do ipsum aliquip ut consequat commodo. Dolor commodo veniam velit cupidatat deserunt irure aute consectetur consequat.'],
        ['Isaac Myers', '2', 'Enim aute incididunt proident Lorem id mollit. Occaecat do cillum magna sunt dolore non exercitation et anim enim. Et nulla nulla aute sint minim laborum ut cupidatat nulla fugiat aliqua laboris exercitation mollit. Labore consectetur culpa laboris fugiat velit eu laborum proident consectetur. Eu labore nisi velit velit irure laborum.'],
        ['Christian Zhou', '5', 'Minim pariatur occaecat Lorem et ea elit reprehenderit sunt commodo ex.'],
    ]

    useEffect(() => {
        // update modal state if navigated to this screen after creating a booking
        const bookingCreated = location.state?.bookingCreated
        if (bookingCreated) setModalVisible(true)

        // Find the item with the id used in the link
        if (user) {
            Instance.get(`/items/findByIid/?i_id=${params.itemId}&u_id=${user.id}`)
                .then((response) => {
                    setItem(response.data.item);
                    setLoading(false);
                    setFavourited(response.data.liked)
                    console.log(response)
                    // Split picture string into an array and save
                    setItemPictures(response.data.item.pictures.split(','))
                    // Check if user owns the item
                    if (!user || (response.data.item.u_id !== user.id)) {
                        getItemOwner(response.data.item)
                        return
                    }
                    setIsUserItem(true)
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        } else {
            Instance.get(`/items/findByIid/?i_id=${params.itemId}`)
                .then((response) => {
                    setItem(response.data.item)
                    setLoading(false)
                    setItemPictures(response.data.item.pictures.split(','))
                })
                .catch((error) => {
                    // handle error
                    console.log(error)
                })
        }

        

    }, [params.itemId]);

    useEffect(() => {
        if (item && item.suburb) {
            Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
            Geocode.setLanguage('en')
            Geocode.setRegion('au')
            Geocode.setLocationType('ROOFTOP')
            Geocode.enableDebug(false)
    
            Geocode.fromAddress(item.suburb)
                .then((response) => {
                    console.log(response)
                    setApprox({
                        center: {
                            lat: response.results[0].geometry.location.lat,
                            lng: response.results[0].geometry.location.lng
                        }
                    })
                })
                .catch((error) => {
                    console.log(error.response)
                    alert('There was an issue processing this address, please try again')
                })
        }
        
    }, [item])

    const getItemOwner = async (item) => {
        setIsUserItem(false)

        const { data, status } = await Instance.get(`user/getOneUser?id=${item.u_id}`)
        console.log('get one user', data)
        setItemOwner(data)

    }

    const NumReviewPages = Math.ceil(reviewSamples.length / 2)

    const [ReviewPage, setReviewPage] = useState(1)
    const [ImageModal, setImageModal] = useState(false)
    const [ReviewModal, setReviewModal] = useState(false)

    const getReviewPages = () => {

        let content = []
        for (let i = 1; i < NumReviewPages + 1; i++) {
            content.push(<div className={(ReviewPage === i) ? "ReviewPageActive" : "ReviewPageInactive"} key={i} />);
        }
        return content;
    }

    const handleReviewPageClick = (direction) => {
        if (direction === "forward") {
            (ReviewPage === NumReviewPages) ? setReviewPage(1) : setReviewPage(ReviewPage + 1);
        } else {
            (ReviewPage === 1) ? setReviewPage(NumReviewPages) : setReviewPage(ReviewPage - 1);
        }
    }
    const handleFavourite = () => {
        console.log("posted favourite item ", item)
        console.log("favourited", favourited)
        if (!favourited) {
            Instance.post(`/liked/save`, { i_id: item.i_id })
                .then((data) => {
                    setFavourited(true)
                })
                .catch((e) => { console.log(e) })

        }
        else {
            Instance.delete(`/liked/delete/?i_id=${item.i_id}`)
                .then((data) => {
                    // console.log("delet like res ",data)
                    setFavourited(false)
                })
                .catch((e) => { console.log(e) })
        }
    }

    const getReviews = () => {
        let content = [];
        let currentReviews = [];
        currentReviews.push(reviewSamples[ReviewPage * 2 - 2]);
        //if we're on the last page
        if (ReviewPage === NumReviewPages) {
            //check if the number of reviews is even, if so there will be 2 on last page
            if (reviewSamples.length % 2 === 0) currentReviews.push(reviewSamples[ReviewPage * 2 - 1]);
        } else {
            currentReviews.push(reviewSamples[ReviewPage * 2 - 1]);
        }
        currentReviews.map((review, i) => {
            content.push(<ReviewCard posterName={review[0]} rating={review[1]} reviewText={review[2]} key={i} />);
            return 0;
        });
        return content;
    }

    const defaultProps = {
        center: {
            lat: -27.481009,
            lng: 153.040596
        },
        zoom: 15
    };

    const handleModalClick = () => {
        setModalVisible()
    }

    const handleItemImage = () => {
        if (isUserItem && user?.avatar) {
            return getImage(user.avatar)
        }
        if (itemOwner?.avatar) {
            return getImage(itemOwner.avatar)
        }
        return MissingProfile
    }

    console.log('owner', itemOwner)
    return (
        <PageWrapper>
            {ImageModal ? <ItemImageModal setModal={setImageModal} images={itemPictures} modal={ImageModal} /> : ''}
            {ReviewModal ? <ItemReviewModal setModal={setReviewModal} modal={ReviewModal} reviews={reviewSamples} /> : ''}
            {loading ? <div className="ItemPage__Loading__Container"><CircularProgress size={75} /></div>

                :
                <div className="ItemMainWrapper">
                    {modalVisible && <ApplicationModal item={item} onClick={handleModalClick} />}
                    <div className="ItemInfoWrapper">
                        <div className="ItemName">{item.title}</div>

                        <div className="ItemPriceFlex">
                            <div className="ItemPriceTextBig">${item.price}</div>
                            {item.discount > 0 ?
                                <div className="ItemRateDiscountFlex">
                                    <div className="ItemDiscountText">{item.discount}% off peak discount</div>
                                </div>
                                : ''}

                        </div>
                        <div className="LocationDeliveryCategory">
                            <div className="LDCIconContainer"><img src={Location} alt="" className="LDCIcon" /></div>
                            {item.suburb}
                        </div>
                        <div className="LocationDeliveryCategory">
                            <div className="LDCIconContainer"><img src={Delivery} alt="" className="LDCIcon" style={{ height: '22px' }} /></div>
                            {item.deliveryPrice > 0 ? 'Delivery Available' : 'Pickup only'}&nbsp;<span className={`${item.deliveryPrice > 0 ? '' : 'Hide'}`}>/</span><span className={`DeliveryFeeText ${item.deliveryPrice > 0 ? '' : 'Hide'}`}>&nbsp;${item.deliveryPrice} Delivery Fee</span>
                        </div>
                        <div className="LocationDeliveryCategory">
                            <div className="LDCIconContainer"><img src={Category} alt="" className="LDCIcon" /></div>
                            {item.category}
                        </div>
                        
                        {(user && user.id === item.u_id) ?
                            <button class="editButton">
                                Edit Item Details
                            </button>
                            :
                            <div className="ItemButtons">
                                <button className="ButtonAvailability"><div className="ItemButtonFlex"><img src={Calendar} alt="" />Availability</div></button>
                                
                                    <button 
                                    onClick={() => history.push(`/item/${params.itemId}/application`)}
                                    className="ButtonApply">
                                        <div className="ItemButtonFlex">
                                            <Profile fill='#ffffff' />
                                            Apply Now
                                        </div>
                                    </button>
                                

                                <button className="ButtonFavourite" onClick={handleFavourite} style={{ padding: '.5em 1em' }}>{favourited ? <StarFilled fill='#ffffff' /> : <StarOutline fill='#ffffff' />}</button>
                            </div>

                        }

                        <hr className="hr" />

                        <div className="ItemDetailsHeader">Description</div>

                        <div>
                            {item.description}
                        </div>

                        <hr className="hr" />

                        <div className="ItemDetailsHeader">
                            Ratings
                        </div>

                        <div className="ProductRatingRow">
                            <div>
                                <div className="RatingHeader">Product</div>
                                <div className="RatingStarFlex">{item.rating}/5 <StarFilled fill='#e9d8b4' className="StarIconRating" /></div>
                            </div>
                            <div className="RatingLenderFlex">
                                <Avatar src={handleItemImage()} alt="" className="ProfileIcon" />
                                <div>
                                    <div className="RatingHeader">{isUserItem ? user.fullName : itemOwner ? itemOwner.fullName : ''}</div>
                                    <div className="RatingStarFlex">{isUserItem ? user.lender_rating : itemOwner && itemOwner.lender_rating}/5 <StarFilled fill='#e9d8b4' className="StarIconRating" /></div>

                                </div>
                            </div>
                        </div>

                        <div className="ReviewCardSection">
                            {getReviews()}
                        </div>

                        {/* Carousel Selector */}
                        <div className="ReviewCarousel">
                            <div className="ReviewPageActive ReviewButtonFlex" onClick={() => handleReviewPageClick("backward")}>{"<"}</div>
                            {getReviewPages()}
                            <div className="ReviewPageActive ReviewButtonFlex" onClick={() => handleReviewPageClick("forward")}>{">"}</div>
                        </div>

                        <button className="ViewReviewsButton" onClick={() => setReviewModal(true)}>View all Reviews</button>

                        <hr className='hr' />
                        { isMobile && 
                        <>
                            <div className="ItemDetailsHeader">Location</div>
                            <div className="MapContainer">
                                {approx &&
                                <GoogleMapReact
                                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                                center={approx ? approx.center : defaultProps.center}
                                zoom={defaultProps.zoom}
                                onGoogleApiLoaded={({ map, maps }) => 
                                new maps.Circle({
                                    strokeColor: '#03a5fc',
                                    strokeOpacity: 0.8,
                                    strokeWeight: 2,
                                    fillColor: '#03a5fc',
                                    fillOpacity: 0.3,
                                    map,
                                    center: approx.center,
                                    radius: 600,
                                })} />
                                }
                            </div>
                            <div className="PickupLocationText">Pickup location around {item.suburb}</div>
                            <div className="PickupLocationTextLight">Enquire about the item to acquire location</div>
                        </>}
                    </div>

                    <div className="ItemPicturesWrapper">
                        <img src={getImage(itemPictures[0])} alt="" className="MainItemImage " />
                        <div className="SecondaryImageFlexContainer">
                            {itemPictures[1] &&
                                <div className="SecondaryItemImageDiv ImageModalDiv">
                                    <img src={getImage(itemPictures[1])} alt="" className="SecondaryItemImage" style={{ borderRadius: "0 0 0 15px" }} />
                                    { !itemPictures[2] &&
                                    <div className="NavyOverlay">
                                        <button className="ImageModalButton" onClick={() => setImageModal(true)}>View All</button>
                                    </div>}
                                </div>
                            }
                            {itemPictures[2] &&
                                <div className="SecondaryItemImageDiv ImageModalDiv">
                                    <img src={getImage(itemPictures[2])} alt="" className="SecondaryItemImage OpenModalImage" style={{ borderRadius: "0 0 15px 0" }} />
                                    {itemPictures[3] &&
                                        <div className="NavyOverlay">
                                            <button className="ImageModalButton" onClick={() => setImageModal(true)}>View All</button>
                                        </div>
                                    }
                                </div>
                            }
                        </div>

                       { !isMobile && 
                        <>
                            <div className="ItemDetailsHeader">Location</div>
                            <div className="MapContainer">
                                {approx &&
                                <GoogleMapReact
                                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                                center={approx ? approx.center : defaultProps.center}
                                zoom={defaultProps.zoom}
                                onGoogleApiLoaded={({ map, maps }) => 
                                new maps.Circle({
                                    strokeColor: '#03a5fc',
                                    strokeOpacity: 0.8,
                                    strokeWeight: 2,
                                    fillColor: '#03a5fc',
                                    fillOpacity: 0.3,
                                    map,
                                    center: approx.center,
                                    radius: 600,
                                })} />
                                }
                            </div>
                            <div className="PickupLocationText">Pickup location around {item.suburb}</div>
                            <div className="PickupLocationTextLight">Enquire about the item to acquire location</div>
                        </>}
                    </div>
                </div>
            }
        </PageWrapper>
    )
}

import React, { useState, useEffect } from 'react';
import PageWrapper from '../../components/pageWrapper/pageWrapper.js';
import ReviewCard from '../../components/reviewCard/reviewCard.js';
import ItemImageModal from '../../components/itemImagesModal/imagesModal.js';
import ItemReviewModal from '../../components/modals/ReviewModal/ReviewModal.js';
import './item.css';
import Location from './../../assets/Icons/LocationIcon.svg';
import Delivery from './../../assets/Icons/DeliveryIcon.svg';
import Category from './../../assets/Icons/CategoriesIcon.svg';
import { ReactComponent as Profile } from './../../assets/Icons/UserCircle.svg';
import Calendar from './../../assets/Icons/HangingCalendar.svg';
import Geocode from 'react-geocode'

import { ReactComponent as StarFilled } from './../../assets/Icons/StarFilled.svg';
// import { StarOutline } from '@material-ui/icons';
import StarOutline from '../../assets/Icons/StarOutline.js';

import GoogleMapReact from 'google-map-react';
import Instance from '../../util/axios';
import { useParams, useLocation, useHistory } from 'react-router';
import useGlobalState from "../../util/useGlobalState"
import CircularProgress from '@material-ui/core/CircularProgress';
import ApplicationModal from '../../components/applicationModal/ApplicationModal'
import getImage from '../../util/getImage.js';
import NoContent2 from '../../assets/Images/NoContent2.png'
import { Avatar } from '@material-ui/core';
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'

import { isMobile } from 'react-device-detect'
import AvailabilityModal from '../../components/AvailabilityModal/AvailabilityModal.js';
import NoReviews from '../../components/NoReviews/NoReviews.js';

export default function Item() {
    const { state } = useGlobalState()
    const { user } = state
    const params = useParams();
    const location = useLocation()
    const history = useHistory()

    const [modalVisible, setModalVisible] = useState(false)
    const [item, setItem] = useState();
    const [itemPictures, setItemPictures] = useState([])
    const [favourited, setFavourited] = useState(false)
    const [isUserItem, setIsUserItem] = useState(false)
    const [itemOwner, setItemOwner] = useState(null)
    const [loading, setLoading] = useState(true);
    const [approx, setApprox] = useState(null)
    const [reviewPage, setReviewPage] = useState(0)
    const [ImageModal, setImageModal] = useState(false)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [reviews, setReviews] = useState([])
    const [availabilityModalVisible, setAvailabilityModalVisible] = useState(false)
    const [availability, setAvailability] = useState()

    useEffect(() => {
        // update modal state if navigated to this screen after creating a booking
        const bookingCreated = location.state?.bookingCreated
        if (bookingCreated) setModalVisible(true)

        // Find the item with the id used in the link
        if (user) {
            Instance.get(`/items/findByIid/?i_id=${params.itemId}&u_id=${user.id}`)
                .then((response) => {
                    setItem(response.data.item);
                    setAvailability(response.data.yearAvailability)
                    setLoading(false);
                    setFavourited(response.data.liked)
                    getItemReviews(response.data.item.i_id)
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
                    console.log(error);
                })
        } else {
            Instance.get(`/items/findByIid/?i_id=${params.itemId}`)
                .then((response) => {
                    setItem(response.data.item)
                    setAvailability(response.data.yearAvailability)
                    setLoading(false)
                    getItemOwner(response.data.item)
                    setItemPictures(response.data.item.pictures.split(','))
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [params.itemId]);

    const getItemReviews = async (id) => {
        try{
            const { data, status } = await Instance.get(`/comments/findByIid?i_id=${id}`)
            console.log(data)
            setReviews(data)
        } catch(err){
            console.log(err)
        }
    }

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
        setItemOwner(data)

    }

    const NumReviewPages = Math.ceil(reviews.length / 2)

    const getReviewPages = () => {
        let content = []
        for (let i = 0; i < NumReviewPages; i++) {
            content.push(<div className={(reviewPage === i) ? "ReviewPageActive" : "ReviewPageInactive"} key={i} />);
        }
        return content;
    }

    const handleReviewPageClick = (direction) => {
        if (direction === "forward") {
            (reviewPage === NumReviewPages - 1) ? setReviewPage(0) : setReviewPage(reviewPage + 1);
        } else {
            (reviewPage === 0) ? setReviewPage(NumReviewPages - 1) : setReviewPage(reviewPage - 1);
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

    const renderReviews = () => {
        const visibleReviews = reviews.slice(reviewPage * 2, (reviewPage * 2) + 2)
        if(visibleReviews.length === 0){
            return <NoReviews />
        }
        return visibleReviews.map((review, index) => {
            return <ReviewCard review={review} key={index} />
        })
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
    //------------------Temporary Function-------------//
    const handleEdit =()=>{
        let string =''
        string = string.concat('i_id='+item.i_id)
        // string = string.concat('&u_id='+item.u_id)
        
        history.push(`/item/edit/${string}`)
        console.log(JSON.stringify(item, null,'\t'))
    }
    //-------------------------------------------------//
    console.log('item owner', itemOwner)
    return (
        <PageWrapper>
            {ImageModal && <ItemImageModal setModal={setImageModal} images={itemPictures} modal={ImageModal} /> }
            {reviewModalOpen && 
            <ItemReviewModal 
            setReviewModalOpen={setReviewModalOpen} 
            modalOpen={reviewModalOpen} 
            reviews={reviews} 
            item={item}
            isUserItem={isUserItem}
            itemOwner={itemOwner}
            />}
            { availabilityModalVisible && item && 
            <AvailabilityModal 
            item={item}
            onClick={() => setAvailabilityModalVisible(false)}
            availability={availability}
            />}
            {loading ? <div className="ItemPage__Loading__Container"><CircularProgress size={75} /></div>

                :
                <div className="ItemMainWrapper">
                    <ApplicationModal item={item} onClick={handleModalClick} open={modalVisible} />
                    <div className="ItemInfoWrapper">
                        <div className="ItemName">{item.title}</div>

                        <div className="ItemPriceFlex">
                            <div className="ItemPriceTextBig">${item.price}</div>
                         
                            <div className="ItemRateDiscountFlex">
                                <div className="ItemPerSlotText">Per Slot</div>
                                { item.discount > 0 &&<div className="ItemDiscountText">{item.discount}% off peak discount</div>}
                            </div>
                               

                        </div>
                        <div className="LocationDeliveryCategory" style={{ marginTop: '0.6rem' }}>
                            <div className="LDCIconContainer" style={{ paddingLeft: 6}}>
                                <img src={Location} alt="" className="LDCIcon" />
                            </div>
                            {item.suburb}
                        </div>
                        <div className="LocationDeliveryCategory">
                            <div className="LDCIconContainer">
                                <img src={Delivery} alt="" className="LDCIcon" style={{ height: '22px' }} />
                            </div>
                            {item.deliveryPrice > 0 ? 'Delivery Available' : 'Pickup only'}&nbsp;<span className={`${item.deliveryPrice > 0 ? '' : 'Hide'}`}>/</span><span className={`DeliveryFeeText ${item.deliveryPrice > 0 ? '' : 'Hide'}`}>&nbsp;${item.deliveryPrice} Delivery Fee</span>
                        </div>
                        <div className="LocationDeliveryCategory">
                            <div className="LDCIconContainer">
                                <img src={Category} alt="" className="LDCIcon" />
                            </div>
                            {item.category}
                        </div>
                        
                        {(user && user.id === item.u_id) ?
                            <button className="editButton" onClick={()=>{
                             
                                handleEdit();
                                
                                }}>
                                Edit Item Details
                            </button>
                            :
                            <div className="ItemButtons">
                                <button className="ButtonAvailability" onClick={() => setAvailabilityModalVisible(true)}>
                                    <div className="ItemButtonFlex">
                                        <img src={Calendar} alt="" style={{ marginRight: '0.5em'}}/>
                                        Availability
                                    </div>
                                </button>
                                
                                <button 
                                onClick={() => history.push(`/item/${params.itemId}/application`)}
                                className="ButtonApply">
                                    <div className="ItemButtonFlex">
                                        <Profile fill='#ffffff' />
                                        Apply Now
                                    </div>
                                </button>
                                <button className="ButtonFavourite" onClick={handleFavourite} style={{ padding: '.5em 1em' }}>
                                    {favourited ? <StarFilled fill='#ffffff' /> : <StarOutline fill='#fff' />}
                                </button>
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
                                    <div className="RatingHeader">{isUserItem ? `${user.firstName} ${user.lastName}` : itemOwner ? `${itemOwner.firstName} ${itemOwner.lastName}` : ''}</div>
                                    <div className="RatingStarFlex">{isUserItem ? user.lender_rating : itemOwner && itemOwner.lender_rating}/5 <StarFilled fill='#e9d8b4' className="StarIconRating" /></div>

                                </div>
                            </div>
                        </div>

                        <div className="ReviewCardSection">
                            { renderReviews() }
                        </div>

                        { reviews.length > 0 &&
                            <>
                                <div className="ReviewCarousel">
                                    <div className="ReviewPageActive ReviewButtonFlex" onClick={() => handleReviewPageClick("backward")}>{"<"}</div>
                                    {getReviewPages()}
                                    <div className="ReviewPageActive ReviewButtonFlex" onClick={() => handleReviewPageClick("forward")}>{">"}</div>
                                </div>
                                <button className="ViewReviewsButton" onClick={() => setReviewModalOpen(true)}>View all Reviews</button>
                            </>}

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
                                    radius: 1000,
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

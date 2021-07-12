import React, { useState } from 'react';
import PageWrapper from '../../components/pageWrapper/pageWrapper.js';
import ReviewCard from '../../components/reviewCard/reviewCard.js';
import ItemImageModal from '../../components/itemImagesModal/imagesModal.js';
import ItemReviewModal from '../../components/reviewModal/reviewModal.js';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './item.css';
import Location from './../../assets/Icons/LocationIcon.svg';
import Delivery from './../../assets/Icons/DeliveryIcon.svg';
import Category from './../../assets/Icons/CategoriesIcon.svg';
import {ReactComponent as Profile} from './../../assets/Icons/UserCircle.svg';
import Calendar from './../../assets/Icons/HangingCalendar.svg';
import {ReactComponent as StarOutline} from './../../assets/Icons/StarOutline.svg';
import {ReactComponent as StarFilled} from './../../assets/Icons/StarFilled.svg';
import Jake from './../../assets/Images/JakeFriend.png';
import ItemImage from './../../assets/Images/search_section_bg.jpg';
import GoogleMapReact from 'google-map-react';

export default function Item(props) {
    // const {itemId} = useParams();
    // Pass in number of reviews from backend for use in review carousel + modal
    const reviewSamples = [
        ['Blake Dude', '4', 'Cillum nulla cupidatat aute pariatur ad sit tempor consectetur amet culpa labore deserunt sunt. Veniam eiusmod sunt incididunt ullamco fugiat reprehenderit labore. Ipsum irure culpa veniam velit. Elit dolore cillum nulla nulla do nulla Lorem ullamco.'],
        ['Jake Friend', '3', 'Id sunt laboris ad adipisicing ullamco id elit deserunt deserunt ullamco aute enim tempor tempor.'],
        ['Angela Owen', '4', 'Dolor ea consectetur eiusmod id pariatur nisi magna minim nostrud et est exercitation ipsum laboris.'],
        ['Lara Nichols', '5', 'Ex aute do adipisicing proident adipisicing occaecat officia.'],
        ['Sam Stuart', '1', 'Et proident consectetur mollit laborum ut aliquip voluptate laborum nostrud reprehenderit quis. Ad ex minim aliquip amet irure nostrud labore anim do ipsum aliquip ut consequat commodo. Dolor commodo veniam velit cupidatat deserunt irure aute consectetur consequat.'],
        ['Isaac Myers', '2', 'Enim aute incididunt proident Lorem id mollit. Occaecat do cillum magna sunt dolore non exercitation et anim enim. Et nulla nulla aute sint minim laborum ut cupidatat nulla fugiat aliqua laboris exercitation mollit. Labore consectetur culpa laboris fugiat velit eu laborum proident consectetur. Eu labore nisi velit velit irure laborum.'],
        ['Christian Zhou', '5', 'Minim pariatur occaecat Lorem et ea elit reprehenderit sunt commodo ex.'],
    ]

    const NumReviewPages = Math.ceil(reviewSamples.length /2);

    const [ReviewPage, setReviewPage] = useState(1);
    const [ImageModal, setImageModal] = useState(false);
    const [ReviewModal, setReviewModal] = useState(false);

    const getReviewPages = () => {
        let content = [];
        for (let i = 1; i < NumReviewPages +1; i++) {
          content.push(<div className={(ReviewPage === i) ? "ReviewPageActive" : "ReviewPageInactive"} key={i}/>);
        }
        return content;
      };

    const handleReviewPageClick = (direction) => {
        if (direction === "forward") {
            (ReviewPage === NumReviewPages) ? setReviewPage(1) : setReviewPage(ReviewPage + 1);
        } else {
            (ReviewPage === 1) ? setReviewPage(NumReviewPages) : setReviewPage(ReviewPage - 1);
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
        currentReviews.map( (review, i) => {
            content.push(<ReviewCard posterName={review[0]} rating={review[1]} reviewText={review[2]} key={i}/>);
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

    return (
        <PageWrapper>
            {ImageModal ? <ItemImageModal setModal={setImageModal} /> : ''}
            {ReviewModal ? <ItemReviewModal setModal={setReviewModal} reviews={reviewSamples} /> : ''}
            <div className="ItemMainWrapper">
                <div className="ItemInfoWrapper">
                    <div className="ItemName">Pump jack and 2 jack stands combo</div>

                    <div className="ItemPriceFlex">
                        <div className="ItemPriceTextBig">$25</div>
                        <div className="ItemRateDiscountFlex">
                            {/* <div className="ItemRateTextBig">Per Day</div> */}
                            <div className="ItemDiscountText">15% off peak discount</div>
                        </div>
                    </div>

                    <div className="LocationDeliveryCategory">
                        <div className="LDCIconContainer"><img src={Location} alt="" className="LDCIcon"/></div>South Brisbane</div>
                    <div className="LocationDeliveryCategory"><div className="LDCIconContainer"><img src={Delivery} alt="" className="LDCIcon" style={{height: '22px'}}/></div> Delivery Available&nbsp;/<span className="DeliveryFeeText">&nbsp;$10 Delivery Fee</span></div>
                    <div className="LocationDeliveryCategory"><div className="LDCIconContainer"><img src={Category} alt="" className="LDCIcon"/></div>Automotive</div>

                    <div className="ItemButtons">
                        <button className="ButtonAvailability"><div className="ItemButtonFlex"><img src={Calendar} alt=""/>Availability</div></button>
                        <button className="ButtonApply"><div className="ItemButtonFlex"><Profile fill='#ffffff'/>Apply Now</div></button>
                        <button className="ButtonFavourite"><StarOutline fill='#ffffff'/></button>
                    </div>
                    <hr className="hr"/>

                    <div>
                        <div className="ItemDetailsHeader">Item Details</div>
                        <div className="ItemDetailsFlex">Brand <div>SCA</div></div>
                        <div className="ItemDetailsFlex">Build Date <div>2018</div></div>
                        <div className="ItemDetailsFlex">Condition <div>Fair</div></div>
                        <div className="ItemDetailsFlex">Strength <div>Heavy Duty</div></div>
                    </div>

                    <hr className="hr"/>

                    <div className="ItemDetailsHeader">Description</div>

                    <div>
                        Excepteur laboris non labore dolor proident ex culpa sit anim eu exercitation quis magna. Commodo enim ex veniam duis culpa enim nulla amet labore eiusmod nisi nisi ut amet. Aliquip est nulla ea ut reprehenderit voluptate commodo tempor. Et dolor est deserunt cupidatat cupidatat anim labore do qui in deserunt. Nisi aute velit non laborum anim eiusmod sunt consectetur et veniam.

                        Voluptate amet dolore excepteur amet exercitation veniam sit dolore in et. Amet laboris in eu exercitation incididunt deserunt esse reprehenderit. Minim dolore aliquip laboris officia nisi enim aliqua nulla quis officia adipisicing aliqua culpa.

                        Nisi ut laboris aliquip eu id. Commodo fugiat enim nisi quis. Voluptate non nostrud veniam tempor fugiat veniam cillum quis aute cupidatat dolore velit. Anim est veniam occaecat dolore duis voluptate officia cupidatat. Officia nostrud exercitation in irure laborum. Est amet ex voluptate aliquip anim dolor ea cillum.
                    </div>

                    <hr className="hr"/>

                    <div className="ItemDetailsHeader">
                        Ratings
                    </div>

                    <div className="ProductRatingRow">
                        <div>
                            <div className="RatingHeader">Product</div>
                            <div className="RatingStarFlex">4.5/5 <StarFilled fill='#e9d8b4' className="StarIconRating"/></div>
                        </div>
                        <div className="RatingLenderFlex">
                            <img src={Jake} alt="" className="ProfileIcon" />
                            <div>
                                <div className="RatingHeader">Jake Friend</div>
                                <div className="RatingStarFlex">5/5 <StarFilled fill='#e9d8b4' className="StarIconRating"/></div>
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

                    <hr className='hr'/>


                </div>

                <div className="ItemPicturesWrapper">
                    <img src={ItemImage} alt="" className="MainItemImage"/>
                    <div className="SecondaryImageFlexContainer">
                        <div className="SecondaryItemImageDiv">
                            <img src={ItemImage} alt="" className="SecondaryItemImage" style={{borderRadius: "0 0 0 15px"}}/>
                        </div>
                        <div className="SecondaryItemImageDiv ImageModalDiv">
                            <img src={ItemImage} alt="" className="SecondaryItemImage OpenModalImage" style={{borderRadius: "0 0 15px 0"}}/>
                            <div className="NavyOverlay"><button className="ImageModalButton" onClick={() => setImageModal(true)}>View All</button></div>
                        </div>
                    </div>

                    <div className="ItemDetailsHeader">Location</div>
                    <div className="MapContainer">
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyB98s0INvtxhs22OxCOEIjE_--kb54qhlQ' }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        >
                        </GoogleMapReact>
                    </div>

                    <div className="PickupLocationText">Pickup location around Kangaroo Point</div>
                    <div className="PickupLocationTextLight">Enquire about the item to acquire location</div>
                </div>

            </div>
        </PageWrapper>
    )
}

import React from 'react';
import PageWrapper from '../../components/pageWrapper/pageWrapper';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './item.css';
import Location from './../../assets/Icons/LocationIcon.png';
import Delivery from './../../assets/Icons/TruckIcon.png';
import Category from './../../assets/Icons/CategoriesIcon.png';
import Profile from './../../assets/Icons/ProfileIcon.png';
import Calendar from './../../assets/Icons/HangingCalendar.png';
import Favourite from './../../assets/Icons/FavouritesIcon.png'

export default function Item(props) {
    // const {itemId} = useParams();

    return (
        <PageWrapper>
        {/* all info to be replaced with props calls once setup */}
            <div className="ItemMainWrapper">
                <div className="ItemInfoWrapper">
                    <div className="ItemName">Pump jack and 2 jack stands combo</div>

                    <div className="ItemPriceFlex">
                        <div className="ItemPriceTextBig">$25</div>
                        <div className="ItemRateDiscountFlex">
                            <div className="ItemRateTextBig">Per Day</div>
                            <div className="ItemDiscountText">15% off peak discount</div>
                        </div>
                    </div>

                    <div className="LocationDeliveryCategory">
                        <div className="LDCIconContainer"><img src={Location} alt="" className="LDCIcon"/></div>South Brisbane</div>
                    <div className="LocationDeliveryCategory"><div className="LDCIconContainer"><img src={Delivery} alt="" className="LDCIcon" style={{height: '22px'}}/></div> Delivery Available&nbsp;/<span className="DeliveryFeeText">&nbsp;$10 Delivery Fee</span></div>
                    <div className="LocationDeliveryCategory"><div className="LDCIconContainer"><img src={Category} alt="" className="LDCIcon"/></div>Automotive</div>

                    <div className="ItemButtons">
                        <button className="ButtonAvailability"><div className="ItemButtonFlex"><img src={Calendar} alt=""/>Availability</div></button>
                        <button className="ButtonApply"><div className="ItemButtonFlex"><img src={Profile} alt=""/>Apply Now</div></button>
                        <button className="ButtonFavourite"><img src={Favourite} alt=""/></button>
                    </div>
                    <hr />

                    <div>
                        Item Details
                        <div>Brand SCA</div>
                        <div>Brand SCA</div>
                        <div>Brand SCA</div>
                        <div>Brand SCA</div>
                    </div>

                    <hr />

                    <div>Description</div>

                    <div>
                        Excepteur laboris non labore dolor proident ex culpa sit anim eu exercitation quis magna. Commodo enim ex veniam duis culpa enim nulla amet labore eiusmod nisi nisi ut amet. Aliquip est nulla ea ut reprehenderit voluptate commodo tempor. Et dolor est deserunt cupidatat cupidatat anim labore do qui in deserunt. Nisi aute velit non laborum anim eiusmod sunt consectetur et veniam.

                        Voluptate amet dolore excepteur amet exercitation veniam sit dolore in et. Amet laboris in eu exercitation incididunt deserunt esse reprehenderit. Minim dolore aliquip laboris officia nisi enim aliqua nulla quis officia adipisicing aliqua culpa.

                        Nisi ut laboris aliquip eu id. Commodo fugiat enim nisi quis. Voluptate non nostrud veniam tempor fugiat veniam cillum quis aute cupidatat dolore velit. Anim est veniam occaecat dolore duis voluptate officia cupidatat. Officia nostrud exercitation in irure laborum. Est amet ex voluptate aliquip anim dolor ea cillum.
                    </div>

                    <hr />

                    <div>
                        Ratings
                    </div>

                    <div>Product Rating Row</div>

                    <div>Review Card</div>


                </div>

                <div className="ItemPicturesWrapper">
                    Item pictures/location goes here
                </div>

            </div>


            {/* Main Item content goes in here, id is: {itemId} */}



        </PageWrapper>
    )
}

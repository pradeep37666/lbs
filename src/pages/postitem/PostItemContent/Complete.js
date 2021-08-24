import React from 'react'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg';
import Mower from '../../../assets/Images/ATVMower.png'
import Location from '../../../assets/Icons/LocationIcon.svg'
import Delivery from '../../../assets/Icons/DeliveryIcon.svg'
import Category from '../../../assets/Icons/CategoriesIcon.svg'
import { useHistory } from 'react-router';

export default function Complete(props) {
    const history = useHistory()

    return (
        <>
            <div className="LoginMain">
                <Logo height='50px' width='50px' style={{ marginBottom: '2em' }} />

                <div className="LoginHeader PostItem__Complete__TextCenter">Item Posted!</div>
                <div className="LoginText LoginTextSmall PostItem__Complete__TextCenter">You have successfully posted your <span className="PostItem__Complete__Bold">‘{props.title}’</span> to Little Big Shed</div>
                <button className="LoginFormButton" onClick={() => history.push({pathname: '/'})} style={{ marginBottom: '1em' }}>Continue</button>
                <button className="LoginFormButton LoginFormButtonInverted" onClick={() => history.go(0)}>List Another Item</button>

            </div>

            <div className="LoginMain LoginMainNoMarg">
                <div className="PostItem__Complete__ItemPreview">
                    <img src={Mower} alt={props.title} className="PostItem__Complete__ItemImage" />
                    {/* <img src={props.picture.preview} alt={props.title} className="PostItem__Complete__ItemImage"/> */}
                </div>
                <div className="PostItem__Complete__ItemDetails__Container">
                    <div className="ItemNameText">{props.title}</div>
                    <div className="ItemPriceText">${props.price}</div>

                    <div className="LocationDeliveryCategory">
                        <div className="LDCIconContainer">
                            <img src={Location} alt="" className="LDCIcon" />
                        </div>
                        {props.city}
                    </div>
                    <div className="LocationDeliveryCategory">
                        <div className="LDCIconContainer">
                            <img src={Delivery} alt="" className="LDCIcon" style={{ height: '22px' }} />
                        </div>
                        <div>
                        {props.delivery > 0 ? 'Delivery Available' : 'Pickup only'}&nbsp;<span className={`${props.delivery > 0 ? '' : 'Hide'}`}>/</span><span className={`DeliveryFeeText ${props.delivery > 0 ? '' : 'Hide'}`}>&nbsp;${props.delivery} Delivery Fee</span>
                        </div>
                        
                    </div>
                    <div className={'LocationDeliveryCategory'}>
                        <div className="LDCIconContainer">
                            <img src={Category} alt="" className="LDCIcon" />
                        </div>
                        {props.category}
                    </div>
                </div>
                {/* Goes to newly made item page soon tm */}
                <button className="LoginFormButton" onClick={() => {
                }} style={{ marginBottom: '1em' }}>See Item</button>

            </div>
        </>
    )
}

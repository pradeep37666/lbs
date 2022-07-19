import React from 'react'
import '../../pages/item/item.css'
import Location from '../../assets/Icons/LocationIcon.svg'
import Delivery from '../../assets/Icons/DeliveryIcon.svg'
import Category from '../../assets/Icons/CategoriesIcon.svg'
import { ReactComponent as Profile } from '../../assets/Icons/UserCircle.svg'
import Calendar from '../../assets/Icons/HangingCalendar.svg'
import StarFilled from '../../assets/Icons/StarFilled'
import StarOutline from '../../assets/Icons/StarOutline'
import useGlobalState from '../../util/useGlobalState'
import { useHistory, useParams } from 'react-router-dom'
import Instance from '../../util/axios'

const ItemInfoSection = ({ 
    item, 
    openAvailabilityModal,
    favourited,
    getItemLikedByUser,
}) => {
    const { user } = useGlobalState()?.state
    const params = useParams()
    const history = useHistory()

    const handleFavourite = async () => {
        try {
            if (!favourited) {
                const { status } = await Instance.post('/likes/', { itemId: item.id })
                if (status !== 201) return
                getItemLikedByUser(item.id)
            } else {
                const { status } = await Instance.delete(`/likes/${favourited}`)
                if (status !== 200) return
                getItemLikedByUser(item.id)
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    
    return (
        <>
            <div className="ItemName">{item.title}</div>

                <div className="ItemPriceFlex">
                    <div className="ItemPriceTextBig">
                        ${item.price}
                    </div>
                    <div className="ItemRateDiscountFlex">
                        <div className="ItemPerSlotText">
                            Per Slot
                        </div>
                        {item.discount > 0 &&
                            <div className="ItemDiscountText">
                                {item.discount}% off peak discount
                            </div>
                        }
                    </div>
                </div>

                <div className="LocationDeliveryCategory" style={{ marginTop: '0.6rem' }}>
                    <div className="LDCIconContainer" style={{ paddingLeft: 6}}>
                        <img src={Location} alt='location' className="LDCIcon" />
                    </div>
                    {item.address.suburb}
                </div>

                <div className="LocationDeliveryCategory">
                    <div className="LDCIconContainer">
                        <img 
                            src={Delivery} 
                            alt='delivary' 
                            className="LDCIcon" 
                            style={{ height: '22px' }} 
                        />
                    </div>
                    {item.deliveryPrice > 0 
                        ? 'Delivery Available' 
                        : 'Pickup only'
                    }&nbsp;
                    <span className={`${item.deliveryPrice > 0 ? '' : 'Hide'}`}>/</span>
                    <span className={`DeliveryFeeText ${item.deliveryPrice > 0 ? '' : 'Hide'}`}>
                        &nbsp;${item.deliveryPrice} Delivery Fee
                    </span>
                </div>

                <div className="LocationDeliveryCategory">
                    <div className="LDCIconContainer">
                        <img src={Category} alt='category' className="LDCIcon" />
                    </div>
                    {item.category}
                </div>

                {(user && user.id === item.userId) 
                ?   <button 
                        className="editButton" 
                        onClick={() => history.push(`/item/edit/${item.id}`)}
                    >
                        Edit Item Details
                    </button>
                :
                    <div className="ItemButtons">
                        <button 
                            className="ButtonAvailability" 
                            onClick={openAvailabilityModal}
                        >
                            <div className="ItemButtonFlex">
                                <img 
                                    src={Calendar} 
                                    alt='calendar' 
                                    style={{ marginRight: '0.5em'}}
                                />
                                Availability
                            </div>
                        </button>
                        <button 
                        onClick={() => history.push(`/item/${params.itemId}/application`)}
                        className="ButtonApply"
                        >
                            <div className="ItemButtonFlex">
                                <Profile fill='#ffffff' />
                                Apply Now
                            </div>
                        </button>
                        <button 
                            className="ButtonFavourite" 
                            onClick={handleFavourite} 
                            style={{ padding: '.5em 1em' }}
                        >
                            {favourited 
                            ? <StarFilled fill='#ffffff' /> 
                            : <StarOutline fill='#ffffff' />
                            }
                        </button>
                    </div>
                }

                <hr className="hr" />
                <div className="ItemDetailsHeader">Description</div>
                <div>
                    {item.description}
                </div>
        </>
    )
}

export default ItemInfoSection
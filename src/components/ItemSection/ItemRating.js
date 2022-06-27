import { Avatar } from '@material-ui/core'
import React from 'react'
import StarFilled from '../../assets/Icons/StarFilled'
import getImage from '../../util/getImage'
import useGlobalState from '../../util/useGlobalState'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'

const ItemRating = ({ 
    item,
    isUserItem,
    itemOwner,
}) => {
    const { user } = useGlobalState().state

    const handleItemImage = () => {
        if (isUserItem && user?.avatar)
            return getImage(user.avatar)
        if (itemOwner?.avatar)
            return getImage(itemOwner.avatar)
        return MissingProfile
    }

    return (
        <>
            <div className="ItemDetailsHeader">
                Ratings
            </div>
            <div className="ProductRatingRow">
                <div>
                    <div className="RatingHeader">Product</div>
                    <div className="RatingStarFlex">
                        {item.rating}/5 
                        <StarFilled fill='#e9d8b4' className="StarIconRating" />
                    </div>
                </div>
                <div className="RatingLenderFlex">
                    <Avatar 
                        src={handleItemImage()} 
                        alt='avatar' 
                        className="ProfileIcon" 
                    />
                    <div>
                        <div className="RatingHeader">
                            {isUserItem 
                                ? `${user.firstName} ${user.lastName}` 
                                : itemOwner 
                                    ? `${itemOwner.firstName} ${itemOwner.lastName}` 
                                    : ''
                            }
                        </div>
                        <div className="RatingStarFlex">
                            {isUserItem 
                                ? user.lender_rating 
                                : itemOwner && itemOwner.lender_rating
                            }/5 
                            <StarFilled fill='#e9d8b4' className="StarIconRating" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemRating
import React from 'react'
import getImage from '../../util/getImage'
import useGlobalState from '../../util/useGlobalState'
import MissingProfile from '../../assets/Icons/MissingProfileIcon.png'
import RatingFiller from '../../components/ratingFiller/ratingFiller'
import { useHistory } from 'react-router'

const ItemRating = ({ item, isUserItem, itemOwner, itemPictures }) => {
  const { user } = useGlobalState().state

  const handleItemImage = () => {
    if (isUserItem && user?.avatar) return getImage(user.avatar)
    if (itemOwner?.avatar) return getImage(itemOwner.avatar)
    return MissingProfile
  }

  const history = useHistory()

  return (
    <>
      <div className='ItemDetailsHeader'>Ratings</div>
      <div className='ProductRatingContainer'>
        <div className='RatingLenderFlex'>
          <img
            src={getImage(itemPictures[0]?.imageKey)}
            alt='product'
            className='ProductIcon'
          />
          <div className='RatingDetailContainer'>
            <div className='RatingHeader'>Product</div>
            <div className='ProductRatings'>
              {item.rating}/5
              <RatingFiller rating={item.rating} />
            </div>
          </div>
        </div>
        <div
          className='RatingLenderFlex cursor-pointer hover:scale-[102%] transition-all duration-300'
          onClick={() => history.push(`/lender-shed/${itemOwner.id}`)}
        >
          <img src={handleItemImage()} alt='avatar' className='ProductIcon' />
          <div className='RatingDetailContainer'>
            <div className='RatingHeader'>
              {isUserItem
                ? `${user.firstName} ${user.lastName}`
                : itemOwner
                ? `${itemOwner.firstName} ${itemOwner.lastName}`
                : ''}
            </div>
            <div className='ItemLenderRating'>
              {isUserItem
                ? user.lender_rating
                : itemOwner && itemOwner.lender_rating}
              /5
              <RatingFiller
                rating={
                  isUserItem
                    ? user.lender_rating
                    : itemOwner && itemOwner.lender_rating
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemRating

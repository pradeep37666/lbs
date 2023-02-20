import React, { useState, useEffect } from 'react'
import './item.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper.js'
import ItemImageModal from '../../components/itemImagesModal/imagesModal.js'
import ItemReviewModal from '../../components/modals/ReviewModal/ReviewModal.js'
import Instance from '../../util/axios'
import { useParams, useLocation } from 'react-router'
import useGlobalState from '../../util/useGlobalState'
import CircularProgress from '@material-ui/core/CircularProgress'
import ApplicationModal from '../../components/modals/ApplicationModal/ApplicationModal'
import { isMobile } from 'react-device-detect'
import AvailabilityModal from '../../components/modals/AvailabilityModal/AvailabilityModal.js'
import ItemInfoSection from '../../components/ItemSection/ItemInfoSection'
import ItemRating from '../../components/ItemSection/ItemRating'
import ItemReviews from '../../components/ItemSection/ItemReviews'
import ItemLocation from '../../components/ItemSection/ItemLocation'
import ItemImages from '../../components/ItemSection/ItemImages'
import ColdChatModal from '../../components/modals/ColdChatModal.js/ColdChatModal'
import ItemService from '../../services/item'

export default function Item() {
  const { user } = useGlobalState()?.state
  const params = useParams()
  const location = useLocation()

  const [modalVisible, setModalVisible] = useState(false)
  const [item, setItem] = useState()
  const [itemPictures, setItemPictures] = useState([])
  const [favourited, setFavourited] = useState('')
  const [isUserItem, setIsUserItem] = useState(false)
  const [itemOwner, setItemOwner] = useState(null)
  const [bookedDates, setBookedDates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [ImageModal, setImageModal] = useState(false)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [reviews, setReviews] = useState([])
  const [isAvailableModalOpen, setIsAvailableModalOpen] = useState(false)
  const [coldChatModalVisible, setColdChatModalVisible] = useState(false)
  const itemService = new ItemService()

  useEffect(() => {
    if (!params.itemId) return
    const bookingCreated = location.state?.bookingCreated
    if (bookingCreated) setModalVisible(true)
    getItemDetailsByUser(params.itemId)
  }, [params.itemId, user])

  const getItemDetailsByUser = async itemId => {
    try {
      await getItemLikedByUser(itemId)
      const data = await itemService.getItem(itemId)
      if (!data) throw Error
      setItem(data)
      getItemReviews(itemId)
      setItemPictures(data.images)
      setIsLoading(false)
      getItemBookings(itemId)
      if (data.userId !== user.id) {
        getItemOwner(data)
        return
      }
      setIsUserItem(true)
    } catch (error) {
      console.log(error.response)
    } finally {
      setIsLoading(false)
    }
  }

  const getItemBookings = async itemId => {
    try {
      const bookingDetails = await itemService.getItemBookedDates(itemId)
      setBookedDates(bookingDetails)
    } catch (error) {
      console.log({ error })
    }
  }

  const getItemLikedByUser = async itemId => {
    const { data } = await Instance.get(`/likes?itemId=${itemId}`)
    if (!data) {
      setFavourited('')
      return
    }
    setFavourited(data.id)
  }

  const getItemReviews = async id => {
    try {
      const { data, status } = await Instance.get(`/items/${id}/ratings`)
      if (status !== 200) return
      setReviews(data)
    } catch (err) {
      console.log(err)
    }
  }

  const getItemOwner = async item => {
    setIsUserItem(false)
    const { data } = await Instance.get(`users/${item.userId}`)
    if (!data) return
    setItemOwner(data)
  }

  return (
    <PageWrapper>
      {ImageModal && (
        <ItemImageModal
          setModal={setImageModal}
          images={itemPictures}
          modal={ImageModal}
        />
      )}
      {reviewModalOpen && (
        <ItemReviewModal
          setReviewModalOpen={setReviewModalOpen}
          modalOpen={reviewModalOpen}
          reviews={reviews}
          item={item}
          isUserItem={isUserItem}
          itemOwner={itemOwner}
        />
      )}
      {isAvailableModalOpen && item && (
        <AvailabilityModal
          item={item}
          setIsVisible={setIsAvailableModalOpen}
          bookedDates={bookedDates}
        />
      )}
      {coldChatModalVisible && (
        <ColdChatModal
          userId={item.userId}
          isOpen={coldChatModalVisible}
          onClick={() => setColdChatModalVisible(false)}
        />
      )}
      {isLoading ? (
        <div className='ItemPage__Loading__Container'>
          <CircularProgress size={75} />
        </div>
      ) : (
        <div className='ItemMainWrapper'>
          <ApplicationModal
            item={item}
            onClick={() => setModalVisible(false)}
            open={modalVisible}
          />
          <div className='ItemInfoWrapper'>
            <ItemInfoSection
              item={item}
              openAvailabilityModal={() => setIsAvailableModalOpen(true)}
              favourited={favourited}
              getItemLikedByUser={getItemLikedByUser}
              setColdChatModalVisible={setColdChatModalVisible}
            />
            <hr className='hr' />
            <ItemRating
              item={item}
              isUserItem={isUserItem}
              itemOwner={itemOwner}
              itemPictures={itemPictures}
            />
            <hr className='hr' />
            <ItemReviews
              reviews={reviews}
              openReviewModal={() => setReviewModalOpen(true)}
            />
            <hr className='hr' />
            {isMobile && <ItemLocation item={item} />}
          </div>
          <div className='ItemPicturesWrapper'>
            <ItemImages
              itemPictures={itemPictures}
              openImageModal={() => setImageModal(true)}
            />
            {!isMobile && <ItemLocation item={item} />}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

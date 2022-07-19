import React, { useState, useEffect } from 'react'
import './item.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper.js'
import ItemImageModal from '../../components/itemImagesModal/imagesModal.js'
import ItemReviewModal from '../../components/modals/ReviewModal/ReviewModal.js'
import Instance from '../../util/axios'
import { useParams, useLocation } from 'react-router'
import useGlobalState from "../../util/useGlobalState"
import CircularProgress from '@material-ui/core/CircularProgress'
import ApplicationModal from '../../components/modals/ApplicationModal/ApplicationModal'
import { isMobile } from 'react-device-detect'
import AvailabilityModal from '../../components/modals/AvailabilityModal/AvailabilityModal.js'
import ItemInfoSection from '../../components/ItemSection/ItemInfoSection'
import ItemRating from '../../components/ItemSection/ItemRating'
import ItemReviews from '../../components/ItemSection/ItemReviews'
import ItemLocation from '../../components/ItemSection/ItemLocation'
import ItemImages from '../../components/ItemSection/ItemImages'

export default function Item() {
    const { user } = useGlobalState()?.state
    const params = useParams()
    const location = useLocation()

    const [ modalVisible, setModalVisible ] = useState(false)
    const [ item, setItem ] = useState()
    const [ itemPictures, setItemPictures ] = useState([])
    const [ favourited, setFavourited ] = useState('')
    const [ isUserItem, setIsUserItem ] = useState(false)
    const [ itemOwner, setItemOwner ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
    const [ ImageModal, setImageModal ] = useState(false)
    const [ reviewModalOpen, setReviewModalOpen ] = useState(false)
    const [ reviews, setReviews ] = useState([])
    const [ availabilityModalVisible, setAvailabilityModalVisible] = useState(false)
    const [ availability, setAvailability ] = useState()

    useEffect(() => {
        if (!params.itemId) return
        const bookingCreated = location.state?.bookingCreated
        if (bookingCreated) setModalVisible(true)
        getItemDetailsByUser(params.itemId)
    }, [params.itemId, user])

    const getItemDetailsByUser = async (itemId) => {
        try {
            await getItemLikedByUser(itemId)
            const { data } = await Instance.get(`items/${itemId}`)
            if (!data) return
            setItem(data)
            setAvailability(data.weekly_availability)
            getItemReviews(itemId)
            setItemPictures(data.images)
            setIsLoading(false)
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

    const getItemLikedByUser = async (itemId) => {
        const { data } = await Instance.get(`likes?itemId=${itemId}`)
        if (!data) {
            setFavourited('')
            return
        }
        setFavourited(data.id)
    }

    const getItemReviews = async (id) => {
        try{
            const { data, status } = await Instance.get(`/items/${id}/ratings`)
            if (status !== 200) return
            setReviews(data)
        } catch(err){
            console.log(err)
        }
    }

    const getItemOwner = async (item) => {
        setIsUserItem(false)
        const { data } = await Instance.get(`users/${item.userId}`)
        if (!data) return
        setItemOwner(data)
    }

    return (
        <PageWrapper>
            {ImageModal && 
                <ItemImageModal 
                    setModal={setImageModal} 
                    images={itemPictures} 
                    modal={ImageModal} 
                /> 
            }
            {reviewModalOpen && 
                <ItemReviewModal 
                    setReviewModalOpen={setReviewModalOpen} 
                    modalOpen={reviewModalOpen} 
                    reviews={reviews} 
                    item={item}
                    isUserItem={isUserItem}
                    itemOwner={itemOwner}
                />
            }
            {availabilityModalVisible && item && 
                <AvailabilityModal 
                    item={item}
                    onClick={() => setAvailabilityModalVisible(false)}
                    availability={availability}
                />
            }
            {isLoading 
            ?   <div className="ItemPage__Loading__Container">
                    <CircularProgress size={75} />
                </div>
            :   <div className="ItemMainWrapper">
                    <ApplicationModal 
                        item={item} 
                        onClick={() => setModalVisible(false)} 
                        open={modalVisible} 
                    />
                    <div className="ItemInfoWrapper">
                        <ItemInfoSection 
                            item={item}
                            openAvailabilityModal={() => setAvailabilityModalVisible(true)}
                            favourited={favourited}
                            getItemLikedByUser={getItemLikedByUser}
                        />
                        <hr className="hr" />
                        <ItemRating 
                            item={item}
                            isUserItem={isUserItem}
                            itemOwner={itemOwner}
                        />
                        <hr className='hr' />
                        <ItemReviews 
                            reviews={reviews}
                            openReviewModal={() => setReviewModalOpen(true)}
                        />
                        <hr className='hr' />
                        { isMobile && 
                            <ItemLocation item={item} />
                        }
                    </div>
                    <div className="ItemPicturesWrapper">
                        <ItemImages 
                            itemPictures={itemPictures}
                            openImageModal={() => setImageModal(true)}
                        />
                       { !isMobile &&
                        <ItemLocation item={item}/>
                       }
                    </div>
                </div>
            }
        </PageWrapper>
    )
}
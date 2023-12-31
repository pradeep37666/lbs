import React, {
  createContext,
  useEffect,
  useReducer,
  Dispatch,
  useState,
} from 'react'
import './application.css'
import ApplicationHeader from '../../components/application/ApplicationHeader'
import ItemOptions from '../../components/application/ItemOptions'
import ItemOverview from '../../components/application/ItemOverview'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import BookingCalculator from '../../util/calculator/BookingCalculator'
import instance from '../../util/axios'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { getPrevBookingPage } from '../../util/getPrevPage'
import bookingReducer, {
  BookingAction,
  bookingInitialState,
  BookingState,
} from '../../util/reducers/bookingReducer'
import ItemAvailability from '../../components/application/ItemAvailability'
import ApplicationFooter from '../../components/application/ApplicationFooter'
import Instance from '../../util/axios'
import { DeliveryCosts, Item } from '../../types/Item'
import { BookingDuration, BookingMode } from '../../types/Booking'

type Params = {
  itemId: string
}

export const BookingContext = createContext<{
  state: BookingState
  dispatch: Dispatch<BookingAction>
  handleNextPage: (arg0: string) => void
}>({
  state: bookingInitialState,
  dispatch: () => null,
  handleNextPage: () => console.log(null),
})

export default function Application() {
  const [state, dispatch] = useReducer(bookingReducer, bookingInitialState)
  const {
    page,
    item,
    startDate,
    endDate,
    isDeliverySelected,
    isPickupSelected,
    mode,
  } = state
  const { itemId } = useParams<Params>()
  const history = useHistory()
  const location = useLocation()
  const bookingDuration = location.state?.bookingDuration as
    | BookingDuration
    | undefined
  const deliveryCosts = location.state?.deliveryCosts as
    | DeliveryCosts
    | undefined

  useEffect(() => {
    if (!startDate || !endDate) return
    const bookingPriceCalculator = new BookingCalculator(
      startDate,
      endDate,
      item.deliveryPrice,
      item.pickupPrice,
      item.price,
      item.discount,
      isPickupSelected,
      isDeliverySelected
    )
    dispatch({ type: 'setBookingCalculator', data: bookingPriceCalculator })
  }, [startDate, endDate, isPickupSelected, isDeliverySelected])

  useEffect(() => {
    const handleInitialFetching = async () => {
      getItem()
    }
    handleInitialFetching()
  }, [])

  const getItemBookings = async (item: Item) => {
    try {
      const { data, status } = await Instance.get(`/items/${itemId}/bookings`)
      if (bookingDuration && deliveryCosts) {
        dispatch({
          type: 'setExtensionInitialState',
          data: {
            item,
            bookingDetails: data,
            bookingDuration: bookingDuration,
            deliveryCosts: deliveryCosts,
          },
        })
      } else {
        dispatch({
          type: 'setInitialState',
          data: { item, bookingDetails: data },
        })
      }
    } catch (error) {
      console.log({ error })
    }
  }

  const getItem = async () => {
    try {
      const { data, status } = await instance.get(`/items/${itemId}`)
      const bookings = getItemBookings(data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderApplication = () => {
    switch (page) {
      case 'ItemAvailability': {
        return <ItemAvailability />
      }
      case 'ItemOptions': {
        return <ItemOptions />
      }
      case 'ItemOverview': {
        return <ItemOverview />
      }
    }
  }

  const handleNextPage = (newPage: string) => {
    dispatch({ type: 'setPage', data: newPage })
    window.scrollTo(0, 0)
  }

  return (
    <BookingContext.Provider value={{ state, dispatch, handleNextPage }}>
      <PageWrapper>
        <ApplicationHeader
          item={item ? item : null}
          page={page}
          prevPage={() =>
            getPrevBookingPage(page, dispatch, history, itemId, mode)
          }
        />
        <div className='ApplicationContainer'>{renderApplication()}</div>
        {startDate && page !== 'ItemOverview' && <ApplicationFooter />}
      </PageWrapper>
    </BookingContext.Provider>
  )
}

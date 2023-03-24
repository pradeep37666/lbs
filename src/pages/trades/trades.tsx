import React, { useEffect, useState } from 'react'
import './trades.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import Instance from '../../util/axios'
import TradeCalendar from '../../components/tradeCalendar/TradeCalendar'
import { isMobile } from 'react-device-detect'
import { CircularProgress, SwipeableDrawer } from '@material-ui/core'
import TradeFailed from '../../components/modals/TradeFailed/TradeFailed'
import useGlobalState from '../../util/useGlobalState'
import ReviewBorrower from '../../components/modals/ReviewBorrower/ReviewBorrower'
import { useHistory } from 'react-router'
import NoContent from '../../components/NoContent/NoContent'
import ReviewLender from '../../components/modals/ReviewLender/ReviewLender'
import { bookingStatusesArray } from '../../assets/Data/LBSArray'
import TradeSidebar from '../../components/tradeLinearCalendar/TradeSidebar'
import { Booking } from '../../types/Booking'

export default function Trades() {
  const { state } = useGlobalState()
  const { user } = state
  const history = useHistory()
  const [isReportModalVisible, setIsReportModalVisible] = useState(false)
  const [reviewModalVisible, setReviewModalVisible] = useState(false)
  const [accountContent, setAccountContent] = useState('Trades')
  const [selectedBooking, setSelectedBooking] = useState<null | Booking>(null)
  const [lenderBookingItems, setLenderBookingItems] = useState<Booking[]>([])
  const [borrowerBookingItems, setBorrowerBookingItems] = useState<Booking[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getBookings()
  }, [])

  const getBookings = async () => {
    await getLenderBookings()
    await getBorrowerBookings()
    setIsLoading(false)
  }

  const toggleReportModal = () => {
    setIsReportModalVisible(!isReportModalVisible)
  }

  const toggleReviewModal = () => {
    setReviewModalVisible(!reviewModalVisible)
  }

  const getLenderBookings = async () => {
    try {
      const { data, status } = await Instance.get(
        `/users/${user.id}/bookings/lender`,
        {
          // @ts-ignore
          status: bookingStatusesArray,
        }
      )
      if (status !== 200) return
      console.log('LENDER BOOKING ITEMS', data)
      setLenderBookingItems(data)
    } catch (error) {
      console.log('LENDER ERROR', error)
    }
  }

  const getBorrowerBookings = async () => {
    try {
      const { data, status } = await Instance.get(
        `/users/${user.id}/bookings/borrower`,
        {
          // @ts-ignore
          status: bookingStatusesArray,
        }
      )
      if (status !== 200) return
      console.log('BORROWER BOOKING ITEMS', JSON.stringify(data, null, 2))
      setBorrowerBookingItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  const noBookings =
    lenderBookingItems.length === 0 && borrowerBookingItems.length === 0
  const isLender = selectedBooking?.item.userId === user.id ?? false

  return (
    <PageWrapper>
      {selectedBooking && (
        <TradeFailed
          open={isReportModalVisible}
          onClick={() => toggleReportModal()}
          isLender={selectedBooking.item.userId === user.id}
          booking={selectedBooking}
          getBookings={getBookings}
          toggleReportModal={() => toggleReportModal()}
        />
      )}
      <ReviewLender
        open={reviewModalVisible && !isLender}
        setReviewModalVisible={setReviewModalVisible}
        booking={selectedBooking}
        getBookings={getBookings}
      />
      <ReviewBorrower
        open={reviewModalVisible && isLender}
        onClick={() => setReviewModalVisible(false)}
        booking={selectedBooking}
        getBookings={getBookings}
      />
      <div className='UserShedWrapper' style={{ paddingRight: 0 }}>
        {!isMobile && (
          <UserShedNav
            setAccountContent={setAccountContent}
            accountContent={accountContent}
          />
        )}
        <div
          className='TradesContainer'
          style={
            isLoading
              ? {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              : noBookings
              ? { width: '100%' }
              : undefined
          }
        >
          {isLoading ? (
            <CircularProgress color='inherit' />
          ) : noBookings ? (
            <NoContent
              header='No Trades'
              buttonText='Search for items'
              text="You currently don't have any active or upcoming trades, borrow or lend an item to get started."
              onButtonClick={() => history.push('/search')}
            />
          ) : (
            <>
              <div className='UserShed__Title'>Trades</div>
              <TradeCalendar
                setSelectedBooking={setSelectedBooking}
                lenderBookingItems={lenderBookingItems}
                borrowerBookingItems={borrowerBookingItems}
              />
            </>
          )}
        </div>
        {isMobile ? (
          <SwipeableDrawer
            anchor='right'
            open={selectedBooking ? true : false}
            onClose={() => setSelectedBooking(null)}
            onOpen={() => null}
          >
            {selectedBooking && (
              <TradeSidebar
                getBookings={getBookings}
                booking={selectedBooking}
                toggleReportModal={toggleReportModal}
                toggleReviewModal={toggleReviewModal}
              />
            )}
          </SwipeableDrawer>
        ) : (
          selectedBooking && (
            <TradeSidebar
              getBookings={getBookings}
              booking={selectedBooking}
              toggleReportModal={toggleReportModal}
              toggleReviewModal={toggleReviewModal}
            />
          )
        )}
      </div>
    </PageWrapper>
  )
}
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
import { useHistory, useLocation } from 'react-router'
import NoContent from '../../components/NoContent/NoContent'
import ReviewLender from '../../components/modals/ReviewLender/ReviewLender'
import TradeSidebar from '../../components/tradeLinearCalendar/TradeSidebar'
import { Booking } from '../../types/Booking'
import ExtensionModal from '../../components/modals/ExtensionModal/ExtensionModal'

export default function Trades() {
  const { state } = useGlobalState()
  const { user } = state
  const history = useHistory()
  const location = useLocation()

  const extensionRequested = location.state?.extensionCreated

  const [isReportModalVisible, setIsReportModalVisible] = useState(false)
  const [reviewModalVisible, setReviewModalVisible] = useState(false)
  const [isExtensionModalVisible, setIsExtensionModalVisible] = useState(false)
  const [accountContent, setAccountContent] = useState('Trades')
  const [selectedBooking, setSelectedBooking] = useState<null | Booking>(null)
  const [lenderBookingItems, setLenderBookingItems] = useState<Booking[]>([])
  const [borrowerBookingItems, setBorrowerBookingItems] = useState<Booking[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (extensionRequested) setIsExtensionModalVisible(true)
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

  const toggleExtensionModal = () => {
    setIsExtensionModalVisible(!isExtensionModalVisible)
  }

  const getLenderBookings = async () => {
    try {
      const { data, status } = await Instance.get(
        `/users/${user.id}/bookings/lender`
      )
      if (status !== 200) return
      setLenderBookingItems(data)
    } catch (error) {
      console.log('LENDER ERROR', error)
    }
  }

  const getBorrowerBookings = async () => {
    try {
      const { data, status } = await Instance.get(
        `/users/${user.id}/bookings/borrower`
      )
      if (status !== 200) return
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
        isOpen={reviewModalVisible && !isLender}
        onClose={() => setReviewModalVisible(false)}
        booking={selectedBooking}
        getBookings={getBookings}
      />
      <ReviewBorrower
        isOpen={reviewModalVisible && isLender}
        onClose={() => setReviewModalVisible(false)}
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
      <ExtensionModal
        onClose={() => toggleExtensionModal()}
        isOpen={isExtensionModalVisible}
        price={0}
      />
    </PageWrapper>
  )
}

import React, { useEffect, useState } from 'react'
import './trades.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import Instance from '../../util/axios'
import TradeCalendar from '../../components/tradeCalendar/TradeCalendar'
import TradeSidebar from '../../components/TradeSidebar/TradeSidebar'
import { isMobile } from 'react-device-detect'
import { CircularProgress, SwipeableDrawer } from '@material-ui/core'
import TradeFailed from '../../components/TradeFailed/TradeFailed'
import userEvent from '@testing-library/user-event'
import useGlobalState from '../../util/useGlobalState'

import ReviewTrade from '../../components/ReviewTrade/ReviewTrade'
import { useHistory } from 'react-router'
import NoContent from '../../components/NoContent/NoContent'
import ReviewLender from '../../components/reviewLender/ReviewLender'

export default function Trades() {
    const { state } = useGlobalState()
    const { user } = state
    const history = useHistory()
    const [reportModalVisible, setReportModalVisible] = useState(false)
    const [reviewModalVisible, setReviewModalVisible] = useState(false)
    const [accountContent, setAccountContent] = useState('Trades')
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [lenderBookingItems, setLenderBookingItems] = useState([])
    const [borrowerBookingItems, setBorrowerBookingItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getBookings()
    },[])

    const getBookings = async () => {
        await getLenderBookings()
        await getBorrowerBookings()
        setIsLoading(false)
    }

    const getLenderBookings = async () => {
        const { data, status } = await Instance.get('booking/findByOwnerId')
        if(status !== 200) return
        const parsedBookings = parseBookings(data)
        setLenderBookingItems(parsedBookings)
     }

    const getBorrowerBookings = async () => {
        const { data, status } = await Instance.get('booking/findByUid')
        if(status !== 200) return
        const parsedBookings = parseBookings(data)
        setBorrowerBookingItems(parsedBookings)
    }

     const parseBookings = (bookings) => {
        const filteredBookings = []
        bookings.forEach(bookingObj => {
            const foundIndex = filteredBookings.findIndex(obj => obj.items_title === bookingObj.items_title)
            if(foundIndex !== -1 ){
                filteredBookings[foundIndex].bookings.push(bookingObj)
            } else {
                filteredBookings.push({ items_title: bookingObj.items_title, bookings: [bookingObj]})
            }
        })
        return filteredBookings
     }

    const noBookings = (lenderBookingItems.length === 0 && borrowerBookingItems.length === 0)
    const isLender = selectedBooking?.io_id === user.id
    return (
        <PageWrapper>
            { reportModalVisible &&  
                <TradeFailed onClick={() => setReportModalVisible(false)} isLender={selectedBooking.io_id === user.id} />  
            }
            { reviewModalVisible ? (
                isLender ? (
                    <ReviewTrade onClick={() => setReviewModalVisible(false)}  />
                ) : (
                    <ReviewLender onClick={() => setReviewModalVisible(false)} booking={selectedBooking}/>
                )
            ) : null
                
            }
            <div className="UserShedWrapper">
                { !isMobile && <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>}

                <div className="TradesContainer" style={ isLoading ? { display: 'flex', justifyContent: 'center', alignItems: 'center'} : noBookings ? { width: '100%'} : null}>
                    { isLoading ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        noBookings ? (
                            <NoContent 
                            header="No Trades"
                            buttonText="Search for items" 
                            text="You currently don't have any active or upcoming trades, borrow or lend an item to get started." 
                            onButtonClick={() => history.push('/search')} />
                        ) : (
                            <>
                                <div className="UserShed__Title">
                                    {accountContent}
                                </div>
                        
                                <TradeCalendar 
                                setSelectedBooking={setSelectedBooking}
                                lenderBookingItems={lenderBookingItems}
                                borrowerBookingItems={borrowerBookingItems}
                                /> 
                            </> 
                        )
                        
                    )}
                </div>
                { isMobile ? (
                    <SwipeableDrawer anchor='right' open={selectedBooking} onClose={() => setSelectedBooking(null)}>
                        { selectedBooking && <TradeSidebar getBookings={getBookings} booking={selectedBooking} />}
                    </SwipeableDrawer>
                ) : (
                     selectedBooking && <TradeSidebar getBookings={getBookings} booking={selectedBooking} setReportModalVisible={setReportModalVisible} setReviewModalVisible={setReviewModalVisible}/>
                )}
                
            </div>
        </PageWrapper>
    )
}


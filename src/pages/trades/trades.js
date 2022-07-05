import React, { useEffect, useState } from 'react'
import './trades.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import Instance from '../../util/axios'
import TradeCalendar from '../../components/tradeCalendar/TradeCalendar'
import TradeSidebar from '../../components/TradeSidebar/TradeSidebar'
import { isMobile } from 'react-device-detect'
import { CircularProgress, SwipeableDrawer } from '@material-ui/core'
import TradeFailed from '../../components/modals/TradeFailed/TradeFailed'
import useGlobalState from '../../util/useGlobalState'
import ReviewBorrower from '../../components/modals/ReviewBorrower/ReviewBorrower'
import { useHistory } from 'react-router'
import NoContent from '../../components/NoContent/NoContent'
import ReviewLender from '../../components/modals/ReviewLender/ReviewLender'

export default function Trades() {
    const { state } = useGlobalState()
    const { user } = state
    const history = useHistory()
    const [ reportModalVisible, setReportModalVisible ] = useState(false)
    const [ reviewModalVisible, setReviewModalVisible ] = useState(false)
    const [ accountContent, setAccountContent ] = useState('Trades')
    const [ selectedBooking, setSelectedBooking ] = useState(null)
    const [ lenderBookingItems, setLenderBookingItems ] = useState([])
    const [ borrowerBookingItems, setBorrowerBookingItems ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        getBookings()
    },[])

    const getBookings = async () => {
        await getLenderBookings()
        await getBorrowerBookings()
        setIsLoading(false)
    }

    const getLenderBookings = async () => {
        try {
            const { data, status } = await Instance.get(`/users/${user.id}/bookings/lender`, {
                status: [ 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'ITEM_RETURNED' ]
            })
            if(status !== 200) return
            // const parsedBookings = parseBookings(data)
            setLenderBookingItems(data) 
        } catch(error){
            console.log(error.response)
        }
     }

    const getBorrowerBookings = async () => {
        try {
            const { data, status } = await Instance.get(`/users/${user.id}/bookings/borrower`, {
                status: [ 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'ITEM_RETURNED' ]
            })
            if(status !== 200) return
            // const parsedBookings = parseBookings(data)
            setBorrowerBookingItems(data)
        } catch(error){
            console.log(error.response)
        }
    }

    // const parseBookings = (bookings) => {
    //     const filteredBookings = []
    //     bookings.forEach(bookingObj => {
    //         const foundIndex = filteredBookings.findIndex(obj => obj.items_title === bookingObj.items_title)
    //         if(foundIndex !== -1 ){
    //             filteredBookings[foundIndex].bookings.push(bookingObj)
    //         } else {
    //             filteredBookings.push({ items_title: bookingObj.items_title, bookings: [bookingObj]})
    //         }
    //     })
    //     return filteredBookings
    //  }

    const noBookings = (lenderBookingItems.length === 0 && borrowerBookingItems.length === 0)
    const isLender = selectedBooking?.lenderId === user.id
    
    return (
        <PageWrapper>
            { selectedBooking &&  
                <TradeFailed 
                    open={reportModalVisible}
                    onClick={() => setReportModalVisible(false)} 
                    isLender={selectedBooking.lenderId === user.id} 
                    booking={selectedBooking}
                    getBookings={getBookings}
                    setReportModalVisible={setReportModalVisible}
                />  
            }
            <ReviewLender 
                open={reviewModalVisible && !isLender}
                setReviewModalVisible={setReviewModalVisible}
                booking={selectedBooking}
            />
            <ReviewBorrower 
                open={reviewModalVisible && isLender}
                onClick={() => setReviewModalVisible(false)}  
                booking={selectedBooking} 
            />
            <div className="UserShedWrapper" style={{ paddingRight: 0}}>
                { !isMobile && 
                    <UserShedNav 
                        setAccountContent={setAccountContent}
                        accountContent={accountContent}
                    />
                }
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
                                    Trades
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
                {isMobile ? (
                    <SwipeableDrawer 
                        anchor='right' 
                        open={selectedBooking} 
                        onClose={() => setSelectedBooking(null)}
                    >
                        { selectedBooking && 
                            <TradeSidebar 
                                getBookings={getBookings} 
                                booking={selectedBooking} 
                            />
                        }
                    </SwipeableDrawer>
                ) : (selectedBooking && 
                    <TradeSidebar 
                        getBookings={getBookings} 
                        booking={selectedBooking} 
                        setReportModalVisible={setReportModalVisible} 
                        setReviewModalVisible={setReviewModalVisible}
                    />
                )}
            </div>
        </PageWrapper>
    )
}


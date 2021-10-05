import React, { useEffect, useState } from 'react'
import './trades.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import Instance from '../../util/axios'
import TradeCalendar from '../../components/tradeCalendar/TradeCalendar'
import TradeSidebar from '../../components/TradeSidebar/TradeSidebar'
import { isMobile } from 'react-device-detect'
import { SwipeableDrawer } from '@material-ui/core'

export default function Trades() {
    const [accountContent, setAccountContent] = useState('Trades')
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [lenderBookingItems, setLenderBookingItems] = useState([])
    const [borrowerBookingItems, setBorrowerBookingItems] = useState([])

    useEffect(() => {
        getBookings()
    },[])

    const getBookings = () => {
        getLenderBookings()
        getBorrowerBookings()
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


    return (
        <PageWrapper>
            <div className="TradesPageWrapper">
                { !isMobile && <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>}

                <div className="TradesContainer">
                    <div className="UserShed__Title">
                        {accountContent}
                    </div>
                    <TradeCalendar 
                    setSelectedBooking={setSelectedBooking}
                    lenderBookingItems={lenderBookingItems}
                    borrowerBookingItems={borrowerBookingItems}
                    />
                </div>
                
                { selectedBooking && <TradeSidebar getBookings={getBookings} booking={selectedBooking} />}
                
                
            </div>
        </PageWrapper>
    )
}

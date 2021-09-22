import React, { useEffect, useState } from 'react'
import './trades.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper'
import UserShedNav from '../../components/UserShedNav/UserShedNav'
import Instance from '../../util/axios'
import TradeCalendar from '../../components/tradeCalendar/TradeCalendar'
import TradeSidebar from '../../components/TradeSidebar/TradeSidebar'

export default function Trades() {
    const [accountContent, setAccountContent] = useState('Trades')
    const [selectedBooking, setSelectedBooking] = useState(null)
    const [bookingItems, setBookingItems] = useState([])

    useEffect(() => {
        getBookings()
    },[])

    const getBookings = async () => {
        const { data, status } = await Instance.get('booking/findByOwnerId')
        if(status !== 200) return
        const parsedBookings = parseBookings(data)
        setBookingItems(parsedBookings)
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
                <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>

                <div className="TradesContainer">
                    <div className="UserShed__Title">
                        {accountContent}
                    </div>
                    <TradeCalendar 
                    setSelectedBooking={setSelectedBooking}
                    bookingItems={bookingItems}/>
                    

                </div>
                { selectedBooking && <TradeSidebar booking={selectedBooking} />}
            </div>
        </PageWrapper>
    )
}

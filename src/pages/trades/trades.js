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
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const getBookings = async () => {
           const { data, status } = await Instance.get('booking/findByOwnerId')
           if(status !== 200) return
           setBookings(data)
        }
        getBookings()
    },[])


    return (
        <PageWrapper>
            <div className="UserShedWrapper">
            <UserShedNav setAccountContent={setAccountContent} accountContent={accountContent}/>

            <div className="UserShed__MainContent">
                <div className="UserShed__Title">
                    {accountContent}
                </div>
                <TradeCalendar bookings={bookings}/>
                

            </div>
                <TradeSidebar booking={selectedBooking} />
            </div>
        </PageWrapper>
    )
}

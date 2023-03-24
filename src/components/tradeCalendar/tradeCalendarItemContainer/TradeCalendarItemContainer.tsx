import React, { SetStateAction } from 'react'
import './TradeCalendarItemContainer.css'
import getImage from '../../../util/getImage'
import useGlobalState from '../../../util/useGlobalState'
import { isMobile } from 'react-device-detect'
import TradeCalendarItem from '../../tradeLinearCalendar/TradeCalendarItem'
import { Booking } from '../../../types/Booking'

type Props = {
  bookingItem: Booking
  setSelectedBooking: React.Dispatch<SetStateAction<Booking | null>>
  totalDates: number
  header: boolean
}

export default function TradeCalendarItemContainer({
  bookingItem,
  setSelectedBooking,
  totalDates,
  header,
}: Props) {
  const { state } = useGlobalState()
  const { user } = state
  const itemImages = bookingItem?.item?.images ?? []
  const isLender = user.id !== bookingItem.borrowerId

  const renderBookings = () => {
    const row = header ? 3 : 2
    return (
      <TradeCalendarItem
        setSelectedBooking={setSelectedBooking}
        row={row}
        booking={bookingItem}
      />
    )
  }

  const renderColumns = () => {
    return Array(totalDates * 2)
      .fill(null)
      .map((_, index) => {
        return (
          <div
            key={index}
            style={{
              gridRowStart: 1,
              gridRowEnd: 8,
              gridColumnStart: index + 1,
              gridColumnEnd: index + 2,
              borderLeft: '1px solid #dedede',
              zIndex: 1,
            }}
          />
        )
      })
  }

  return (
    <div
      className='TradeCalendarItemContainer'
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${totalDates * 2}, ${
          isMobile ? 25 : 50
        }px)`,
        gridTemplateRows: 'repeat(1, 60px)',
      }}
    >
      {header && (
        <div className='TradeCalendarItemDetails' style={{ gridRowStart: 1 }}>
          <span className='TradeCalendarBorrowHeader'>
            {isLender ? 'My Lends' : 'My Borrows'}
          </span>
        </div>
      )}
      <div
        className='TradeCalendarItemDetails'
        style={{ gridRowStart: header ? 2 : 1 }}
      >
        <img
          className='TradeCalendarItemPicture'
          src={getImage(itemImages.length === 0 ? '' : itemImages[0]?.imageKey)}
        />
        <span>{bookingItem?.item?.title}</span>
      </div>
      {renderColumns()}
      {renderBookings()}
    </div>
  )
}

import React, { useEffect } from 'react'
import './TradeCalendarItem.css'
import Arrow from '../../assets/Icons/Arrow'
import useGlobalState from '../../util/useGlobalState'
import LendStripes from '../../assets/Images/LendStripes.png'
import BorrowStripes from '../../assets/Images/BorrowStripes.png'
import { isMobile } from 'react-device-detect'
import { Booking, BookingEventStatus } from '../../types/Booking'
import moment from 'moment'
import getBookingDuration from '../../util/tradeUtils/getBookingDuration'
import getExtensionApprovedDuration from '../../util/tradeUtils/getExtensionApprovedDuration'

type Props = {
  booking: Booking
  setSelectedBooking: React.Dispatch<React.SetStateAction<null | Booking>>
  row: number
}

export default function TradeCalendarItem({
  booking,
  setSelectedBooking,
  row,
}: Props) {
  const { state } = useGlobalState()
  const { user } = state

  const bookingDuration = booking.bookingEvents?.some(
    bookingEvent => bookingEvent.event === BookingEventStatus.EXTENSION_APPROVED
  )
    ? getExtensionApprovedDuration(booking.bookingDurations)
    : getBookingDuration(booking.bookingDurations)

  const isLender = booking.borrowerId !== user.id
  const isConfirmed =
    booking.status === 'APPROVED' || booking.status === 'IN_PROGRESS'
  const isCancelled =
    booking.status === 'REJECTED' || booking.status === 'CANCELLED'

  useEffect(() => {
    getBookingSlotDifference()
  }, [])

  const sameDate =
    // Compare dates irrespective of time
    bookingDuration &&
    new Date(bookingDuration.startDate).toDateString() ===
      new Date(bookingDuration.endDate).toDateString()

  const isSameTimeSlot = () => {
    if (!bookingDuration) return
    const startDateHours = moment(bookingDuration.startDate).hours()
    const endDateHours = moment(bookingDuration.endDate).hours()
    if (sameDate && startDateHours === 8 && endDateHours === 12) {
      return true
    } else if (sameDate && startDateHours === 13 && endDateHours === 17) {
      return true
    } else {
      return false
    }
  }

  const getBackgroundImage = () => {
    if (!isCancelled) return
    return isLender ? `url(${LendStripes})` : `url(${BorrowStripes})`
  }

  useEffect(() => {
    if (bookingDuration?.id === 'c1385c68-de31-4429-aa15-a73642eb82fe') {
      console.log(moment(bookingDuration.startDate).hours())
    }
  }, [])

  /*
  Find difference in days from the first day of the first rendered month,
  multiply by two to account for days being split by two timeslots
  - then handle different timeslots by incrementing accordingly
  */
  const getBookingStartPosition = () => {
    if (!bookingDuration) return
    const differenceInDays =
      moment(bookingDuration.startDate).diff(
        moment().startOf('month'),
        'days'
      ) * 2
    const afternoonSlot = moment(bookingDuration.startDate).hours() === 13

    // Shift by two to account for timeslot
    if (afternoonSlot) {
      return differenceInDays + 2
    }

    return differenceInDays + 1
  }

  const getBookingEndPosition = () => {
    if (!bookingDuration) return
    const differenceInDays =
      moment(bookingDuration.endDate).diff(moment().startOf('month'), 'days') *
      2
    const afternoonSlot = moment(bookingDuration.endDate).hours() === 17
    const morningSlot = moment(bookingDuration.endDate).hours() === 12

    // If true, increment by 3 to account for start position incrementing by two
    if (afternoonSlot && sameDate) {
      return differenceInDays + 3
    }

    if (afternoonSlot) {
      return differenceInDays + 3
    }

    return differenceInDays + 2
  }

  /* To account for text overflow issues for dates that occupy 2
  or 3 slots and cannot be displayed vertically */
  const getBookingSlotDifference = () => {
    if (!bookingDuration) return
    const startDate = moment(bookingDuration.startDate)
    const endDate = moment(bookingDuration.endDate)
    if (endDate.days() - startDate.days() <= 1) {
      return true
    }
    return false
  }

  const getIsVertical = () => {
    const bookingStartPosition = getBookingStartPosition()
    const bookingEndPostion = getBookingEndPosition()
    if (!bookingStartPosition || !bookingEndPostion) return

    if (bookingEndPostion - bookingStartPosition <= 3) {
      return true
    } else {
      return false
    }
  }

  const isVertical = getIsVertical()
  const shortenText = isSameTimeSlot() || sameDate

  const getCalendarItemClass = () => {
    if (isCancelled) {
      return isLender
        ? 'TradeCalendarItemLendCancelled'
        : 'TradeCalendarItemBorrowCancelled'
    }
    if (isConfirmed) {
      return isLender ? 'TradeCalendarItemLend' : 'TradeCalendarItemBorrow'
    }
    return 'TradeCalendarItemPending'
  }

  return (
    <div
      onClick={() => setSelectedBooking(booking)}
      className='TradeCalendarItem'
      style={{
        gridRowStart: row,
        gridColumnStart: getBookingStartPosition(),
        gridColumnEnd: getBookingEndPosition(),
      }}
    >
      <div
        style={{
          flexDirection: isVertical ? 'column' : 'row',
          backgroundImage: getBackgroundImage(),
          backgroundSize: 'auto',
          padding: isSameTimeSlot() ? '0.5rem 0' : '0.5rem',
        }}
        className={getCalendarItemClass()}
      >
        <span
          className={isVertical || sameDate ? 'TradeCalendarVerticalText' : ''}
        >
          {/* Change rendered text if vertical or same day to handle overflow */}
          {shortenText
            ? moment(bookingDuration?.startDate).hours() === 8
              ? '8am '
              : '1pm '
            : moment(bookingDuration?.startDate).format('h:mmA '.toLowerCase())}
        </span>
        <Arrow
          onClick={() => null}
          rotation={isSameTimeSlot() ? 90 : 0}
          width={isMobile ? 20 : 30}
          height={isMobile ? 10 : 20}
        />
        <span
          className={isVertical || sameDate ? 'TradeCalendarVerticalText' : ''}
        >
          {shortenText
            ? moment(bookingDuration?.endDate).hours() === 17
              ? '5pm '
              : '12pm '
            : moment(bookingDuration?.endDate).format('h:mmA '.toLowerCase())}
        </span>
      </div>
    </div>
  )
}

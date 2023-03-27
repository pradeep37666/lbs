import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Item } from '../../types/Item'
import './Calendar.css'
import TimeSlotPicker from '../timeSlotPicker/TimeSlotPicker'
import { BookingContext } from '../../pages/application/Application'
import isEqualDate from '../../util/dateUtils/isEqualDate'
import CalendarDay from './CalendarDay'
import moment from 'moment'
import useErrorState from '../../util/reducers/errorContext'
import { SNACKBAR_BUTTON_TYPES } from '../../assets/Data/LBSEnum'
import {
  BlockedAvailabilityCreate,
  BlockedAvailabilityTime,
} from '../../types/User'
import { blockedAvailabilityToString } from '../../util/blockedAvailabilityToString'
import { BookingDate } from '../../types/Booking'

type Props = {
  days: Date[]
  isEditable: boolean
  isViewing: boolean
  itemData: Item
  bookingDates?: BookingDate[]
}

const CalendarRow: FunctionComponent<Props> = ({
  days,
  isEditable,
  isViewing,
  itemData,
  bookingDates,
}) => {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false)
  const { state, dispatch } = useContext(BookingContext)
  const { selectedDay, item, startDate, endDate, bookedDates, appliedEndDate } =
    state
  const { errorDispatch } = useErrorState()

  const itemBlockedAvailabilities: BlockedAvailabilityCreate[] =
    itemData.itemBlockedAvailability.map(blockedAvailability => {
      return {
        startTime: blockedAvailability.blockedAvailability.startTime,
        endTime: blockedAvailability.blockedAvailability.endTime,
        weekDay: blockedAvailabilityToString(
          blockedAvailability.blockedAvailability.weekDay
        ),
      }
    })

  useEffect(() => {
    if (!selectedDay) {
      setIsTimePickerOpen(false)
      return
    }
    const isRowSelected = days.some(day => isEqualDate(day, selectedDay))
    if (!isRowSelected) {
      return setIsTimePickerOpen(false)
    }
    setIsTimePickerOpen(true)
  }, [selectedDay])

  const handleDayClick = (day: Date) => {
    if (!selectedDay) {
      dispatch({ type: 'setSelectedDay', data: day })
      return
    }
    const isSelectedDayPressed = isEqualDate(day, selectedDay)
    dispatch({
      type: 'setSelectedDay',
      data: isSelectedDayPressed ? undefined : day,
    })
  }

  const handleTimeSlotClick = (
    startTime: BlockedAvailabilityTime,
    endTime: BlockedAvailabilityTime
  ) => {
    if (!selectedDay || !item) return
    if (startDate === null || typeof startDate === 'undefined') {
      if (startTime === '08:00:00' && endTime === '12:00:00') {
        let toUpdateStartDate = new Date(selectedDay).setHours(8, 0, 0, 0)
        let toUpdateEndDate = new Date(selectedDay).setHours(12, 0, 0, 0)

        dispatch({ type: 'setStartDate', data: new Date(toUpdateStartDate) })
        dispatch({ type: 'setEndDate', data: new Date(toUpdateEndDate) })
      } else {
        let toUpdateStartDate = new Date(selectedDay.setHours(13, 0, 0, 0))
        let toUpdateEndDate = new Date(selectedDay.setHours(17, 0, 0, 0))
        dispatch({ type: 'setStartDate', data: new Date(toUpdateStartDate) })
        dispatch({ type: 'setEndDate', data: new Date(toUpdateEndDate) })
      }
    } else {
      selectedDay.setHours(0, 0, 0, 0)
      const msInDay = 24 * 60 * 60 * 1000
      const dateDifference = Math.round(
        Math.abs(startDate.getTime() - selectedDay.getTime()) / msInDay
      )
      if (selectedDay < startDate) {
        if (dateDifference === 1) {
          errorDispatch({
            type: 'openSnackBar',
            data: {
              message: `Ooops, it looks like you have selected a day in the past. Select a day that is in the future from your item pick up.`,
              btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
              btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
            },
          })
        } else if (startDate.getHours() === 8 && endDate?.getHours() === 12) {
          let toUpdateEndDate = new Date(selectedDay.setHours(17, 0, 0, 0))
          dispatch({ type: 'setEndDate', data: new Date(toUpdateEndDate) })
        } else {
          errorDispatch({
            type: 'openSnackBar',
            data: {
              message: `Ooops, it looks like you have selected a day in the past. Select a day that is in the future from your item pick up.`,
              btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
              btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
            },
          })
        }
      } else {
        if (startTime === '08:00:00' && endTime === '12:00:00') {
          let toUpdateEndDate = new Date(selectedDay).setHours(12, 0, 0, 0)
          dispatch({ type: 'setEndDate', data: new Date(toUpdateEndDate) })
        } else {
          let toUpdateEndDate = new Date(selectedDay.setHours(17, 0, 0, 0))
          dispatch({ type: 'setEndDate', data: new Date(toUpdateEndDate) })
        }
      }
    }
  }

  const getIsMorningSelected = () => {
    const start = moment(startDate)
    const end = moment(endDate)
    const selected = moment(selectedDay)
    if (
      (selected.isSame(start, 'day') && start.hours() === 8) ||
      (selected.isSame(end, 'day') && end.hours() === 12)
    ) {
      return true
    }
    return false
  }
  const getIsAfternoonSelected = () => {
    const start = moment(startDate)
    const end = moment(endDate)
    const selected = moment(selectedDay)
    if (
      (selected.isSame(start, 'day') && start.hours() === 13) ||
      (selected.isSame(end, 'day') && end.hours() === 17)
    ) {
      return true
    }
    return false
  }

  return (
    <div className={`CalendarRow ${isTimePickerOpen && 'CalendarRowExpanded'}`}>
      {days.map((day, index) => (
        <CalendarDay
          key={index}
          day={day}
          index={index}
          isEditable={isEditable}
          item={itemData}
          isViewing={isViewing}
          itemBlockedAvailabilities={itemBlockedAvailabilities}
          bookingDates={bookingDates}
          onClick={handleDayClick}
        />
      ))}
      {isTimePickerOpen && (
        <div className='CalendarPadding'>
          <TimeSlotPicker
            onMorningClick={() => handleTimeSlotClick('08:00:00', '12:00:00')}
            onAfternoonClick={() => handleTimeSlotClick('13:00:00', '17:00:00')}
            isMorningSelected={getIsMorningSelected()}
            isAfternoonSelected={getIsAfternoonSelected()}
            bookingDates={bookingDates ?? bookedDates}
          />
        </div>
      )}
    </div>
  )
}

export default CalendarRow

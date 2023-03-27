import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from 'react'
import moment from 'moment'
import './timeSlotPicker.css'
import { BookingContext } from '../../pages/application/Application'
import checkIfSlotBooked from '../../util/checkIfSlotBooked'
import AfternoonIcon from '../../assets/Icons/AfternoonIcon'
import MorningIcon from '../../assets/Icons/MorningIcon'
import { shortToLongDay } from '../../util/shortToLongDay'

type Props = {
  isMorningSelected: boolean
  isAfternoonSelected: boolean
  onMorningClick: () => void
  onAfternoonClick: () => void
  bookingDates?: { startDate: string; endDate: string }[]
}

const TimeSlotPicker: FunctionComponent<Props> = ({
  isMorningSelected,
  isAfternoonSelected,
  onMorningClick,
  onAfternoonClick,
  bookingDates,
}) => {
  const { state } = useContext(BookingContext)
  const { selectedDay, blockedAvailabilities, bookedDates, appliedEndDate } =
    state
  const [isMorningBooked, setIsMorningBooked] = useState<boolean>(false)
  const [isAfternoonBooked, setIsAfternoonBooked] = useState<boolean>(false)
  const weekDay = shortToLongDay(
    moment(selectedDay).format('ddd').toUpperCase()
  )

  useEffect(() => {
    if (!selectedDay) return
    const { isMorningBooked, isAfternoonBooked } = checkIfSlotBooked(
      bookedDates,
      selectedDay
    )
    setIsMorningBooked(isMorningBooked)
    setIsAfternoonBooked(isAfternoonBooked)
  }, [selectedDay, bookedDates])

  useEffect(() => {
    if (!appliedEndDate) return
  }, [appliedEndDate])

  const isMorningBlocked = blockedAvailabilities.some(availability => {
    return (
      weekDay === availability.weekDay &&
      availability.startTime === '08:00:00' &&
      availability.endTime === '12:00:00'
    )
  })

  const isAfternoonBlocked = blockedAvailabilities.some(availability => {
    return (
      weekDay === availability.weekDay &&
      availability.startTime === '13:00:00' &&
      availability.endTime === '17:00:00'
    )
  })

  return (
    <div className='PickerMain'>
      <div className='PickerHeader'>Availability Time Slot</div>
      <div className='MorningAfternoonFlex'>
        <div
          className={`TimeSlotDiv 
                    ${isMorningSelected ? 'BackgroundMorning' : ''}
                    ${
                      isMorningBlocked || isMorningBooked
                        ? 'MorningUnavailable'
                        : 'Pointer'
                    }`}
          onClick={() => {
            if (isMorningBlocked || isMorningBooked) return
            onMorningClick()
          }}
        >
          <MorningIcon
            color={isMorningBooked || isMorningBlocked ? 'gray' : null}
          />
          <div
            className={`${isMorningSelected ? 'DaySelectedText' : 'DayText'}`}
          >
            Morning
          </div>
          <div className='TimeText'>8am - 12pm</div>
        </div>
        <div
          className={`TimeSlotDiv 
                    ${isAfternoonSelected ? 'BackgroundAfternoon' : ''}
                    ${
                      isAfternoonBlocked || isAfternoonBooked
                        ? 'AfternoonUnavailable'
                        : 'Pointer'
                    }`}
          onClick={() => {
            if (isAfternoonBlocked || isAfternoonBooked) return
            onAfternoonClick()
          }}
        >
          <AfternoonIcon
            color={isAfternoonBlocked || isAfternoonBooked ? 'gray' : ''}
          />
          <div className='DayText'>Afternoon</div>
          <div className='TimeText'>1pm - 5pm</div>
        </div>
      </div>
    </div>
  )
}

export default TimeSlotPicker

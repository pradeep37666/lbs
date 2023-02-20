import React, { useState } from 'react'
import './timeSlots.css'
import {
  BlockedAvailabilityWeekday,
  BlockedAvailabilityCreate,
} from '../../types/User'
import SlotDay from '../slotDay/SlotDay'

type TimeSlotsProps = {
  blockedAvailabilities: BlockedAvailabilityCreate[]
  onTimeSlotBlocked: (blockedAvailability: BlockedAvailabilityCreate) => void
}

const TimeSlots: React.FC<TimeSlotsProps> = ({
  blockedAvailabilities,
  onTimeSlotBlocked,
}) => {
  const [openSlot, setOpenSlot] = useState<string>()

  const handleSlotPress = (slotDay: BlockedAvailabilityWeekday) => {
    if (openSlot === slotDay) {
      setOpenSlot('')
      return
    }
    setOpenSlot(slotDay)
  }

  const renderSlotDays = () => {
    const weekdays: BlockedAvailabilityWeekday[] = [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ]

    return weekdays.map((weekDay, index) => {
      return (
        <SlotDay
          key={index}
          weekDay={weekDay}
          open={openSlot === weekDay}
          onPress={() => handleSlotPress(weekDay)}
          onTimeSlotBlocked={blockedAvailability =>
            onTimeSlotBlocked(blockedAvailability)
          }
          blockedAvailabilities={blockedAvailabilities}
        />
      )
    })
  }

  return <div className='ProdcutAvailabiltySection'>{renderSlotDays()}</div>
}

export default TimeSlots

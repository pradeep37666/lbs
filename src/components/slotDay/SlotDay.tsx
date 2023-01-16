import React from 'react'
import './slotDay.css'
import { BlockedAvailabilityCreate, BlockedAvailabilityWeekday } from '../../types/User'
import TimeSlotPicker from '../timeSlotPicker/TimeSlotPicker'

type SlotDayProps = {
    weekDay: BlockedAvailabilityWeekday
    open: boolean
    onPress: () => void
    blockedAvailabilities: BlockedAvailabilityCreate[]
    onTimeSlotBlocked: (blockedAvailavility: BlockedAvailabilityCreate) => void
}

export const SlotDay: React.FC<SlotDayProps> = ({
    weekDay,
    open,
    onPress,
    blockedAvailabilities,
    onTimeSlotBlocked
}) => {
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

    const handlePress = (timeslot: 'morning' | 'afternoon') => {
        const blockedAvailability: BlockedAvailabilityCreate = {
            weekDay,
            startTime: timeslot === 'morning' ? '08:00:00' : '13:00:00',
            endTime: timeslot === 'morning' ? '12:00:00' : '17:00:00'
        }
        onTimeSlotBlocked(blockedAvailability)
    }

    const capitalizeFirstLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }

    return (
        <div>
            <div className="DayDotsFlex">
                <div
                    className={`DayInactive ${isMorningBlocked || isAfternoonBlocked
                        ? 'DayActive'
                        : ''}`}
                    onClick={onPress}
                >
                    {capitalizeFirstLetter(weekDay)}
                    {open && <div className="triangle" />}
                </div>
                <div className="DotsFlex">
                    <div className={`AvailabilityDot 
                        ${isMorningBlocked
                            ? 'DotMorningActive'
                            : ''}
                        `}
                    />
                    <div className={`AvailabilityDot 
                        ${isAfternoonBlocked
                            ? 'DotAfternoonActive'
                            : ''}
                        `}
                    />
                </div>
                {open && (
                    <TimeSlotPicker 
                        isMorningBlocked={isMorningBlocked}
                        isAfternoonBlocked={isAfternoonBlocked}
                        morningClick={() => handlePress('morning')}
                        afternoonClick={() => handlePress('afternoon')}
                    />
                )}
            </div>
        </div>
    )
}

export default SlotDay
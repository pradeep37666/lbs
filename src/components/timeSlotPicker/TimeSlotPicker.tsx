import React from 'react'
import './timeSlotPicker.css'
import MorningIcon from '../../assets/Icons/MorningIcon'
import AfternoonIcon from '../../assets/Icons/AfternoonIcon'

type TimeSlotPickerProps = {
    isMorningBlocked: boolean
    isAfternoonBlocked: boolean
    morningUnavailable?: boolean
    afternoonUnavailable?: boolean
    morningClick: () => void
    afternoonClick: () => void
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
    isMorningBlocked,
    isAfternoonBlocked,
    morningUnavailable,
    afternoonUnavailable,
    morningClick,
    afternoonClick
}) => {

    const handleMorningClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        if (morningUnavailable) return
        morningClick()
    }

    const handleAfternoonClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        if (afternoonUnavailable) return
        afternoonClick()
    }

    return (
        <div className="PickerMain">
            <div className="PickerHeader">Availability Time Slot</div>
            <div className="MorningAfternoonFlex">
                <div
                    className={`TimeSlotDiv 
                    ${isMorningBlocked ? 'BackgroundMorning' : ''}
                    ${morningUnavailable ? 'MorningUnavailable' : 'Pointer'}`}
                    onClick={handleMorningClick}
                >
                    <MorningIcon color={morningUnavailable ? "gray" : null} />
                    <div className="DayText">Morning</div>
                    <div className="TimeText">8am - 12pm</div>
                </div>
                <div
                    className={`TimeSlotDiv 
                ${isAfternoonBlocked ? 'BackgroundAfternoon' : ''}
                ${afternoonUnavailable ? 'AfternoonUnavailable' : 'Pointer'}`}
                    onClick={handleAfternoonClick}
                >
                    <AfternoonIcon color={afternoonUnavailable ? 'gray' : ''} />
                    <div className="DayText">Afternoon</div>
                    <div className="TimeText">1pm - 5pm</div>
                </div>
            </div>
        </div>
    )
}

export default TimeSlotPicker
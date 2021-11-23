import React, { useState } from 'react';
import './productSlots.css';
import SlotDay from '../slotDay/slotDay';

export default function ProductSlots({ availability, setAvailability }) {
    const [openSlot, setOpenSlot] = useState()

    const handleSlotClick = (slotName) => {
        if(slotName === openSlot){
            setOpenSlot('')
        } else {
            setOpenSlot(slotName)
        }
    }

    const renderSlotDays = () => {
        const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

        return Array(7).fill(null).map(( item, index )=> {
            const slotDay = weekdays[index]
            const morningIndex = index * 2
            const afternoonIndex = (index * 2) + 1

            return (
                <SlotDay 
                key={index}
                day={slotDay}
                open={openSlot === slotDay}
                onClick={() => handleSlotClick(slotDay)}
                morningSelected={availability[morningIndex]}
                afternoonSelected={availability[afternoonIndex]}
                onMorningClick={() => { 
                    let newAvailability = [...availability]
                    newAvailability[morningIndex] = availability[morningIndex] ? 0 : 1
                    setAvailability(newAvailability)
                }}
                onAfternoonClick={() => {
                    let newAvailability = [...availability]
                    newAvailability[afternoonIndex] = availability[afternoonIndex] ? 0 : 1
                    setAvailability(newAvailability)
                }}
                />
            )
        })
    }
    return (
        <div className="ProdcutAvailabiltySection">
            { renderSlotDays() }
        </div>
    )
}

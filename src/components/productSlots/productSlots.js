import React, { useState } from 'react';
import './productSlots.css';
import SlotDay from '../slotDay/slotDay';

export default function ProductSlots() {

    // possibly edit this state e.g. putting everything into an array of objects, depends on how backend turns out

    const [mondayM, setMondayM] = useState(false);
    const [mondayA, setMondayA] = useState(false);
    const [tuesdayM, setTuesdayM] = useState(false);
    const [tuesdayA, setTuesdayA] = useState(false);
    const [wednesdayM, setWednesdayM] = useState(false);
    const [wednesdayA, setWednesdayA] = useState(false);
    const [thursdayM, setThursdayM] = useState(false);
    const [thursdayA, setThursdayA] = useState(false);
    const [fridayM, setFridayM] = useState(false);
    const [fridayA, setFridayA] = useState(false);
    const [saturdayM, setSaturdayM] = useState(false);
    const [saturdayA, setSaturdayA] = useState(false);
    const [sundayM, setSundayM] = useState(false);
    const [sundayA, setSundayA] = useState(false);

    const [mondayOpen, setMondayOpen] = useState(false);
    const [tuesdayOpen, setTuesdayOpen] = useState(false);
    const [wednesdayOpen, setWednesdayOpen] = useState(false);
    const [thursdayOpen, setThursdayOpen] = useState(false);
    const [fridayOpen, setFridayOpen] = useState(false);
    const [saturdayOpen, setSaturdayOpen] = useState(false);
    const [sundayOpen, setSundayOpen] = useState(false);

    const closeAllSlots = () => {
        setMondayOpen(false);
        setTuesdayOpen(false);
        setWednesdayOpen(false);
        setThursdayOpen(false);
        setFridayOpen(false);
        setSaturdayOpen(false);
        setSundayOpen(false);
    }
    
    return (
        <div className="ProdcutAvailabiltySection">
            <SlotDay day="Monday" 
            open={mondayOpen} setOpen={setMondayOpen} 
            closeAll={closeAllSlots} 
            morning={mondayM} setMorning={setMondayM} 
            afternoon={mondayA} setAfternoon={setMondayA}/>
            <SlotDay day="Tuesday" 
            open={tuesdayOpen} setOpen={setTuesdayOpen} 
            closeAll={closeAllSlots} 
            morning={tuesdayM} setMorning={setTuesdayM} 
            afternoon={tuesdayA} setAfternoon={setTuesdayA}/>
            <SlotDay day="Wednesday" 
            open={wednesdayOpen} setOpen={setWednesdayOpen} 
            closeAll={closeAllSlots} 
            morning={wednesdayM} setMorning={setWednesdayM} 
            afternoon={wednesdayA} setAfternoon={setWednesdayA}/>
            <SlotDay day="Thursday" 
            open={thursdayOpen} setOpen={setThursdayOpen} 
            closeAll={closeAllSlots} 
            morning={thursdayM} setMorning={setThursdayM} 
            afternoon={thursdayA} setAfternoon={setThursdayA}/>
            <SlotDay day="Friday" 
            open={fridayOpen} setOpen={setFridayOpen} 
            closeAll={closeAllSlots} 
            morning={fridayM} setMorning={setFridayM} 
            afternoon={fridayA} setAfternoon={setFridayA}/>
            <SlotDay day="Saturday" 
            open={saturdayOpen} setOpen={setSaturdayOpen} 
            closeAll={closeAllSlots} 
            morning={saturdayM} setMorning={setSaturdayM} 
            afternoon={saturdayA} setAfternoon={setSaturdayA}/>
            <SlotDay day="Sunday" 
            open={sundayOpen} setOpen={setSundayOpen} 
            closeAll={closeAllSlots} 
            morning={sundayM} setMorning={setSundayM} 
            afternoon={sundayA} setAfternoon={setSundayA}/>
        </div>
    )
}

import React, { useState } from 'react';
import './productSlots.css';
import SlotDay from '../slotDay/slotDay';

export default function ProductSlots(props) {

    // const [mondayM, setMondayM] = useState(false);
    // const [mondayA, setMondayA] = useState(false);
    // const [tuesdayM, setTuesdayM] = useState(false);
    // const [tuesdayA, setTuesdayA] = useState(false);
    // const [wednesdayM, setWednesdayM] = useState(false);
    // const [wednesdayA, setWednesdayA] = useState(false);
    // const [thursdayM, setThursdayM] = useState(false);
    // const [thursdayA, setThursdayA] = useState(false);
    // const [fridayM, setFridayM] = useState(false);
    // const [fridayA, setFridayA] = useState(false);
    // const [saturdayM, setSaturdayM] = useState(false);
    // const [saturdayA, setSaturdayA] = useState(false);
    // const [sundayM, setSundayM] = useState(false);
    // const [sundayA, setSundayA] = useState(false);

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
            morning={props.mondayM} setMorning={props.setMondayM} 
            afternoon={props.mondayA} setAfternoon={props.setMondayA}/>
            <SlotDay day="Tuesday" 
            open={tuesdayOpen} setOpen={setTuesdayOpen} 
            closeAll={closeAllSlots} 
            morning={props.tuesdayM} setMorning={props.setTuesdayM} 
            afternoon={props.tuesdayA} setAfternoon={props.setTuesdayA}/>
            <SlotDay day="Wednesday" 
            open={wednesdayOpen} setOpen={setWednesdayOpen} 
            closeAll={closeAllSlots} 
            morning={props.wednesdayM} setMorning={props.setWednesdayM} 
            afternoon={props.wednesdayA} setAfternoon={props.setWednesdayA}/>
            <SlotDay day="Thursday" 
            open={thursdayOpen} setOpen={setThursdayOpen} 
            closeAll={closeAllSlots} 
            morning={props.thursdayM} setMorning={props.setThursdayM} 
            afternoon={props.thursdayA} setAfternoon={props.setThursdayA}/>
            <SlotDay day="Friday" 
            open={fridayOpen} setOpen={setFridayOpen} 
            closeAll={closeAllSlots} 
            morning={props.fridayM} setMorning={props.setFridayM} 
            afternoon={props.fridayA} setAfternoon={props.setFridayA}/>
            <SlotDay day="Saturday" 
            open={saturdayOpen} setOpen={setSaturdayOpen} 
            closeAll={closeAllSlots} 
            morning={props.saturdayM} setMorning={props.setSaturdayM} 
            afternoon={props.saturdayA} setAfternoon={props.setSaturdayA}/>
            <SlotDay day="Sunday" 
            open={sundayOpen} setOpen={setSundayOpen} 
            closeAll={closeAllSlots} 
            morning={props.sundayM} setMorning={props.setSundayM} 
            afternoon={props.sundayA} setAfternoon={props.setSundayA}/>
        </div>
    )
}

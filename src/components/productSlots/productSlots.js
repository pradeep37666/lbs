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

    return (
        <div className="ProdcutAvailabiltySection">
            <SlotDay day="Monday" dayMorningUpdate={setMondayM} dayAfternoonUpdate={setMondayA}/>
            <SlotDay day="Tuesday" dayMorningUpdate={setTuesdayM} dayAfternoonUpdate={setTuesdayA}/>
            <SlotDay day="Wednesday" dayMorningUpdate={setWednesdayM} dayAfternoonUpdate={setWednesdayA}/>
            <SlotDay day="Thursday" dayMorningUpdate={setThursdayM} dayAfternoonUpdate={setThursdayA}/>
            <SlotDay day="Friday" dayMorningUpdate={setFridayM} dayAfternoonUpdate={setFridayA}/>
            <SlotDay day="Saturday" dayMorningUpdate={setSaturdayM} dayAfternoonUpdate={setSaturdayA}/>
            <SlotDay day="Sunday" dayMorningUpdate={setSundayM} dayAfternoonUpdate={setSundayA}/>
        </div>
    )
}

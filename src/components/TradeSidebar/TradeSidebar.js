import React, {useEffect, useState} from 'react'
import Instance from '../../util/axios'
import ApplicationItemCard from '../application/ApplicationItemCard'

export default function TradeSidebar({ booking }) {
    const [item, setItem] = useState(null )

    useEffect(() => {
        const getItemDetails = async () => {
            const { data, status } = await Instance.get(`items/findByIid?i_id=${booking.i_id}&u_id=${booking.u_id}`)
            if(status !== 200) return 
            setItem(data.item)
        }
        getItemDetails()
    },[booking])

    console.log(booking)
    return (
        <div className="TradeSidebarContainer">
            <span>Trade Details</span>
            { item && 
            <ApplicationItemCard item={item}/>
            }
        </div>
    )
}

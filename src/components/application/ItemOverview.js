import React, { useContext } from 'react'
import { ApplicationContext } from '../../pages/application/Application'
import {ReactComponent as StarFilled} from '../../assets/Icons/StarFilled.svg'
import './ItemOverview.css'

export default function ItemOverview() {
    const { item } = useContext(ApplicationContext)
    return (
        <div className="ItemOverviewContainer">
            <div>
                <h3>Application Overview</h3>
                <div>
                    <p>Item</p>
                    <p>{item.title}</p>
                    <StarFilled />
                </div>
            </div>
        </div>
    )
}

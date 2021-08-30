import React from 'react'
import './ApplicationHeader.css'

export default function ApplicationHeader({ page, item }) {
    const renderContent = () => {
        switch(page) {
            case 'ItemAvailability' : {
                return (
                    <div className="HeaderTextContainer">
                        <h2>Apply For Product</h2> 
                        <p> - Select pick up date and time</p>
                    </div>
                   
                )
                break
            }
            case 'ItemOptions' : {
                return <h1>Book your stuff - Make your borrowing easier</h1>
            }
            case 'ItemOverview' : {
                return <h1>Book your stuff - Please check we've got everything right</h1>
            }
        }
    }
    return (
        <div className="ApplicationHeaderContainer">
            { renderContent() }
            <div className="ItemDetails">
                <h3>Item - </h3>
                {item && 
                    <>
                        <img src={item.pictures && item.pictures[0]} alt="item image"></img>
                        <p>{item.title}</p>
                    </>}
            </div>
        </div>
    )
}

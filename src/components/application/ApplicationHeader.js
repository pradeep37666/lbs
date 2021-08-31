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
                return (
                    <div className="HeaderTextContainer">
                        <h2>Book your stuff</h2> 
                        <p> - Make your borrowing easier</p>
                    </div>
                )
            }
            case 'ItemOverview' : {
                return (
                <div className="HeaderTextContainer">
                    <h2>Book your stuff</h2> 
                    <p> - Please check we've got everything right</p>
                </div>
                )
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

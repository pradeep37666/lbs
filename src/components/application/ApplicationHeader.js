import React, { useEffect, useState } from 'react'
import getImage from '../../util/getImage'
import './ApplicationHeader.css'

export default function ApplicationHeader({ page, item }) {
    const [pictures, setPictures] = useState()

    useEffect(() => {
        if(!item) return
        setPictures(item.pictures.split(','))
    },[item])

    const renderContent = () => {
        switch(page) {
            case 'ItemAvailability' : {
                return (
                    <div className="HeaderTextContainer">
                        <span className="ApplicationHeaderHeading">Apply For Product</span> 
                        <span className="ApplicationHeaderSubheading"> - Select pick up date and time</span>
                    </div>
                   
                )
                break
            }
            case 'ItemOptions' : {
                return (
                    <div className="HeaderTextContainer">
                        <span className="ApplicationHeaderHeading">Book your stuff</span> 
                        <span className="ApplicationHeaderSubheading"> - Make your borrowing easier</span>
                    </div>
                )
            }
            case 'ItemOverview' : {
                return (
                <div className="HeaderTextContainer">
                    <span className="ApplicationHeaderHeading">Book your stuff</span> 
                    <span className="ApplicationHeaderSubheading"> - Please check we've got everything right</span>
                </div>
                )
            }
        }
    }
    return (
        <div className="ApplicationHeaderContainer">
            { renderContent() }
            <div className="ItemDetails">
                <span className="ApplicationHeaderHeading">Item - </span>
                {item && 
                    <>
                        <img src={pictures ? getImage(pictures[0]) : ''} alt="item image" className="ApplicationHeaderItemImage"></img>
                        <span className="ApplicationHeaderItemTitle">{item.title}</span>
                    </>}
            </div>
        </div>
    )
}
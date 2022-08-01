import React, { useEffect, useState } from 'react'
import getImage from '../../util/getImage'
import './ApplicationHeader.css'
import { isMobile } from 'react-device-detect'
import { HiChevronLeft } from 'react-icons/hi'
import { CREATE_BOOKING } from '../../assets/Data/LBSEnum'
import { useBreakpoint } from '../../util/useBreakpoint'

export default function ApplicationHeader({ page, item, prevPage }) {
    const [ pictures, setPictures ] = useState()

    const breakpoint = useBreakpoint

    useEffect(() => {
        if(!item) return
        setPictures(item.images)
    },[item])

    const renderContent = () => {
        switch(page) {
            case CREATE_BOOKING.AVAILABILITY: {
                return (
                    <div className="HeaderTextContainer">
                        <HiChevronLeft 
                            onClick={prevPage}
                            className='BannerBackBtn'
                        />
                        <span className="ApplicationHeaderHeading">Apply For Product</span>
                        <span className="ApplicationHeaderSubheading">{`${!isMobile ? " -" : ''}Select pick up date and time`}</span>
                    </div>
                   
                )
            }
            case CREATE_BOOKING.OPTION: {
                return (
                    <div className="HeaderTextContainer">
                        <HiChevronLeft 
                            onClick={prevPage}
                            className='BannerBackBtn'
                        />
                        <span className="ApplicationHeaderHeading">Book your stuff</span> 
                        <span className="ApplicationHeaderSubheading">{`${!isMobile ? " -" : ''}Make your borrowing easier`}</span>
                    </div>
                )
            }
            case CREATE_BOOKING.OVERVIEW: {
                return (
                <div className="HeaderTextContainer">
                    <HiChevronLeft 
                        onClick={prevPage}
                        className='BannerBackBtn'
                    />
                    <span className="ApplicationHeaderHeading">Book your stuff</span> 
                    <span className="ApplicationHeaderSubheading">{`${!isMobile ? " -" : ''}Please check we've got everything right`}</span>
                </div>
                )
            }
        }
    }
    return (
        <div className="ApplicationHeaderContainer FlexBookingContainer">
            { renderContent() }
            { !isMobile &&
            <div className="ItemDetails ">
                <span className="ApplicationHeaderHeading">Item - </span>
                {item && 
                    <>
                        <img src={pictures ? getImage(pictures[0]?.imageKey) : ''} alt="item image" className="ApplicationHeaderItemImage"></img>
                        <span className="ApplicationHeaderItemTitle">{item.title}</span>
                    </>}
            </div>}
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import './imagesModal.css'
import CloseIcon from '@material-ui/icons/Close'
import { Fade } from '@material-ui/core'
import getImage from '../../util/getImage'

export default function ImagesModal({ setModal, images, modal }) {
    const itemImages = images

    const [ currentImageIndex, setCurrentImageIndex ] = useState(0)

    const getBigImages = (currentIndex) => {
        let content = []
        // Push off screen left if we're not on first image
        if (currentIndex > 0) {
            content.push(
            <img 
                src={getImage(itemImages[currentIndex - 1]?.imageKey)} 
                alt="left" 
                className="ImageModalImage OffScreenBackward" 
                key={currentIndex - 1} 
                onClick={(e) => {
                    setCurrentImageIndex(currentImageIndex - 1)
                    e.stopPropagation()
                }}
            />
            )
        }
        
        //Push off screen right if we're not on last image
        if (currentIndex < itemImages.length - 1) {
            content.push(
                <img 
                    src={getImage(itemImages[currentIndex + 1]?.imageKey)} 
                    alt="right" 
                    className="ImageModalImage OffScreenForward" 
                    key={currentIndex + 1} 
                    onClick={(e) => {
                        setCurrentImageIndex(currentImageIndex + 1)
                        e.stopPropagation()
                    }}
                />
            )
        }

        //Push main focus image
        content.push(
            <img 
                src={getImage(itemImages[currentImageIndex]?.imageKey)} 
                alt="center" 
                className="ImageModalImage" 
                key={currentIndex} 
                onClick={(e) => e.stopPropagation()}
            />
        )
        return content
    }

    const getSmallImages = () => {
        let content = []
        itemImages.map((_, i) => {
            content.push(
                <div className="ImageSmallContainer" key={i}>
                    <img 
                        src={getImage(itemImages[i]?.imageKey)} 
                        alt="" 
                        className={`ImageModalSmall ${i === currentImageIndex ? 'SmallImageActive' : ''}`} 
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div 
                        className={`SmallImageInactive ${i === currentImageIndex ? 'HideOverlay' : ''}`} 
                        onClick={(e) => {
                            setCurrentImageIndex(i)
                            e.stopPropagation()        
                        }}
                    />
                </div>
            )
            return 1
        })
        return content
    }

    const closeModal = () => {
        setModal(false)
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return function releaseScroll() {
            document.body.style.overflow = 'unset'
        }
    },[])

    return (
        <div 
            className="ItemImageModalContainer" 
            onClick={() => closeModal()}
        >
            <Fade in={modal} timeout={500}>
                <div className="CarouselModalFlexContainer">
                    <button 
                        className="ItemImageModalCloseBtn" 
                        onClick={() => closeModal()}
                    >
                        <CloseIcon />
                    </button>
                    <div className="ImageModal">
                        {getBigImages(currentImageIndex)}
                        <div className="ImageNumberDisplay">
                            {currentImageIndex + 1}/{itemImages.length}
                        </div>
                    </div>
                    <div className="ImageModalCarousel">
                        {getSmallImages()}
                    </div>
                </div>
            </Fade>
        </div>
    )
}

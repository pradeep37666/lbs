import React, { useState, useEffect } from 'react';
import './imagesModal.css';
import ItemImage from './../../assets/Images/search_section_bg.jpg';
import CloseIcon from './../../assets/Icons/CloseIcon.png';

export default function ImagesModal(props) {

    const Images = [{ItemImage},{ItemImage},{ItemImage},{ItemImage},{ItemImage}];

    //The image that the modal is currently focused on, default is first image
    const [CurrentImage, setCurrentImage] = useState(0);

    const getBigImages = (currentImage) => {
        let content = [];
        // Push off screen left if we're not on first image
        if (currentImage > 0) content.push(<img src={Images[currentImage - 1].ItemImage} alt="" className="ImageModalImage OffScreenBackward" onClick={() => setCurrentImage(CurrentImage - 1)}/>);
        //Push main focus image
        content.push(<img src={Images[CurrentImage].ItemImage} alt="" className="ImageModalImage"/>)
        //Push off screen right if we're not on last image
        if (currentImage < Images.length - 1) content.push(<img src={Images[currentImage + 1].ItemImage} alt="" className="ImageModalImage OffScreenForward" onClick={() => setCurrentImage(CurrentImage + 1)}/>);
        return content;
    }

    const getSmallImages = () => {
        let content = [];

        Images.map( (image, i) => {
            content.push(
            <div className="ImageSmallContainer">
            <img src={Images[i].ItemImage} alt="" className={`ImageModalSmall ${i === CurrentImage ? 'SmallImageActive' : ''}`}/>
            <div className={`SmallImageInactive ${i === CurrentImage ? 'HideOverlay' : ''}`} onClick={() => setCurrentImage(i)}/>
        </div>)
            return 1;
        })

        return content;
    }

    const closeModal = () => {
        props.setModal(false);
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return function releaseScroll() {
            document.body.style.overflow = 'unset';
        }
    });

    return (
        <div className="ModalWrapperMain">
            <div className="CarouselModalFlexContainer">
            <img className="CloseModalButton" src={CloseIcon} alt="" onClick={() => closeModal()}/>
                <div className="ImageModal">
                    {getBigImages(CurrentImage)}
                    <div className="ImageNumberDisplay">{CurrentImage + 1}/{Images.length}</div>
                </div>

                <div className="ImageModalCarousel">
                    {getSmallImages()}            
                </div>
            </div>
            

        </div>
    )
}

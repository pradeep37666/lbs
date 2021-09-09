import React, { useState, useEffect } from 'react';
import './imagesModal.css';
import ItemImage from './../../assets/Images/search_section_bg.jpg';
import CloseIcon from '@material-ui/icons/Close';
import { Fade } from '@material-ui/core';
import getImage from '../../util/getImage';

export default function ImagesModal(props) {
    console.log('modal images', props.images)
    const Images = props.images;

    //The image that the modal is currently focused on, default is first image
    const [CurrentImage, setCurrentImage] = useState(0);

    const getBigImages = (currentImage) => {
        let content = [];
        // Push off screen left if we're not on first image
        if (currentImage > 0) content.push(<img src={getImage(Images[currentImage - 1])} alt="" className="ImageModalImage OffScreenBackward" key={currentImage - 1} onClick={(e) => {
            setCurrentImage(CurrentImage - 1);
            e.stopPropagation();
        }}/>);
        //Push main focus image
        content.push(<img src={getImage(Images[CurrentImage])} alt="" className="ImageModalImage" key={currentImage} onClick={ (e) => e.stopPropagation()}/>)
        //Push off screen right if we're not on last image
        if (currentImage < Images.length - 1) content.push(<img src={getImage(Images[currentImage + 1])} alt="" className="ImageModalImage OffScreenForward" key={currentImage + 1} onClick={(e) => {
            setCurrentImage(CurrentImage + 1)
            e.stopPropagation();
        }}/>);
        return content;
    }

    const getSmallImages = () => {
        let content = [];

        Images.map( (image, i) => {
            content.push(
            <div className="ImageSmallContainer" key={i}>
            <img src={getImage(Images[i])} alt="" className={`ImageModalSmall ${i === CurrentImage ? 'SmallImageActive' : ''}`} onClick={ (e) => e.stopPropagation()}/>
            <div className={`SmallImageInactive ${i === CurrentImage ? 'HideOverlay' : ''}`} onClick={(e) => {
                setCurrentImage(i);
                e.stopPropagation();            
            }}/>
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
        <div className="ModalWrapperMain" onClick={ () => {
            closeModal();
        }}>
            <Fade in={props.modal} timeout={500}>
                <div className="CarouselModalFlexContainer">
                    <button className="CloseModalButton ImageModalClose" onClick={() => closeModal()}><CloseIcon /></button>

                    <div className="ImageModal">
                        {getBigImages(CurrentImage)}
                        <div className="ImageNumberDisplay">{CurrentImage + 1}/{Images.length}</div>
                    </div>

                    <div className="ImageModalCarousel">
                        {getSmallImages()}
                    </div>
                </div>
            </Fade>

        </div>
    )
}

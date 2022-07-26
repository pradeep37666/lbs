import React from 'react'
import getImage from '../../util/getImage'

const ItemImages = ({ itemPictures, openImageModal }) => {
    return (
        <>
            <img 
                src={getImage(itemPictures[0]?.imageKey)} 
                alt='main image' 
                className="ItemImageMain" 
                onClick={openImageModal}
            />
            <div className="ItemImageSecondary">
                {itemPictures[1] &&
                    <div 
                        className="SecondaryItemImageContainer"
                        onClick={openImageModal}
                    >
                        <img 
                            src={getImage(itemPictures[1]?.imageKey)} 
                            alt='second image' 
                            className="SecondaryItemImage" 
                            style={{ borderRadius: "0 0 0 15px" }} 
                        />
                    </div>
                }
                {itemPictures[2] &&
                    <div className="SecondaryItemImageContainer">
                        <img 
                            src={getImage(itemPictures[2]?.imageKey)} 
                            alt='third image' 
                            className="SecondaryItemImage OpenModalImage" 
                            style={{ borderRadius: "0 0 15px 0" }} 
                        />
                        {itemPictures[3] &&
                            <div className="NavyOverlay">
                                <button 
                                    className="ImageModalButton" 
                                    onClick={openImageModal}
                                >
                                    View All
                                </button>
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default ItemImages
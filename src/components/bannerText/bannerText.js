import React from 'react';
import './bannerText.css';

export default function bannerText(props) {
    return (
        <div className="Banner">
            <div className="BannerText">{props.textBold}<span className="BannerTextNormal">&nbsp;-&nbsp;{props.textNormal}</span></div>
        </div>
    )
}

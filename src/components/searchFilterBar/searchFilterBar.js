import React, { useState } from 'react';
import './searchFilterBar.css';
import CarIcon from './../../assets/Icons/AutomotiveIcon.svg';
import BBQIcon from './../../assets/Icons/BBQIcon.svg';
import CleaningIcon from './../../assets/Icons/CleaningIcon.svg';
import CreativeIcon from './../../assets/Icons/CreativeIcon.svg';
import DrillIcon from './../../assets/Icons/DrillIcon.svg';
import HammerIcon from './../../assets/Icons/HammerIcon.svg';
import OfficeIcon from './../../assets/Icons/OfficeIcon.svg';
import PaintingIcon from './../../assets/Icons/PaintingIcon.svg';
import SportingIcon from './../../assets/Icons/SportingIcon.svg';
import MowingIcon from './../../assets/Icons/MowingIcon.svg';
import StarOutline from './../../assets/Icons/StarOutline.svg';
import StarFilled from './../../assets/Icons/StarFilled.svg';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import GoogleMapReact from 'google-map-react';

const LocationSlider = withStyles({
    root: {
      color: '#b03b4b',
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      marginTop: -11,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    track: {
      height: 3,
    },
    rail: {
      height: 3,
    },
  })(Slider);

export default function SearchFilterBar() {
    const [ActiveFilter, setActiveFilter] = useState('none');
    const [Category, setCategory] = useState('none');
    const [PostCode, setPostCode] = useState();
    const [SearchRadius, setSearchRadius] = useState(10);
    const [PriceMin, setPriceMin] = useState();
    const [PriceMax, setPriceMax] = useState();
    const [Rating, setRating] = useState(1);
    const [Delivery, setDelivery] = useState(false);

    const defaultProps = {
        center: {
        lat: -27.481009,
        lng: 153.040596
        },
        zoom: 15
      };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    }

    const handlePostcodeChange = (e) => {
        let postcode = e.target.validity.valid ? e.target.value : PostCode;
        postcode = postcode.slice(0, 4);
        setPostCode(postcode);
    }

    const handlePriceMinChange = (e) => {
        let price = e.target.validity.valid ? e.target.value : PriceMin;
        price = price.slice(0, 4);
        setPriceMin(price);
    }

    const handlePriceMaxChange = (e) => {
        let price = e.target.validity.valid ? e.target.value : PriceMax;
        price = price.slice(0, 4);
        setPriceMax(price);
    }

    const getCategoryPopout = () => {
        return (
            <div className="FilterPopout FilterPopoutCat" onClick={(e) => e.stopPropagation()}>
                <hr className="hl hlPopout"/>
                <div className="MainBodyPopout">
                    <div className="CategoryFiltersFlex">
                        <div className={`CategoryFilterDiv ${Category === 'Tools' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('Tools')}}><img src={HammerIcon} alt="" className="CategoryFilterIcon"/>Tools</div>
                        <div className={`CategoryFilterDiv ${Category === 'Painting' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('Painting')}}><img src={PaintingIcon} alt="" className="CategoryFilterIcon"/>Painting</div>
                        <div className={`CategoryFilterDiv ${Category === 'BBQ' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('BBQ')}}><img src={BBQIcon} alt="" className="CategoryFilterIcon"/>BBQ</div>
                        <div className={`CategoryFilterDiv ${Category === 'Office' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('Office')}}><img src={OfficeIcon} alt="" className="CategoryFilterIcon"/>Office</div>
                        <div className={`CategoryFilterDiv ${Category === 'Creative' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('Creative')}}><img src={CreativeIcon} alt="" className="CategoryFilterIcon"/>Creative</div>
                        <div className={`CategoryFilterDiv ${Category === 'Power Tools' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('Power Tools')}}><img src={DrillIcon} alt="" className="CategoryFilterIcon"/>Power Tools</div>
                        <div className={`CategoryFilterDiv ${Category === 'Automotive' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('Automotive')}}><img src={CarIcon} alt="" className="CategoryFilterIcon"/>Automotive</div>
                        <div className={`CategoryFilterDiv ${Category === 'Mowing' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('Mowing')}}><img src={MowingIcon} alt="" className="CategoryFilterIcon"/>Mowing</div>
                        <div className={`CategoryFilterDiv ${Category === 'Cleaning' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('Cleaning')}}><img src={CleaningIcon} alt="" className="CategoryFilterIcon"/>Cleaning</div>
                        <div className={`CategoryFilterDiv ${Category === 'Sporting' ? 'CategoryFilterDivActive' : ''}`} onClick={() => {setCategory('Sporting')}}><img src={SportingIcon} alt="" className="CategoryFilterIcon"/>Sporting</div>
                    </div>
                    <button className="FilterButtonSave" onClick={() => setActiveFilter('none')}>Save</button>
                </div>
            </div>
        )
    }

    const getLocationPopout = () => {
        return (
            <div className="FilterPopout FilterPopoutLoc" onClick={(e) => e.stopPropagation()}>
                <hr className="hl hlPopout"/>
                <div className="MainBodyPopout">
                    <div className="PostcodeText">Postcode</div>
                    <div className="PostcodeFlex">
                    <input type="text" pattern="[0-9]*" value={PostCode} className="PostcodeInput" placeholder="4000" onChange={(e) => handlePostcodeChange(e)}/>
                    <button className="FilterButtonSave" onClick={() => setActiveFilter('none')}>Save</button>
                    </div>
                    <div className="PostcodeText">Search radius</div>
                    <div className="SearchRadiusText">Set the neighbourhood where you want to search.</div>
                    <div className="LocationSliderFlex">
                        <LocationSlider aria-label="search radius" defaultValue={10} max={20} min={2} onChange={(e, val) => setSearchRadius(val)}/>
                        <div className="SearchRadiusValue">{SearchRadius}km</div>
                    </div>
                    <div className="MapContainerSmall">
                        <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyB98s0INvtxhs22OxCOEIjE_--kb54qhlQ' }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        >
                        </GoogleMapReact>
                    </div>
                </div>
            </div>
        )
    }

    const getPricePopout = () => {
        return (
            <div className="FilterPopout FilterPopoutPrice" onClick={(e) => e.stopPropagation()}>
                <hr className="hl hlPopout"/>
                <div className="MainBodyPopout">
                    <div className="MinMaxFlex">
                        <div>
                            <div className="MinMaxHeader">Minimum ($)</div>
                            <input type="text" pattern="[0-9]*" value={PriceMin} className="PriceInput" placeholder="0" onChange={(e) => handlePriceMinChange(e)}/>
                        </div>

                        <div>
                            <div className="MinMaxHeader">Maximum ($)</div>
                            <input type="text" pattern="[0-9]*" value={PriceMax} className="PriceInput" placeholder="100" onChange={(e) => handlePriceMaxChange(e)}/>
                        </div>
                    </div>
                    <div className="SaveButtonFlex">
                        <button className="FilterButtonSave" onClick={() => setActiveFilter('none')}>Save</button>
                    </div>
                </div>
            </div>
        )
    }

    const getRatingPopout = () => {
        return (
            <div className="FilterPopout FilterPopoutRating" onClick={(e) => e.stopPropagation()}>
                <hr className="hl hlPopout"/>
                <div className="MainBodyPopout">
                    <div className="RatingFilterHeader">{Rating} Star{Rating === 1 ? '' : 's'}</div>
                    <div className="StarsFlex">
                    <img src={StarFilled} alt="" className="StarIcon" onClick={() => setRating(1)}/>
                    <img src={Rating >= 2 ? StarFilled : StarOutline} onClick={() => setRating(2)} alt="" className="StarIcon"/>
                    <img src={Rating >= 3 ? StarFilled : StarOutline} onClick={() => setRating(3)} alt="" className="StarIcon"/>
                    <img src={Rating >= 4 ? StarFilled : StarOutline} onClick={() => setRating(4)} alt="" className="StarIcon"/>
                    <img src={Rating >= 5 ? StarFilled : StarOutline}  onClick={() => setRating(5)} alt="" className="StarIcon"/>
                    </div>
                
                    <div className="SaveButtonFlex">
                        <button className="FilterButtonSave" onClick={() => setActiveFilter('none')}>Save</button>
                    </div>
                </div>
            </div>
        )
    }

    const getDeliveryPopout = () => {
        return (
            <div className="FilterPopout FilterPopoutDel" onClick={(e) => e.stopPropagation()}>
                <hr className="hl hlPopout"/>
                <div className="MainBodyPopout">
                    <div className="DeliveryFlex">
                        <button className={`DeliveryButton ${Delivery ? '' : 'DeliveryButtonInactive'}`} onClick={() => setDelivery(true)}>Yes</button>
                        <button className={`DeliveryButton ${Delivery ? 'DeliveryButtonInactive' : ''}`} onClick={() => setDelivery(false)}>No</button>
                        <button className="FilterButtonSave" onClick={() => setActiveFilter('none')}>Save</button>
                    </div>
                    
                </div>
            </div>
        )
    }

    return (
        <div className="SearchFilterBar">
                <div className="SearchFilterBarFlex">
                    <div onClick={() => handleFilterClick('Category')} className="FilterContainer"><span className={`SearchFilterText ${ActiveFilter === 'Category' ? 'FilterActive' : ''}`}>Category</span>
                    {ActiveFilter === 'Category' ? getCategoryPopout() : ''}
                    </div>
                    <div onClick={() => handleFilterClick('Location')} className="FilterContainer"><span className={`SearchFilterText ${ActiveFilter === 'Location' ? 'FilterActive' : ''}`}>Location/Postcode</span>
                    {ActiveFilter === 'Location' ? getLocationPopout() : ''}
                    </div>
                    <div onClick={() => handleFilterClick('Price')} className="FilterContainer"><span className={`SearchFilterText ${ActiveFilter === 'Price' ? 'FilterActive' : ''}`}>Price</span>
                    {ActiveFilter === 'Price' ? getPricePopout() : ''}                    
                    </div>
                    <div onClick={() => handleFilterClick('Rating')} className="FilterContainer"><span className={`SearchFilterText ${ActiveFilter === 'Rating' ? 'FilterActive' : ''}`}>Rating</span>
                    {ActiveFilter === 'Rating' ? getRatingPopout() : ''}
                    </div>
                    <div onClick={() => handleFilterClick('Delivery')} className="FilterContainer"><span className={`SearchFilterText ${ActiveFilter === 'Delivery' ? 'FilterActive' : ''}`}>Delivery</span>
                    {ActiveFilter === 'Delivery' ? getDeliveryPopout() : ''}
                    </div>
                </div>
            </div>
    )
}

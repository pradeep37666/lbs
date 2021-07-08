import React, { useState } from 'react';
import './searchFilterBar.css';

export default function SearchFilterBar() {
    const [ActiveFilter, setActiveFilter] = useState('none');

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    }

    const getCategoryPopout = () => {
        return (
            <div className="FilterPopout">
                <hr className="hl hlPopout"/>
                <div className="MainBodyPopout">
                categories wow
                </div>
            </div>
        )
    }

    const getLocationPopout = () => {
        return (
            <div>
                Location wow
            </div>
        )
    }

    const getPricePopout = () => {
        return (
            <div>
                Price wow
            </div>
        )
    }

    const getRatingPopout = () => {
        return (
            <div>
                rating wow
            </div>
        )
    }

    const getDeliveryPopout = () => {
        return (
            <div>
                delivery wow
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

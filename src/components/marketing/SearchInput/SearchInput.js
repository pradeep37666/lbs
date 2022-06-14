import React, { useState } from 'react'
import './SearchInput.css'
import CategorySelect from '../../categorySelect/categorySelect'
import RatingSelect from '../../ratingSelect/ratingSelect'
import SelectInput from '../../selectInput/selectInput'
import TextInput from '../../textInput/textInput'
import SearchIcon from '../../../assets/Icons/SearchIcon.svg'
import { useHistory } from 'react-router-dom'

const SearchInput = () => {
    const [ keywords, setKeywords ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ location, setLocation ] = useState('')
    const [ priceMin, setPriceMin ] = useState('')
    const [ priceMax, setPriceMax ] = useState('')
    const [ rating, setRating ] = useState('')
    const [ delivery, setDelivery ] = useState('')
    const history = useHistory('')

    const formatSearchParams = () => {
        let string = ''
        if (keywords)   string = string.concat('?keyword=' + keywords)
        else            string = string.concat('?keyword=')
        if (category)   string = string.concat('&category=' + category)
        if (priceMax)   string = string.concat('&maxPrice=' + priceMax)
        if (location)   string = string.concat('&location=' + location)
        if (priceMin)   string = string.concat('&minPrice=' + priceMin)
        if (rating)     string = string.concat('&rating=' + rating)
        if (delivery === '') {}
        else if (delivery === 'Available') 
            string = string.concat('&delivery=1')
        else
            string = string.concat('&delivery=0')
        history.push(`/search/${string}`)
    }

    const handleSubmit = () => {
        formatSearchParams()
    }

    return (
        <>
            <div className="SearchSectionFilters">
                <div className="SearchFiltersRowFlex responsive_container">
                    <div className="SearchInputContainer">
                        <TextInput 
                            width="100%" 
                            label="Keywords" 
                            fontSize="20px" 
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                    </div>
                    <div className="SearchInputContainer">
                        <CategorySelect 
                            width="100%" 
                            label="Category" 
                            setCategory={setCategory}
                        />
                    </div>
                    <div style={{ width: '25%', minWidth: '9rem'}}>
                        <TextInput 
                            width="100%" 
                            label="Location" 
                            fontSize="20px" 
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>

                <hr className="DividingLine"/>

                <div className="SearchFiltersRowFlex responsive_container">
                    <div className="PriceFilterSearch">
                        <div className="PriceFilterContainer">
                            <SelectInput 
                                className="PriceFilterSelect" 
                                borders={false} 
                                label="$ Min" 
                                options={['','10', '20', '30', '40', '50', '60', '70', '80']} 
                                onChange={(e) => setPriceMin(e.target.value)}
                            />
                        </div>
                    <div className="vl"/>
                    <div className="PriceFilterContainer">
                        <SelectInput 
                            className="PriceFilterSelect" 
                            label="$ Max" 
                            options={['','10', '20', '30', '40', '50', '60', '70', '80']} 
                            onChange={(e) => setPriceMax(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{ width: '25%', minWidth: '9rem'}}>
                    <RatingSelect 
                        width="100%" 
                        label="Minimum Rating" 
                        fontSize="20px" 
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <div style={{ width: '25%', minWidth: '9rem'}}>
                    <SelectInput 
                        width="100%" 
                        label="Delivery" 
                        borders={true} 
                        fontSize="20px" 
                        options={['' , 'Available', 'Unavailable']} 
                        onChange={(e) => setDelivery(e.target.value)}
                    />
                </div>
                </div>

            </div>
            <div>
                <button 
                    className="SearchButtonLarge responsive_search_button" 
                    onClick={handleSubmit}
                >
                <div className="SearchButtonLargeFlex">
                    <img src={SearchIcon} alt="search button" className="SearchIcon35"/>
                    <div>Search</div>
                </div>

                </button>
            </div>
        </>
    )
}

export default SearchInput
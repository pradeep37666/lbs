import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SearchBarIcon } from '../../../assets/Images/Marketings/Marketings'
import './SearchBar.css'

const SearchBar = () => {
    const [ searchText, setSearchText ] = useState('')
    const history = useHistory()

    const handleSearch = () => {
        let string = ''
        if (searchText) 
            string = string.concat('?keyword=' + searchText)
        else 
            string = string.concat('?keyword=')
        history.push(`/search/${string}`)
    }

    return (
        <div className='search_bar_container'>
            <input 
                type='text'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder='Search Items'
                className='search_bar_text_input'
            />
            <button
                className='search_bar_btn'
                onClick={handleSearch}
            >
                <SearchBarIcon className='search_bar_icon'/>
            </button>
        </div>
    )
}

export default SearchBar
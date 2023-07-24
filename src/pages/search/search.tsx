import React, { useState, useEffect } from 'react'
import './search.css'
import PageWrapper from '../../components/pageWrapper/pageWrapper.js'
import ItemCard from '../../components/itemCard/itemCard.js'
import SearchFilterBar from '../../components/searchFilterBar/searchFilterBar.js'
import { Item, ItemCategoriesEnum } from '../../types/Item'
import { makeStyles, withStyles } from '@material-ui/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import ArrowDown from '@material-ui/icons/ExpandMore'
import Instance from '../../util/axios'
import { CircularProgress } from '@material-ui/core'
import { useLocation } from 'react-router'
import axios from 'axios'

type ParsedSearchParams = {
  category?: ItemCategoriesEnum
  distance?: string
  keyword: string
  maxPrice?: string
  minPrice?: string
  rating?: string
  delivery?: '1' | '0'
  location?: string
  lat?: string
  lng?: string
}

export default function Search() {
  const location = useLocation()
  const [searchItems, setSearchItems] = useState<Item[]>([])
  const [priceAscending, setPriceAscending] = useState<Item[]>([])
  const [priceDescending, setPriceDescending] = useState<Item[]>([])
  const [ratingAscending, setRatingAscending] = useState<Item[]>([])
  const [ratingDescending, setRatingDescending] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [suggestedItems, setSuggestedItems] = useState<Item[]>([])
  const [searchPage, setSearchPage] = useState(1)
  const [sortBy, setSortBy] = useState('Nothing Selected')
  const numSearchPages = Math.ceil(searchItems?.length / 8)

  const queryString = require('query-string')
  const parsedSearchParams: ParsedSearchParams = queryString.parse(
    location.search
  )

  console.log('PARAMS', parsedSearchParams)

  useEffect(() => {
    getSearchItems()
  }, [location.search])

  const getSearchItems = async () => {
    try {
      const { data: searchData } = await Instance.get(
        `items/search${formatSearchParams()}`
      )

      if (searchData.count > 0) {
        setSearchItems(searchData.data)
        setPriceAscending(searchData.data)
        setPriceDescending(searchData.data)
      } else {
        setSearchItems([])
        setPriceAscending([])
        setPriceDescending([])
      }
      const { data: suggestData } = await Instance.get(
        `items/search${formatSearchParams()}`
      )
      if (suggestData.count) setSuggestedItems(suggestData.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response)
      }
    } finally {
      setLoading(false)
    }
  }

  const formatSearchParams = () => {
    let searchQuery = ''
    const {
      keyword,
      category,
      delivery,
      location,
      maxPrice,
      minPrice,
      rating,
      distance,
      lat,
      lng,
    } = parsedSearchParams
    if (keyword) {
      searchQuery = searchQuery.concat('?keyword=' + keyword)
    } else {
      searchQuery = searchQuery.concat('?keyword=')
    }
    if (category) {
      switch (String(category.trim())) {
        case 'DIY':
          searchQuery += `&category=${encodeURIComponent('DIY & Garden')}`
          break
        case 'Babies':
          searchQuery += `&category=${encodeURIComponent('Babies & Kids')}`
          break
        case 'Gaming':
          searchQuery += `&category=${encodeURIComponent('Gaming & Toys')}`
          break
        case 'Parties':
          searchQuery += `&category=${encodeURIComponent('Parties & Events')}`
          break
        case 'Outdoor':
          searchQuery += `&category=${encodeURIComponent('Outdoor & Sport')}`
          break
        default:
          searchQuery += `&category=${encodeURIComponent(category)}`
      }
    }
    if (rating) {
      searchQuery = searchQuery.concat('&rating=' + rating)
    }
    if (location) {
      searchQuery = searchQuery.concat('&location=' + location)
    }
    if (Number(minPrice) !== 0 && minPrice)
      searchQuery = searchQuery.concat('&minPrice=' + minPrice)
    if (Number(maxPrice) !== 100000000 && maxPrice)
      searchQuery = searchQuery.concat('&maxPrice=' + maxPrice)
    if (distance !== '0' && distance !== '1' && distance && lng && lat) {
      searchQuery = searchQuery.concat(
        '&distance=' + distance + `&lat=${lat}&lng=${lng}`
      )
    }
    if (delivery === '1') {
      searchQuery = searchQuery.concat('&delivery=1')
    } else if (delivery === '0') {
      searchQuery = searchQuery.concat('&delivery=0')
    } else {
      searchQuery = searchQuery
    }

    searchQuery = searchQuery.concat(`&offset=0&limit=100`)
    return searchQuery
  }

  const getSearchPages = () => {
    let content = []
    for (let i = 1; i < numSearchPages + 1; i++) {
      content.push(
        <div
          className={`PaginationPage ${
            searchPage === i ? 'PaginationPageActive' : ''
          }`}
          onClick={() => setSearchPage(i)}
          key={i}
        >
          {i}
        </div>
      )
    }
    return content
  }

  const handlePaginationButtonClick = (direction: string) => {
    if (direction === 'forward') {
      searchPage === numSearchPages
        ? setSearchPage(1)
        : setSearchPage(searchPage + 1)
    } else {
      searchPage === 1
        ? setSearchPage(numSearchPages)
        : setSearchPage(searchPage - 1)
    }
  }

  const getSearchResultsPage = () => {
    let content = []
    const startIndex = (searchPage - 1) * 8
    let numResults = startIndex + 8
    if (searchPage === numSearchPages || searchItems.length < 8) {
      numResults = startIndex + (searchItems.length - (searchPage - 1) * 8)
    }
    for (let i = startIndex; i < numResults; i++) {
      content.push(
        <ItemCard favourited={false} item={searchItems[i]} key={i} />
      )
    }
    return content
  }

  const getSearchResultsMain = () => {
    return (
      <div>
        <div className='SearchItemCardSection' style={{ padding: '1em .5em' }}>
          {getSearchResultsPage()}
        </div>

        <div className='PaginationSection'>
          <div className='PagesText'>Pages</div>
          <div className='PaginationFlex'>
            <div
              className='PaginationArrow'
              onClick={() => handlePaginationButtonClick('backward')}
            >
              {'<'}
            </div>
            {getSearchPages()}
            <div
              className='PaginationArrow'
              onClick={() => handlePaginationButtonClick('forward')}
            >
              {'>'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const sortPriceLowToHigh = () => {
    setSearchItems(prevItems =>
      prevItems.slice().sort((a, b) => a.price - b.price)
    )
  }

  const sortPriceHighToLow = () => {
    setSearchItems(prevItems =>
      prevItems.slice().sort((a, b) => b.price - a.price)
    )
  }
  const sortRatingLowToHigh = () => {
    const sortedItems = [...searchItems].sort((a, b) => a.rating - b.rating)
    setSearchItems(sortedItems)
  }

  const sortRatingHighToLow = () => {
    const sortedItems = [...searchItems].sort((a, b) => b.rating - a.rating)
    setSearchItems(sortedItems)
  }

  const randomItemsMapper = () => {
    if (suggestedItems.length > 0) {
      return suggestedItems.map((items, index) => {
        return <ItemCard favourited={false} item={items} key={index} />
      })
    }
  }

  const handleChange = (event: any) => {
    const selectedValue = event.target.value
    setSortBy(selectedValue)

    if (selectedValue === 'Rating - Low to High') {
      sortRatingLowToHigh()
    } else if (selectedValue === 'Rating - High to Low') {
      sortRatingHighToLow()
    } else if (selectedValue === 'Price - Low to High') {
      sortPriceLowToHigh()
    } else if (selectedValue === 'Price - High to Low') {
      sortPriceHighToLow()
    } else {
    }
  }

  const classes = useStyles()
  return (
    <PageWrapper>
      <SearchFilterBar
        keyWord={parsedSearchParams.keyword}
        address={{ lat: parsedSearchParams.lat, lng: parsedSearchParams.lng }}
      />
      {loading ? (
        <div className='ItemPage__Loading__Container'>
          <CircularProgress size={75} />
        </div>
      ) : (
        <div className='SearchMainContainer' style={{ marginBottom: '2%' }}>
          <div className='SearchSortFlex'>
            <div className='SearchMainText'>
              Search results for:{' '}
              <span style={{ fontWeight: 'normal' }}>
                {parsedSearchParams.keyword}
              </span>
            </div>
            <div className='SearchMainText'>
              Sort by:
              <Select
                onChange={handleChange}
                input={<BootstrapInput />}
                className={`${classes.select} pr-3`}
                IconComponent={ArrowDown}
                value={sortBy}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 250,
                    horizontal: -50,
                  },
                  transformOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null,
                  classes: {
                    paper: classes.dropDown,
                  },
                }}
              >
                <MenuItem
                  value='Nothing Selected'
                  style={{
                    display: 'none',
                  }}
                >
                  {sortBy}
                </MenuItem>
                <MenuItem
                  value='Price - Low to High'
                  onClick={() => {
                    sortPriceLowToHigh()
                  }}
                >
                  Price - Low to High
                </MenuItem>
                <MenuItem
                  value='Price - High to Low'
                  onClick={() => sortPriceHighToLow()}
                >
                  Price - High to Low
                </MenuItem>
                <MenuItem
                  value='Rating - Low to High'
                  onClick={() => sortRatingLowToHigh()}
                >
                  Rating - Low to High
                </MenuItem>
                <MenuItem
                  value='Rating - High to Low'
                  onClick={() => sortRatingHighToLow()}
                >
                  Rating - High to Low
                </MenuItem>
              </Select>
            </div>
          </div>

          {searchItems.length > 0 ? (
            getSearchResultsMain()
          ) : (
            <div>No results found, try searching with different options.</div>
          )}

          <div className='SuggestedItemsSection'>
            <div className='SearchMainText'>
              Suggested items outside your search for:{' '}
              <span style={{ fontWeight: 'normal' }}>
                {parsedSearchParams.keyword}
              </span>
            </div>

            {searchItems.length > 0 ? (
              <div className='ItemCardSection' style={{ padding: '1em .5em' }}>
                {/* Need the similar items backend for this section, placeholder first item from search for now */}

                {randomItemsMapper()}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

const BootstrapInput = withStyles(theme => ({
  input: {
    display: 'inline',
    paddingLeft: '.3em',
    textAlign: 'left',
    fontSize: '20px',
    fontFamily: ['DMSans, sans-serif'].join(','),
    '&:focus': {
      backgroundColor: '#FFFFFF',
      borderRadius: '15px',
    },
  },
}))(InputBase)

const useStyles = makeStyles({
  dropDown: {
    border: '2px solid #95272f',
    padding: '1em',
    borderRadius: '15px',
    boxSizing: 'content-box',
    '& .MuiMenuItem-root': {
      fontFamily: 'DMSans, sans-serif',
    },
  },
  select: {
    fontWeight: 'normal',
    '& .MuiSvgIcon-root': {
      color: '#95272f',
      marginRight: '6px',
    },
  },
})

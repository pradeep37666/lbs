import Slider from '@material-ui/core/Slider'
import { withStyles } from '@material-ui/core/styles'
import { useEffect, useRef, useState } from 'react'
import Geocode from 'react-geocode'
import { useHistory, useLocation } from 'react-router'
import { ITEM_CATEGORIES } from '../../assets/Data/LBSSelectOptions'
import MapsAutocomplete from '../mapsAutocomplete/MapsAutocomplete'
import CarIcon from './../../assets/Icons/AutomotiveIcon.svg'
import BBQIcon from './../../assets/Icons/BBQIcon.svg'
import CleaningIcon from './../../assets/Icons/CleaningIcon.svg'
import CreativeIcon from './../../assets/Icons/CreativeIcon.svg'
import DrillIcon from './../../assets/Icons/DrillIcon.svg'
import HammerIcon from './../../assets/Icons/HammerIcon.svg'
import MowingIcon from './../../assets/Icons/MowingIcon.svg'
import OfficeIcon from './../../assets/Icons/OfficeIcon.svg'
import PaintingIcon from './../../assets/Icons/PaintingIcon.svg'
import SportingIcon from './../../assets/Icons/SportingIcon.svg'
import { ReactComponent as StarFilled } from './../../assets/Icons/StarFilled.svg'
import { ReactComponent as StarOutline } from './../../assets/Icons/StarOutline.svg'
import './searchFilterBar.css'
import useGlobalState from '../../util/useGlobalState'


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
})(Slider)

export default function SearchFilterBar({ keyWord, address }) {
  const location = useLocation()

  const queryString = require('query-string')

  const parsed = queryString.parse(location.search)
  const {  user } = useGlobalState()?.state

  const history = useHistory()
  const [Delivery, setDelivery] = useState(parsed?.delivery ?? 'Both')
  const [Category, setCategory] = useState(parsed?.category ?? '')
  const [Address, setAddress] = useState(
    address.lat && address.lng ? address : ''
  )
  const [SearchRadius, setSearchRadius] = useState(10)
  const [PriceMin, setPriceMin] = useState(parsed?.minPrice ?? '')
  const [PriceMax, setPriceMax] = useState(parsed?.maxPrice ?? '')
  const [Rating, setRating] = useState(parsed?.rating ?? '')
  const [updateLocation, setUpdateLocation] = useState(false)

  const [activeFilterRef, setActiveFilterRef] = useState(null)

  const handleSubmitFilterChange = () => {
    let string = ''
    if (keyWord) {
      string = string.concat('?keyword=' + keyWord)
    } else {
      string = string.concat('?keyword=')
    }
    if (Category) string = string.concat('&category=' + Category)
    if (Address)
      string = string.concat(
        `&lat=${Address.lat}&lng=${Address.lng}&distance=${SearchRadius}`
      )
    if (PriceMax) string = string.concat('&maxPrice=' + PriceMax)
    if (PriceMin) string = string.concat('&minPrice=' + PriceMin)
    if (Rating) string = string.concat('&rating=' + Rating)
    if (Delivery === 'Both') {
    } else if (Delivery === true) {
      string = string.concat('&delivery=1')
    } else {
      string = string.concat('&delivery=0')
    }
    history.push(`/search/${string}`)
  }

  const handleFilterClick = filter => {
    if (activeFilterRef === filter) {
      setActiveFilterRef(null)
    } else {
      setActiveFilterRef(filter)
    }
  }

  useEffect(() => {
    
    const handleOutsideClick = event => {
      if (
        activeFilterRef &&
        popoutRef.current &&
        !popoutRef.current.contains(event.target)
      ) {
        setActiveFilterRef(null)
      }
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [activeFilterRef])

  const popoutRef = useRef(null)

  const getGeoLocation = input => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
    Geocode.setLanguage('en')
    Geocode.setRegion('au')
    Geocode.setLocationType('ROOFTOP')
    Geocode.enableDebug(false)

    Geocode.fromAddress(input)
      .then(response => {
        if (response.results[0].geometry.location.lat) {
          setAddress({
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (parsed.location) {
      getGeoLocation(parsed.location)
    }
  }, [])

  useEffect(() => {
    if (Delivery === '1') setDelivery(true)
    if (Delivery === '0') setDelivery(false)
    if(Address === ""){
      handleSubmitFilterChange()
    }
    
  }, [Delivery, Category, Rating, Address, updateLocation])

  const handlePriceMinChange = e => {
    let price = e.target.validity.valid ? e.target.value : PriceMin
    price = price.slice(0, 4)
    setPriceMin(price)
  }

  const handlePriceMaxChange = e => {
    let price = e.target.validity.valid ? e.target.value : PriceMax
    price = price.slice(0, 4)
    setPriceMax(price)
  }

  const categories = [
    { name: 'Tools', icon: HammerIcon },
    { name: 'Painting', icon: PaintingIcon },
    { name: 'BBQ', icon: BBQIcon },
    { name: 'Office', icon: OfficeIcon },
    { name: 'Creative', icon: CreativeIcon },
    { name: 'Power Tools', icon: DrillIcon },
    { name: 'Automotive', icon: CarIcon },
    { name: 'Mowing', icon: MowingIcon },
    { name: 'Cleaning', icon: CleaningIcon },
    { name: 'Sporting', icon: SportingIcon },
  ]

  const renderCategories = () => {
    return ITEM_CATEGORIES.map((category, index) => {
      return (
        <div
          key={index}
          className={`CategoryFilterDiv ${Category === category.name ? 'CategoryFilterDivActive' : ''
            }`}
          onClick={() => {
            if (Category === category.name) setCategory('')
            else setCategory(category.name)
            handleSubmitFilterChange()
          }}
        >
          {category.icon}
          <p style={{ marginLeft: '0.5rem' }}>{category.name}</p>
        </div>
      )
    })
  }

  const getCategoryPopout = () => {
    return (
      <div
        ref={popoutRef}
        className={`FilterPopout FilterPopoutCat ${activeFilterRef === 'Category' ? 'FilterPopoutActive' : ''
          }`}
        onClick={e => e.stopPropagation()}
      >
        <hr className='hl hlPopout' />
        <div className='MainBodyPopout'>
          <div className='CategoryFiltersFlex'>{renderCategories()}</div>
        </div>
      </div>
    )
  }

  const getLocationPopout = () => {
    return (
      <div
        ref={popoutRef}
        className={`FilterPopout FilterPopoutLoc ${activeFilterRef === 'Location' ? 'FilterPopoutActive' : ''
          }`}
        onClick={e => e.stopPropagation()}
      >
        <hr className='hl hlPopout' />
        <div className='MainBodyPopout'>
          <MapsAutocomplete setAddress={setAddress} small />
          <div className='PostcodeText'>Search radius</div>

          <div className='LocationSliderFlex'>
            <LocationSlider
              aria-label='search radius'
              defaultValue={40}
              min={2}
              max={400}
              onChange={(e, val) => setSearchRadius(val)}
            />
            <div className='SearchRadiusValue'>{SearchRadius}km</div>
          </div>
          <button
            className={`FilterButtonSave ${Address===""?'ButtonDisabled':''}`}
            disabled={Address===""?true:false}
            onClick={() => {
              handleSubmitFilterChange()
              setUpdateLocation(!updateLocation)
              setActiveFilterRef(null)
            }}
          >
            Save
          </button>
        </div>
      </div>
    )
  }

  const getPricePopout = () => {
    return (
      <div
        ref={popoutRef}
        className={`FilterPopout FilterPopoutPrice ${activeFilterRef === 'Price' ? 'FilterPopoutActive' : ''
          }`}
        onClick={e => e.stopPropagation()}
      >
        <hr className='hl hlPopout' />
        <div className='MainBodyPopout'>
          <div className='MinMaxFlex'>
            <div>
              <div className='MinMaxHeader'>Minimum ($)</div>
              <input
                type='text'
                pattern='[0-9]*'
                value={PriceMin}
                className='PriceInput'
                placeholder='0'
                onChange={e => handlePriceMinChange(e)}
              />
            </div>

            <div>
              <div className='MinMaxHeader'>Maximum ($)</div>
              <input
                type='text'
                pattern='[0-9]*'
                value={PriceMax}
                className='PriceInput'
                placeholder='100'
                onChange={e => handlePriceMaxChange(e)}
              />
            </div>
          </div>
          <div className='SaveButtonFlex'>
            <button
              className='FilterButtonSave'
              onClick={() => {
                setActiveFilterRef(null)
                handleSubmitFilterChange()
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getRatingPopout = () => {
    return (
      <div
        ref={popoutRef}
        className={`FilterPopout FilterPopoutRating ${activeFilterRef === 'Rating' ? 'FilterPopoutActive' : ''
          }`}
        onClick={e => e.stopPropagation()}
      >
        <hr className='hl hlPopout' />
        <div className='MainBodyPopout'>
          <div className='RatingFilterHeader'>
            {Rating} Star{Rating === 1 ? '' : 's'}
          </div>
          <div className='StarsFlex'>
            <StarFilled
              className='StarIcon StarClick'
              fill='#E9D8B4'
              onClick={() => setRating(1)}
            />
            {Rating >= 2 ? (
              <StarFilled
                className='StarIcon StarClick'
                fill='#E9D8B4'
                onClick={() => {
                  setRating(2)
                  handleSubmitFilterChange()
                }}
              />
            ) : (
              <StarOutline
                className='StarIcon StarClick'
                onClick={() => setRating(2)}
              />
            )}
            {Rating >= 3 ? (
              <StarFilled
                className='StarIcon StarClick'
                fill='#E9D8B4'
                onClick={() => {
                  setRating(3)
                  handleSubmitFilterChange()
                }}
              />
            ) : (
              <StarOutline
                className='StarIcon StarClick'
                onClick={() => setRating(3)}
              />
            )}
            {Rating >= 4 ? (
              <StarFilled
                className='StarIcon StarClick'
                fill='#E9D8B4'
                onClick={() => {
                  setRating(4)
                  handleSubmitFilterChange()
                }}
              />
            ) : (
              <StarOutline
                className='StarIcon StarClick'
                onClick={() => setRating(4)}
              />
            )}
            {Rating >= 5 ? (
              <StarFilled
                className='StarIcon StarClick'
                fill='#E9D8B4'
                onClick={() => {
                  setRating(5)
                  handleSubmitFilterChange()
                }}
              />
            ) : (
              <StarOutline
                className='StarIcon StarClick'
                onClick={() => setRating(5)}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  const getDeliveryPopout = () => {
    return (
      <div
        ref={popoutRef}
        className={`FilterPopout FilterPopoutDel ${activeFilterRef === 'Delivery' ? 'FilterPopoutActive' : ''
          }`}
        onClick={e => e.stopPropagation()}
      >
        <hr className='hl hlPopout' />
        <div className='MainBodyPopout'>
          <div className='DeliveryFlex'>
            <button
              className={`DeliveryButton ${Delivery === true ? '' : 'DeliveryButtonInactive'
                }`}
              onClick={() => {
                Delivery !== true ? setDelivery(true) : setDelivery('Both')
              }}
            >
              Yes
            </button>
            <button
              className={`DeliveryButton ${Delivery === false ? '' : 'DeliveryButtonInactive'
                }`}
              onClick={() => {
                Delivery !== false ? setDelivery(false) : setDelivery('Both')
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='SearchFilterBar'>
      <div className='SearchFilterBarFlex'>
        <div
          onClick={() => handleFilterClick('Category')}
          className='FilterContainer'
        >
          <span
            className={`SearchFilterText ${activeFilterRef === 'Category' ? 'FilterActive' : ''
              }`}
          >
            Category
          </span>
          {activeFilterRef === 'Category' ? getCategoryPopout() : ''}
        </div>
        <div
          onClick={() => handleFilterClick('Location')}
          className='FilterContainer'
        >
          <span
            className={`SearchFilterText ${activeFilterRef === 'Location' ? 'FilterActive' : ''
              }`}
          >
            Location/Postcode
          </span>
          {activeFilterRef === 'Location' ? getLocationPopout() : ''}
        </div>
        <div
          onClick={() => handleFilterClick('Price')}
          className='FilterContainer'
        >
          <span
            className={`SearchFilterText ${activeFilterRef === 'Price' ? 'FilterActive' : ''
              }`}
          >
            Price
          </span>
          {activeFilterRef === 'Price' ? getPricePopout() : ''}
        </div>
        <div
          onClick={() => handleFilterClick('Rating')}
          className='FilterContainer'
        >
          <span
            className={`SearchFilterText ${activeFilterRef === 'Rating' ? 'FilterActive' : ''
              }`}
          >
            Rating
          </span>
          {activeFilterRef === 'Rating' ? getRatingPopout() : ''}
        </div>
        <div
          onClick={() => handleFilterClick('Delivery')}
          className='FilterContainer'
        >
          <span
            className={`SearchFilterText ${activeFilterRef === 'Delivery' ? 'FilterActive' : ''
              }`}
          >
            Delivery
          </span>
          {activeFilterRef === 'Delivery' ? getDeliveryPopout() : ''}
        </div>
      </div>
    </div>
  )
}

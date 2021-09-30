import React, { useState, useEffect } from 'react';
import './home.css';
import PageWrapper from "./../../components/pageWrapper/pageWrapper.js";
import TextInput from '../../components/textInput/textInput.js';
import SelectInput from '../../components/selectInput/selectInput.js';
import CategorySelect from '../../components/categorySelect/categorySelect.js';
import RatingSelect from '../../components/ratingSelect/ratingSelect.js';
import SearchIcon from '../../assets/Icons/SearchIcon.svg';
import ItemCard from '../../components/itemCard/itemCard';
import WateringCanIcon from '../../assets/Icons/GardeningIcon.svg';
import {ReactComponent as HammerIcon} from '../../assets/Icons/HammerIcon.svg';
import {ReactComponent as CarIcon} from '../../assets/Icons/AutomotiveIcon.svg';
import {ReactComponent as DrillIcon} from '../../assets/Icons/DrillIcon.svg';
import Instance from '../../util/axios';
import { useHistory } from 'react-router';

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useState(null)
  const history = useHistory()

  const [keywords, setKeywords] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [rating, setRating] = useState('')
  const [delivery, setDelivery] = useState('')

  const numItems = 8

  const formatSearchParams = () => {
    let string = ''

    if (keywords) string = string.concat('keywords=' + keywords)
    if (category) string = string.concat('&category=' + category)
    if (location) string = string.concat('&location=' + location)
    if (priceMin) string = string.concat('&min=' + priceMin)
    if (priceMax) string = string.concat('&max=' + priceMax)
    if (rating) string = string.concat('&rating=' + rating)
    if (delivery) string = string.concat('&delivery=' + delivery)

    setSearchParams(string)
  }

  const handleSubmit = () => {
    formatSearchParams()
    
  }

  useEffect(() => {
  // Find all Items (empty search)

  Instance.get(`/items/search/?limit=${numItems}`).then((response) => {
    setItems(response.data[0]);
    setLoading(false);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
  }, []);

  useEffect(() => {
    if (searchParams) {
      history.push(`/search/${searchParams}`)
    } else if (searchParams === '') {
      history.push(`/search/`)
    }
  }, [searchParams])

  return (
    <PageWrapper>

      <div className="SearchSection">

        <div className="SearchSectionWrapper">
          
          <div className="SearchSectionTitle">Let's Find Your Next Borrow</div>
          <div className="SearchSectionFilters">
            <div className="SearchFiltersRowFlex">
              <div className="SearchInputContainer">
                <TextInput width="100%" label="Keywords" fontSize="20px" onChange={(e) => setKeywords(e.target.value)}/>
              </div>
              <div className="SearchInputContainer">
                <CategorySelect width="100%" label="Category" setCategory={setCategory}/>
              </div>
              <div style={{ width: '25%', minWidth: '9rem'}}>
                <TextInput width="100%" label="Location / Postcode" fontSize="20px" onChange={(e) => setLocation(e.target.value)}/>
              </div>
              
            </div>

            <hr className="DividingLine"/>

            <div className="SearchFiltersRowFlex">

            <div className="PriceFilterSearch">
              <div className="PriceFilterContainer">
                <SelectInput className="PriceFilterSelect" borders={false} label="$ Min" options={['','$10', '$20', '$30', '$40', '$50', '$60', '$70', '$80']} onChange={(e) => setPriceMin(e.target.value)}/>
              </div>

              <div className="vl"/>

              <div className="PriceFilterContainer">
                <SelectInput className="PriceFilterSelect" label="$ Max" options={['','$10', '$20', '$30', '$40', '$50', '$60', '$70', '$80']} onChange={(e) => setPriceMax(e.target.value)}/>
              </div>

            </div>
            <div style={{ width: '25%', minWidth: '9rem'}}>
              <RatingSelect width="100%" label="Minimum Rating" fontSize="20px" onChange={(e) => setRating(e.target.value)}/>
            </div>
            <div style={{ width: '25%', minWidth: '9rem'}}>
              <SelectInput width="100%" label="Delivery" borders={true} fontSize="20px" options={['' , 'Available', 'Unavailable']} onChange={(e) => setDelivery(e.target.value)}/>
            </div>
            </div>

          </div>
          <div>
          <button className="SearchButtonLarge" onClick={handleSubmit}>
            <div className="SearchButtonLargeFlex">
              <img src={SearchIcon} alt="search button" className="SearchIcon35"/>
              <div>Search</div>
            </div>

          </button>
          </div>
          

        </div>
      </div>

      <div className="MainContentWrapper">
        <div className="RecommendedSection">
          <div className="MainContentHeader">Top picks for you</div>


          <div className="ItemCardSection">
            { loading 
            ? <div>Loading items...</div>
            : items.map((item, i) => {
              return <ItemCard item={item} key={i}/>
            })
            }

          </div>

        </div>

        <div className="CategoriesSection">
        <div className="MainContentHeader">Helpful Categories</div>
        <div className="CategoryCardSection">

          <div className="CategoryImageDiv Automotive">
            <div className="CategoryTitle">Automotive</div>
            <div className="CategoryItemTotal">21,056 Items</div>
            <CarIcon fill="#FFF" className="CategoryIcon" style={{ height: '22px'}} />
          </div>

          <div className="CategoryImageDiv Gardening">
            <div className="CategoryTitle">Gardening</div>
            <div className="CategoryItemTotal">16,702 Items</div>
            <img src={WateringCanIcon} alt="" className="CategoryIcon" style={{ height: '28px'}} />
          </div>

          <div className="CategoryImageDiv HandTools">
            <div className="CategoryTitle">Hand Tools</div>
            <div className="CategoryItemTotal">12,334 Items</div>
            <HammerIcon fill="#FFF" className="CategoryIcon"/>
          </div>

          <div className="CategoryImageDiv PowerTools">
            <div className="CategoryTitle">Power Tools</div>
            <div className="CategoryItemTotal">4,586 Items</div>
            <DrillIcon fill="#FFF" className="CategoryIcon"/>
          </div>

        </div>

        </div>

      </div>
    </PageWrapper>
  )
}

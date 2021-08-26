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

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const [category, setCategory] = useState('Automotive')

  const numItems = 8

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

  return (
    <PageWrapper>

      <div className="SearchSection">

        <div className="SearchSectionWrapper">
          
          <div className="SearchSectionTitle">Let's Find Your Next Borrow</div>
          <div className="SearchSectionFilters">
            <div className="SearchFiltersRowFlex">
              <TextInput width="35%" label="Keywords" fontSize="20px"/>
              <CategorySelect width="35%" label="Category" setCategory={setCategory}/>
              
              <TextInput width="25%" label="Location / Postcode" fontSize="20px"/>
            </div>

            <hr className="DividingLine"/>

            <div className="SearchFiltersRowFlex">

            <div className="PriceFilterSearch">
              <div className="PriceFilterContainer">
                <SelectInput className="PriceFilterSelect" borders={false} label="$ Min" options={['$10', '$20', '$30', '$40', '$50', '$60', '$70', '$80']}/>
              </div>

              <div className="vl"/>

              <div className="PriceFilterContainer">
                <SelectInput className="PriceFilterSelect" label="$ Max" options={['$10', '$20', '$30', '$40', '$50', '$60', '$70', '$80']}/>
              </div>

              <div className="vl"/>

              <div className="PriceFilterContainer">
                <SelectInput className="PriceFilterSelect" label="Rate" options={['Per Day', 'Per Hour']}/>
              </div>

            </div>

            <RatingSelect width="25%" label="Minimum Rating" fontSize="20px"/>

            <SelectInput width="25%" label="Delivery" borders={true} fontSize="20px" options={['Available', 'Unavailable']}/>

            </div>

          </div>
          <div>
          <button className="SearchButtonLarge">
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

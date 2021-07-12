import React from 'react';
import './home.css';
import PageWrapper from "./../../components/pageWrapper/pageWrapper.js";
import TextInput from '../../components/textInput/textInput.js';
import SelectInput from '../../components/selectInput/selectInput.js';
import CategorySelect from '../../components/categorySelect/categorySelect.js';
import RatingSelect from '../../components/ratingSelect/ratingSelect.js';
import SearchIcon from '../../assets/Icons/SearchIcon.svg';
import ItemCard from '../../components/itemCard/itemCard';
import WateringCanIcon from '../../assets/Icons/GardeningIcon.svg';
import HammerIcon from '../../assets/Icons/HammerIcon.svg';
import CarIcon from '../../assets/Icons/AutomotiveIcon.svg';
import DrillIcon from '../../assets/Icons/DrillIcon.svg';

export default function home() {
  return (
    <PageWrapper>

      <div className="SearchSection">

        <div className="SearchSectionWrapper">
          
          <div className="SearchSectionTitle">Let's share stuff and do good</div>
          <div className="SearchSectionFilters">
            <div className="SearchFiltersRowFlex">
              <TextInput width="35%" label="Keywords" fontSize="20px"/>
              <CategorySelect width="35%" label="Category" fontSize="20px"/>
              
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

            {/* <SelectInput width="25%" label="Minimum Rating" borders={true} fontSize="20px" options={['5 Star', '4 Star', '3 Star', '2 Star', '1 Star']}/> */}

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

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="2" id="116"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="4" id="823"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="4" id="546"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="2" id="394"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="1" id="915"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="3" id="265"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="3" id="545"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="5"/>

          </div>

        </div>

        <div className="CategoriesSection">
        <div className="MainContentHeader">Helpful Categories</div>
        <div className="CategoryCardSection">

          <div className="CategoryImageDiv Automotive">
            <div className="CategoryTitle">Automotive</div>
            <div className="CategoryItemTotal">21,056 Items</div>
            <img src={CarIcon} alt="" className="CategoryIcon" style={{ height: '22px'}} />
          </div>

          <div className="CategoryImageDiv Gardening">
            <div className="CategoryTitle">Gardening</div>
            <div className="CategoryItemTotal">16,702 Items</div>
            <img src={WateringCanIcon} alt="" className="CategoryIcon" style={{ height: '28px'}} />
          </div>

          <div className="CategoryImageDiv HandTools">
            <div className="CategoryTitle">Hand Tools</div>
            <div className="CategoryItemTotal">12,334 Items</div>
            <img src={HammerIcon} alt="" className="CategoryIcon"/>
          </div>

          <div className="CategoryImageDiv PowerTools">
            <div className="CategoryTitle">Power Tools</div>
            <div className="CategoryItemTotal">4,586 Items</div>
            <img src={DrillIcon} alt="" className="CategoryIcon"/>
          </div>

        </div>

        </div>

      </div>
    </PageWrapper>
  )
}

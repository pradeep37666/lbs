import React from 'react';
import './home.css';
import PageWrapper from "./../../components/pageWrapper/pageWrapper.js";
import TextInput from '../../components/textInput/textInput.js';
import SelectInput from '../../components/selectInput/selectInput.js';
import SearchIcon from '../../assets/Icons/SearchIcon.png';
import ItemCard from '../../components/itemCard/itemCard';

export default function home() {
  return (
    <PageWrapper>

      <div className="SearchSection">

        <div className="SearchSectionWrapper">
          
          <div className="SearchSectionTitle">Let's share stuff and do good</div>
          <div className="SearchSectionFilters">
            <div className="SearchFiltersRowFlex">
              <TextInput width="35%" label="Keywords" fontSize="20px"/>
              <SelectInput width="35%" label="Category" fontSize="20px" options={['Automotive', 'Gardening', 'Hand Tools', 'Power Tools']}/>
              
              <TextInput width="25%" label="Location / Postcode" fontSize="20px"/>
            </div>

            <hr className="DividingLine"/>

            <div className="SearchFiltersRowFlex">

            <div className="PriceFilterSearch">
              <div className="PriceFilterContainer">
                <label className="FloatingLabel">Price Minimum</label>
                <select className="PriceFilterSelect">
                  <option value="10">$10</option>
                  <option value="20">$20</option>
                  <option value="30">$30</option>
                  <option value="40">$40</option>
                  <option value="50">$50</option>
                  <option value="60">$60</option>
                  <option value="70">$70</option>
                  <option value="80">$80</option>
                </select>
              </div>

              <div className="vl"/>

              <div className="PriceFilterContainer">
                <label className="FloatingLabel">Price Maximum</label>
                <select className="PriceFilterSelect">
                  <option value="10">$10</option>
                  <option value="20">$20</option>
                  <option value="30">$30</option>
                  <option value="40">$40</option>
                  <option value="50">$50</option>
                  <option value="60">$60</option>
                  <option value="70">$70</option>
                  <option value="80">$80</option>
                </select>
              </div>

              <div className="vl"/>

              <div className="PriceFilterContainer">
                <label className="FloatingLabel">Rate</label>
                <select className="PriceFilterSelect">
                  
                  <option value="Day">Per Day</option>
                  <option value="Hour">Per Hour</option>
                </select>
              </div>

            </div>

            <SelectInput width="25%" label="Minimum Rating" fontSize="20px" options={['5 Star', '4 Star', '3 Star', '2 Star', '1 Star']}/>

            <SelectInput width="25%" label="Delivery" fontSize="20px" options={['Available', 'Unavailable']}/>

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
          <div className="MainContentHeader"><span className="PinkDot"/>Top picks for you</div>


          <div className="ItemCardSection">

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="4"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="4"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="4"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="4"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="4"/>

          <ItemCard itemName="Pull along ATV mower attachment with multiple modes" price="750" rate="day" availability={true} location="Brisbane" rating="4"/>

          </div>

        </div>

        <div className="CategoriesSection">
        <div className="MainContentHeader"><span className="PinkDot"/>Helpful Categories</div>
        <div className="CategoryCardSection">
          <div className="CategoryImageDiv">
            <div className="CategoryTitle">Automotive</div>
            <div className="CategoryItemTotal">21,056 Items</div>
          </div>
          <div className="CategoryImageDiv">
            <div className="CategoryTitle">Gardening</div>
            <div className="CategoryItemTotal">16,702 Items</div>
          </div>
          <div className="CategoryImageDiv">
            <div className="CategoryTitle">Hand Tools</div>
            <div className="CategoryItemTotal">12,334 Items</div>
          </div>
          <div className="CategoryImageDiv">
            <div className="CategoryTitle">Power Tools</div>
            <div className="CategoryItemTotal">4,586 Items</div>
          </div>
        </div>

        </div>

      </div>
    </PageWrapper>
  )
}

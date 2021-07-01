import React from 'react';
import './home.css';
import PageWrapper from "./../../components/pageWrapper/pageWrapper.js";
import SearchButton from './../../components/searchButton/searchButton.js';
import TextInput from '../../components/textInput/textInput.js';
import SelectInput from '../../components/selectInput/selectInput.js';

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
                  <option value="40" selected="selected">$40</option>
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
            <SearchButton buttonText="Search" iconHeight="30px"/>
          </div>

        </div>
      </div>

      <div>
        top picks for you section
      </div>

      <div>
        helpful categories section
      </div>
      
    </PageWrapper>
  )
}

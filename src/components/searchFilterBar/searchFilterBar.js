import React, { useEffect, useState } from "react";
import "./searchFilterBar.css";
import CarIcon from "./../../assets/Icons/AutomotiveIcon.svg";
import BBQIcon from "./../../assets/Icons/BBQIcon.svg";
import CleaningIcon from "./../../assets/Icons/CleaningIcon.svg";
import CreativeIcon from "./../../assets/Icons/CreativeIcon.svg";
import DrillIcon from "./../../assets/Icons/DrillIcon.svg";
import HammerIcon from "./../../assets/Icons/HammerIcon.svg";
import OfficeIcon from "./../../assets/Icons/OfficeIcon.svg";
import PaintingIcon from "./../../assets/Icons/PaintingIcon.svg";
import SportingIcon from "./../../assets/Icons/SportingIcon.svg";
import MowingIcon from "./../../assets/Icons/MowingIcon.svg";
import { ReactComponent as StarOutline } from "./../../assets/Icons/StarOutline.svg";
import { ReactComponent as StarFilled } from "./../../assets/Icons/StarFilled.svg";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useHistory } from "react-router";
import MapsAutocomplete from "../mapsAutocomplete/MapsAutocomplete";
import { useLocation } from "react-router";
import Geocode from 'react-geocode'

const LocationSlider = withStyles({
  root: {
    color: "#b03b4b",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -11,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    height: 3,
  },
})(Slider);

export default function SearchFilterBar({ keyWord }) {

  const location = useLocation();

  const queryString = require("query-string");

  const parsed = queryString.parse(location.search);

  const history = useHistory()
  const [Delivery, setDelivery] = useState(parsed?.delivery ?? 'Both')
  const [ActiveFilter, setActiveFilter] = useState("none")
  const [Category, setCategory] = useState(parsed?.category ?? '')
  const [Address, setAddress] = useState('')
  const [SearchRadius, setSearchRadius] = useState(10)
  const [PriceMin, setPriceMin] = useState(parsed?.minPrice ?? '')
  const [PriceMax, setPriceMax] = useState(parsed?.maxPrice ?? '')
  const [Rating, setRating] = useState(parsed?.rating ?? '')
  const [updateLocation, setUpdateLocation] = useState(false)

  const handleSubmitFilterChange = () => {
    let string = "";

    if (keyWord) {
      string = string.concat("?keyword=" + keyWord);
    } else {
      string = string.concat("?keyword=");
    }
    if (Category) string = string.concat("&category=" + Category)
    if (Address) string = string.concat(`&lat=${Address.lat}&lng=${Address.lng}&distance=${SearchRadius}`)
    if (PriceMax) string = string.concat("&maxPrice=" + PriceMax)
    if (PriceMin) string = string.concat("&minPrice=" + PriceMin)
    if (Rating) string = string.concat("&rating=" + Rating)
    if (Delivery === 'Both') { }
    else if (Delivery === true) {
      string = string.concat("&delivery=1")
    } else {
      string = string.concat("&delivery=0");
    }
    history.push(`/search/${string}`)
  }

  const handleFilterClick = (filter) => {
    if (ActiveFilter === filter) {
      setActiveFilter("none");
    } else {
      setActiveFilter(filter);
    }
  };

  // use effect below resets the search when you first get to the page, e.g. from filters on home page
  // we need to make it research whenever one of the filters is changed, butr without the useeffect as that will always fire at the start
  // and wipe whatever filters we had already set on the home page

  const getGeoLocation = (input) => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
    Geocode.setLanguage('en')
    Geocode.setRegion('au')
    Geocode.setLocationType('ROOFTOP')
    Geocode.enableDebug(false)

    Geocode.fromAddress(input)
      .then((response) => {
        if (response.results[0].geometry.location.lat) {
          setAddress({
            lat: response.results[0].geometry.location.lat,
            lng: response.results[0].geometry.location.lng
          })
        }
      })
      .catch((error) => {
        // if theres an error with the geocode we don't say anything
        // console.log(error.response)
        // alert('There was an issue processing this address, please try again')
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
    handleSubmitFilterChange();
  }, [Delivery, Category, Rating, Address, updateLocation]);

  const handlePriceMinChange = (e) => {
    let price = e.target.validity.valid ? e.target.value : PriceMin;
    price = price.slice(0, 4);
    setPriceMin(price);
  };

  const handlePriceMaxChange = (e) => {
    let price = e.target.validity.valid ? e.target.value : PriceMax;
    price = price.slice(0, 4);
    setPriceMax(price);
  };

  const categories = [
    { name: "Tools", icon: HammerIcon },
    { name: "Painting", icon: PaintingIcon },
    { name: "BBQ", icon: BBQIcon },
    { name: "Office", icon: OfficeIcon },
    { name: "Creative", icon: CreativeIcon },
    { name: "Power Tools", icon: DrillIcon },
    { name: "Automotive", icon: CarIcon },
    { name: "Mowing", icon: MowingIcon },
    { name: "Cleaning", icon: CleaningIcon },
    { name: "Sporting", icon: SportingIcon },
  ];

  const renderCategories = () => {
    return categories.map((category, index) => {
      return (
        <div
        key={index}
          className={`CategoryFilterDiv ${Category === category.name ? "CategoryFilterDivActive" : ""
            }`}
          onClick={() => {
            if (Category === category.name) setCategory('')
            else setCategory(category.name);
            handleSubmitFilterChange();
            console.log("Category Clicked : ", Category);
          }}
        >
          <img src={category.icon} alt="" className="CategoryFilterIcon" />
          {category.name}
        </div>
      );
    });
  };

  const getCategoryPopout = () => {
    return (
      <div
        className="FilterPopout FilterPopoutCat"
        onClick={(e) => e.stopPropagation()}
      >
        <hr className="hl hlPopout" />
        <div className="MainBodyPopout">
          <div className="CategoryFiltersFlex">{renderCategories()}</div>
        </div>
      </div>
    );
  };

  const getLocationPopout = () => {
    return (
      <div
        className="FilterPopout FilterPopoutLoc"
        onClick={(e) => e.stopPropagation()}
      >
        <hr className="hl hlPopout" />
        <div className="MainBodyPopout">
          <MapsAutocomplete setAddress={setAddress} small />
          <div className="PostcodeText">Search radius</div>
          <div className="LocationSliderFlex">
            <LocationSlider
              aria-label="search radius"
              defaultValue={10}
              max={20}
              min={2}
              onChange={(e, val) => setSearchRadius(val)}
            />
            <div className="SearchRadiusValue">{SearchRadius}km</div>
          </div>

          <button
            className="FilterButtonSave"
            onClick={() => {
              setUpdateLocation(!updateLocation)
              setActiveFilter("none")
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  };

  const getPricePopout = () => {
    return (
      <div
        className="FilterPopout FilterPopoutPrice"
        onClick={(e) => e.stopPropagation()}
      >
        <hr className="hl hlPopout" />
        <div className="MainBodyPopout">
          <div className="MinMaxFlex">
            <div>
              <div className="MinMaxHeader">Minimum ($)</div>
              <input
                type="text"
                pattern="[0-9]*"
                value={PriceMin}
                className="PriceInput"
                placeholder="0"
                onChange={(e) => handlePriceMinChange(e)}
              />
            </div>

            <div>
              <div className="MinMaxHeader">Maximum ($)</div>
              <input
                type="text"
                pattern="[0-9]*"
                value={PriceMax}
                className="PriceInput"
                placeholder="100"
                onChange={(e) => handlePriceMaxChange(e)}
              />
            </div>
          </div>
          <div className="SaveButtonFlex">
            <button
              className="FilterButtonSave"
              onClick={() => {
                setActiveFilter("none");
                handleSubmitFilterChange();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getRatingPopout = () => {
    return (
      <div
        className="FilterPopout FilterPopoutRating"
        onClick={(e) => e.stopPropagation()}
      >
        <hr className="hl hlPopout" />
        <div className="MainBodyPopout">
          <div className="RatingFilterHeader">
            {Rating} Star{Rating === 1 ? "" : "s"}
          </div>
          <div className="StarsFlex">
            <StarFilled
              className="StarIcon StarClick"
              fill="#E9D8B4"
              onClick={() => setRating(1)}
            />
            {Rating >= 2 ? (
              <StarFilled
                className="StarIcon StarClick"
                fill="#E9D8B4"
                onClick={() => {
                  setRating(2);
                  handleSubmitFilterChange();
                }}
              />
            ) : (
              <StarOutline
                className="StarIcon StarClick"
                onClick={() => setRating(2)}
              />
            )}
            {Rating >= 3 ? (
              <StarFilled
                className="StarIcon StarClick"
                fill="#E9D8B4"
                onClick={() => {
                  setRating(3);
                  handleSubmitFilterChange();
                }}
              />
            ) : (
              <StarOutline
                className="StarIcon StarClick"
                onClick={() => setRating(3)}
              />
            )}
            {Rating >= 4 ? (
              <StarFilled
                className="StarIcon StarClick"
                fill="#E9D8B4"
                onClick={() => {
                  setRating(4);
                  handleSubmitFilterChange();
                }}
              />
            ) : (
              <StarOutline
                className="StarIcon StarClick"
                onClick={() => setRating(4)}
              />
            )}
            {Rating >= 5 ? (
              <StarFilled
                className="StarIcon StarClick"
                fill="#E9D8B4"
                onClick={() => {
                  setRating(5);
                  handleSubmitFilterChange();
                }}
              />
            ) : (
              <StarOutline
                className="StarIcon StarClick"
                onClick={() => setRating(5)}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const getDeliveryPopout = () => {
    return (
      <div
        className="FilterPopout FilterPopoutDel"
        onClick={(e) => e.stopPropagation()}
      >
        <hr className="hl hlPopout" />
        <div className="MainBodyPopout">
          <div className="DeliveryFlex">
            <button
              className={`DeliveryButton ${Delivery === true ? "" : "DeliveryButtonInactive"
                }`}
              onClick={() => {
                Delivery !== true ? setDelivery(true) : setDelivery('Both')
              }}
            >
              Yes
            </button>
            <button
              className={`DeliveryButton ${Delivery === false ? "" : "DeliveryButtonInactive"
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
    );
  };

  return (
    <div className="SearchFilterBar">
      <div className="SearchFilterBarFlex">
        <div
          onClick={() => handleFilterClick("Category")}
          className="FilterContainer"
        >
          <span
            className={`SearchFilterText ${ActiveFilter === "Category" ? "FilterActive" : ""
              }`}
          >
            Category
          </span>
          {ActiveFilter === "Category" ? getCategoryPopout() : ""}
        </div>
        <div
          onClick={() => handleFilterClick("Location")}
          className="FilterContainer"
        >
          <span
            className={`SearchFilterText ${ActiveFilter === "Location" ? "FilterActive" : ""
              }`}
          >
            Location/Postcode
          </span>
          {ActiveFilter === "Location" ? getLocationPopout() : ""}
        </div>
        <div
          onClick={() => handleFilterClick("Price")}
          className="FilterContainer"
        >
          <span
            className={`SearchFilterText ${ActiveFilter === "Price" ? "FilterActive" : ""
              }`}
          >
            Price
          </span>
          {ActiveFilter === "Price" ? getPricePopout() : ""}
        </div>
        <div
          onClick={() => handleFilterClick("Rating")}
          className="FilterContainer"
        >
          <span
            className={`SearchFilterText ${ActiveFilter === "Rating" ? "FilterActive" : ""
              }`}
          >
            Rating
          </span>
          {ActiveFilter === "Rating" ? getRatingPopout() : ""}
        </div>
        <div
          onClick={() => handleFilterClick("Delivery")}
          className="FilterContainer"
        >
          <span
            className={`SearchFilterText ${ActiveFilter === "Delivery" ? "FilterActive" : ""
              }`}
          >
            Delivery
          </span>
          {ActiveFilter === "Delivery" ? getDeliveryPopout() : ""}
        </div>
      </div>
    </div>
  );
}

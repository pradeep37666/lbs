import React, { useEffect, useState } from "react";
import "./searchFilterBar.css";
import { ReactComponent as CarIcon } from "./../../assets/Icons/AutomotiveIcon.svg";
import BBQIcon from "./../../assets/Icons/BBQIcon.svg";
import CleaningIcon from "./../../assets/Icons/CleaningIcon.svg";
import CreativeIcon from "./../../assets/Icons/CreativeIcon.svg";
import { ReactComponent as DrillIcon } from "./../../assets/Icons/DrillIcon.svg";
import { ReactComponent as HammerIcon } from "./../../assets/Icons/HammerIcon.svg";
import OfficeIcon from "./../../assets/Icons/OfficeIcon.svg";
import PaintingIcon from "./../../assets/Icons/PaintingIcon.svg";
import SportingIcon from "./../../assets/Icons/SportingIcon.svg";
import MowingIcon from "./../../assets/Icons/MowingIcon.svg";
import { ReactComponent as StarOutline } from "./../../assets/Icons/StarOutline.svg";
import { ReactComponent as StarFilled } from "./../../assets/Icons/StarFilled.svg";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import GoogleMapReact from "google-map-react";
import { useHistory } from "react-router";

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
  const history = useHistory();
  const [Delivery, setDelivery] = useState(false);
  const [ActiveFilter, setActiveFilter] = useState("none");
  const [Category, setCategory] = useState("");
  const [PostCode, setPostCode] = useState();
  const [SearchRadius, setSearchRadius] = useState(10);
  const [PriceMin, setPriceMin] = useState();
  const [PriceMax, setPriceMax] = useState();
  const [Rating, setRating] = useState();

  const defaultProps = {
    center: {
      lat: -27.481009,
      lng: 153.040596,
    },
    zoom: 15,
  };
  const handleSubmitFilterChange = () => {
    let string = "";

    if (keyWord) {
      string = string.concat("?keyword=" + keyWord);
    } else {
      string = string.concat("?keyword=");
    }
    if (Category) string = string.concat("&category=" + Category);
    if (PriceMax) string = string.concat("&maxPrice=" + PriceMax);
    if (PriceMin) string = string.concat("&minPrice=" + PriceMin);
    if (Rating) string = string.concat("&rating=" + Rating);
    if (Delivery) {
      string = string.concat("&delivery=1");
    } else {
      string = string.concat("&delivery=0");
    }

    history.replace(`/search/${string}`);
  };

  const handleFilterClick = (filter) => {
    if (ActiveFilter === filter) {
      setActiveFilter("none");
    } else {
      setActiveFilter(filter);
    }
  };

  useEffect(() => {
    handleSubmitFilterChange();
  }, [Delivery, Category, Rating]);

  const handlePostcodeChange = (e) => {
    let postcode = e.target.validity.valid ? e.target.value : PostCode;
    postcode = postcode.slice(0, 4);
    setPostCode(postcode);
  };

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

  const getCategoryPopout = () => {
    return (
      <div
        className="FilterPopout FilterPopoutCat"
        onClick={(e) => e.stopPropagation()}
      >
        <hr className="hl hlPopout" />
        <div className="MainBodyPopout">
          <div className="CategoryFiltersFlex">
            <div
              className={`CategoryFilterDiv ${
                Category === "Tools" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("Tools");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <HammerIcon
                fill="#ac172c"
                alt=""
                className="CategoryFilterIcon"
              />
              Tools
            </div>
            <div
              className={`CategoryFilterDiv ${
                Category === "Painting" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("Painting");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <img src={PaintingIcon} alt="" className="CategoryFilterIcon" />
              Painting
            </div>
            <div
              className={`CategoryFilterDiv ${
                Category === "BBQ" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("BBQ");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <img src={BBQIcon} alt="" className="CategoryFilterIcon" />
              BBQ
            </div>
            <div
              className={`CategoryFilterDiv ${
                Category === "Office" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("Office");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <img src={OfficeIcon} alt="" className="CategoryFilterIcon" />
              Office
            </div>
            <div
              className={`CategoryFilterDiv ${
                Category === "Creative" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("Creative");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <img src={CreativeIcon} alt="" className="CategoryFilterIcon" />
              Creative
            </div>
            <div
              className={`CategoryFilterDiv ${
                Category === "Power Tools" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("Power Tools");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <DrillIcon fill="#ac172c" alt="" className="CategoryFilterIcon" />
              Power Tools
            </div>
            <div
              className={`CategoryFilterDiv ${
                Category === "Automotive" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("Automotive");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <CarIcon fill="#ac172c" alt="" className="CategoryFilterIcon" />
              Automotive
            </div>
            <div
              className={`CategoryFilterDiv ${
                Category === "Mowing" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("Mowing");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <img src={MowingIcon} alt="" className="CategoryFilterIcon" />
              Mowing
            </div>
            <div
              className={`CategoryFilterDiv ${
                Category === "Cleaning" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("Cleaning");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <img src={CleaningIcon} alt="" className="CategoryFilterIcon" />
              Cleaning
            </div>
            <div
              className={`CategoryFilterDiv ${
                Category === "Sporting" ? "CategoryFilterDivActive" : ""
              }`}
              onClick={() => {
                setCategory("Sporting");
                handleSubmitFilterChange();
                console.log("Category Clicked : ", Category);
              }}
            >
              <img src={SportingIcon} alt="" className="CategoryFilterIcon" />
              Sporting
            </div>
          </div>
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
          <div className="PostcodeText">Postcode</div>
          <div className="PostcodeFlex">
            <input
              type="text"
              pattern="[0-9]*"
              value={PostCode}
              className="PostcodeInput"
              placeholder="4000"
              onChange={(e) => handlePostcodeChange(e)}
            />
            <button
              className="FilterButtonSave"
              onClick={() => setActiveFilter("none")}
            >
              Save
            </button>
          </div>
          <div className="PostcodeText">Search radius</div>
          <div className="SearchRadiusText">
            Set the neighbourhood where you want to search.
          </div>
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
          <div className="MapContainerSmall">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyB98s0INvtxhs22OxCOEIjE_--kb54qhlQ",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            ></GoogleMapReact>
          </div>
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
              className={`DeliveryButton ${
                Delivery ? "" : "DeliveryButtonInactive"
              }`}
              onClick={() => {
                setDelivery(true);
              }}
            >
              Yes
            </button>
            <button
              className={`DeliveryButton ${
                Delivery ? "DeliveryButtonInactive" : ""
              }`}
              onClick={() => {
                setDelivery(false);
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
            className={`SearchFilterText ${
              ActiveFilter === "Category" ? "FilterActive" : ""
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
            className={`SearchFilterText ${
              ActiveFilter === "Location" ? "FilterActive" : ""
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
            className={`SearchFilterText ${
              ActiveFilter === "Price" ? "FilterActive" : ""
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
            className={`SearchFilterText ${
              ActiveFilter === "Rating" ? "FilterActive" : ""
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
            className={`SearchFilterText ${
              ActiveFilter === "Delivery" ? "FilterActive" : ""
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

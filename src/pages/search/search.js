import React, { useState, useEffect } from "react"
import "./search.css"
import PageWrapper from "../../components/pageWrapper/pageWrapper.js"
import ItemCard from "../../components/itemCard/itemCard.js"
import SearchFilterBar from "../../components/searchFilterBar/searchFilterBar.js"
import { makeStyles, withStyles } from "@material-ui/styles"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputBase from "@material-ui/core/InputBase"
import ArrowDown from "@material-ui/icons/ExpandMore"
import Instance from "../../util/axios"
import { CircularProgress } from "@material-ui/core"
import { useLocation } from "react-router"

export default function Search() {
  const location = useLocation()
  const [ searchItems, setSearchItems ] = useState([])
  const [ priceAscending, setPriceAscending ] = useState([])
  const [ priceDescending, setPriceDescending ] = useState([])
  const [ ratingAscending, setRatingAscending ] = useState([])
  const [ ratingDescending, setRatingDescending ] = useState([])
  const [ loading, setLoading ] = useState(true)
  const [ suggestedItems, setSuggestedItems ] = useState([])
  const [ SearchPage, setSearchPage ] = useState(1)
  const [ SortBy, setSortBy ] = useState("Nothing Selected")
  const NumSearchPages = Math.ceil(searchItems?.length / 8)

  const queryString = require("query-string")
  const parsed = queryString.parse(location.search)

  useEffect(() => {
    getSearchItems()
  }, [location.search])

  const getSearchItems = async () => {
    try {
      const { data: searchData } = await Instance.get(`/items/search${location.search}`)
      if (searchData.length) {
        setSearchItems(searchData)
        setPriceAscending(searchData)
        setPriceDescending(searchData)
      }
      const { data: suggestData } = await Instance.get('/items/search/?limit=4')
      if (suggestData.length) setSuggestedItems(suggestData)
    } catch (error) {
      console.log(error.response)
    } finally {
      setLoading(false)
    }
  }

  const getSearchPages = () => {
    let content = [];
    for (let i = 1; i < NumSearchPages + 1; i++) {
      content.push(
        <div
          className={`PaginationPage ${
            SearchPage === i ? "PaginationPageActive" : ""
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

  const handlePaginationButtonClick = (direction) => {
    if (direction === "forward") {
      SearchPage === NumSearchPages
        ? setSearchPage(1)
        : setSearchPage(SearchPage + 1);
    } else {
      SearchPage === 1
        ? setSearchPage(NumSearchPages)
        : setSearchPage(SearchPage - 1);
    }
  };

  const getSearchResultsPage = () => {
    let content = []
    const startIndex = (SearchPage - 1) * 8
    let numResults = startIndex + 8
    if (SearchPage === NumSearchPages || searchItems.length < 8) {
      numResults = startIndex + (searchItems.length - (SearchPage - 1) * 8)
    }
    for (let i = startIndex; i < numResults; i++) {
      content.push(<ItemCard item={searchItems[i]} key={i} />)
    }
    return content
  }

  const getSearchResultsMain = () => {
    return (
      <div>
        <div className="SearchItemCardSection" style={{ padding: "1em .5em" }}>
          {getSearchResultsPage()}
        </div>

        <div className="PaginationSection">
          <div className="PagesText">Pages</div>
          <div className="PaginationFlex">
            <div
              className="PaginationArrow"
              onClick={() => handlePaginationButtonClick("backward")}
            >
              {"<"}
            </div>
            {getSearchPages()}
            <div
              className="PaginationArrow"
              onClick={() => handlePaginationButtonClick("forward")}
            >
              {">"}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const sortPriceLowToHigh = () => {
    priceAscending.sort(function (a, b) {
      return a.price - b.price
    })
  }

  const sortPriceHighToLow = () => {
    priceDescending.sort(function (a, b) {
      return b.price - a.price
    })
  }

  const sortRatingLowToHigh = () => {
    ratingAscending.sort(function (a, b) {
      return a.rating - b.rating
    })
  }
  const sortRatingHighToLow = () => {
    ratingDescending.sort(function (a, b) {
      return b.rating - a.rating
    })
  }

  const randomItemsMapper = () => {
    if (suggestedItems.length > 0) {
      return suggestedItems.map((items, index) => {
        return <ItemCard item={items} key={index}/>
      })
    }
  }

  const handleChange = (event) => {
    setSortBy(event.target.value)
  }

  const classes = useStyles()
  return (
    <PageWrapper>
      <SearchFilterBar keyWord={parsed.keyword} />
      {loading ? (
        <div className="ItemPage__Loading__Container">
          <CircularProgress size={75} />
        </div>
      ) : (
        <div className="SearchMainContainer" style={{ marginBottom: "2%" }}>
          <div className="SearchSortFlex">
            <div className="SearchMainText">
              Search results for:{" "}
              <span style={{ fontWeight: "normal" }}>{parsed.keyword}</span>
            </div>
            <div className="SearchMainText">
              Sort by:
              <Select
                onChange={handleChange}
                input={<BootstrapInput />}
                className={`${classes.select}`}
                IconComponent={ArrowDown}
                value={SortBy}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 230,
                    horizontal: -50,
                  },
                  transformOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                  classes: {
                    paper: classes.dropDown,
                  },
                }}
              >
                <MenuItem value="Nothing Selected" style={{ display: "none" }}>
                  {SortBy}
                </MenuItem>
                <MenuItem
                  value="Price - Low to High"
                  onClick={() => {
                    sortPriceLowToHigh();
                  }}
                >
                  Price - Low to High
                </MenuItem>
                <MenuItem
                  value="Price - High to Low"
                  onClick={() => sortPriceHighToLow()}
                >
                  Price - High to Low
                </MenuItem>
                <MenuItem
                  value="Rating - Low to High"
                  onClick={() => sortRatingLowToHigh()}
                >
                  Rating - Low to High
                </MenuItem>
                <MenuItem
                  value="Rating - High to Low"
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

          <div className="SuggestedItemsSection">
            <div className="SearchMainText">
              Suggested items outside your search for:{" "}
              <span style={{ fontWeight: "normal" }}>{parsed.keyword}</span>
            </div>

            {searchItems.length > 0 ? (
              <div className="ItemCardSection" style={{ padding: "1em .5em" }}>
                {/* Need the similar items backend for this section, placeholder first item from search for now */}

                {randomItemsMapper(suggestedItems)}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </PageWrapper>
  )
}

const BootstrapInput = withStyles((theme) => ({
  input: {
    display: "inline",
    paddingLeft: ".3em",
    textAlign: "left",
    fontSize: "20px",
    fontFamily: ["DMSans, sans-serif"].join(","),
    "&:focus": {
      backgroundColor: "#FFFFFF",
      borderRadius: "15px",
    },
  },
}))(InputBase)

const useStyles = makeStyles({
  dropDown: {
    border: "2px solid #95272f",
    padding: "1em",
    borderRadius: "15px",
    boxSizing: "content-box",
    "& .MuiMenuItem-root": {
      fontFamily: "DMSans, sans-serif",
    },
  },
  select: {
    fontWeight: "normal",
    "& .MuiSvgIcon-root": {
      color: "#95272f",
    },
  },
})
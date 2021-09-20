import React, { useState, useEffect } from 'react';
import './search.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PageWrapper from '../../components/pageWrapper/pageWrapper.js';
import ItemCard from '../../components/itemCard/itemCard.js';
import SearchFilterBar from '../../components/searchFilterBar/searchFilterBar.js';
import { makeStyles, withStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import ArrowDown from '@material-ui/icons/ExpandMore';
import Instance from '../../util/axios';
import { CircularProgress } from '@material-ui/core';
import { useLocation } from 'react-router';

const BootstrapInput = withStyles((theme) => ({
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
}))(InputBase);

const useStyles = makeStyles({
  dropDown: ({
    border: '2px solid #95272f',
    padding: '1em',
    borderRadius: '15px',
    boxSizing: 'content-box',
    "& .MuiMenuItem-root": {
      fontFamily: 'DMSans, sans-serif',
    }
  }),
  select: ({
    fontWeight: 'normal',
    "& .MuiSvgIcon-root": {
      color: "#95272f",
    }
  })
})

export default function Search(props) {
  const searchParameters = props.location.pathname

  const [searchItems, setSearchItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [SearchPage, setSearchPage] = useState(1);
  const [SortBy, setSortBy] = useState('Nothing Selected');

  const NumSearchPages = Math.ceil(searchItems.length / 8);

  //format the url query so that it fits the search query

  useEffect(() => {
    Instance.get(`/items/search/?keyword=${searchParameters}`).then((response) => {
      setSearchItems(response.data[0]);
      setLoading(false);
    })
      .catch((error) => {
        console.log(error);
      })
      console.log(searchParameters)
  }, []);

  const getSearchPages = () => {
    let content = [];
    for (let i = 1; i < NumSearchPages + 1; i++) {
      content.push(<div className={`PaginationPage ${(SearchPage === i) ? "PaginationPageActive" : ""}`} onClick={() => setSearchPage(i)} key={i}>{i}</div>);
    }
    return content;
  };

  const handlePaginationButtonClick = (direction) => {
    if (direction === "forward") {
      (SearchPage === NumSearchPages) ? setSearchPage(1) : setSearchPage(SearchPage + 1);
    } else {
      (SearchPage === 1) ? setSearchPage(NumSearchPages) : setSearchPage(SearchPage - 1);
    }
  }

  const getSearchResultsPage = () => {
    let content = [];
    const startIndex = (SearchPage - 1) * 8;
    let numResults = startIndex + 8;
    // If we're on the last page of results or there's less than 1 page find how many results are left, as if its less than a full page we need to change our iteration so we don't go out of index
    if (SearchPage === NumSearchPages || searchItems.length < 8) {
      numResults = startIndex + (searchItems.length - ((SearchPage - 1) * 8));
    }
    for (let i = startIndex; i < numResults; i++) {
      content.push(
        <ItemCard
          item={searchItems[i]}
          key={i} />)
    }
    return content;
  }
  console.log('trying git!')
  const getSearchResultsMain = () => {
    return (
      <div>
        <div className="ItemCardSection" style={{ padding: '1em .5em' }}>
          {getSearchResultsPage()}
        </div>

        <div className="PaginationSection">
          <div className="PagesText">Pages</div>
          <div className="PaginationFlex">
            <div className="PaginationArrow" onClick={() => handlePaginationButtonClick("backward")}>{"<"}</div>
            {getSearchPages()}
            <div className="PaginationArrow" onClick={() => handlePaginationButtonClick("forward")}>{">"}</div>
          </div>
        </div>
      </div>

    )
  }

  const handleChange = (event) => {
    setSortBy(event.target.value);
  }

  const classes = useStyles();
  return (
    <PageWrapper>
      <SearchFilterBar />
      {loading ? <div className="ItemPage__Loading__Container"><CircularProgress size={75} /></div>
        :
        <div className="SearchMainContainer">
          <div className="SearchSortFlex">
            <div className="SearchMainText">Search results for: <span style={{ fontWeight: 'normal' }}>{searchParameters}</span></div>
            <div className="SearchMainText">Sort by:
              <Select
                onChange={handleChange}
                input={<BootstrapInput />} className={`${classes.select}`}
                IconComponent={ArrowDown}
                value={SortBy}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 230,
                    horizontal: -50
                  },
                  transformOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null,
                  classes: {
                    paper: classes.dropDown
                  }
                }}
              >
                <MenuItem value="Nothing Selected" style={{ display: 'none' }}>Nothing Selected</MenuItem>
                <MenuItem value="Price - Low to High">Price - Low to High</MenuItem>
                <MenuItem value="Price - High to Low">Price - High to Low</MenuItem>
                <MenuItem value="Rating - Low to High">Rating - Low to High</MenuItem>
                <MenuItem value="Rating - High to Low">Rating - High to Low</MenuItem>
              </Select>
            </div>
          </div>

          {searchItems.length > 0 ? getSearchResultsMain()

            : <div>No results found, try searching with different options.</div>}

          <div className="SuggestedItemsSection">
            <div className="SearchMainText">Suggested items outside your search for: <span style={{ fontWeight: 'normal' }}>{searchParameters}</span></div>

            {searchItems.length > 0 ? <div className="ItemCardSection" style={{ padding: '1em .5em' }}>
              {/* Need the similar items backend for this section, placeholder first item from search for now */}
              <ItemCard item={searchItems[0]} />
              <ItemCard item={searchItems[0]} />
              <ItemCard item={searchItems[0]} />
              <ItemCard item={searchItems[0]} />
            </div>
              : ''}
          </div>
        </div>
      }
    </PageWrapper>
  )
}

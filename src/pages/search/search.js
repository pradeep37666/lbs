import React, { useState } from 'react';
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
      "& .MuiSvgIcon-root": {
        color: "#95272f",
      }
    }) 
  })

export default function Search() {
    const {searchParameters} = useParams();
    console.log(searchParameters);

    const searchResultSamples = [
        ["Pull along ATV mower attachment with multiple modes", "1", "day", true, "Brisbane", "3", "523"],
        ["Pull along ATV mower attachment with multiple modes", "2", "day", true, "Brisbane", "1", "333"],
        ["Pull along ATV mower attachment with multiple modes", "3", "day", true, "Brisbane", "2", "941"],
        ["Pull along ATV mower attachment with multiple modes", "4", "day", true, "Brisbane", "1", "278"],
        ["Pull along ATV mower attachment with multiple modes", "5", "day", true, "Brisbane", "5", "523"],
        ["Pull along ATV mower attachment with multiple modes", "6", "day", true, "Brisbane", "5", "523"],
        ["Pull along ATV mower attachment with multiple modes", "7", "day", true, "Brisbane", "3", "523"],
        ["Pull along ATV mower attachment with multiple modes", "8", "day", true, "Brisbane", "4", "523"],
        ["Pull along ATV mower attachment with multiple modes", "9", "day", true, "Brisbane", "3", "523"],
        ["Pull along ATV mower attachment with multiple modes", "10", "day", true, "Brisbane", "1", "333"],
        ["Pull along ATV mower attachment with multiple modes", "11", "day", true, "Brisbane", "2", "941"],
        ["Pull along ATV mower attachment with multiple modes", "12", "day", true, "Brisbane", "1", "278"],
        ["Pull along ATV mower attachment with multiple modes", "13", "day", true, "Brisbane", "5", "523"],
        ["Pull along ATV mower attachment with multiple modes", "14", "day", true, "Brisbane", "5", "523"],
        ["Pull along ATV mower attachment with multiple modes", "15", "day", true, "Brisbane", "3", "523"],
        ["Pull along ATV mower attachment with multiple modes", "16", "day", true, "Brisbane", "4", "523"], 
        ["Pull along ATV mower attachment with multiple modes", "17", "day", true, "Brisbane", "3", "523"],
        ["Pull along ATV mower attachment with multiple modes", "18", "day", true, "Brisbane", "1", "333"],
        ["Pull along ATV mower attachment with multiple modes", "19", "day", true, "Brisbane", "2", "941"],
        ["Pull along ATV mower attachment with multiple modes", "20", "day", true, "Brisbane", "1", "278"],
        ["Pull along ATV mower attachment with multiple modes", "21", "day", true, "Brisbane", "5", "523"],
        ["Pull along ATV mower attachment with multiple modes", "22", "day", true, "Brisbane", "5", "523"],
        ["Pull along ATV mower attachment with multiple modes", "23", "day", true, "Brisbane", "3", "523"],
        ["Pull along ATV mower attachment with multiple modes", "24", "day", true, "Brisbane", "4", "523"],   
        ["Pull along ATV mower attachment with multiple modes", "25", "day", true, "Brisbane", "3", "523"],
        ["Pull along ATV mower attachment with multiple modes", "26", "day", true, "Brisbane", "1", "333"],
        ["Pull along ATV mower attachment with multiple modes", "27", "day", true, "Brisbane", "2", "941"],
        ["Pull along ATV mower attachment with multiple modes", "28", "day", true, "Brisbane", "1", "278"],
        ["Pull along ATV mower attachment with multiple modes", "29", "day", true, "Brisbane", "5", "523"],
        ["Pull along ATV mower attachment with multiple modes", "30", "day", true, "Brisbane", "5", "523"],
        ["Pull along ATV mower attachment with multiple modes", "31", "day", true, "Brisbane", "3", "523"],
        ["Pull along ATV mower attachment with multiple modes", "32", "day", true, "Brisbane", "4", "523"], 
        ["Pull along ATV mower attachment with multiple modes", "33", "day", true, "Brisbane", "3", "523"],
        ["Pull along ATV mower attachment with multiple modes", "34", "day", true, "Brisbane", "1", "333"],
        // ["Pull along ATV mower attachment with multiple modes", "35", "day", true, "Brisbane", "2", "941"],
        // ["Pull along ATV mower attachment with multiple modes", "36", "day", true, "Brisbane", "1", "278"],
        // ["Pull along ATV mower attachment with multiple modes", "37", "day", true, "Brisbane", "5", "523"],
        // ["Pull along ATV mower attachment with multiple modes", "38", "day", true, "Brisbane", "5", "523"],
        // ["Pull along ATV mower attachment with multiple modes", "39", "day", true, "Brisbane", "3", "523"],
        // ["Pull along ATV mower attachment with multiple modes", "40", "day", true, "Brisbane", "4", "523"],      
    ]

    const NumSearchPages = Math.ceil(searchResultSamples.length / 8);

    const [SearchPage, setSearchPage] = useState(1);
    const [SortBy, setSortBy] = useState('Nothing Selected');

    const getSearchPages = () => {
        let content = [];
        for (let i = 1; i < NumSearchPages +1; i++) {
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
        if (SearchPage === NumSearchPages || searchResultSamples.length < 8) {
            numResults = startIndex + (searchResultSamples.length - ((SearchPage -1) * 8));
        }
        for (let i = startIndex; i < numResults; i++) {
            content.push(
            <ItemCard
            itemName={searchResultSamples[i][0]}
            price={searchResultSamples[i][1]}
            rate={searchResultSamples[i][2]}
            availability={searchResultSamples[i][3]}
            location={searchResultSamples[i][4]}
            rating={searchResultSamples[i][5]}
            id={searchResultSamples[i][6]} 
            key={i}/>)
        }
        return content;
    }

    const handleChange = (event) => {
        setSortBy(event.target.value);
    }

    const classes = useStyles();

    return (
        <PageWrapper>
            <SearchFilterBar />
            <div className="SearchMainContainer">
                <div className="SearchSortFlex">
                    <div className="SearchMainText">Search results for: <span style={{fontWeight: 'normal'}}>Pressure Washer</span></div>
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
                        <MenuItem value="Nothing Selected" style={{display: 'none'}}>Nothing Selected</MenuItem>
                        <MenuItem value="Price - Low to High">Price - Low to High</MenuItem>
                        <MenuItem value="Price - High to Low">Price - High to Low</MenuItem>
                        <MenuItem value="Rating - Low to High">Rating - Low to High</MenuItem>
                        <MenuItem value="Rating - High to Low">Rating - High to Low</MenuItem>

                        </Select>
                    </div>
                </div>

                <div className="ItemCardSection" style={{padding: '1em .5em'}}>
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
                <div className="SuggestedItemsSection">
                    <div className="SearchMainText">Suggested items outside your search for: <span style={{fontWeight: 'normal'}}>Heavy duty car jack</span></div>

                    <div className="ItemCardSection" style={{padding: '1em .5em'}}>
                    <ItemCard itemName={searchResultSamples[0][0]} price={searchResultSamples[0][1]} rate={searchResultSamples[0][2]} availability={searchResultSamples[0][3]} location={searchResultSamples[0][4]} rating={searchResultSamples[0][5]} id={searchResultSamples[0][6]}/>

                    <ItemCard itemName={searchResultSamples[0][0]} price={searchResultSamples[0][1]} rate={searchResultSamples[0][2]} availability={searchResultSamples[0][3]} location={searchResultSamples[0][4]} rating={searchResultSamples[0][5]} id={searchResultSamples[0][6]}/>

                    <ItemCard itemName={searchResultSamples[0][0]} price={searchResultSamples[0][1]} rate={searchResultSamples[0][2]} availability={searchResultSamples[0][3]} location={searchResultSamples[0][4]} rating={searchResultSamples[0][5]} id={searchResultSamples[0][6]}/>

                    <ItemCard itemName={searchResultSamples[0][0]} price={searchResultSamples[0][1]} rate={searchResultSamples[0][2]} availability={searchResultSamples[0][3]} location={searchResultSamples[0][4]} rating={searchResultSamples[0][5]} id={searchResultSamples[0][6]}/>

                    </div>
                </div>
            </div>
        </PageWrapper>
    )
}

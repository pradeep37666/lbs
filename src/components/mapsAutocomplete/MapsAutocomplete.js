import React, { useState, useEffect } from 'react'
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService"
import {
    withStyles,
    makeStyles,
  } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import GoogleMapReact from 'google-map-react'
import MapMarker from '../mapMarker/mapMarker'
import parseAddressComponent from '../../util/parseAddressComponent'

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: '1.2em',
        }
    },
    input: {
        borderRadius: '10px',
        position: 'relative',
        backgroundColor: '#FFF',
        border: 'none',
        fontSize: '16px',
        width: '100%',
        padding: '1.2em',
        fontWeight: '500',
        border: '1px solid #ac172c',
        color: '#000',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            'DMSans'
        ].join(','),
        '&:focus': {
            boxShadow: `rgba(172, 23, 44, 0.75) 0 0 0 0.1rem`,
            borderColor: '#FFF',
        },
    },
}))(InputBase);

const CustomListItem = withStyles((theme) => ({
    root: {
        borderRadius: '10px',
        paddingTop: '4px',
        paddingBottom: '4px',
    },
    button: {
        transition: 'background-color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
}))(ListItem);

export default function MapsAutocomplete(props) {

    const {
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        debounce: 500,
    })

    const [ value, setValue ] = useState(props.defaultLocation ? props.defaultLocation : '')
    const [ showResults, setShowResults ] = useState(true)
    const [ lat, setLat ] = useState(props.defaultLat ? props.defaultLat : '')
    const [ lng, setLng ] = useState(props.defaultLng ? props.defaultLng : '')
    const [ place, setPlace ] = useState('')
    const [ mapInstance, setMapInstance ] = useState('')
    const [ googleInstance, setGoogleInstance ] = useState('')
    const [ mapProps, setMapProps ] = useState({
        center: {
            lat: -25.6091,
            lng: 134.3619
        },
        zoom: 4
    })

    const useStyles = makeStyles((theme) => ({
        form: {
            width: '100%',
            marginBottom: '1em',
        },
        limitDiv: {
            position: 'absolute',
            right: 15,
            top: '55%',
            zIndex: '100',
            fontSize: '12px',
            fontWeight: '500',
            color: '#8E8E8E'
        },
        listText: {
            fontFamily: 'DMSans'
        }
    }))

    const classes = useStyles();

    const changeValue = (e) => {
        setShowResults(true)
        getPlacePredictions({ input: e.target.value })
        setValue(e.target.value)
    }

    const selectAddress = (place) => {
        setShowResults(false)
        setValue(place.description)
        getPlaceDetails(place)
        setPlace(place)
    }

    const getPlaceDetails = async (place) => {
        const request = {
            placeId: place.place_id,
            fields: ['formatted_address', 'geometry', 'address_components']
        }
        const service = new googleInstance.places.PlacesService(mapInstance)
        service.getDetails(request, callback)
        function callback(place, status) {
            if (status == googleInstance.places.PlacesServiceStatus.OK) {
                setPlace(place)
                setLat(place.geometry.location.lat())
                setLng(place.geometry.location.lng())
            }
        }
    }

    useEffect(() => {
        if (lat && lng) {
            setMapProps({
                center: {
                    lat: lat,
                    lng: lng
                },
                zoom: 12
            })
            if (place) {
                const selectedPlace = {
                    ...parseAddressComponent(place.address_components),
                    lat,
                    lng,
                }
                props.setAddress(selectedPlace)
            } else {
                props.setAddress(props.defaultAddress)
            }
        }
    }, [lat, lng, props.defaultAddress])

    useEffect(() => {
        if(value === '') {
            props.setAddress('')
        }
    },[value])

    return (
        <FormControl className={classes.form}>

            <div className="MapContainer" style={{ height: props.small ? '150px' : '400px'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ 
                        key: process.env.REACT_APP_GOOGLE_API_KEY,
                        libraries: ['places']
                    }}
                    center={mapProps.center}
                    zoom={mapProps.zoom}
                    onGoogleApiLoaded={({ map, maps }) => { 
                        setGoogleInstance(maps)
                        setMapInstance(map)
                    }}
                    yesIWantToUseGoogleMapApiInternals={true}
                >
                    <MapMarker 
                    lat={lat}
                    lng={lng}
                    />
                    
                </GoogleMapReact>
            </div>
            <div className="LoginHeader LoginHeader--NoMargin">Address</div>

            <BootstrapInput value={value} onChange={(e) => changeValue(e)}/>
            <List>
            {!isPlacePredictionsLoading && showResults ? 
                placePredictions.map((place, index) => {
                    return (
                        <CustomListItem button onClick={() => selectAddress(place)} key={index}>
                            <ListItemText 
                            primary={place.structured_formatting.main_text} 
                            secondary={place.structured_formatting.secondary_text} 
                            classes={{ primary: classes.listText, secondary: classes.listText }} 
                            />
                        </CustomListItem>
                    )
                })
                : ''}
            </List>
        </FormControl>
    )
}

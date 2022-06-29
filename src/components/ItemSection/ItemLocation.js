import React, { useEffect, useState } from 'react'
import Geocode from 'react-geocode'
import GoogleMapReact from 'google-map-react'

const ItemLocation = ({ item }) => {
    const [ approx, setApprox ] = useState(null)
    const defaultProps = {
        center: {
            lat: -27.481009,
            lng: 153.040596
        },
        zoom: 14
    }

    useEffect(() => {
        if (!item) return
        getGeocode(item)
    },[item])

    const getGeocode = async (item) => {
        if (item.address?.suburb) {
            try {
                Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
                Geocode.setLanguage('en')
                Geocode.setRegion('au')
                Geocode.setLocationType('ROOFTOP')
                Geocode.enableDebug(false)
                const { results } = await Geocode.fromAddress(item.address.suburb)
                if (results) {
                    setApprox({
                        center: {
                            lat: results[0].geometry.location.lat,
                            lng: results[0].geometry.location.lng
                        }
                    })
                }
            } catch (error) {
                console.log(error.response)
                alert('There was an issue processing this address, please try again')
            }
        }
    }
    return (
        <>
            <div className="ItemDetailsHeader">Location</div>
            <div className="MapContainer">
                {approx &&
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                center={approx ? approx.center : defaultProps.center}
                zoom={defaultProps.zoom}
                onGoogleApiLoaded={({ map, maps }) => 
                new maps.Circle({
                    strokeColor: '#03a5fc',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#03a5fc',
                    fillOpacity: 0.3,
                    map,
                    center: approx.center,
                    radius: 1000,
                })} />
                }
            </div>
            <div className="PickupLocationText">Pickup location around {item.suburb}</div>
            <div className="PickupLocationTextLight">Enquire about the item to acquire location</div>
        </>
    )
}

export default ItemLocation
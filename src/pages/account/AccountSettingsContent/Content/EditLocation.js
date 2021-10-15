import React, { useState } from 'react'
import Instance from '../../../../util/axios';
import useGlobalState from '../../../../util/useGlobalState';
import MapsAutocomplete from '../../../../components/mapsAutocomplete/MapsAutocomplete';
import getSuburb from '../../../../util/getSuburb';

export default function EditLocation() {
  const globalState = useGlobalState().state;
  const dispatch = useGlobalState().dispatch;
  const { user } = globalState;

  const [address, setAddress] = useState(user.address)

  const updateLocationDetails = () => {

    let suburb
    address.address_components ? suburb = getSuburb(address.address_components) : suburb = user.suburb

    const data = {
      address: address.formatted_address ? address.formatted_address : user.address,
      suburb: suburb,
    }
    Instance.put('user/update', data)
      .then((response) => {
        console.log(response)
        let newData = user
        newData.address = data.address
        newData.suburb = data.suburb
        dispatch({ type: 'setUser', data: newData })
      })
      .catch((error) => {
        console.log(error.response)
      })
    }

    return (
      <div className="AccountSettings__Container">
        <div className="AccountSettings__Title">Location</div>

        <MapsAutocomplete setAddress={setAddress} defaultLocation={user.address} defaultLat={user.lat} defaultLng={user.lng} />

        <div className="AccountSettings__ButtonFlex">
          <button
            className="LoginFormButton AccountSettings__SaveButton"
            onClick={() => updateLocationDetails()}
          >
            Save Changes
          </button>
        </div>
      </div>
    )
  }

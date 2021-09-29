import React, { useState } from 'react'
import Instance from '../../../../util/axios';
import useGlobalState from '../../../../util/useGlobalState';
import MapsAutocomplete from '../../../../components/mapsAutocomplete/MapsAutocomplete';
import getSuburb from '../../../../util/getSuburb';

export default function EditLocation() {
    const globalState = useGlobalState().state
    const dispatch = useGlobalState().dispatch
    const { user } = globalState

    const [address, setAddress] = useState(user.address)

    const updateLocationDetails = () => {

        const data = {
            address: address ? address.description : user.address,
            suburb: address.terms ? getSuburb(address.terms) : user.suburb,
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

            <div className="LoginHeader">Shed Location</div>
            <div className="AccountSettings__BodyText">
                <p>If you would like to share your shed with users, Little big shed will need to know your location in order for borrowers to find you.</p>
                <p>These settings will be automatically filled when you list a new item.</p>

            </div>

            <MapsAutocomplete setAddress={setAddress} defaultLocation={user.address} defaultLat={user.lat} defaultLng={user.lng}/>

            <div className="AccountSettings__ButtonFlex">
                <button className="LoginFormButton AccountSettings__SaveButton" onClick={() => updateLocationDetails()}>Save Changes</button>
            </div>

        </div>
    )
}

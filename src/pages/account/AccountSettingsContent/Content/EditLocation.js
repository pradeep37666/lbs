import React, { useEffect, useState } from 'react'
import Instance from '../../../../util/axios'
import useGlobalState from '../../../../util/useGlobalState'
import MapsAutocomplete from '../../../../components/mapsAutocomplete/MapsAutocomplete'
import Button from '../../../../components/Button/Button'

export default function EditLocation() {
  const [ isLoading, setIsLoading ] = useState(false)
  const globalState = useGlobalState().state
  const dispatch = useGlobalState().dispatch
  const { user } = globalState;

  const [ address, setAddress ] = useState(user.address)

  const updateLocationDetails = async () => {
    try {
      setIsLoading(true)
      const { data, status } = await Instance.patch('/users', address)
      if (status !== 200) return
      dispatch({type: 'setUser', data})
    } catch (error) {
      console.log(error.response)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="AccountSettings__Container">
      <div className="AccountSettings__Title">Location</div>

      <MapsAutocomplete 
        setAddress={setAddress} 
        defaultAddress={user.address}
        defaultLocation={user.address.fullAddress} 
        defaultLat={user.address.lat} 
        defaultLng={user.address.lng}
      />

      <div className="AccountSettings__ButtonFlex">
        <Button
          text="Save Changes"
          onClick={() => updateLocationDetails()}
          isLoading={isLoading}
          style={{width: '60%'}}
        />
      </div>
    </div>
  )
}

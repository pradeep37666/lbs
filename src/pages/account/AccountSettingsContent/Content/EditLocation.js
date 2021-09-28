import React, { useState } from "react";
import Instance from "../../../../util/axios";
import {
  handleAddress,
  handleCity,
  handleCountry,
  handleState,
} from "../../../../util/UserValidation";
import ValidationPopup from "../../../../components/ValidationPopup/ValidationPopup";
import useGlobalState from "../../../../util/useGlobalState";

export default function EditLocation() {
  const globalState = useGlobalState().state;
  const dispatch = useGlobalState().dispatch;
  const { user } = globalState;

  const [addressValidation, setAddressValidation] = useState("");
  const [cityValidation, setCityValidation] = useState("");
  const [countryValidation, setCountryValidation] = useState("");
  const [stateValidation, setStateValidation] = useState("");

  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [country, setCountry] = useState(user.country);
  const [state, setState] = useState(user.state);

  const showValidation = (field) => {
    switch (field) {
      case "address":
        return addressValidation.length > 0 ? false : true;
      case "city":
        return cityValidation.length > 0 && addressValidation.length === 0
          ? false
          : true;
      case "country":
        return countryValidation.length > 0 &&
          addressValidation.length === 0 &&
          cityValidation.length === 0
          ? false
          : true;
      case "state":
        return stateValidation.length > 0 &&
          addressValidation.length === 0 &&
          cityValidation.length === 0 &&
          countryValidation.length === 0
          ? false
          : true;
      default:
        return;
    }
  };

  const updateLocationDetails = () => {
    console.log(user);

    const data = {
      address: address ? address : user.address,
      city: city ? city : user.city,
      country: country ? country : user.country,
      state: state ? state : user.state,
    };
    console.log("sending", data);
    Instance.put("user/update", data)
      .then((response) => {
        console.log(response);
        let newData = user;
        newData.address = data.address;
        newData.city = data.city;
        newData.country = data.country;
        newData.state = data.state;
        dispatch({ type: "setUser", data: newData });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="AccountSettings__Container">
      <div className="AccountSettings__Title">Location</div>

      <div className="LoginHeader">Shed Location</div>
      <div className="AccountSettings__BodyText">
        <p>
          If you would like to share your shed with users, Little big shed will
          need to know your location in order for borrowers to find you.
        </p>
        <p>
          These settings will be automatically filled when you list a new item.
        </p>
      </div>

      <div className="LoginHeader LoginHeader--NoMargin">Address</div>
      <div className="LoginInputValidationContainer">
        <input
          type="text"
          placeholder="43 Brandon Road Runcorn"
          defaultValue={user.address}
          className="LoginInput"
          onBlur={(e) => handleAddress(e, setAddress, setAddressValidation)}
        />
        <div
          className={`triangleLeft ${
            showValidation("address") ? "" : "ValidationTextHide"
          }`}
        />
        <ValidationPopup
          errorText={addressValidation}
          errorHeader="Invalid Address"
          hide={showValidation("address")}
        />
      </div>
      <div className="LoginHeader LoginHeader--NoMargin">City</div>
      <div className="LoginInputValidationContainer">
        <input
          type="text"
          placeholder="Brisbane"
          defaultValue={user.city}
          className="LoginInput"
          onBlur={(e) => handleCity(e, setCity, setCityValidation)}
        />
        <div
          className={`triangleLeft ${
            showValidation("city") ? "" : "ValidationTextHide"
          }`}
        />
        <ValidationPopup
          errorText={cityValidation}
          errorHeader="Invalid City"
          hide={showValidation("city")}
        />
      </div>
      <div className="LoginHeader LoginHeader--NoMargin">Country</div>
      <div className="LoginInputValidationContainer">
        <input
          type="text"
          placeholder="Australia"
          defaultValue={user.country}
          className="LoginInput"
          onBlur={(e) => handleCountry(e, setCountry, setCountryValidation)}
        />
        <div
          className={`triangleLeft ${
            showValidation("country") ? "" : "ValidationTextHide"
          }`}
        />
        <ValidationPopup
          errorText={countryValidation}
          errorHeader="Invalid Country"
          hide={showValidation("country")}
        />
      </div>
      <div className="LoginHeader LoginHeader--NoMargin">State</div>
      <div className="LoginInputValidationContainer">
        <input
          type="text"
          placeholder="Qld"
          defaultValue={user.state}
          className="LoginInput"
          onBlur={(e) => handleState(e, setState, setStateValidation)}
        />
        <div
          className={`triangleLeft ${
            showValidation("state") ? "" : "ValidationTextHide"
          }`}
        />
        <ValidationPopup
          errorText={stateValidation}
          errorHeader="Invalid State"
          hide={showValidation("state")}
        />
      </div>

      <div className="AccountSettings__ButtonFlex">
        <button
          className="LoginFormButton AccountSettings__SaveButton"
          onClick={() => updateLocationDetails()}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

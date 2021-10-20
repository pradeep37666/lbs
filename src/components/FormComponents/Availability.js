import React, { useState, useEffect } from "react";
import ProductSlots from "../productSlots/productSlots";
import { ReactComponent as Logo } from "./../../assets/Logos/LogoRed.svg";

export default function Availability(props) {
  const [mondayM, setMondayM] = useState(
    props.getAvailability?.charAt(0) === "1" ? true : false
  );
  const [mondayA, setMondayA] = useState(
    props.getAvailability?.charAt(1) === "1" ? true : false
  );
  const [tuesdayM, setTuesdayM] = useState(
    props.getAvailability?.charAt(2) === "1" ? true : false
  );
  const [tuesdayA, setTuesdayA] = useState(
    props.getAvailability?.charAt(3) === "1" ? true : false
  );
  const [wednesdayM, setWednesdayM] = useState(
    props.getAvailability?.charAt(4) === "1" ? true : false
  );
  const [wednesdayA, setWednesdayA] = useState(
    props.getAvailability?.charAt(5) === "1" ? true : false
  );
  const [thursdayM, setThursdayM] = useState(
    props.getAvailability?.charAt(6) === "1" ? true : false
  );
  const [thursdayA, setThursdayA] = useState(
    props.getAvailability?.charAt(7) === "1" ? true : false
  );
  const [fridayM, setFridayM] = useState(
    props.getAvailability?.charAt(8) === "1" ? true : false
  );
  const [fridayA, setFridayA] = useState(
    props.getAvailability?.charAt(9) === "1" ? true : false
  );
  const [saturdayM, setSaturdayM] = useState(
    props.getAvailability?.charAt(10) === "1" ? true : false
  );
  const [saturdayA, setSaturdayA] = useState(
    props.getAvailability?.charAt(11) === "1" ? true : false
  );
  const [sundayM, setSundayM] = useState(
    props.getAvailability?.charAt(12) === "1" ? true : false
  );
  const [sundayA, setSundayA] = useState(
    props.getAvailability?.charAt(13) === "1" ? true : false
  );

  const wipeState = () => {
    props.setAvailability("00000000000000");
  };

  const formatAvailability = () => {
    var string = "";

    string = string.concat(mondayM ? "1" : "0");
    string = string.concat(mondayA ? "1" : "0");
    string = string.concat(tuesdayM ? "1" : "0");
    string = string.concat(tuesdayA ? "1" : "0");
    string = string.concat(wednesdayM ? "1" : "0");
    string = string.concat(wednesdayA ? "1" : "0");
    string = string.concat(thursdayM ? "1" : "0");
    string = string.concat(thursdayA ? "1" : "0");
    string = string.concat(fridayM ? "1" : "0");
    string = string.concat(fridayA ? "1" : "0");
    string = string.concat(saturdayM ? "1" : "0");
    string = string.concat(saturdayA ? "1" : "0");
    string = string.concat(sundayM ? "1" : "0");
    string = string.concat(sundayA ? "1" : "0");

    return string;
  };

  useEffect(() => {
    var availabilityString = formatAvailability();
    props.setAvailability(availabilityString);
  }, [
    mondayM,
    mondayA,
    tuesdayM,
    tuesdayA,
    wednesdayM,
    wednesdayA,
    thursdayM,
    thursdayA,
    fridayM,
    fridayA,
    saturdayM,
    saturdayA,
    sundayM,
    sundayA,
  ]);

  return (
    <div className="RegistrationWrapper">
      <div className="LoginMain" style={props.style ? props.style : null }>
        <Logo height="50px" width="50px" style={{ marginBottom: ".5em" }} />

        <div className="LoginHeader">General Product Availability</div>
        <div className="LoginText LoginTextSmall">
          Little big shed lets you have control over the days you want to lend
          out your products.
        </div>
        <div className="LoginText LoginTextSmall">
          Select the days and enter the times you are available for trades.
        </div>

        <ProductSlots
          setMondayM={setMondayM}
          setMondayA={setMondayA}
          mondayM={mondayM}
          mondayA={mondayA}
          setTuesdayM={setTuesdayM}
          setTuesdayA={setTuesdayA}
          tuesdayM={tuesdayM}
          tuesdayA={tuesdayA}
          setWednesdayM={setWednesdayM}
          setWednesdayA={setWednesdayA}
          wednesdayM={wednesdayM}
          wednesdayA={wednesdayA}
          setThursdayM={setThursdayM}
          setThursdayA={setThursdayA}
          thursdayM={thursdayM}
          thursdayA={thursdayA}
          setFridayM={setFridayM}
          setFridayA={setFridayA}
          fridayM={fridayM}
          fridayA={fridayA}
          setSaturdayM={setSaturdayM}
          setSaturdayA={setSaturdayA}
          saturdayM={saturdayM}
          saturdayA={saturdayA}
          setSundayM={setSundayM}
          setSundayA={setSundayA}
          sundayM={sundayM}
          sundayA={sundayA}
        />
        <div className="SkipNextButtonFlex" style={props.style ? { justifyContent: 'center'} : null }>
          {props.addEditButtons ? (
            <>
              <div>
                <button
                  style={{ marginBottom: "4%" }}
                  className={`LoginFormButton`}
                  onClick={() => {props.handleDiscardChanges() }}
                >
                  Save Availability
                </button>
                <button
                  className="LoginFormButton LoginFormButtonInverted"
                  onClick={() => {
                    props.handleDiscardChanges();
                  }}
                  style={{ marginRight: ".5em" }}
                >
                  Discard Changes
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                className="LoginFormButton LoginFormButtonInverted"
                onClick={() => {
                  wipeState();
                  if (props.isUpgrade) {
                    props.submitUpgrade();
                    props.handleNextPage("Complete!");
                  } else {
                    props.handleNextPage("Terms & Conditions");
                  }
                }}
                style={{ marginRight: ".5em" }}
              >
                Skip Step
              </button>
              <button
                className={`LoginFormButton ${
                  !props.validated ? "ButtonDisabled" : ""
                }`}
                disabled={!props.validated}
                onClick={() => {
                  if (props.isUpgrade) {
                    props.submitUpgrade();
                    props.handleNextPage("Complete!");
                  } else {
                    props.handleNextPage("Terms & Conditions");
                  }
                }}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

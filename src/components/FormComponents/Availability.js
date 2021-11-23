import React, { useState, useEffect } from "react";
import ProductSlots from "../productSlots/ProductSlots";
import { ReactComponent as Logo } from "./../../assets/Logos/LogoRed.svg";
import Button from "../Button/Button";

export default function Availability(props) {

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
        availability={props.availability}
        setAvailability={props.setAvailability}
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
              {/* <button
                className="LoginFormButton LoginFormButtonInverted"
                onClick={() => {
                  props.setAvailability(Array(14).fill(0))
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
              </button> */}
              <Button 
              text="Skip Step"
              onClick={() => {
                props.setAvailability(Array(14).fill(0))
                if (props.isUpgrade) {
                  props.submitUpgrade();
                  props.handleNextPage("Complete!");
                } else {
                  props.handleNextPage("Terms & Conditions");
                }
              }}
              invertedColors
              />
              {/* <button
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
              </button> */}
              <Button 
              text="Next"
              onClick={() => {
                if (props.isUpgrade) {
                  props.submitUpgrade();
                  props.handleNextPage("Complete!");
                } else {
                  props.handleNextPage("Terms & Conditions");
                }
              }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

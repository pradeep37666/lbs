import React, { useState, useEffect, useContext } from "react";
import ProductSlots from "../productSlots/ProductSlots";
import { ReactComponent as Logo } from "./../../assets/Logos/LogoRed.svg";
import Button from "../Button/Button";
import { FormContext } from "../../pages/account/UpgradeLender/UpgradeLender";

export default function Availability(props) {
  const { state } = useContext(FormContext)
  const { isLenderUpgrade } = state

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
              <Button 
              isDisabled={!props.availability.includes(1)}
              text="Next"
              onClick={() => {
                if (isLenderUpgrade) {
                  props.submitUpgrade();
                } else {
                  props.handleNextPage("Terms & Conditions");
                }
              }}
              />
          )}
        </div>
      </div>
    </div>
  );
}

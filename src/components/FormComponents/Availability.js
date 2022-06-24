import React, { useState, useEffect, useContext } from "react";
import ProductSlots from "../productSlots/productSlots";
import { ReactComponent as Logo } from "./../../assets/Logos/LogoRed.svg";
import Button from "../Button/Button";
import useGlobalState from "../../util/useGlobalState";

export default function Availability({ 
  context, 
  style,  
  submitUpgrade, 
  isUpgradeLoading, 
  isEditItem, 
  onCancel,
  type,
}) {
  const [initialAvailability, setInitialAvailability] = useState()

  const { state, dispatch } = useContext(context)
  const { availability } = state
  const { user } = useGlobalState().state

  useEffect(() => {
    setInitialAvailability(availability)
  },[])

  return (
    <div className="RegistrationWrapper">
      <div className="LoginMain" style={ style }>
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
        availability={availability}
        onAvailabilityChange={(newAvailability) => dispatch({ type: 'setAvailability', data: newAvailability })}
        />
        <div className="SkipNextButtonFlex" style={ style ? { justifyContent: 'center'} : null }>
          { isEditItem ? (
            <>
              <Button 
              text="Cancel"
              invertedColors
              style={{ marginRight: '0.5rem'}}
              onClick={() => {
                dispatch({ type: 'setAvailability', data: initialAvailability })
                onCancel()
              }}
              />
              <Button 
              text="Save"
              onClick={() => onCancel()}
              />
            </>
          ) : (
            <Button 
            isDisabled={!availability.includes(1)}
            text="Next"
            isLoading={isUpgradeLoading}
            onClick={() => (user && type === 'upgrateLender') ? submitUpgrade() : dispatch({ type: 'setCurrentPage', data: 'Terms & Conditions'})}
            />
          )}
        </div>
      </div>
    </div>
  );
}

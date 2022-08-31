import React, { useState, useContext } from 'react'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg'
import ProductSlots from '../../../components/productSlots/productSlots'
import Button from '../../../components/Button/Button'

export const Availability = ({ context, openModal }) => {
  const { state, dispatch } = useContext(context)
  const { availability } = state
  const [ keepTimes, setKeepTimes ] = useState(true);


  return (
    <div className="RegistrationWrapper">
      {keepTimes ? (
        <div className="LoginMain">
          <Logo height="50px" width="50px" style={{ marginBottom: ".5em" }} />

          <div className="LoginHeader">General Product Availability</div>
          <div className="LoginText LoginTextSmall">
            Little big shed lets you have control over the days you want to lend
            out your products.
          </div>
          <div className="LoginText LoginTextSmall">
            You can keep the dates you set up on creation of your Little Big
            Shed Lender Account, or create a custom set of dates and times for
            this item.
          </div>
          <Button 
          text="Keep Set Times"
          onClick={openModal}
          style={{ marginBottom: '1rem'}}
          />
          <Button 
          invertedColors
          onClick={() => setKeepTimes(false)}
          text="Set Custom Times"
          />
        </div>
      ) : (
        <div className="LoginMain">
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
          onAvailabilityChange={newAvailability => dispatch({ type: 'setAvailability', data: newAvailability})}
          />
          <div className="SkipNextButtonFlex">
              <Button 
              text="Next"
              onClick={openModal}
              />
          </div>

        </div>
      )}
    </div>
  )
}

export default Availability
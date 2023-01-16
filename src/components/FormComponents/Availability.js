import { useState, useEffect, useContext } from 'react'
import { ReactComponent as Logo } from './../../assets/Logos/LogoRed.svg'
import Button from '../Button/Button'
import useGlobalState from '../../util/useGlobalState'
import { REGISTER_PAGES } from '../../assets/Data/LBSEnum'
import TimeSlots from '../timeSlots/TimeSlots'

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
  const { blockedAvailabilities } = state
  const { user } = useGlobalState().state

  useEffect(() => {
    setInitialAvailability(blockedAvailabilities)
  }, [])

  return (
    <div className="RegistrationWrapper">
      <div className="LoginMain" style={style}>
        <Logo height="50px" width="50px" style={{ marginBottom: '.5em' }} />

        <div className="LoginHeader">General Product Availability</div>
        <div className="LoginText LoginTextSmall">
          Little big shed lets you have control over the days you want to lend
          out your products.
        </div>
        <div className="LoginText LoginTextSmall">
          Select the days and enter the times you are available for trades.
        </div>

        <TimeSlots
          blockedAvailabilities={blockedAvailabilities}
          onTimeSlotBlocked={blockedAvailability => {
            dispatch({
              type: 'setBlockedAvailability',
              data: blockedAvailability,
            })
          }}
        />
        <div
          className="SkipNextButtonFlex"
          style={style ? { justifyContent: 'center' } : null}
        >
          {isEditItem ? (
            <>
              <Button
                text="Cancel"
                invertedColors
                style={{ marginRight: '0.5rem' }}
                onClick={() => {
                  dispatch({
                    type: 'setAvailability',
                    data: initialAvailability,
                  })
                  onCancel()
                }}
              />
              <Button text="Save" onClick={() => onCancel()} />
            </>
          ) : (
            <Button
              isDisabled={!blockedAvailabilities.length}
              text="Next"
              isLoading={isUpgradeLoading}
              onClick={() =>
                user && type === 'upgrateLender'
                  ? submitUpgrade()
                  : dispatch({
                      type: 'setCurrentPage',
                      data: REGISTER_PAGES.TNC,
                    })
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}

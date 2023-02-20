import { useState, useContext, useEffect } from 'react'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg'
import Button from '../../../components/Button/Button'
import TimeSlots from '../../../components/timeSlots/TimeSlots'
import { blockedAvailabilityToString } from '../../../util/blockedAvailabilityToString'

export const Availability = ({ context, openModal }) => {
  const { state, dispatch } = useContext(context)
  const { newPostItemBlockedAvailabilities } = state
  const [keepTimes, setKeepTimes] = useState(true)
  const [blockedAvailabilities, setBlockedAvailabilities] = useState(
    newPostItemBlockedAvailabilities?.map(availability => {
      return {
        weekDay: blockedAvailabilityToString(availability.weekDay),
        startTime: availability.startTime,
        endTime: availability.endTime,
      }
    })
  )

  const updateBlockedAvailabilities = blockedAvailability => {
    const existingBlockedAvailabilityIndex = blockedAvailabilities.findIndex(
      availability => {
        return (
          blockedAvailability.weekDay === availability.weekDay &&
          blockedAvailability.startTime === availability.startTime &&
          blockedAvailability.endTime === availability.endTime
        )
      }
    )

    if (existingBlockedAvailabilityIndex !== -1) {
      const filteredBlockedAvailabilities = blockedAvailabilities.filter(
        (_, index) => index !== existingBlockedAvailabilityIndex
      )
      setBlockedAvailabilities(filteredBlockedAvailabilities)
    } else {
      setBlockedAvailabilities([...blockedAvailabilities, blockedAvailability])
    }
  }

  const storeBlockedAvailabilities = isNewTime => {
    dispatch({
      type: 'setNewPostItemBlockedAvailabilities',
      data: blockedAvailabilities,
    })
    openModal(isNewTime)
  }

  return (
    <div className='RegistrationWrapper'>
      {keepTimes ? (
        <div className='LoginMain'>
          <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

          <div className='LoginHeader'>General Product Availability</div>
          <div className='LoginText LoginTextSmall'>
            Little big shed lets you have control over the days you want to lend
            out your products.
          </div>
          <div className='LoginText LoginTextSmall'>
            You can keep the dates you set up on creation of your Little Big
            Shed Lender Account, or create a custom set of dates and times for
            this item.
          </div>
          <Button
            text='Keep Set Times'
            onClick={() => openModal(false)}
            style={{ marginBottom: '1rem' }}
          />
          <Button
            invertedColors
            onClick={() => setKeepTimes(false)}
            text='Set Custom Times'
          />
        </div>
      ) : (
        <div className='LoginMain'>
          <Logo height='50px' width='50px' style={{ marginBottom: '.5em' }} />

          <div className='LoginHeader'>General Product Availability</div>
          <div className='LoginText LoginTextSmall'>
            Little big shed lets you have control over the days you want to lend
            out your products.
          </div>
          <div className='LoginText LoginTextSmall'>
            Select the days and enter the times you are available for trades.
          </div>

          <TimeSlots
            blockedAvailabilities={blockedAvailabilities}
            onTimeSlotBlocked={blockedAvailability => {
              updateBlockedAvailabilities(blockedAvailability)
            }}
          />
          <div className='SkipNextButtonFlex'>
            <Button
              text='Next'
              onClick={() => storeBlockedAvailabilities(true)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Availability

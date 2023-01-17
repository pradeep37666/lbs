import { useEffect, useState } from 'react'
import './AccountAvailability.css'
import useGlobalState from '../../../util/useGlobalState'
import Button from '../../../components/Button/Button'
import {
  BlockedAvailabilityToNumber,
  BlockedAvailabilityToString,
} from '../../../types/User'
import TimeSlots from '../../../components/timeSlots/TimeSlots'
import UserService from '../../../services/user'
import useErrorState from '../../../util/reducers/errorContext'
import { SNACKBAR_BUTTON_TYPES } from '../../../assets/Data/LBSEnum'

export default function Availability({ setAccountContent }) {
  const [isLoading, setIsLoading] = useState(false)
  const { state, dispatch } = useGlobalState()
  const { user } = state
  const { errorDispatch } = useErrorState()
  const [blockedAvailabilities, setBlockedAvailabilities] = useState(
    user.userBlockedAvailability?.map(availability => {
      return {
        weekDay: BlockedAvailabilityToString(
          availability.blockedAvailability.weekDay
        ),
        startTime: availability.blockedAvailability.startTime,
        endTime: availability.blockedAvailability.endTime,
      }
    })
  )
  const userService = new UserService()

  useEffect(() => {
    console.log({ user })
  }, [user])

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

  const updateUserBlockedAvailability = async () => {
    try {
      setIsLoading(true)
      const userBlockedAvailabilityNumberFormat = blockedAvailabilities?.map(
        availability => {
          return {
            weekDay: BlockedAvailabilityToNumber(availability.weekDay),
            startTime: availability.startTime,
            endTime: availability.endTime,
          }
        }
      )
      const blockedAvailability =
        await userService.updateUserBlockedAvailability(
          user.id,
          userBlockedAvailabilityNumberFormat
        )
      dispatch({
        type: 'setUserBlockedAvailability',
        data: blockedAvailability,
      })
      setAccountContent('Account')
    } catch (error) {
      errorDispatch({
        type: 'openSnackBar',
        data: {
          message:
            'Failed to update availability. Please check your details and try again later.',
          btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
          btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="Availability__Container">
      <div className="LoginHeader">General Product Availability</div>
      <div className="LoginText LoginTextSmall">
        Little big shed lets you have control over the days you want to lend out
        your products.
      </div>
      <div className="LoginText LoginTextSmall">
        Select the days and enter the times you are available for trades.
      </div>
      <TimeSlots
        blockedAvailabilities={blockedAvailabilities}
        onTimeSlotBlocked={blockedAvailability => {
          updateBlockedAvailabilities(blockedAvailability)
        }}
      />
      <Button
        text="Save"
        isLoading={isLoading}
        style={{ marginBottom: '1em' }}
        onClick={updateUserBlockedAvailability}
      />
      <Button
        text="Cancel Changes"
        isLoading={isLoading}
        invertedColors
        onClick={() => setAccountContent('Account')}
      />
    </div>
  )
}

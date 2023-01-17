import { useState, useEffect, useReducer, createContext } from 'react'
import PageWrapper from '../../../components/pageWrapper/pageWrapper'
import Banner from '../../../components/bannerText/bannerText'
import BankDetails from '../../../components/FormComponents/BankDetails'
import LocationDetails from '../../../components/FormComponents/LocationDetails'
import Availability from '../../../components/FormComponents/Availability'
import Instance from '../../../util/axios'
import { ReactComponent as Logo } from '../../../assets/Logos/LogoRed.svg'
import { useHistory } from 'react-router'
import useGlobalState from '../../../util/useGlobalState'
import lenderUpgradeReducer from '../../../util/reducers/lenderUpgradeReducer'
import {
  SNACKBAR_BUTTON_TYPES,
  UPGRADE_LENDER,
} from '../../../assets/Data/LBSEnum'
import { getPrevUpgradeLenderPage } from '../../../util/getPrevPage'
import useErrorState from '../../../util/reducers/errorContext'
import UserService from '../../../services/user'
import { BlockedAvailabilityToNumber } from '../../../types/User'

const FormContext = createContext()

export default function UpgradeLender() {
  const [isUpgradeLoading, setIsUpgradeLoading] = useState(false)
  const [state, dispatch] = useReducer(lenderUpgradeReducer, {
    isLenderUpgrade: true,
    currentPage: 'Bank Details',
    dateOfBirth: new Date(1990, 0, 1),
    blockedAvailabilities: [],
  })
  const globalDispatch = useGlobalState().dispatch
  const globalState = useGlobalState().state
  const { user } = globalState
  const history = useHistory()
  const { errorDispatch } = useErrorState()
  const {
    currentPage,
    address,
    accountNumber,
    BSB,
    website,
    idFrontImageLink,
    idBackImageLink,
    dateOfBirth,
    blockedAvailabilities,
  } = state
  const userService = new UserService()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const getComplete = () => {
    return (
      <div className="RegistrationWrapper">
        <div className="LoginMain">
          <Logo height="50px" width="50px" style={{ marginBottom: '1em' }} />

          <div className="LoginHeader">Lender Upgrade Complete!</div>
          <div className="LoginText">
            You have successfully updated your Little Big Shed account and are
            now ready to start lending!
          </div>

          <button
            className="LoginFormButton"
            onClick={() => history.push({ pathname: '/user/account' })}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  const submitUpgrade = async () => {
    const userData = {
      borrowerDetails: {
        address,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        isLender: true,
        role: 'COMMON',
      },
      stripeDetails: {
        day: dateOfBirth.getDate(),
        month: dateOfBirth.getMonth() + 1,
        year: dateOfBirth.getFullYear(),
        bsb: BSB,
        accountNumber,
        mcc: '5734',
        website: website ?? 'https://www.stripe.com/au',
        documentFrontImage: idFrontImageLink,
        documentBackImage: idBackImageLink,
      },
    }

    const userBlockedAvailability = blockedAvailabilities.map(availability => {
      return {
        weekDay: BlockedAvailabilityToNumber(availability.weekDay),
        startTime: availability.startTime,
        endTime: availability.endTime,
      }
    })

    try {
      setIsUpgradeLoading(true)
      const result = await userService.borrowerUpgrade(
        userData,
        user.id,
        userBlockedAvailability
      )
      globalDispatch({ type: 'setUser', data: result.user.data })
      dispatch({ type: 'setCurrentPage', data: 'Complete!' })
    } catch (error) {
      const messageType = error?.response?.data?.message?.split(':')[0]
      if (
        messageType === 'Invalid request to stripe' ||
        messageType === 'Error when creating stripe account'
      ) {
        errorDispatch({
          type: 'openSnackBar',
          data: {
            message:
              'Invalid bank infomation. Please check your bank details and try again.',
            btnText: SNACKBAR_BUTTON_TYPES.RETRY,
            btnFunc: () => {
              dispatch({ type: 'setCurrentPage', data: UPGRADE_LENDER.BANK })
              errorDispatch({ type: 'closeSnackBar' })
            },
          },
        })
      } else {
        errorDispatch({
          type: 'openSnackBar',
          data: {
            message:
              'Failed to register. Please check your details and try again.',
            btnText: SNACKBAR_BUTTON_TYPES.CLOSE,
            btnFunc: () => errorDispatch({ type: 'closeSnackBar' }),
          },
        })
      }
    } finally {
      setIsUpgradeLoading(false)
    }
  }

  const renderSwitch = () => {
    switch (currentPage) {
      case UPGRADE_LENDER.BANK:
        return <BankDetails context={FormContext} lenderUpgrade={true} />
      case UPGRADE_LENDER.LOCATION:
        return <LocationDetails context={FormContext} />
      case UPGRADE_LENDER.AVAILABILITY:
        return (
          <Availability
            context={FormContext}
            submitUpgrade={submitUpgrade}
            isUpgradeLoading={isUpgradeLoading}
            type={'upgrateLender'}
          />
        )
      case UPGRADE_LENDER.COMPLETE:
        return getComplete()
      default:
        return ''
    }
  }

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <PageWrapper>
        <Banner
          textBold="Lender Upgrade"
          textNormal={currentPage}
          prevPage={() =>
            getPrevUpgradeLenderPage(currentPage, dispatch, history)
          }
        />
        {renderSwitch()}
      </PageWrapper>
    </FormContext.Provider>
  )
}

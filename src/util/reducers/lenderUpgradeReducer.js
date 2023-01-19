const lenderUpgradeReducer = (state, action) => {
  switch (action.type) {
    case 'setDateOfBirth':
      return {
        ...state,
        dateOfBirth: action.data,
      }
    case 'setCurrentPage':
      return {
        ...state,
        currentPage: action.data,
      }
    case 'setAccountNumber':
      return {
        ...state,
        accountNumber: action.data,
      }
    case 'setBSB':
      return {
        ...state,
        BSB: action.data,
      }
    case 'setPaymentMethod':
      return {
        ...state,
        paymentMethod: action.data,
      }
    case 'setWebsite':
      return {
        ...state,
        website: action.data,
      }
    case 'setIdFrontImage':
      return {
        ...state,
        idFrontImage: action.data,
      }
    case 'setIdBackImage':
      return {
        ...state,
        idBackImage: action.data,
      }
    case 'setIdFrontImageLink':
      return {
        ...state,
        idFrontImageLink: action.data,
      }
    case 'setIdBackImageLink':
      return {
        ...state,
        idBackImageLink: action.data,
      }
    case 'setShedAddress':
      return {
        ...state,
        shedAddress: action.data,
      }
    case 'setBlockedAvailability':
      const blockedAvailability = action.data

      const existingBlockedAvailabilityIndex =
        state.blockedAvailabilities.findIndex(availability => {
          return (
            blockedAvailability.weekDay === availability.weekDay &&
            blockedAvailability.startTime === availability.startTime &&
            blockedAvailability.endTime === availability.endTime
          )
        })
      if (existingBlockedAvailabilityIndex !== -1) {
        const filteredBlockedAvailabilities =
          state.blockedAvailabilities.filter(
            (_, index) => index !== existingBlockedAvailabilityIndex
          )
        return {
          ...state,
          blockedAvailabilities: filteredBlockedAvailabilities,
        }
      } else {
        return {
          ...state,
          blockedAvailabilities: [
            ...state.blockedAvailabilities,
            blockedAvailability,
          ],
        }
      }
    default:
      return state
  }
}

export default lenderUpgradeReducer

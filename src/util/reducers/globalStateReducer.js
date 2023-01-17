export default function reducer(state, action) {
  switch (action.type) {
    case 'setUser': {
      return {
        ...state,
        user: action.data,
      }
    }
    case 'setUnReadMessageCount': {
      return {
        ...state,
        unReadMessageCount: action.data,
      }
    }
    case 'setUserBlockedAvailability': {
      return {
        ...state,
        user: {
          ...state.user,
          userBlockedAvailability: action.data,
        },
      }
    }
    default:
      return state
  }
}

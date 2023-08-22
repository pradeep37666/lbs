import {
  CREATE_BOOKING,
  POST_ITEM_PAGE,
  REGISTER_PAGES,
  UPGRADE_LENDER,
} from '../assets/Data/LBSEnum'

export const getPrevRegisterPage = (
  isLenderUpgrade,
  currentPage,
  dispatch,
  history
) => {
  if (isLenderUpgrade) {
    switch (currentPage) {
      case REGISTER_PAGES.BASIC:
        history.push('/login')
        return
      case REGISTER_PAGES.VERIFICATION:
        dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.BASIC })
        return
      case REGISTER_PAGES.BANK:
        dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.VERIFICATION })
        return
      case REGISTER_PAGES.LOCATION:
        dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.BANK })
        return
      case REGISTER_PAGES.AVAILABILITY:
        dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.LOCATION })
        return
      case REGISTER_PAGES.TNC:
        dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.AVAILABILITY })
        return
      default:
        break
    }
  } else {
    switch (currentPage) {
      case REGISTER_PAGES.BASIC:
        history.push('/login')
        return
      case REGISTER_PAGES.VERIFICATION:
        dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.BASIC })
        return
      case REGISTER_PAGES.BANK:
        dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.VERIFICATION })
        return
      case REGISTER_PAGES.TNC:
        dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.BANK })
        return
      default:
        break
    }
  }
}

export const getPrevPostItemPage = (currentPage, dispatch, history) => {
  switch (currentPage) {
    case POST_ITEM_PAGE.BASIC:
      history.push('/user/account')
      return
    case POST_ITEM_PAGE.PICTURES:
      dispatch({ type: 'setCurrentPage', data: POST_ITEM_PAGE.BASIC })
      return
    case POST_ITEM_PAGE.ADVANCE:
      dispatch({ type: 'setCurrentPage', data: POST_ITEM_PAGE.PICTURES })
      return
    case POST_ITEM_PAGE.LOCATION:
      dispatch({ type: 'setCurrentPage', data: POST_ITEM_PAGE.ADVANCE })
      return
    case POST_ITEM_PAGE.AVAILABILITY:
      dispatch({ type: 'setCurrentPage', data: POST_ITEM_PAGE.LOCATION })
      return
    case POST_ITEM_PAGE.COMPLETE:
      dispatch({ type: 'setCurrentPage', data: POST_ITEM_PAGE.AVAILABILITY })
      return
    default:
      return
  }
}

export const getPrevUpgradeLenderPage = (currentPage, dispatch, history) => {
  switch (currentPage) {
    case UPGRADE_LENDER.BANK:
      history.push('/user/account')
      return
    case UPGRADE_LENDER.LOCATION:
      dispatch({ type: 'setCurrentPage', data: UPGRADE_LENDER.BANK })
      return
    case UPGRADE_LENDER.AVAILABILITY:
      dispatch({ type: 'setCurrentPage', data: UPGRADE_LENDER.LOCATION })
      return
    case UPGRADE_LENDER.COMPLETE:
      dispatch({ type: 'setCurrentPage', data: UPGRADE_LENDER.COMPLETE })
      return
    default:
      return
  }
}

export const getPrevBookingPage = (
  currentPage,
  dispatch,
  history,
  itemId,
  mode
) => {
  switch (currentPage) {
    case CREATE_BOOKING.AVAILABILITY:
      history.push(`/item/${itemId}`)
      return
    case CREATE_BOOKING.OPTION:
      dispatch({ type: 'setPage', data: CREATE_BOOKING.AVAILABILITY })
      return
    case CREATE_BOOKING.OVERVIEW:
      if (mode === 'EXTEND') {
        dispatch({ type: 'setPage', data: CREATE_BOOKING.AVAILABILITY })
      } else {
        dispatch({ type: 'setPage', data: CREATE_BOOKING.OPTION })
      }
      return
    default:
      return
  }
}

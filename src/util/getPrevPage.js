import { REGISTER_PAGES } from "../assets/Data/LBSEnum"

export const getPrevRegisterPage = (isLenderUpgrade, currentPage, dispatch, history) => {
    if (isLenderUpgrade) {
        switch (currentPage) {
            case REGISTER_PAGES.BASIC: 
                history.push('/login')
                return
            case REGISTER_PAGES.VERIFICATION: 
                dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.BASIC})
                return
            case REGISTER_PAGES.BANK: 
                dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.VERIFICATION})
                return
            case REGISTER_PAGES.LOCATION: 
                dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.BANK})
                return
            case REGISTER_PAGES.AVAILABILITY: 
                dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.LOCATION})
                return
            case REGISTER_PAGES.TNC: 
                dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.AVAILABILITY})
                return
            default:
                break;
        }
    } else {
        switch (currentPage) {
            case REGISTER_PAGES.BASIC: 
                history.push('/login')
                return
            case REGISTER_PAGES.VERIFICATION: 
                dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.BASIC})
                return
            case REGISTER_PAGES.BANK: 
                dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.VERIFICATION})
                return
            case REGISTER_PAGES.TNC: 
                dispatch({ type: 'setCurrentPage', data: REGISTER_PAGES.BANK})
                return
            default:
                break;
        }
    }
}
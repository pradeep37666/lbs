const lenderUpgradeReducer = (state, action) => {
    switch(action.type){
        case 'setDateOfBirth' :
            return { 
                ...state,
                dateOfBirth: action.data
            }
        case 'setCurrentPage' : 
            return {
                ...state,
                currentPage: action.data
            }
        case 'setAccountNumber' :
            return {
                ...state,
                accountNumber : action.data
            }
        case 'setBSB' :
            return {
                ...state,
                BSB : action.data
            }
        case 'setPaymentMethod' :
            return {
                ...state,
                paymentMethod: action.data
            }
        case 'setWebsite' :
            return {
                ...state,
                website: action.data
            }
        case 'setIdFrontImage' :
            return {
                ...state,
                idFrontImage: action.data
            }
        case 'setIdBackImage' :
            return {
                ...state,
                idBackImage: action.data
            }
        case 'setIdFrontImageLink' :
            return {
                ...state,
                idFrontImageLink: action.data
            }
        case 'setIdBackImageLink' :
            return {
                ...state,
                idBackImageLink: action.data
            }
        case 'setAddress' : 
            return {
                ...state,
                address: action.data
            }
        case 'setBlockedAvailability' :
            return {
                ...state,
                availability: action.data
            }
        default : return state
    }
}

export default lenderUpgradeReducer
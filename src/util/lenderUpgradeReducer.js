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
        case 'setAddress' : 
            return {
                ...state,
                address: action.data
            }
        case 'setBsb' :
            return {
                ...state,
                bsb : action.data
            }
        case 'setAvailability' :
            return {
                ...state,
                availability: action.data
            }
    }
}

export default lenderUpgradeReducer
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
        case 'setBsb' :
            return {
                ...state,
                bsb : action.data
            }
    }
}

export default lenderUpgradeReducer
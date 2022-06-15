const registerReducer = (state, action) => {
    switch(action.type){
        case 'setFirstName' :
            return {
                ...state,
                firstName: action.data
            }
        case 'setLastName' :
            return {
                ...state,
                lastName: action.data
            }
        case 'setEmail' :
            return {
                ...state,
                email: action.data  
            }
        case 'setPhoneNumber' :
            return {
                ...state,
                phoneNumber: action.data
            }
        case 'setPassword' :
            return {
                ...state,
                password: action.data
            }
        case 'setImage' :
            return {
                ...state,
                image: action.data
            }
        case 'setAccountNumber' :
            return {
                ...state,
                accountNumber: action.data
            }
        case 'setBSB' :
            return {
                ...state,
                BSB: action.data
            }
        case 'setPaymentMethod' :
            return {
                ...state,
                paymentMethod: action.data
            }
        case 'setDateOfBirth' :
            return {
                ...state,
                dateOfBirth: action.data
            }
        case 'setAvailability' :
            return {
                ...state,
                availability: action.data
            }
        case 'setTermsChecked' :
            return {
                ...state,
                termsChecked: action.data
            }
        case 'setAddress' :
            return {
                ...state,
                address: action.data
            }
        case 'setIsLenderUpgrade' :
            return {
                ...state,
                isLenderUpgrade: action.data
            }
        case 'setConfirmPassword' :
            return {
                ...state,
                confirmPassword: action.data
            }
        case 'setCurrentPage' :
            return {
                ...state,
                currentPage: action.data
            }
        default :
            return state
    }
}

export default registerReducer
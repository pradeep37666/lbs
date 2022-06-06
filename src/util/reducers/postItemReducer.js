const postItemReducer = (state, action) => {
    switch(action.type){
        case 'setAddress' : {
            return {
                ...state,
                address: action.data
            }
        }
        case 'setCurrentPage' :
            return {
                ...state,
                currentPage: action.data
            }
        case 'setAvailability' :
            return {
                ...state,
                availability: action.data
            }
        case 'setTitle' :
            return {
                ...state,
                title: action.data
            }
        case 'setCategory' :
            return {
                ...state,
                category: action.data
            }
        case 'setPictures' :
            return {
                ...state,
                pictures: action.data
            }
        case 'setDescription' :
            return {
                ...state,
                description: action.data
            }
        case 'setPrice' :
            return {
                ...state,
                price: action.data
            }
        case 'setDiscount' :
            return {
                ...state,
                discount: action.data
            }
        case 'setDelivery' :
            return {
                ...state,
                delivery: action.data
            }
        default : return state
    }
}

export default postItemReducer
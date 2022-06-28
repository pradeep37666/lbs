const editItemReducer = (state, action) => {
    switch(action.type){
        case 'setTitleText' : 
            return {
                ...state,
                titleText: action.data
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
        case 'setDeliveryPrice' :
            return {
                ...state,
                deliveryPrice: action.data
            }
        case 'setAvailability' : 
            return {
                ...state,
                availability: action.data
            }
        case 'setAddress' : 
            return {
                ...state,
                adderess: action.data
            }
        case 'setImages' :
            return {
                ...state,
                images: action.data
            }
        case 'setNewImages' :
            return {
                ...state,
                newImages: action.data
            }
        case 'setNewImageLinks' :
            return {
                ...state,
                newImageLinks: action.data
            }
        case 'setDeletedImages' :
            return {
                ...state,
                deletedImages: action.data
            }
        case 'setIsDiscount' :
            return {
                ...state,
                isDiscount: action.data
            }
        case 'setEditAvailabilityOpen' :
            return {
                ...state,
                editAvailabilityOpen: action.data
            }
        case 'setInitialState' :
            const { 
                title, category, description, 
                price, deliveryPrice, discount, 
                address, weekly_availability, images
            } = action.data
            return {
                ...state,
                title,
                titleText: title,
                category,
                description,
                images,
                price,
                deliveryPrice,
                isDiscount: Boolean(discount),
                discount,
                address,
                availability: weekly_availability.split('').map(str => parseInt(str)),
            }
        default : return state
    }
}

export default editItemReducer

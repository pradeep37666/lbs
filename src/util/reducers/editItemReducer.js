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
                titleText: action.data
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
            const { title, category, description, price, deliveryPrice, discount, address, available, lat, lng, pictures } = action.data
            console.log(action.data)
            return {
                ...state,
                title,
                titleText: title,
                category,
                description,
                images: pictures.split(',').map(( image, i ) => {return { url: image, id: i + 1 }}),
                price,
                deliveryPrice,
                isDiscount: Boolean(discount),
                discount,
                address,
                availability: available.split('').map(str => parseInt(str)),
                lat,
                lng
            }
        default : return state
    }
}

export default editItemReducer

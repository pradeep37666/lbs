const applicationReducer = (state, action) => {
    console.log(action)
    switch(action.type){
        case 'setYearAvailability' : {
            return {
                ...state,
            yearAvailability: action.data
            }
        }
        case 'setItemAvailability' : {
            return {
                ...state,
                itemAvailability: action.data
            }
        }
        case 'setItem' : {
            return {
                ...state,
                item: action.data
            }
        }
        case 'setPage' : {
            return {
                ...state,
                page: action.data
            }
        }
        case 'setSelected' : {
            return {
                ...state,
                selected: action.data
            }
        }
        case 'setConfirmedStart' : {
            return {
                ...state,
                confirmedStart: action.data
            }
        }
        case 'setConfirmedEnd' : {
            return {
                ...state,
                confirmedEnd: action.data
            }
        }
        case 'setDeliverySelected' : {
            return {
                ...state,
                deliverySelected: action.data
            }
        }
        case 'setPickupSelected' : {
            return {
                ...state,
                pickupSelected: action.data
            }
        }
        case 'setCurrentDate' : {
            return {
                ...state,
                currentDate: action.data
            }
        }
        case 'setCurrentMonth' : {
            return {
                ...state,
                currentMonth: action.data
            }
        }
        case 'setCurrentYear' : {
            return {
                ...state,
                currentYear: action.data
            }
        }
    }
}

export default applicationReducer
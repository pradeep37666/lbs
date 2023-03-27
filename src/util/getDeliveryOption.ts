import { DeliveryOption } from '../types/Item'

const getDeliveryOption = (
    isDeliverySelected: boolean,
    isPickupSelected: boolean
): DeliveryOption => {
    let result: DeliveryOption
    if (isDeliverySelected && isPickupSelected) {
        result = 'BOTH'
    } else if (isDeliverySelected) {
        result = 'DELIVERY'
    } else if (isPickupSelected) {
        result = 'PICKUP'
    } else {
        result = 'NONE'
    }

    return result
}

export default getDeliveryOption

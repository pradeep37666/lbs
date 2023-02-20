import { DeliveryOption, ItemCreated, ItemAddress } from '../../types/Item'
import {
  BlockedAvailability,
  BlockedAvailabilityCreate,
} from '../../types/User'
import { blockedAvailabilityToString } from '../blockedAvailabilityToString'
import { ItemCategory } from './postItemReducer'

type Action = {
  type: actions
  data: any
}

export type actions =
  | 'setEditItemTitle'
  | 'setEditItemCategory'
  | 'setEditItemDescription'
  | 'setEditItemImages'
  | 'setDeletedImages'
  | 'setNewImages'
  | 'setNewImageLinks'
  | 'setEditItemPrice'
  | 'setEditItemDiscount'
  | 'setIsEditItemDiscount'
  | 'setEditItemDeliveryPrice'
  | 'setEditItemAddress'
  | 'setEditItemSuburb'
  | 'setEditItemLat'
  | 'setEditItemLng'
  | 'setUser'
  | 'setCreatedItem'
  | 'setEditItemState'
  | 'setIsOfferButtonNOActive'
  | 'setEditItemDeliveryOption'
  | 'setEditItemPickupPrice'
  | 'setItemDetails'
  | 'setBlockedAvailability'

export interface EditItemState {
  editItemTitle: string
  editItemCategory: ItemCategory
  editItemImages: string[]
  deletedImages: string[]
  newImages: string[]
  newImageLinks: string[]
  editItemDescription: string
  editItemPrice: number
  editItemDiscount: number
  isEditItemDiscount: boolean
  editItemDeliveryPrice: number
  editItemAddress: ItemAddress
  editItemSuburb: string
  editItemLat: number
  editItemLng: number
  createdItem?: ItemCreated
  editItemState: any
  isOfferButtonNOActive: boolean
  editItemPickupPrice: number
  editItemDeliveryOption: DeliveryOption
  blockedAvailabilities: BlockedAvailabilityCreate[]
}

export const InitialEditItemState: EditItemState = {
  editItemTitle: '',
  editItemCategory: 'Electronics',
  editItemImages: [],
  editItemDescription: '',
  deletedImages: [],
  newImages: [],
  newImageLinks: [],
  editItemPrice: 0,
  editItemDiscount: 0,
  isEditItemDiscount: false,
  editItemDeliveryPrice: 0,
  editItemAddress: {
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    streetNumber: '',
    streetName: '',
    city: '',
    suburb: '',
    state: '',
    postCode: '',
    country: '',
    fullAddress: '',
    lat: 0,
    lng: 0,
    itemId: '',
  },
  editItemSuburb: '',
  editItemLat: 0,
  editItemLng: 0,
  createdItem: undefined,
  editItemState: undefined,
  isOfferButtonNOActive: false,
  editItemPickupPrice: 0,
  editItemDeliveryOption: 'NONE',
  blockedAvailabilities: [],
}

const editItemReducer = (
  state: EditItemState,
  action: Action
): EditItemState => {
  switch (action.type) {
    case 'setEditItemTitle': {
      return {
        ...state,
        editItemTitle: action.data,
      }
    }
    case 'setEditItemCategory': {
      return {
        ...state,
        editItemCategory: action.data,
      }
    }
    case 'setEditItemImages': {
      return {
        ...state,
        editItemImages: action.data,
      }
    }
    case 'setDeletedImages': {
      return {
        ...state,
        deletedImages: action.data,
      }
    }
    case 'setNewImages': {
      return {
        ...state,
        newImages: action.data,
      }
    }
    case 'setNewImageLinks': {
      return {
        ...state,
        newImageLinks: action.data,
      }
    }
    case 'setEditItemDescription': {
      return {
        ...state,
        editItemDescription: action.data,
      }
    }
    case 'setEditItemPrice': {
      return {
        ...state,
        editItemPrice: action.data,
      }
    }
    case 'setEditItemDiscount': {
      return {
        ...state,
        editItemDiscount: action.data,
      }
    }
    case 'setIsEditItemDiscount': {
      return {
        ...state,
        isEditItemDiscount: action.data,
      }
    }
    case 'setEditItemDeliveryPrice': {
      return {
        ...state,
        editItemDeliveryPrice: action.data,
      }
    }
    case 'setEditItemAddress': {
      return {
        ...state,
        editItemAddress: action.data,
      }
    }
    case 'setEditItemSuburb': {
      return {
        ...state,
        editItemSuburb: action.data,
      }
    }

    case 'setEditItemLat': {
      return {
        ...state,
        editItemLat: action.data,
      }
    }

    case 'setEditItemLng': {
      return {
        ...state,
        editItemLng: action.data,
      }
    }
    case 'setCreatedItem': {
      return {
        ...state,
        createdItem: action.data,
      }
    }
    case 'setIsOfferButtonNOActive': {
      return {
        ...state,
        isOfferButtonNOActive: action.data,
      }
    }

    case 'setEditItemDeliveryOption': {
      return {
        ...state,
        editItemDeliveryOption: action.data,
      }
    }
    case 'setEditItemPickupPrice': {
      return {
        ...state,
        editItemPickupPrice: action.data,
      }
    }
    case 'setBlockedAvailability': {
      const blockedAvailability = action.data

      const existingBlockedAvailabilityIndex =
        state.blockedAvailabilities.findIndex(availability => {
          return (
            blockedAvailability.weekDay === availability.weekDay &&
            blockedAvailability.startTime === availability.startTime &&
            blockedAvailability.endTime === availability.endTime
          )
        })

      if (existingBlockedAvailabilityIndex !== -1) {
        const filteredBlockedAvailabilities =
          state.blockedAvailabilities.filter(
            (_, index) => index !== existingBlockedAvailabilityIndex
          )
        return {
          ...state,
          blockedAvailabilities: filteredBlockedAvailabilities,
        }
      } else {
        return {
          ...state,
          blockedAvailabilities: [
            ...state.blockedAvailabilities,
            blockedAvailability,
          ],
        }
      }
    }
    case 'setEditItemState': {
      return {
        editItemTitle: '',
        editItemCategory: 'Electronics',
        editItemImages: [],
        deletedImages: [],
        newImages: [],
        newImageLinks: [],
        editItemDescription: '',
        editItemPrice: 0,
        editItemDiscount: 0,
        isEditItemDiscount: false,
        editItemDeliveryPrice: 0,
        editItemAddress: {
          id: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          streetNumber: '',
          streetName: '',
          city: '',
          suburb: '',
          state: '',
          postCode: '',
          country: '',
          fullAddress: '',
          lat: 0,
          lng: 0,
          itemId: '',
        },
        editItemSuburb: '',
        editItemLat: 0,
        editItemLng: 0,
        createdItem: undefined,
        editItemState: null,
        isOfferButtonNOActive: false,
        editItemPickupPrice: 0,
        editItemDeliveryOption: 'NONE',
        blockedAvailabilities: [],
      }
    }
    case 'setItemDetails': {
      return {
        ...state,
        editItemTitle: action.data.title,
        editItemCategory: action.data.category,
        editItemDescription: action.data.description,
        editItemPrice: action.data.price,
        editItemDiscount: action.data.discount,
        isEditItemDiscount: action.data.discount ? true : false,
        editItemAddress: action.data.address,
        editItemSuburb: action.data.address.suburb,
        editItemDeliveryPrice: action.data.deliveryPrice,
        editItemLat: action.data.address.lat,
        editItemLng: action.data.address.lng,
        editItemImages: action.data.images,
        editItemDeliveryOption: action.data.deliveryOption,
        editItemPickupPrice: action.data.pickupPrice,
        blockedAvailabilities: action.data.itemBlockedAvailability.map(
          (blockedAvailability: BlockedAvailability) => {
            return {
              weekDay: blockedAvailabilityToString(
                blockedAvailability.blockedAvailability.weekDay
              ),
              startTime: blockedAvailability.blockedAvailability.startTime,
              endTime: blockedAvailability.blockedAvailability.endTime,
            }
          }
        ),
      }
    }
    default:
      return state
  }
}

export default editItemReducer

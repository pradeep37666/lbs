import { POST_ITEM_PAGE } from '../../assets/Data/LBSEnum'
import { DeliveryOption, ItemCreated } from '../../types/Item'
import { BlockedAvailabilityCreate } from '../../types/User'

type Action = {
  type: actions
  data: any
}

export type actions =
  | 'setPostItemTitle'
  | 'setPostItemCategory'
  | 'setPostItemImages'
  | 'setPostItemImageLinks'
  | 'setPostItemDescription'
  | 'setPostItemPrice'
  | 'setPostItemDiscount'
  | 'setPostItemDeliveryPrice'
  | 'setPostItemAddress'
  | 'setPostItemAvailability'
  | 'setPostItemSuburb'
  | 'setPostItemLat'
  | 'setPostItemLng'
  | 'setUser'
  | 'setCreatedItem'
  | 'setPostItemState'
  | 'setPostItemCountry'
  | 'setPostItemCity'
  | 'setPostItemPostCode'
  | 'setPostItemStreetNumber'
  | 'setPostItemFullAddress'
  | 'setPostItemStreetName'
  | 'setPostItemStateName'
  | 'setPostItemPickupPrice'
  | 'setPostItemDeliveryOption'
  | 'updateItemBlockedAvailability'
  | 'setCurrentPage'

export type ItemCategory =
  | `DIY & Garden`
  | `Outdoor & Sport`
  | `Photography`
  | `Parties & Events`
  | `Vehicle`
  | `Closet`
  | `Kitchen`
  | `Gaming & Toys`
  | `Musical`
  | `Household`
  | `Babies & Kids`
  | `Electronics`
  | `Spaces`
  | `Other`

export interface PostItemState {
  postItemTitle: string
  postItemCategory: ItemCategory | undefined
  postItemImages: string[]
  postItemImageLinks: string[]
  postItemDescription: string
  postItemPrice: number | undefined
  postItemDiscount: number
  postItemDeliveryPrice: number | undefined
  postItemAddress: any
  postItemSuburb: string
  postItemLat: number
  postItemLng: number
  createdItem: ItemCreated
  postItemState: any
  postItemCountry: string
  postItemCity: string
  postItemPostCode: string
  postItemStreetNumber: string
  postItemFullAddress: string
  postItemStreetName: string
  postItemStateName: string
  postItemDeliveryOption: DeliveryOption
  postItemPickupPrice: number
  postItemBlockedAvailabilities: BlockedAvailabilityCreate[]
  currentPage: string
}

export const InitialPostItemState: PostItemState = {
  postItemTitle: '',
  postItemCategory: undefined,
  postItemImages: [],
  postItemImageLinks: [],
  postItemDescription: '',
  postItemPrice: undefined,
  postItemDiscount: 0,
  postItemDeliveryPrice: undefined,
  postItemAddress: '',
  postItemSuburb: '',
  postItemLat: 0,
  postItemLng: 0,
  createdItem: {
    userId: { id: '', email: '', exp: 0, role: '' },
    title: '',
    category: '',
    description: '',
    price: 0,
    deliveryPrice: 0,
    discount: 0,
    is_deleted: false,
    images: [
      {
        id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        itemId: '',
        imageKey: '',
      },
    ],
    address: {
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
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    rating: 0,
  },
  postItemState: null,
  postItemCountry: '',
  postItemCity: '',
  postItemPostCode: '',
  postItemStreetNumber: '',
  postItemFullAddress: '',
  postItemStreetName: '',
  postItemStateName: '',
  postItemDeliveryOption: 'NONE',
  postItemPickupPrice: 0,
  postItemBlockedAvailabilities: [],
  currentPage: POST_ITEM_PAGE.BASIC
}

const postItemReducer = (
  state: PostItemState,
  action: Action,
): PostItemState => {
  switch (action.type) {
    case 'setPostItemTitle': {
      return {
        ...state,
        postItemTitle: action.data,
      }
    }
    case 'setPostItemCategory': {
      return {
        ...state,
        postItemCategory: action.data,
      }
    }
    case 'setPostItemImages': {
      return {
        ...state,
        postItemImages: action.data,
      }
    }
    case 'setPostItemImageLinks': {
      return {
        ...state,
        postItemImageLinks: action.data
      }
    }
    case 'setPostItemDescription': {
      return {
        ...state,
        postItemDescription: action.data,
      }
    }
    case 'setPostItemPrice': {
      return {
        ...state,
        postItemPrice: action.data,
      }
    }
    case 'setPostItemDiscount': {
      return {
        ...state,
        postItemDiscount: action.data,
      }
    }
    case 'setPostItemDeliveryPrice': {
      return {
        ...state,
        postItemDeliveryPrice: action.data,
      }
    }
    case 'setPostItemAddress': {
      return {
        ...state,
        postItemAddress: action.data,
      }
    }
    case 'setPostItemSuburb': {
      return {
        ...state,
        postItemSuburb: action.data,
      }
    }
    case 'setPostItemLat': {
      return {
        ...state,
        postItemLat: action.data,
      }
    }

    case 'setPostItemLng': {
      return {
        ...state,
        postItemLng: action.data,
      }
    }

    case 'setCreatedItem': {
      return {
        ...state,
        createdItem: action.data,
      }
    }

    case 'setPostItemCountry': {
      return {
        ...state,
        postItemCountry: action.data,
      }
    }
    case 'setPostItemCity': {
      return {
        ...state,
        postItemCity: action.data,
      }
    }
    case 'setPostItemPostCode': {
      return {
        ...state,
        postItemPostCode: action.data,
      }
    }
    case 'setPostItemStreetNumber': {
      return {
        ...state,
        postItemStreetNumber: action.data,
      }
    }
    case 'setPostItemFullAddress': {
      return {
        ...state,
        postItemFullAddress: action.data,
      }
    }
    case 'setPostItemStreetName': {
      return {
        ...state,
        postItemStreetName: action.data,
      }
    }
    case 'setPostItemStateName': {
      return {
        ...state,
        postItemStateName: action.data,
      }
    }
    case 'setPostItemDeliveryOption': {
      return {
        ...state,
        postItemDeliveryOption: action.data,
      }
    }
    case 'updateItemBlockedAvailability': {
      const blockedAvailability = action.data

      const existingBlockedAvailabilityIndex =
        state.postItemBlockedAvailabilities.findIndex(availability => {
          return (
            blockedAvailability.weekDay === availability.weekDay &&
            blockedAvailability.startTime === availability.startTime &&
            blockedAvailability.endTime === availability.endTime
          )
        })

      if (existingBlockedAvailabilityIndex !== -1) {
        const filteredBlockedAvailabilities =
          state.postItemBlockedAvailabilities.filter(
            (_, index) => index !== existingBlockedAvailabilityIndex,
          )
        return {
          ...state,
          postItemBlockedAvailabilities: filteredBlockedAvailabilities,
        }
      } else {
        return {
          ...state,
          postItemBlockedAvailabilities: [
            ...state.postItemBlockedAvailabilities,
            blockedAvailability,
          ],
        }
      }
    }
    case 'setPostItemState': {
      return {
        postItemTitle: '',
        postItemCategory: 'Electronics',
        postItemImages: [],
        postItemImageLinks: [],
        postItemDescription: '',
        postItemPrice: undefined,
        postItemDiscount: 0,
        postItemDeliveryPrice: undefined,
        postItemAddress: '',
        postItemSuburb: '',
        postItemLat: 0,
        postItemLng: 0,
        createdItem: {
          userId: { id: '', email: '', exp: 0, role: '' },
          title: '',
          category: '',
          description: '',
          price: 0,
          deliveryPrice: 0,
          discount: 0,
          is_deleted: false,
          images: [
            {
              id: '',
              createdAt: new Date(),
              updatedAt: new Date(),
              itemId: '',
              imageKey: '',
            },
          ],
          address: {
            id: 'string',
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
          id: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: 0,
        },
        postItemState: null,
        postItemCity: '',
        postItemCountry: '',
        postItemPostCode: '',
        postItemFullAddress: '',
        postItemStreetName: '',
        postItemStreetNumber: '',
        postItemStateName: '',
        postItemDeliveryOption: 'NONE',
        postItemPickupPrice: 0,
        postItemBlockedAvailabilities: [],
        currentPage: POST_ITEM_PAGE.BASIC
      }
    }
    case 'setPostItemPickupPrice': {
      return {
        ...state,
        postItemPickupPrice: action.data,
      }
    }
    case 'setCurrentPage': {
      return {
        ...state,
        currentPage: action.data
      }
    }
    default:
      return state
  }
}

export default postItemReducer

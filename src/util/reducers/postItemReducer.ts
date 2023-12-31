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
  | 'setShedAddress'
  | 'setPostItemAvailability'
  | 'setUser'
  | 'setPostItemState'
  | 'setCreatedItem'
  | 'setPostItemPickupPrice'
  | 'setPostItemDeliveryOption'
  | 'setPostItemBlockedAvailabilities'
  | 'setNewPostItemBlockedAvailabilities'
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
  postItemPrice: number
  postItemDiscount: number
  postItemDeliveryPrice: number
  shedAddress: any
  createdItem: ItemCreated
  postItemDeliveryOption: DeliveryOption
  postItemPickupPrice: number
  postItemBlockedAvailabilities: BlockedAvailabilityCreate[]
  newPostItemBlockedAvailabilities: BlockedAvailabilityCreate[]
  currentPage: string
}

export const InitialPostItemState: PostItemState = {
  postItemTitle: '',
  postItemCategory: undefined,
  postItemImages: [],
  postItemImageLinks: [],
  postItemDescription: '',
  postItemPrice: 0,
  postItemDiscount: 0,
  postItemDeliveryPrice: 0,
  shedAddress: '',
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
  postItemDeliveryOption: 'NONE',
  postItemPickupPrice: 0,
  postItemBlockedAvailabilities: [],
  newPostItemBlockedAvailabilities: [],
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
    case 'setShedAddress': {
      return {
        ...state,
        shedAddress: action.data,
      }
    }
    case 'setCreatedItem': {
      return {
        ...state,
        createdItem: action.data,
      }
    }

    case 'setPostItemDeliveryOption': {
      return {
        ...state,
        postItemDeliveryOption: action.data,
      }
    }
    case 'setPostItemBlockedAvailabilities': {
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
    case 'setNewPostItemBlockedAvailabilities': {
      const blockedAvailability = action.data
      return {
        ...state,
        newPostItemBlockedAvailabilities: blockedAvailability,
      }
    }
    case 'setPostItemState': {
      return {
        postItemTitle: '',
        postItemCategory: 'Electronics',
        postItemImages: [],
        postItemImageLinks: [],
        postItemDescription: '',
        postItemPrice: 0,
        postItemDiscount: 0,
        postItemDeliveryPrice: 0,
        shedAddress: '',
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
        postItemDeliveryOption: 'NONE',
        postItemPickupPrice: 0,
        postItemBlockedAvailabilities: [],
        newPostItemBlockedAvailabilities: [],
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

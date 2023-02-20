import { BookingDetail } from '../../types/Booking'
import { Item } from '../../types/Item'
import { BlockedAvailabilityCreate } from '../../types/User'
import { blockedAvailabilityToString } from '../blockedAvailabilityToString'
import BookingCalculator from '../calculator/BookingCalculator'

export type TimeSlot = {
  date: Date
  timeslot: 'morning' | 'afternoon'
}

export type BorrowerAddress = {
  streetNumber: string | undefined
  streetName: string | undefined
  city: string | undefined
  suburb: string | undefined
  state: string | undefined
  postCode: string | undefined
  country: string | undefined
  fullAddress: string | undefined
  lat: number | undefined
  lng: number | undefined
}

export type BookingState = {
  item: Item
  currentDate: number
  currentMonth: number
  currentYear: number
  startSlot?: TimeSlot
  endSlot?: TimeSlot
  selectedDay?: Date
  totalPrice: number
  isPickupSelected: boolean
  isDeliverySelected: boolean
  bookingCalculator?: BookingCalculator
  borrowerAddress: BorrowerAddress | null
  blockedAvailabilities: BlockedAvailabilityCreate[]
  startDate: Date | null
  endDate: Date | null
  bookedDates: { startDate: string; endDate: string }[]
  page: string
}

export type BookingAction =
  | {
      type: 'setInitialState'
      data: { item: Item; bookingDetails: BookingDetail[] }
    }
  | { type: 'setSelectedDay'; data: Date | undefined }
  | { type: 'setStartSlot'; data: TimeSlot }
  | { type: 'setEndSlot'; data: TimeSlot }
  | { type: 'clearSlotsAndUnselect' }
  | { type: 'setTotalPrice'; data: number }
  | { type: 'setIsDeliverySelected'; data: boolean }
  | { type: 'setIsPickupSelected'; data: boolean }
  | { type: 'setBookingCalculator'; data: BookingCalculator }
  | { type: 'setBorrowerAddress'; data: BorrowerAddress }
  | { type: 'setStartDate'; data: Date | null }
  | { type: 'setEndDate'; data: Date | null }
  | { type: 'setPage'; data: string }

export const bookingInitialState: BookingState = {
  item: {
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: '',
    category: '',
    description: '',
    price: 0,
    deliveryPrice: 0,
    pickupPrice: 0,
    rating: 0,
    discount: 0,
    is_deleted: false,
    deliveryOption: 'BOTH',
    userId: '',
    images: [],
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
    availabilities: [],
    itemBlockedAvailability: [],
  },
  currentDate: 0,
  currentMonth: 0,
  currentYear: 0,
  startSlot: undefined,
  endSlot: undefined,
  selectedDay: undefined,
  totalPrice: 0,
  isPickupSelected: false,
  isDeliverySelected: false,
  bookingCalculator: undefined,
  borrowerAddress: null,
  blockedAvailabilities: [],
  startDate: null,
  endDate: null,
  bookedDates: [],
  page: 'ItemAvailability',
}

const bookingReducer = (
  state: BookingState,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case 'setInitialState': {
      const { item, bookingDetails } = action.data
      const today = new Date()
      let blockedAvailability: BlockedAvailabilityCreate[] =
        item.itemBlockedAvailability.map(blockedAvailability => {
          return {
            startTime: blockedAvailability.blockedAvailability.startTime,
            endTime: blockedAvailability.blockedAvailability.endTime,
            weekDay: blockedAvailabilityToString(
              blockedAvailability.blockedAvailability.weekDay
            ),
          }
        })
      return {
        ...state,
        item,
        currentDate: today.getDate(),
        currentMonth: today.getMonth(),
        currentYear: today.getFullYear(),
        blockedAvailabilities: blockedAvailability,
        bookedDates: bookingDetails.map(bookingDetail => {
          return {
            startDate: bookingDetail.startDate,
            endDate: bookingDetail.endDate,
          }
        }),
      }
    }
    case 'setSelectedDay': {
      return {
        ...state,
        selectedDay: action.data,
      }
    }
    case 'setStartSlot': {
      return {
        ...state,
        startSlot: action.data,
      }
    }
    case 'setEndSlot': {
      return {
        ...state,
        endSlot: action.data,
      }
    }

    case 'setTotalPrice': {
      return {
        ...state,
        totalPrice: action.data,
      }
    }

    case 'setIsPickupSelected': {
      return {
        ...state,
        isPickupSelected: action.data,
      }
    }
    case 'setIsDeliverySelected': {
      return {
        ...state,
        isDeliverySelected: action.data,
      }
    }

    case 'setBookingCalculator': {
      return {
        ...state,
        bookingCalculator: action.data,
      }
    }

    case 'setPage': {
      return {
        ...state,
        page: action.data,
      }
    }

    case 'setBorrowerAddress': {
      return {
        ...state,
        borrowerAddress: action.data,
      }
    }

    case 'clearSlotsAndUnselect': {
      return {
        ...state,
        startSlot: undefined,
        endSlot: undefined,
        selectedDay: undefined,
        totalPrice: 0,
        isDeliverySelected: false,
        isPickupSelected: false,
        bookingCalculator: undefined,
        startDate: null,
        endDate: null,
      }
    }

    case 'setStartDate': {
      return {
        ...state,
        startDate: action.data,
      }
    }
    case 'setEndDate': {
      return {
        ...state,
        endDate: action.data,
      }
    }
    default:
      return state
  }
}

export default bookingReducer

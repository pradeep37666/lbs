import { BorrowerAddress } from '../util/reducers/bookingReducer'
import { DeliveryOption, Item, ItemAddress } from './Item'
import { UserAddress } from './User'

export type BookingDurationStatus =
  | 'APPLIED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'APPROVED'

export type BookingStatus =
  | 'APPLIED'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'TO_RESCHEDULE'
  | 'IN_PROGRESS'
  | 'ENDED'

export enum BookingEventStatus {
  APPLIED = 'APPLIED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  TO_RESCHEDULE = 'TO_RESCHEDULE',
  IN_PROGRESS = 'IN_PROGRESS',
  ENDED = 'ENDED',
  LENDER_CONFIRMED = 'LENDER_CONFIRMED',
  BORROWER_CONFIRMED = 'BORROWER_CONFIRMED',
  BORROWER_REVIEWED = 'BORROWER_REVIEWED',
  LENDER_REVIEWED = 'LENDER_REVIEWED',
  EXTENSION_REQUESTED = 'EXTENSION_REQUESTED',
  EXTENSION_APPROVED = 'EXTENSION_APPROVED',
  EXTENSION_REJECTED = 'EXTENSION_REJECTED',
  EXTENSION_CANCELLED = 'EXTENSION_CANCELLED',
  DISPUTED = 'DISPUTED',
  RESOLVED = 'RESOLVED',
}

export type BookingAction =
  | 'APPROVE'
  | 'REJECT'
  | 'CANCEL'
  | 'COMPLETE'
  | 'EXTEND'
  | 'LENDER_CONFIRM'
  | 'BORROWER_CONFIRM'
  | 'RESCHEDULE'
  | 'DISPUTE'

export type CreateBooking = {
  borrowerAddress: BorrowerAddress | null
  borrowerId: string
  itemId: string
  status: string
  error: boolean
  deliveryOption: string
  startDate: Date | null
  endDate: Date | null
  totalPrice: string | undefined
  itemPrice: number
  deliveryPrice: number
  pickupPrice: number
}

export type RequestExtension = {
  endDate: string
  startDate: string
  totalPrice: number
  itemPrice: number
}

export type BookingDetail = {
  bookingDurations: BookingDuration[]
  borrowerId: string
  createdAt: string
  deliveryOption: DeliveryOption
  deliveryPrice: 0
  id: string
  itemId: string
  pickupPrice: number
  status: BookingStatus
  updatedAt: string
}

export interface Booking {
  id: string
  createdAt: string
  updatedAt: string
  status: BookingStatus
  deliveryOption: string
  deliveryPrice: number
  pickupPrice: number
  borrowerId: string
  itemId: string
  item: Item
  bookingDurations: BookingDuration[]
  bookingEvents: BookingEvent[]
  disputes: Dispute[]
  borrowerAddress: ItemAddress
}

export interface Image {
  id: string
  createdAt: string
  updatedAt: string
  itemId: string
  imageKey: string
}

export interface BookingDuration {
  id: string
  createdAt: string
  updatedAt: string
  startDate: string
  endDate: string
  totalPrice: number
  itemPrice: number
  status: BookingDurationStatus
  stripeChargeId: any
  bookingId: string
}

export interface BookingEvent {
  id: string
  createdAt: string
  updatedAt: string
  bookingId: string
  event: BookingEventStatus
}

export type BookingDate = {
  startDate: string
  endDate: string
}

export type BookingMode = 'APPLY' | 'EXTEND'

export type RateLenderInfo = {
  lenderRating: {
    lenderId: string
    borrowerId: string
    rating: number
  }
  itemRating: {
    itemId: string
    comment: string
    rating: number
    userId: string
    bookingId: string
  }
}

export type RateBorrowerInfo = {
  lenderId: string
  borrowerId: string
  rating: number
}

export type Dispute = {
  id: string
  createdAt: string
  updatedAt: string
  isResolved: boolean
  bookingId: string
}

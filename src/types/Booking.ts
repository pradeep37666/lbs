import { DeliveryOption, Item, ItemAddress } from './Item'

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
  LENDER_CONFIRMED = 'LENDER_CONFIRMED',
  BORROWER_CONFIRMED = 'BORROWER_CONFIRMED',
  BOTH_CONFIRMED = 'BOTH_CONFIRMED',
  ITEM_RETURNED = 'ITEM_RETURNED',
  BORROWER_REVIEWED = 'BORROWER_REVIEWED',
  LENDER_REVIEWED = 'LENDER_REVIEWED',
  BOTH_REVIEWED = 'BOTH_REVIEWED',
  DISPUTED = 'DISPUTED',
  RESOLVED = 'RESOLVED',
  IN_PROGRESS = 'IN_PROGRESS',
  ENDED = 'ENDED',
  EXTENSION_REQUESTED = 'EXTENSION_REQUESTED',
  EXTENSION_APPROVED = 'EXTENSION_APPROVED',
  EXTENSION_REJECTED = 'EXTENSION_REJECTED',
}

export type BookingAction =
  | 'APPROVE'
  | 'REJECT'
  | 'COMPLETE'
  | 'EXTEND'
  | 'LENDER_CONFIRM'
  | 'BORROWER_CONFIRM'
  | 'BOTH_CONFIRM'

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

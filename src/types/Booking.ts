import { DeliveryOption, Item, ItemAddress } from './Item'

export type BookingStatus =
  | 'APPLIED'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'TO_RESCHEDULE'
  | 'LENDER_CONFIRMED'
  | 'BORROWER_CONFIRMED'
  | 'BOTH_CONFIRMED'
  | 'ITEM_RETURNED'
  | 'BORROWER_REVIEWED'
  | 'LENDER_REVIEWED'
  | 'BOTH_REVIEWED'
  | 'DISPUTED'
  | 'RESOLVED'

export type Booking = {
  id: string
  createdAt: Date
  updatedAt: Date
  status: BookingStatus
  deliveryOption: DeliveryOption
  error: boolean
  startDate: string
  endDate: string
  total_price: number
  item_price: number
  delivery_price: number | null
  pickup_price: number | null
  stripeChargeId: string
  borrowerId: string
  lenderId: string
  itemId: string
  item: Item
  borrowerAddress: ItemAddress
}

export type BookingDetail = {
  id: string
  createdAt: string
  updatedAt: string
  status: BookingStatus
  deliveryOption: DeliveryOption
  startDate: string
  endDate: string
  total_price: number
  item_price: number
  delivery_price: number
  pickup_price: number
  stripeChargeId: string
  borrowerId: string
  itemId: string
}

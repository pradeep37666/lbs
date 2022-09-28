import {DeliveryOption, Item, ItemAddress} from './Item'

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
  error: boolean
  deliveryOption: DeliveryOption
  startDateIndex: number
  endDateIndex: number
  year: number
  total_price: number
  borrowerId: string
  lenderId: string
  itemId: string
  item: Item
  borrowerAddress: ItemAddress
  pickup_price: number | null
  delivery_price: number | null
  item_price: number
}
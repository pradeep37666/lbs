import { BookingStatus } from '../../types/Booking'

const FQA_TABS = {
  GENERAL: 'General FAQs',
  LENDER: 'Lender FAQs',
  BORROWER: 'Borrower FAQs',
}

const DELIVERY_OPTIONS = {
  DELIVERY: 'DELIVERY',
  PICKUP: 'PICKUP',
  BOTH: 'BOTH',
  NONE: 'NONE',
}

const BOOKING_STATUSES = {
  APPLIED: 'APPLIED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED',
  TO_RESCHEDULE: 'TO_RESCHEDULE',
  LENDER_CONFIRMED: 'LENDER_CONFIRMED',
  BORROWER_CONFIRMED: 'BORROWER_CONFIRMED',
  BOTH_CONFIRMED: 'BOTH_CONFIRMED',
  ITEM_RETURNED: 'ITEM_RETURNED',
  BORROWER_REVIEWED: 'BORROWER_REVIEWED',
  LENDER_REVIEWED: 'LENDER_REVIEWED',
  BOTH_REVIEWED: 'BOTH_REVIEWED',
  DISPUTED: 'DISPUTED',
  RESOLVED: 'RESOLVED',
}

const SNACKBAR_BUTTON_TYPES = {
  CLOSE: 'CLOSE',
  RETRY: 'RETRY',
  FIX: 'FIX',
  DISMISS: 'DISMISS',
  UNDO: 'UNDO',
  RESEND: 'RESEND',
}

const REGISTER_PAGES = {
  BASIC: 'Basic Details',
  VERIFICATION: 'Verification',
  BANK: 'Bank Details',
  LOCATION: 'Location Details',
  AVAILABILITY: 'Availability',
  TNC: 'Terms & Conditions',
  COMPLETE: 'Complete!',
}

const POST_ITEM_PAGE = {
  BASIC: 'Basic Details',
  PICTURES: 'Item Pictures',
  ADVANCE: 'Advanced Details',
  LOCATION: 'Item Location',
  AVAILABILITY: 'Availability',
  COMPLETE: 'Complete!',
}

const UPGRADE_LENDER = {
  BANK: 'Bank Details',
  LOCATION: 'Location Details',
  AVAILABILITY: 'Availability',
  COMPLETE: 'Complete!',
}

const CREATE_BOOKING = {
  AVAILABILITY: 'ItemAvailability',
  OPTION: 'ItemOptions',
  OVERVIEW: 'ItemOverview',
}

const DATE_VALUES = {
  WEEK_DAYS: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  MONTHS: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}
const SCREEN_TYPE= {
  SIGNUP :'SIGNUP',
 FORGOT :'FORGOT',
}

export {
  FQA_TABS,
  DELIVERY_OPTIONS,
  BOOKING_STATUSES,
  SNACKBAR_BUTTON_TYPES,
  REGISTER_PAGES,
  POST_ITEM_PAGE,
  UPGRADE_LENDER,
  CREATE_BOOKING,
  DATE_VALUES,
  SCREEN_TYPE
}

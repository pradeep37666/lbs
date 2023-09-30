export type User = {
  id: string
  email: string
  fullName: string
  firstName: string
  lastName: string
  password: string
  salt: string
  avatar: string
  mobile: string
  address: UserAddress
  lat: number
  lng: number
  suburb: string
  isLender: boolean
  borrowerRating: number
  lenderRating: number
}

export type UserData = {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  firstName: string
  lastName: string
  avatar: string
  mobile: string
  isLender: boolean
  lenderRating: number
  borrowerRating: number
  address: UserAddress & {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
  }
}

export type UpgradeUser = {
  borrowerDetails: {
    address: UserAddress
    firstName: string
    lastName: string
    email: string
    mobile: string
    isLender: boolean
    role: UserRole
  }
  stripeDetails: StripeDetails
}

enum UserRole {
  ADMIN = 'ADMIN',
  GOD = 'GOD',
  COMMON = 'COMMON',
}

export type UserTradeData = {
  id: string
  createdAt: string
  updatedAt: string
  email: string
  firstName: string
  lastName: string
  avatar: string | null
  mobile: string
  isLender: boolean
  lenderRating: number
  borrowerRating: number
  address: UserAddress
  stripe: StripeDetails
  role: UserRole
  userBlockedAvailability: BlockedAvailability[]
}

export type StripeDetails = {
  day: number
  month: number
  year: number
  bsb: string
  accountNumber: string
  mcc: string
  // website: string
  documentFrontImage: string
  documentBackImage: string
}

export type BlockedAvailabilityCreate = {
  startTime: BlockedAvailabilityTime
  endTime: BlockedAvailabilityTime
  weekDay: BlockedAvailabilityWeekday
}

export type BlockedAvailabilityNumberFormat = {
  startTime: BlockedAvailabilityTime
  endTime: BlockedAvailabilityTime
  weekDay: BlockedAvailabilityNumber
}

export type BlockedAvailability = {
  blockedAvailabilityId: string
  userId: string
  blockedAvailability: {
    id: string
    createdAt: Date
    updatedAt: Date
    startTime: BlockedAvailabilityTime
    endTime: BlockedAvailabilityTime
    weekDay: BlockedAvailabilityNumber
  }
  id: string
  createdAt: Date
  updatedAt: Date
}

export type BlockedAvailabilityWeekday =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY'

export type BlockedAvailabilityNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7

export type BlockedAvailabilityTime =
  | '08:00:00'
  | '12:00:00'
  | '13:00:00'
  | '17:00:00'

export type UserAddress = {
  streetNumber: string
  streetName: string
  city: string
  suburb: string
  state: string
  postCode: string
  country: string
  fullAddress: string
  lat: number
  lng: number
}

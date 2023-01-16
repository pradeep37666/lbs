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

export type UpgradeUser = {
	borrowerDetails: {
		address: UserAddress
		firstName: string
		lastName: string
		email: string
		mobile: string
		isLender: boolean
		role: UserRole
	},
	stripeDetails: StripeDetails
}

enum UserRole {
	ADMIN = 'ADMIN',
	GOD = 'GOD',
	COMMON = 'COMMON'
}

export type StripeDetails = {
	day: number
	month: number
	year: number
	bsb: string
	accountNumber: string
	mcc: string
	website: string
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

export const BlockedAvailabilityToNumber = (
	blockedAvailabilityWeekDay: BlockedAvailabilityWeekday
) => {
	switch (blockedAvailabilityWeekDay) {
		case 'SUNDAY':
			return 1
		case 'MONDAY':
			return 2
		case 'TUESDAY':
			return 3
		case 'WEDNESDAY':
			return 4
		case 'THURSDAY':
			return 5
		case 'FRIDAY':
			return 6
		case 'SATURDAY':
			return 7
	}
}

export const BlockedAvailabilityToString = (
	blockedAvailabilityNumber: BlockedAvailabilityNumber
) => {
	switch (blockedAvailabilityNumber) {
		case 1:
			return 'SUNDAY'
		case 2:
			return 'MONDAY'
		case 3:
			return 'TUESDAY'
		case 4:
			return 'WEDNESDAY'
		case 5:
			return 'THURSDAY'
		case 6:
			return 'FRIDAY'
		case 7:
			return 'SATURDAY'
	}
}

export type BlockedAvailabilityTime =
	| '08:00:00'
	| '12:00:00'
	| '13:00:00'
	| '17:00:00'

export type UserAddress = {
	streetNumber: string,
	streetName: string,
	city: string,
	suburb: string,
	state: string,
	postCode: string,
	country: string,
	fullAddress: string,
	lat: number,
	lng: number
}

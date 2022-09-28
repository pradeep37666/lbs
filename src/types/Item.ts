import {
	BlockedAvailability,
	BlockedAvailabilityNumber,
	BlockedAvailabilityTime,
} from './User'

export type ItemImage = {
	id: string
	createdAt: Date
	updatedAt: Date
	itemId: string
	imageKey: string
}

export type FavouriteItem = {
	id: string
	createdAt: string
	updatedAt: string
	itemId: string
	userId: string
	item: Item
}

export type ItemAddress = {
	id: string
	createdAt: Date
	updatedAt: Date
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
	itemId?: string
}

export type BlockedItemAvailability = {
	id: string
	createdAt: Date
	updatedAt: Date
	blockedAvailabilityId: string
	itemId: string
	blockedAvailability: {
		id: string
		createdAt: Date
		updatedAt: Date
		startTime: BlockedAvailabilityTime
		endTime: BlockedAvailabilityTime
		weekDay: BlockedAvailabilityNumber
	}
}

export type Item = {
	id: string
	createdAt: Date
	updatedAt: Date
	title: string
	category: string
	description: string
	price: number
	deliveryPrice: number
	pickupPrice: number
	rating: number
	discount: number
	is_deleted: boolean
	deliveryOption: DeliveryOption
	userId: string
	images: ItemImage[]
	address: ItemAddress
	availabilities: ItemAvailability[]
	itemBlockedAvailability: BlockedItemAvailability[]
}

export type DeliveryType = 'YES' | 'NO' | 'BOTH'

export type ItemAvailability = {
	id: string
	createdAt: Date
	updatedAt: Date
	yearly_availability: string
	year: number
	itemId: string
}

export type ItemCreated = {
	userId: {
		id: string
		email: string
		exp: number
		role: string
	}
	title: string
	category: string
	description: string
	price: number
	deliveryPrice: number
	discount: number
	is_deleted: boolean
	images: ItemImage[]
	address: ItemAddress
	id: string
	createdAt: Date
	updatedAt: Date
	rating: number
}

export type DeliveryOption = 'DELIVERY' | 'PICKUP' | 'BOTH' | 'NONE'

export const DeliveryOptions = ['NONE', 'DELIVERY', 'PICKUP', 'BOTH']

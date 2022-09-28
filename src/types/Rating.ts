import { User } from './User'

export type Rating = {
	id: string
	createdAt: Date
	updatedAt: Date
	comment: string
	rating: number
	userId: string
	itemId: string
	bookingId: string
	user: User
}

import axios from 'axios'
import { Item } from '../types/Item'
import { Rating } from '../types/Rating'
import { BlockedAvailabilityCreate, BlockedAvailabilityNumberFormat, UpgradeUser, User } from '../types/User'
import Instance from '../util/axios'
import Crudable from './crudable'
import { async } from 'validate.js'

const networkErrorMessage =
	'There was an error with your connection, please try again'

class UserService implements Crudable<User> {
	createOne = async (): Promise<User> => {
		// register a user
		throw Error('Not Implemented')
	}

	getOne = async (userId: string): Promise<User> => {
		try {
			const result = await Instance.get(`/users/${userId}`)
			return result.data
		} catch (error) {
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
					throw Error(networkErrorMessage)
			}

			throw Error('Error fetching user details')
		}
	}

	getLenderReviews = async (userId: string): Promise<Rating[]> => {
		try {
			const result = await Instance.get(`/users/${userId}/item-ratings`)
			return result.data
		} catch (error) {
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
					throw Error(networkErrorMessage)
			}

			throw Error('Error fetching user details')
		}
	}

	getLenderItems = async (userId: string): Promise<Item[]> => {
		try {
			const result = await Instance.get(`/users/${userId}/items`)
			return result.data
		} catch (error) {
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
					throw Error(networkErrorMessage)
			}

			throw Error('Error fetching user details')
		}
	}

	getMany = async (offset: number, take: number): Promise<User[]> => {
		throw Error('Not Implemented')
	}

	updateOne = async (): Promise<User> => {
		// const user = data as User
		// update a user

		throw Error('Not Implemented')
	}

	deleteOne = async () => {
		// delete a user
		throw Error('Not Implemented')
	}

	borrowerUpgrade = async (
		userData: UpgradeUser,
		userId: string,
		blockedAvailabilities: BlockedAvailabilityNumberFormat[]
	) => {
		try {
			const [user, blocked] = await Promise.all([
				Instance.post('/users/borrower-upgrade', userData),
				Instance.post(`/blocked-availability/users/${userId}`, {
					blockedAvailabilities
				})
			])
			if (user.status !== 201 || blocked.status !== 201) throw Error
			return { user, blocked }
		} catch (error: any) {
			if (error && axios.isAxiosError(error)) {
				if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
					throw Error(networkErrorMessage)
			}
			throw Error('Error fetching user details')
		}
	}
}

export default UserService

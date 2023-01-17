import axios from 'axios'
import { ItemCreateArgs, ItemCreated } from '../types/Item'
import Crudable from './crudable'
import Instance from '../util/axios'
import { BlockedAvailability, BlockedAvailabilityNumberFormat } from '../types/User'

const networkErrorMessage =
    'There was an error with your connection, please try again'

class ItemService implements Crudable<ItemCreated> {
    createOne = async (itemData: ItemCreateArgs): Promise<ItemCreated> => {
        try {
            const { data } = await Instance.post('/item', itemData)
            return data
        } catch (error) {
            if (error && axios.isAxiosError(error)) {
                if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
                    throw Error(networkErrorMessage)
            }
            throw Error('Error fetching user details')
        }
    }

    getOne = async (itemId: string): Promise<ItemCreated> => {
        throw Error('Not Implemented')
    }

    updateOne = async (): Promise<ItemCreated> => {
        throw Error('Not Implemented')
    }

    deleteOne = async (itemId: string): Promise<ItemCreated> => {
        throw Error('Not Implemented')
    }

    updateItemBlockedAvailability = async (
        itemId: string,
        blockedAvailabilities: BlockedAvailabilityNumberFormat[]
    ) => {
        try {
            const result = await Instance.post(`/blocked-availability/items/${itemId}`, {
                blockedAvailabilities
            })
            if (result.status !== 201) throw Error
            return result.data
        } catch (error) {
            if (error && axios.isAxiosError(error)) {
                if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
                    throw Error(networkErrorMessage)
            }
            throw Error('Error fetching user details')
        }
    }
}

export default ItemService
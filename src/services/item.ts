import axios from 'axios'
import { ItemCreateArgs, ItemCreated, ItemUpdateArgs } from '../types/Item'
import Instance from '../util/axios'
import { BlockedAvailabilityNumberFormat } from '../types/User'

const networkErrorMessage =
  'There was an error with your connection, please try again'

class ItemService {
  createNewItem = async (
    itemData: ItemCreateArgs,
    blockedAvailabilities: BlockedAvailabilityNumberFormat[]
  ) => {
    try {
      const item = await Instance.post('/items', itemData)
      if (item.status !== 201) throw Error
      const blocked = await Instance.post(
        `/blocked-availability/items/${item.data.id}`,
        {
          blockedAvailabilities,
        }
      )
      if (blocked.status !== 201) throw Error
      return item.data
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error fetching item details')
    }
  }

  createItem = async (
    itemData: ItemCreateArgs
  ): Promise<ItemCreated | boolean> => {
    try {
      const { data } = await Instance.post('/items', itemData)
      return data
    } catch (error: any) {
      console.log(
        'Error While creating your item, please try again',
        JSON.stringify(error.response.data, null, 3)
      )
      return false
    }
  }

  setItemBlockedAvailability = async (
    itemId: string,
    blockedAvailabilitiesNumberFormat: BlockedAvailabilityNumberFormat[]
  ): Promise<BlockedAvailabilityNumberFormat[]> => {
    try {
      const response = await Instance.post(
        `/blocked-availability/items/${itemId}`,
        {
          blockedAvailabilities: blockedAvailabilitiesNumberFormat,
        }
      )
      console.log(
        'Response from the server while updating the availability for the item',
        JSON.stringify(response.data, null, 3)
      )
      return response.data
    } catch (error: any) {
      console.log(
        'Error while setting the availability for the item',
        JSON.stringify(error, null, 3)
      )
      throw Error
    }
  }

  getItem = async (itemId: string) => {
    try {
      const { data, status } = await Instance.get(`/items/${itemId}`)
      if (status !== 200) throw Error
      return data
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error fetching item details')
    }
  }

  updateItemBlockedAvailability = async (
    itemId: string,
    blockedAvailabilities: BlockedAvailabilityNumberFormat[]
  ) => {
    try {
      const result = await Instance.post(
        `/blocked-availability/items/${itemId}`,
        {
          blockedAvailabilities,
        }
      )
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

  updateItemDetails = async (
    itemId: string,
    newItemDetails: ItemUpdateArgs
  ) => {
    try {
      const { data, status } = await Instance.patch(
        `/items/${itemId}`,
        newItemDetails
      )
      if (status !== 200) throw Error
      return data
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error fetching user details')
    }
  }

  getItemCountByCategory = async () => {
    try {
      const { data, status } = await Instance.get(`/items/count-by-category`)
      if (status !== 200) throw Error
      return data
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error fetching item count by category details')
    }
  }

  deleteItem = async (itemId: string) => {
    try {
      const { data, status } = await Instance.delete(`/items/${itemId}`)
      console.log({ status })
      // FIXME: this api isn't working
      if (status !== 200) throw Error
      return data
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error fetching user details')
    }
  }

  getItemBookedDates = async (itemId: string) => {
    try {
      const { data, status } = await Instance.get(`/items/${itemId}/bookings`)
      if (status !== 200) throw Error
      return data
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

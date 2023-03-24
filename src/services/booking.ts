import axios from 'axios'
import { ItemCreateArgs, ItemUpdateArgs } from '../types/Item'
import Instance from '../util/axios'
import { BlockedAvailabilityNumberFormat } from '../types/User'

const networkErrorMessage =
  'There was an error with your connection, please try again'

namespace BookingService {
  export const approveBooking = async (
    bookingId: string,
    bookingDurationId: string
  ) => {
    try {
      const { data } = await Instance.post(
        `bookings/${bookingId}/booking-durations/${bookingDurationId}/approve`
      )
      return data
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('ERROR')
    }
  }

  export const rejectBooking = async (bookingId: string) => {
    const { data } = await Instance.post(`bookings/${bookingId}/reject`)
    return data
  }

  export const completeBooking = async (bookingId: string) => {
    try {
      const { data } = await Instance.post(`bookings/${bookingId}/finish`)
      return data
    } catch (error: unknown) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error upading booking')
    }
  }

  export const requestExtension = async (bookingId: string) => {
    try {
      const { data } = await Instance.post(
        `bookings/${bookingId}/request-extension`
      )
      return data
    } catch (error) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error upading booking')
    }
  }
}

export default BookingService

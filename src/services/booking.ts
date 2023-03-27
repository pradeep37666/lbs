import axios from 'axios'
import { RequestExtension } from '../types/Booking'
import Instance from '../util/axios'

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
      throw Error('Error updating booking')
    }
  }

  export const lenderConfirm = async (bookingId: string) => {
    try {
      const { data } = await Instance.post(
        `bookings/${bookingId}/lender-confirm`
      )
      return data
    } catch (error: unknown) {
      if (error && axios.isAxiosError(error)) {
        console.log(error.response?.data)
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error confirming booking as lender')
    }
  }

  export const borrowerConfirm = async (bookingId: string) => {
    try {
      const { data } = await Instance.post(
        `bookings/${bookingId}/borrower-confirm`
      )
      return data
    } catch (error: unknown) {
      if (error && axios.isAxiosError(error)) {
        console.log(error.response?.data)
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error confirming booking as borrower')
    }
  }

  export const cancelBooking = async (bookingId: string) => {
    try {
      const { data } = await Instance.post(`bookings/${bookingId}/cancel`)
      return data
    } catch (error: unknown) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error cancelling booking')
    }
  }

  export const requestExtension = async (
    bookingId: string,
    requestExtensionArgs: RequestExtension
  ) => {
    try {
      const { data } = await Instance.post(
        `bookings/${bookingId}/request-extension`,
        requestExtensionArgs
      )
      return data
    } catch (error: unknown) {
      if (error && axios.isAxiosError(error)) {
        if (error?.code === 'ERR_NETWORK' || error?.code === 'ECONNABORTED')
          throw Error(networkErrorMessage)
      }
      throw Error('Error requesting extension')
    }
  }
}

export default BookingService

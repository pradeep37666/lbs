import moment from 'moment'

export default class BookingCalculator {
  constructor(
    private startDate: Date,
    private endDate: Date,
    private deliveryPrice: number,
    private pickupPrice: number,
    private pricePerSlot: number,
    private offPeakDiscount: number,
    private isPickupSelected: boolean,
    private isDeliverySelected: boolean
  ) {}

  setStartDate(startDate: Date) {
    this.startDate = startDate
  }
  setEndDate(endDate: Date) {
    this.endDate = endDate
  }

  setIsDeliverySelected(isDeliverySelected: boolean) {
    this.isDeliverySelected = isDeliverySelected
  }
  setIsPickupSelected(isPickupSelected: boolean) {
    this.isPickupSelected = isPickupSelected
  }

  getUpdatedTotalPrice() {
    const start = moment(this.startDate)
    const end = moment(this.endDate)
    const msInDay = 24 * 60 * 60 * 1000
    const dateDifference = Math.round(
      Math.abs(this.endDate.getTime() - this.startDate.getTime()) / msInDay
    )
    const isSameDay = start.isSame(end, 'day')
    let totalPrice = 0

    if (isSameDay) {
      if (
        (start.hours() === 8 && end.hours() === 12) ||
        (start.hours() === 13 && end.hours() === 17)
      ) {
        totalPrice += this.pricePerSlot
      } else {
        totalPrice += this.pricePerSlot * 2
      }
    } else {
      if (start.hours() === 8) {
        if (end.hours() === 12) {
          totalPrice +=
            dateDifference * 2 * this.pricePerSlot + this.pricePerSlot
        } else {
          totalPrice +=
            dateDifference * this.pricePerSlot * 2 + 2 * this.pricePerSlot
        }
      } else {
        if (end.hours() === 12) {
          totalPrice += dateDifference * 2 * this.pricePerSlot
        } else {
          totalPrice +=
            dateDifference * 2 * this.pricePerSlot + this.pricePerSlot
        }
      }
    }

    if (this.isPickupSelected) {
      totalPrice += this.pickupPrice
    }

    if (this.isDeliverySelected) {
      totalPrice += this.deliveryPrice
    }

    if (this.offPeakDiscount > 0) {
      let discount = this.calculateOffPeakDiscount()
      totalPrice -= discount
    }
    return totalPrice.toFixed(2)
  }

  calculateOffPeakDiscount() {
    const start = moment(this.startDate)
    const end = moment(this.endDate)
    let discount = 0
    for (start; start.isBefore(end); start.add(1, 'days')) {
      if (start.weekday() >= 1 && start.weekday() <= 5) {
        if (start.isSame(end, 'day')) {
          if (
            (start.hours() === 8 && end.hours() === 12) ||
            (start.hours() === 13 && end.hours() === 17)
          ) {
            discount += this.pricePerSlot * (this.offPeakDiscount / 100)
            if (start.hours() === 8 && end.hours() === 17) {
              discount += this.pricePerSlot * 2 * (this.offPeakDiscount / 100)
            }
          } else {
            discount += this.pricePerSlot * 2 * (this.offPeakDiscount / 100)
          }
        } else {
          discount += this.pricePerSlot * 2 * (this.offPeakDiscount / 100)
        }
      }
    }
    return discount
  }
}

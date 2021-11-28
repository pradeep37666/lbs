
export default class BookingPriceCalculator{
    start
    end
    deliveryPrice
    pricePerSlot
    offPeakDiscount
    deliverySelected
    pickupSelected
    // startYear
    // endYear 

    constructor(
        pricePerSlot, 
        offPeakDiscount,
        deliveryPrice,
        start,
        end
        )
        {
            this.start = start
            this.end = end
            this.pricePerSlot = pricePerSlot
            this.deliveryPrice = deliveryPrice
            this.offPeakDiscount = offPeakDiscount
            this.deliverySelected = false
            this.pickupSelected = false
        }

    setStart(start){
        this.start = start
    }

    setEnd(end){
        this.end = end
    }
    setDeliverySelected(deliverySelected){
        this.deliverySelected = deliverySelected
    }
    setPickupSelected(pickupSelected){
        this.pickupSelected = pickupSelected
    }

    getTotalPrice() {
        let price = this.getPriceWithoutExtras()
        if(this.deliverySelected){
            price += this.deliveryPrice
        }
        if(this.pickupSelected){
            price += this.deliveryPrice
        }
        return price.toFixed(2)
    }

    isSameTimeSlot() {
        if(this.start.dateObj.getTime() === this.end.dateObj.getTime()
        && this.start.timeslot === this.end.timeslot){
            return true
        }
        return false
    }

    getPriceOfExtras(){
        let price = 0
        if(this.deliverySelected){
            price += this.deliveryPrice
        }
        if(this.pickupSelected){
            price += this.deliveryPrice
        }
        return price
    }
    getPriceWithoutExtras() {
        let price = 0

        const totalTimeSlots = this.getTotalTimeSlots()
        const discountTimeSlots = this.getDiscountTimeSlots()
        const weekendTimeSlots = totalTimeSlots - discountTimeSlots
        price += weekendTimeSlots * this.pricePerSlot

        price += discountTimeSlots * (this.pricePerSlot * (1 - this.offPeakDiscount / 100))

        return parseFloat(price.toFixed(2))
    }
    
    getDiscountTimeSlots() {
        const startDate= new Date(this.start.dateObj.getTime())
        let discountTimeSlots = 0

        while(startDate <= this.end.dateObj) {
            if( this.isWeekday(startDate) ){
                discountTimeSlots += 2
            }
            startDate.setDate(startDate.getDate() + 1)
        }
        if(this.start.timeslot === 'afternoon' && this.isWeekday(this.start.dateObj)){
            discountTimeSlots -= 1
        }
        if(this.end.timeslot === 'morning' && this.isWeekday(this.end.dateObj)){
            discountTimeSlots -= 1
        }
        return discountTimeSlots
    }

    isWeekday(date) {
        const day = date.getDay()
        return day > 0 && day < 6
    }

    getTotalDays() {
        const startDay = this.getDayOfYear(this.start.dateObj)
        const endDay  = this.getDayOfYear(this.end.dateObj)
        if(endDay - startDay >= 0){
            return endDay - startDay
        } else {
            return this.getYearCrossoverDays(startDay, endDay)
        }

    }

    getTotalTimeSlots() {
        let totalDays = this.getTotalDays()

        if(this.start.timeslot === 'morning' && this.end.timeslot === 'morning'){
            totalDays = (totalDays * 2) + 1
        }
        if(this.start.timeslot === 'afternoon' && this.end.timeslot === 'afternoon'){
            totalDays = (totalDays * 2) + 1
        }
        if(this.start.timeslot === 'morning' && this.end.timeslot === 'afternoon'){
            totalDays = (totalDays * 2) + 2
        }
        if(this.start.timeslot === 'afternoon' && this.end.timeslot === 'morning'){
            totalDays = totalDays * 2
        }
        return totalDays
    }

    getOffPeakDiscount(){
        let offPeakDiscount = 0
        const discountTimeSlots = this.getDiscountTimeSlots()
        if(this.offPeakDiscount > 0){
            offPeakDiscount = discountTimeSlots * (this.pricePerSlot * (this.offPeakDiscount / 100))
        }
        
        return offPeakDiscount.toFixed(2)
    }

    getYearCrossoverDays(startDay, endDay) {
        const currentYear = this.start.dateObj.getFullYear()
        // const nextYear  = currentYear + 1

        const isLeapYear = (currentYear % 4 === 0 && currentYear% 100 !== 0) || currentYear % 400 === 0;
        const currentYearDays = isLeapYear ? 366 : 365
        
        const crossoverDays = currentYearDays - startDay
        return crossoverDays + endDay
    }

    getDayOfYear(dateObj) {
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth()
        const date = dateObj.getDate()
    
        let dayOfYear = date;

        const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        for (let i = 0; i < month ; i++) {
            //the month index need minus 1
            dayOfYear += monthDays[i];
        }
    
        const isLeapYear =  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        // Add extra day if it is a leap year
        if (isLeapYear && month > 2) {
            dayOfYear += 1
        }
        return dayOfYear
    }
    
}
